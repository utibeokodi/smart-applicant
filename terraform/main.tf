provider "aws" {
  region = var.aws_region
}

resource "aws_ecr_repository" "smart-applicant-web-app" {
  name = "${var.app_name}-${var.stage}-web-app-ecr"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_dynamodb_table" "smart_applicant_users" {
  name           =  "${var.app_name}-${var.stage}-users"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "user_id"

  attribute {
    name = "email"
    type = "S"
  }

  attribute {
    name = "user_id"
    type = "S"
  }

  global_secondary_index {
    name               = "EmailIndex"
    hash_key           = "email"
    read_capacity      = 5
    write_capacity     = 5
    projection_type    = "ALL"
  }

  tags = {
    Environment = "development"
  }
}