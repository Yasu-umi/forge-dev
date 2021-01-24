resource "aws_ecs_cluster" "main" {
  name = "${var.app}-${terraform.workspace}-main"
}

resource "aws_cloudwatch_log_group" "ecs" {
  name              = "${var.app}-${terraform.workspace}-ecs-main"
  retention_in_days = 7
  tags = {
    "Name" : "${var.app}-${terraform.workspace}-ecs-main"
  }
}

data "aws_iam_policy_document" "ecs_tasks_sts" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_tasks" {
  name               = "${var.app}-${terraform.workspace}-main-ecs-tasks"
  assume_role_policy = data.aws_iam_policy_document.ecs_tasks_sts.json
}

data "aws_iam_policy_document" "ecs_tasks" {
  statement {
    effect    = "Allow"
    resources = ["*"]

    actions = [
      "ssm:DescribeParameters",
    ]
  }

  statement {
    effect = "Allow"

    resources = [
      "arn:aws:ssm:ap-northeas-1:${var.account_id}:parameter/${var.app}/${terraform.workspace}/main/*",
    ]

    actions = [
      "ssm:GetParameters",
      "secretsmanager:GetSecretValue",
    ]
  }

  statement {
    effect    = "Allow"
    resources = ["*"]

    actions = [
      "ecr:GetAuthorizationToken",
      "ecr:BatchCheckLayerAvailability",
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]
  }
}

resource "aws_iam_role_policy" "ecs_tasks" {
  name   = "${var.app}-${terraform.workspace}-main-ecs-tasks"
  role   = aws_iam_role.ecs_tasks.name
  policy = data.aws_iam_policy_document.ecs_tasks.json
}

data "template_file" "main_ecs_task_definition" {
  template = file("ecs/main.json.tpl")

  vars = {
    image         = aws_ecr_repository.main.repository_url
    cpu           = 256
    memory        = 512
    containerPort = var.ecs_container_port["main"]
    ssm_prefix    = "/${var.app}/${terraform.workspace}/main"
    awslogs_group = aws_cloudwatch_log_group.ecs.name
    host          = aws_alb.main.dns_name
    region        = "ap-northeast-1"
  }
}

resource "aws_ecs_task_definition" "main" {
  family                = "${var.app}-${terraform.workspace}-main"
  container_definitions = data.template_file.main_ecs_task_definition.rendered
  task_role_arn         = aws_iam_role.ecs_tasks.arn
  execution_role_arn    = aws_iam_role.ecs_tasks.arn

  // for FARGATE
  cpu                      = 256
  memory                   = 512
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
}

resource "aws_ecs_service" "main" {
  name                               = "${var.app}-${terraform.workspace}-main"
  cluster                            = aws_ecs_cluster.main.id
  task_definition                    = aws_ecs_task_definition.main.arn
  desired_count                      = 1
  launch_type                        = "FARGATE"
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent         = 200
  # iam_role                           = aws_iam_role.ecs.arn

  scheduling_strategy = "REPLICA"

  network_configuration {
    subnets          = aws_subnet.external.*.id
    security_groups  = [aws_security_group.ecs_main.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.main.arn
    container_name   = "main"
    container_port   = var.ecs_container_port["main"]
  }

  deployment_controller {
    type = "CODE_DEPLOY"
  }
}
