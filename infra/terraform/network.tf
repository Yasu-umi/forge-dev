resource "aws_vpc" "main" {
  cidr_block           = var.vpc["cidr_block"]
  enable_dns_support   = true
  enable_dns_hostnames = true
}


resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
}

resource "aws_subnet" "external" {
  vpc_id                  = aws_vpc.main.id
  count                   = length(var.subnet.external)
  cidr_block              = lookup(var.subnet.external[count.index], "cidr")
  availability_zone       = lookup(var.subnet.external[count.index], "az")
  map_public_ip_on_launch = true

  tags = {
    "Name" : "${var.app}-${terraform.workspace}-main-external-${lookup(var.subnet.external[count.index], "name")}"
  }
}

resource "aws_route_table" "external" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    "Name" : "${var.app}-${terraform.workspace}-main-external"
  }
}

resource "aws_route_table_association" "external" {
  count          = length(aws_subnet.external)
  subnet_id      = element(aws_subnet.external.*.id, count.index)
  route_table_id = aws_route_table.external.id
}
