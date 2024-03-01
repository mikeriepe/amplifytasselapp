FROM public.ecr.aws/lambda/python:3.12

# https://stackoverflow.com/questions/77205123/how-do-i-slim-down-sberts-sentencer-transformer-library
RUN python -m pip install -U pip
RUN pip install --no-cache-dir numpy
RUN pip install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu
RUN pip install --no-cache-dir sentence_transformers

COPY Model.py ./

ENV HF_HOME="/tmp/"

CMD ["Model.recommendation_engine"]