#!/bin/bash

#NEED TO CHECK IF YOU ARE RUNNING SCRIPT FROM THE RIHT DIRECTIORY AND ALL NEEDED FILES ARE THERE
echo "Searching for files needed to run script"
if [ ! -f "docker-compose.yml" ]; then
    echo "Make sure docker compose exists and run script from application root"
    exit 1
fi
echo "docker-compose.yml FOUND"
if [ ! -f "infrastructure.tf" ]; then
    echo "Make sure infrastructure.tf exists and run script from application root"
    exit 1
fi
echo "infrastructure.tf FOUND"
if [ ! -f "./scripts/initialize_game_api_instance.sh" ]; then
    echo "Make sure initialize_game_api_instance.sh exists and run script from application root"
    exit 1
fi
echo "initialize_game_api_instance.sh FOUND"

echo "EVERY NEEDED FILE FOUND"
#DESTROY, INITIALIZE AND DEPLOY INSTANCE
echo "Destroying any running terraform."
terraform destroy -auto-approve

echo "INITIALIZING INSTANCE"
terraform init

echo "Creating new terraform Instance."
terraform apply -auto-approve

#RUNNING INITIALIZATION SCRIPT FOR VM
echo "Running initialization script"
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"

