resource "aws_s3_bucket" "artifact" {
  bucket = "${var.app}-${terraform.workspace}-artifact"
  acl    = "private"

  tags = {
    Name = "${var.app}-${terraform.workspace}-artifact"
  }
}

data "aws_iam_policy_document" "codepipeline_sts" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"

      identifiers = [
        "codepipeline.amazonaws.com",
      ]
    }
  }
}

data "aws_iam_policy_document" "codepipeline" {
  statement {
    effect = "Allow"

    resources = [
      aws_s3_bucket.artifact.arn,
      "${aws_s3_bucket.artifact.arn}/*",
    ]

    actions = [
      "s3:GetObject",
      "s3:GetObjectVersion",
      "s3:GetBucketLocation",
      "s3:PutObject",
    ]
  }

  statement {
    effect = "Allow"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "logs:FilterLogEvents",
      "logs:GetLogEvents",
    ]

    resources = ["*"]
  }

  statement {
    effect = "Allow"

    actions = [
      "codebuild:BatchGetBuilds",
      "codebuild:StartBuild",
    ]

    resources = ["*"]
  }

  statement {
    effect = "Allow"

    actions = [
      "iam:PassRole",
      "ecr:DescribeImages",
      "ecs:DescribeServices",
      "ecs:DescribeTaskDefinition",
      "ecs:DescribeTasks",
      "ecs:ListTasks",
      "ecs:RegisterTaskDefinition",
      "ecs:UpdateService",
    ]

    resources = ["*"]
  }
}

resource "aws_iam_role" "codepipeline" {
  name               = "${var.app}-${terraform.workspace}-main-codepipline"
  assume_role_policy = data.aws_iam_policy_document.codepipeline_sts.json
}

resource "aws_iam_role_policy" "codepipeline" {
  name   = "${var.app}-${terraform.workspace}-main-codepipline"
  role   = aws_iam_role.codepipeline.name
  policy = data.aws_iam_policy_document.codepipeline.json
}
resource "aws_codepipeline" "main" {
  name     = "${var.app}-${terraform.workspace}-main"
  role_arn = aws_iam_role.codepipeline.arn

  artifact_store {
    type     = "S3"
    location = aws_s3_bucket.artifact.bucket
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        Owner                = "Yasu-umi"
        Repo                 = var.app
        Branch               = "master"
        OAuthToken           = "XXX"
        PollForSourceChanges = true
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      version          = "1"
      input_artifacts  = ["source_output"]
      output_artifacts = ["build_output"]

      configuration = {
        ProjectName = aws_codebuild_project.main.name
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name            = "Deploy"
      category        = "Deploy"
      owner           = "AWS"
      provider        = "ECS"
      input_artifacts = ["build_output"]
      version         = "1"

      configuration = {
        ClusterName = aws_ecs_cluster.main.name
        ServiceName = aws_ecs_service.main.name
        FileName    = "imagedefinitions.json"
      }
    }
  }
}
data "aws_iam_policy_document" "codebuild_sts" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["codebuild.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "codebuild" {
  name               = "${var.app}-${terraform.workspace}-main-codebuild"
  assume_role_policy = data.aws_iam_policy_document.codebuild_sts.json
}


data "aws_iam_policy_document" "codebuild" {
  statement {
    effect = "Allow"

    resources = [
      aws_s3_bucket.artifact.arn,
      "${aws_s3_bucket.artifact.arn}/*",
    ]

    actions = [
      "s3:GetObject",
      "s3:List*",
      "s3:PutObject",
    ]
  }

  statement {
    effect    = "Allow"
    resources = ["*"]

    actions = [
      "ecr:GetAuthorizationToken",
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability",
    ]
  }

  statement {
    effect = "Allow"

    resources = [
      aws_ecr_repository.main.arn,
    ]

    actions = [
      "ecr:*",
    ]
  }

  statement {
    effect    = "Allow"
    resources = ["*"]

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "logs:FilterLogEvents",
      "logs:GetLogEvents",
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
}

resource "aws_iam_role_policy" "codebuild" {
  name   = "${var.app}-${terraform.workspace}-main-codebuild"
  role   = aws_iam_role.codebuild.id
  policy = data.aws_iam_policy_document.codebuild.json
}

resource "aws_codebuild_project" "main" {
  name          = "${var.app}-${terraform.workspace}-main"
  service_role  = aws_iam_role.codebuild.arn
  build_timeout = 30

  source {
    type      = "CODEPIPELINE"
    buildspec = "buildspec.yml"
  }

  artifacts {
    type = "CODEPIPELINE"
  }

  cache {
    type  = "LOCAL"
    modes = ["LOCAL_DOCKER_LAYER_CACHE", "LOCAL_SOURCE_CACHE"]
  }

  environment {
    compute_type    = "BUILD_GENERAL1_SMALL"
    image           = "aws/codebuild/standard:2.0"
    type            = "LINUX_CONTAINER"
    privileged_mode = true

    environment_variable {
      name  = "AWS_REGION"
      value = "ap-northeast-1"
    }

    environment_variable {
      name  = "REPOSITORY_URI"
      value = aws_ecr_repository.main.repository_url
    }

    environment_variable {
      name  = "HOST"
      value = aws_alb.main.dns_name
    }
  }
}
