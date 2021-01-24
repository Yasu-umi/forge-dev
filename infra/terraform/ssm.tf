resource "aws_ssm_parameter" "client_id" {
  name  = "/${var.app}/${terraform.workspace}/main/CLIENT_ID"
  type  = "String"
  value = var.CLIENT_ID
}
resource "aws_ssm_parameter" "client_secret" {
  name  = "/${var.app}/${terraform.workspace}/main/CLIENT_SECRET"
  type  = "String"
  value = var.CLIENT_SECRET
}
resource "aws_ssm_parameter" "bim360_account_id" {
  name  = "/${var.app}/${terraform.workspace}/main/BIM360_ACCOUNT_ID"
  type  = "String"
  value = var.BIM360_ACCOUNT_ID
}
