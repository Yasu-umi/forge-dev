app = "forge-dev"

ecs_container_port = {
  "main": 3000,
}

vpc = {
  cidr_block = "172.17.0.0/16"
}


subnet = {
  external = [
    {
      name  = "external-1a"
      cidr  = "172.17.0.0/24"
      az    = "ap-northeast-1a"
      usage = "external"
    },
    {
      name  = "external-1c"
      cidr  = "172.17.1.0/24"
      az    = "ap-northeast-1c"
      usage = "external"
    },
  ]
}

account_id = "120096533732"
