#!/bin/bash

echo "Parameters: Deploying image $2 from Dockerfile in $3 to $1."

echo "docker build -t $2 $3"

docker build -t $2 $3

# aws ecr create-repository --repository-name reverse-recommendation-engine --image-scanning-configuration scanOnPush=true --region us-west-1

docker tag $2 $1.dkr.ecr.us-west-1.amazonaws.com/:latest

aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin $1.dkr.ecr.us-west-1.amazonaws.com

docker push $1.dkr.ecr.us-west-1.amazonaws.com/$2:latest