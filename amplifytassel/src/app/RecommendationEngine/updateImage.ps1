docker build -t $args[1]:latest .

# aws ecr create-repository --repository-name recommendation-engine --image-scanning-configuration scanOnPush=true --region us-west-1

docker tag $args[1]:latest $args[0].dkr.ecr.us-west-1.amazonaws.com/$args[1]:latest

aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin $args[0].dkr.ecr.us-west-1.amazonaws.com

docker push $args[0].dkr.ecr.us-west-1.amazonaws.com/$args[1]:latest