docker build -t recommendation-engine:latest .

aws ecr create-repository --repository-name recommendation-engine --image-scanning-configuration scanOnPush=true --region us-west-1

docker tag recommendation-engine 436713900294.dkr.ecr.us-west-1.amazonaws.com/recommendation-engine:latest

aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin 436713900294.dkr.ecr.us-west-1.amazonaws.com

docker push 436713900294.dkr.ecr.us-west-1.amazonaws.com/recommendation-engine:latest