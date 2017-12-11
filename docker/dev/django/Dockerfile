FROM python:2.7
MAINTAINER Michelle Beard
ENV PYTHONUNBUFFERED 1

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y

RUN apt-get install -y apt-utils

RUN groupadd webapps
RUN useradd goodgames -G webapps
RUN mkdir -p /var/log/goodgames/ && chown -R goodgames /var/log/goodgames/ && chmod -R u+rX /var/log/goodgames/
RUN mkdir -p /var/run/goodgames/ && chown -R goodgames /var/run/goodgames/ && chmod -R u+rX /var/run/goodgames/

WORKDIR /code

ADD ./goodgames /code/goodgames
RUN pip install -r goodgames/requirements.txt

ADD ./docker /code/docker


CMD ["sh", "/code/docker/dev/django/container-start.sh"]
EXPOSE 8000
