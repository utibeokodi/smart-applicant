variable "aws_region" {
  description = "AWS Region"
}

variable "app_name" {
  description = "Name of app"
}

variable "stage" {
  description = "Stage of deployment e.g prod, dev etc."
}

variable "aws_access_key" {
  description = "The AWS access key for the account"
  type        = string
  sensitive   = true
}

variable "aws_secret_access_key" {
  description = "The secret access key for AWS the account"
  type        = string
  sensitive   = true
}