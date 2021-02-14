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

  // TODO: more strict
  statement {
    effect = "Allow"
    actions = [
      "s3:*"
    ]
    resources = [
      "*",
    ]
  }

  statement {
    effect = "Allow"

    actions = [
      "codestar-connections:UseConnection",
    ]

    resources = [var.codestar_connection_arn]
  }
}

resource "aws_iam_role" "codepipeline" {
  name               = "${var.app}-${terraform.workspace}-main-codepipeline"
  assume_role_policy = data.aws_iam_policy_document.codepipeline_sts.json
}

resource "aws_iam_role_policy" "codepipeline" {
  name   = "${var.app}-${terraform.workspace}-main-codepipeline"
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
      owner            = "AWS"
      provider         = "CodeStarSourceConnection"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        ConnectionArn    = var.codestar_connection_arn
        FullRepositoryId = "Yasu-umi/forge-dev"
        BranchName       = "master"
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
resource "aws_cloudwatch_log_group" "codebuild" {
  name              = "/aws/codebuild/${var.app}-${terraform.workspace}-main"
  retention_in_days = 7
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

  statement {
    effect = "Allow"
    resources = [
      aws_lambda_function.main.arn,
    ]
    actions = [
      "lambda:UpdateFunctionCode",
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

  logs_config {
    cloudwatch_logs {
      group_name = aws_cloudwatch_log_group.codebuild.name
    }
  }

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
      value = data.aws_region.self.name
    }

    environment_variable {
      name  = "FUNCTION_NAME"
      value = aws_lambda_function.main.function_name
    }

    environment_variable {
      name  = "CLIENT_ID"
      type  = "PARAMETER_STORE"
      value = aws_ssm_parameter.client_id.name
    }

    environment_variable {
      name  = "CLIENT_SECRET"
      type  = "PARAMETER_STORE"
      value = aws_ssm_parameter.client_secret.name
    }

    environment_variable {
      name  = "BIM360_ACCOUNT_ID"
      type  = "PARAMETER_STORE"
      value = aws_ssm_parameter.bim360_account_id.name
    }

    environment_variable {
      name  = "HOST"
      value = aws_apigatewayv2_stage.main.invoke_url
    }
  }
}
