variable "CLIENT_ID" {
  type = string
}
variable "CLIENT_SECRET" {
  type = string
}
variable "BIM360_ACCOUNT_ID" {
  type = string
}

variable "app" {
  type = string
}

variable "vpc" {
  type = map
}

variable "subnet" {
  type = map
}

variable "ecs_container_port" {
  type = map
}

variable "account_id" {
  type = string
}

variable "codestar_connection_arn" {
  type = string
}
