#!/bin/sh
export ENABLE_CLOUD=True
export GOOGLE_APPLICATION_CREDENTIALS=/code/docker/credentials.json

# Use your own credentials file here.
gcloud auth activate-service-account --key-file=/code/docker/credentials.json

cd /code/goodgames && \
python manage.py migrate --noinput && \
python manage.py runscript delete && \
python manage.py seed && \
python manage.py runserver 0.0.0.0:8000
