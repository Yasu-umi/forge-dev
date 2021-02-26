resource "aws_api_gateway_account" "cloudwatch" {
  cloudwatch_role_arn = aws_iam_role.cloudwatch.arn
}

resource "aws_iam_role" "cloudwatch" {
  name = "api_gateway_cloudwatch_global"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_cloudwatch_log_group" "apigateway" {
  name              = "${var.app}-${terraform.workspace}-apigateway-main"
  retention_in_days = 7
  tags = {
    "Name" : "${var.app}-${terraform.workspace}-apigateway-main"
  }
}

resource "aws_apigatewayv2_api" "main" {
  name          = "${var.app}-${terraform.workspace}-main"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "main" {
  api_id      = aws_apigatewayv2_api.main.id
  name        = "$default"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.apigateway.arn
    format          = "{ \"requestId\": \"$context.requestId\", \"ip\": \"$context.identity.sourceIp\", \"requestTime\": \"$context.requestTime\", \"httpMethod\": \"$context.httpMethod\", \"routeKey\": \"$context.routeKey\", \"status\": \"$context.status\", \"protocol\": \"$context.protocol\", \"responseLength\": \"$context.responseLength\" }"
  }

  default_route_settings {
    detailed_metrics_enabled = true
    logging_level            = "INFO"
    throttling_burst_limit   = 500
    throttling_rate_limit    = 500
  }
}

resource "aws_apigatewayv2_integration" "main" {
  api_id               = aws_apigatewayv2_api.main.id
  integration_type     = "AWS_PROXY"
  connection_type      = "INTERNET"
  description          = "Lambda ${var.app}-${terraform.workspace}-main"
  integration_method   = "POST"
  integration_uri      = aws_lambda_function.main.invoke_arn
  passthrough_behavior = "WHEN_NO_MATCH"
}

resource "aws_apigatewayv2_route" "main" {
  api_id    = aws_apigatewayv2_api.main.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.main.id}"
}

resource "aws_lambda_permission" "main" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.main.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_stage.main.execution_arn}/*"
}

resource "aws_apigatewayv2_domain_name" "main" {
  domain_name = "${var.app}.${var.domain}"

  domain_name_configuration {
    certificate_arn = data.aws_acm_certificate.main.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_apigatewayv2_api_mapping" "main" {
  api_id      = aws_apigatewayv2_api.main.id
  domain_name = aws_apigatewayv2_domain_name.main.id
  stage       = "$default"
}
