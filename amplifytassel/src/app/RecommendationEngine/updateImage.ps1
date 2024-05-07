# param (
#     [Parameter(Mandatory=$true)][string]$aws_account,
#     [Parameter(Mandatory=$true)][string]$image_name,
#     [Parameter(Mandatory=$true)][string]$image_folder
#  )
echo "Parameters: Deploying image $args[1] from Dockerfile in $args[2] to $args[0]."

$splitArgs = $args[0].Split(' ')

echo "docker build -t $splitArgs[1] $splitArgs[2]"

docker build -t $splitArgs[1] $splitArgs[2]

# aws ecr create-repository --repository-name recommendation-engine --image-scanning-configuration scanOnPush=true --region us-west-1

# docker tag $args[1] $args[0].dkr.ecr.us-west-1.amazonaws.com/$args[1]:latest

# aws ecr get-login-password --region us-west-1 | docker login --username AWS --password-stdin $args[0].dkr.ecr.us-west-1.amazonaws.com

# docker push $args[0].dkr.ecr.us-west-1.amazonaws.com/$args[1]:latest