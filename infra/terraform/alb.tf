resource "aws_alb_target_group" "main" {
  name   = "${var.app}-${terraform.workspace}-main"
  vpc_id = aws_vpc.main.id
  // for FARGATE
  target_type          = "ip"
  port                 = 80
  protocol             = "HTTP"
  deregistration_delay = 60

  health_check {
    interval            = 15
    protocol            = "HTTP"
    path                = "/healthcheck"
    timeout             = 5
    healthy_threshold   = 3
    unhealthy_threshold = 3
    matcher             = 200
  }
}

resource "aws_alb" "main" {
  name                       = "${var.app}-${terraform.workspace}-main"
  subnets                    = aws_subnet.external.*.id
  security_groups            = [aws_security_group.allow_external_main.id]
  internal                   = false
  idle_timeout               = 60
  enable_deletion_protection = false
}

resource "aws_alb_listener" "main" {
  load_balancer_arn = aws_alb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_alb_target_group.main.arn
    type             = "forward"
  }
}
