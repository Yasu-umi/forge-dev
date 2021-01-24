[
  {
    "name": "main",
    "image": "${image}",
    "cpu": ${cpu},
    "memory": ${memory},
    "essential": true,
    "portMappings": [
      {
        "containerPort": ${containerPort},
        "protocol": "tcp"
      }
    ],
    "environment": [
      { "name" : "HOST", "value" : "${host}" }
    ],
    "secrets": [
      {
        "name": "CLIENT_ID",
        "valueFrom": "${ssm_prefix}/CLIENT_ID"
      },
      {
        "name": "CLIENT_SECRET",
        "valueFrom": "${ssm_prefix}/CLIENT_SECRET"
      },
      {
        "name": "BIM360_ACCOUNT_ID",
        "valueFrom": "${ssm_prefix}/BIM360_ACCOUNT_ID"
      }
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "${awslogs_group}",
        "awslogs-region": "${region}",
        "awslogs-stream-prefix": "container"
      }
    }
  }
]