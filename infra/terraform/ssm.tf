resource "aws_kms_key" "main" {
  description = "${var.app}-${terraform.workspace}-main"
}

resource "aws_kms_alias" "main" {
  name          = "alias/${var.app}-${terraform.workspace}-main"
  target_key_id = aws_kms_key.main.key_id
}
resource "aws_ssm_parameter" "client_id" {
  name   = "/${var.app}/${terraform.workspace}/main/CLIENT_ID"
  type   = "SecureString"
  value  = "null"
  key_id = aws_kms_alias.main.arn
  lifecycle {
    ignore_changes = [value]
  }
}
resource "aws_ssm_parameter" "client_secret" {
  name   = "/${var.app}/${terraform.workspace}/main/CLIENT_SECRET"
  type   = "SecureString"
  value  = "null"
  key_id = aws_kms_alias.main.arn
  lifecycle {
    ignore_changes = [value]
  }
}
resource "aws_ssm_parameter" "bim360_account_id" {
  name   = "/${var.app}/${terraform.workspace}/main/BIM360_ACCOUNT_ID"
  type   = "SecureString"
  value  = "null"
  key_id = aws_kms_alias.main.arn
  lifecycle {
    ignore_changes = [value]
  }
}
