# GoodGames
GoodGames is a social service to allow gamers to curate their list of games and 
see what their friends are playing, agnostic of console/pc platforms. 

## Development Notes

1. Connect to Google Cloud DB using Cloud SQL Proxy
```bash
./cloud_sql_proxy -instances="[YOUR_INSTANCE_CONNECTION_NAME]"=tcp:5432
```

1. Setup development environment
```bash
virtualenv env
source env/bin/activate
pip install -r requirements/requirements-vendor.txt -t lib/
pip install -r requirements/requirements.txt
```

1. Setup Django
```bash
python goodgames/manage.py makemigrations
python goodgames/manage.py migrate
# Populate database with 20 games and reviews
python goodgames/manage.py seed
```

1. To delete data from database
```bash
python goodgames/manage.py runscript delete
```

1. Start local webserver
```bash
python manage.py runserver
```

1. In your web browser, enter
```bash
http://localhost:8000
```

## Deploy the app to the App Engine flexible environment

1. Make sure gcloud is in your PATH
```bash
source ~/Applications/google-cloud-sdk/completion.bash.inc
source ~/Applications/google-cloud-sdk/path.bash.inc
```

1. When the app is deployed to Cloud Platform, it uses the Gunicorn server. Gunicorn doesn't serve static content, so the app uses Google Cloud Storage to serve static content.
Create a Cloud Storage bucket and make it publically readable.
Replace <your-gcs-bucket> with a bucket name of your choice. For example, you 
could use your project ID as a bucket name:

```bash
gsutil mb gs://goodgames-185922
gsutil defacl set public-read gs://goodgames-185922
```

1. Gather all the static content locally into one folder:

```bash
python manage.py collectstatic
```
1. Upload the static content to CloudStorage:

```bash
gsutil rsync -R static/ gs://goodgames-185922/static
```

1. Deploy
```bash
gcloud app deploy
```

1. Visit [GoodGames](https://goodgames-185922.appspot.com)

```bash
https://goodgames-185922.appspot.com
```
