terraform {
  backend "s3" {
    bucket  = "forge-dev-terraform"
    key     = "forge-dev.terraform.tfstate"
    region  = "ap-northeast-1"
    profile = "forge-dev"
    encrypt = true
  }
}

provider "aws" {
  profile = "forge-dev"
  region  = "ap-northeast-1"
}

data "aws_caller_identity" "self" {}
data "aws_region" "self" {}
