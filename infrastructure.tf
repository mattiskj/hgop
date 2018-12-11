# TODO Comment 2-3 sentences.
# Here we collect the credentials from the aws file.
# we collent the access key, secret access key and session token from the user that runs the file.
variable "environment" {
  type = "string"
}
provider "aws" {
  shared_credentials_file = "~/.aws/credentials"
  region                  = "us-east-1"
}

# TODO Comment 2-3 sentences.
# Here we create the security group called GameSecurityGroup with the following settings
# This security group can be seen on the aws console app.

resource "aws_security_group" "game_security_group" {
  name = "GameSecurityGroup_${var.environment}"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# TODO Comment 2-3 sentences.
# And here we create an terraform instance on the aws console.
resource "aws_instance" "game_server" {
  ami                    = "ami-0ac019f4fcb7cb7e6"
  instance_type          = "t2.micro"
  key_name               = "GameKeyPair"
  vpc_security_group_ids = ["${aws_security_group.game_security_group.id}"]
  tags {
    Name = "GameServer_${var.environment}"
  }
  # TODO Comment 1-2 sentences.
  # The initialize_game_api_instance script will be placed in the virtual machine so it will be able to run in that machine and initialize the instance
  provisioner "file" {
    source      = "scripts/initialize_game_api_instance.sh"
    destination = "/home/ubuntu/initialize_game_api_instance.sh"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = "${file("~/.aws/GameKeyPair.pem")}"
    }
  }
  # TODO Comment 1-2 sentences.
  # The docker-compose.yml file will alse be placed on the virtual machine.
  provisioner "file" {
    source      = "docker-compose.yml"
    destination = "/home/ubuntu/docker-compose.yml"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = "${file("~/.aws/GameKeyPair.pem")}"
    }
  }
  provisioner "file" {
    source      = "scripts/docker_compose_up.sh"
    destination = "/home/ubuntu/docker_compose_up.sh"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = "${file("~/.aws/GameKeyPair.pem")}"
    }
  }
  # This is used to run commands on the instance we just created.
  # Terraform does this by SSHing into the instance and then executing the commands.
  # Since it can take time for the SSH agent on machine to start up we let Terraform
  # handle the retry logic, it will try to connect to the agent until it is available
  # that way we know the instance is available through SSH after Terraform finishes.
  
  # TODO Comment 1-2 sentences.
  # This makes the script executable.
  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/ubuntu/initialize_game_api_instance.sh",
      "chmod +x /home/ubuntu/docker_compose_up.sh"
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = "${file("~/.aws/GameKeyPair.pem")}"
    }
  }
}

# TODO Comment 1-2 sentences.
# Here we get the pupblic ip address from our instance and place them in output
output "public_ip" {
  value = "${aws_instance.game_server.public_ip}"
}