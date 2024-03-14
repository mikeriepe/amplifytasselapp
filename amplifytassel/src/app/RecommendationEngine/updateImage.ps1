docker build -t recommendation-engine:1.4 .

# aws ecr create-repository --repository-name recommendation-engine --image-scanning-configuration scanOnPush=true --region us-west-1

docker tag recommendation-engine:1.4 $args[0].dkr.ecr.us-west-1.amazonaws.com/recommendation-engine:latest

aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin $args[0].dkr.ecr.us-west-1.amazonaws.com

docker push $args[0].dkr.ecr.us-west-1.amazonaws.com/recommendation-engine:latest