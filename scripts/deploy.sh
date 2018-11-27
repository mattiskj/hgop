#!/bin/bash
echo Destroying any running terraform.
`terraform destroy -auto-approve`

echo Creating new terraform Instance.
`terraform apply -auto-approve`

Running initialization script
`ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"`

