resource "aws_dynamodb_table" "main" {
  name         = "${var.app}-${terraform.workspace}-main"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "sessionID"

  attribute {
    name = "sessionID"
    type = "S"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }
}
