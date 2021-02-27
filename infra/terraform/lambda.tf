resource "aws_cloudwatch_log_group" "lambda" {
  name              = "/aws/lambda/${var.app}-${terraform.workspace}-lambda-main"
  retention_in_days = 7
}

resource "aws_lambda_function" "main" {
  filename         = "./entry.zip"
  function_name    = "${var.app}-${terraform.workspace}-lambda-main"
  role             = aws_iam_role.lambda_main.arn
  handler          = "lambda.handler"
  source_code_hash = filebase64sha256("./entry.zip")
  runtime          = "nodejs12.x"

  environment {
    variables = {
      HOST                       = "https://${var.app}.${var.domain}"
      CLIENT_ID_SSM_NAME         = aws_ssm_parameter.client_id.name
      CLIENT_SECRET_SSM_NAME     = aws_ssm_parameter.client_secret.name
      BIM360_ACCOUNT_ID_SSM_NAME = aws_ssm_parameter.bim360_account_id.name
      DYNAMO_TABLE_NAME          = aws_dynamodb_table.main.name
      SESSION_DYNAMO_TABLE_NAME  = aws_dynamodb_table.session.name
      NODE_ENV                   = "production"
    }
  }

  memory_size = 256
  timeout     = 60

  depends_on = [aws_cloudwatch_log_group.lambda]

  lifecycle {
    ignore_changes = [source_code_hash]
  }
}

data "aws_iam_policy_document" "lambda_main_sts" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "lambda_main" {
  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:DescribeLogGroups",
      "logs:DescribeLogStreams",
      "logs:PutLogEvents",
      "logs:GetLogEvents",
      "logs:FilterLogEvents",
    ]
    resources = ["*"]
  }

  statement {
    effect = "Allow"
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
    ]
    resources = [aws_dynamodb_table.main.arn]
  }

  statement {
    effect = "Allow"
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
    ]
    resources = [aws_dynamodb_table.session.arn]
  }

  statement {
    effect = "Allow"

    resources = [
      "arn:aws:ssm:${data.aws_region.self.name}:${data.aws_caller_identity.self.account_id}:parameter/${var.app}/${terraform.workspace}/main/*"
    ]

    actions = [
      "ssm:GetParameter",
      "ssm:GetParameters",
    ]
  }

  statement {
    effect = "Allow"

    resources = [
      aws_kms_key.main.arn,
    ]

    actions = [
      "kms:Decrypt",
    ]
  }
}

resource "aws_iam_policy" "lambda_main" {
  name = "${var.app}-${terraform.workspace}-lambda-main"

  policy = data.aws_iam_policy_document.lambda_main.json
}

resource "aws_iam_role" "lambda_main" {
  name               = "${var.app}-${terraform.workspace}-lambda-main"
  assume_role_policy = data.aws_iam_policy_document.lambda_main_sts.json
}

resource "aws_iam_role_policy_attachment" "lambda_main" {
  role       = aws_iam_role.lambda_main.name
  policy_arn = aws_iam_policy.lambda_main.arn
}
