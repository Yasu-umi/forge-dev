data "aws_route53_zone" "root" {
  name         = var.domain
  private_zone = false
}

data "aws_acm_certificate" "main" {
  domain   = var.domain
  statuses = ["ISSUED"]
}

resource "aws_route53_record" "main" {
  name    = aws_apigatewayv2_domain_name.main.domain_name
  type    = "A"
  zone_id = data.aws_route53_zone.root.zone_id

  alias {
    name                   = aws_apigatewayv2_domain_name.main.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.main.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}
