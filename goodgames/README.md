Deploying GoodGames REST API
============================

Steps
-----

1. Seed data using Cloud SQL Proxy and PostgresSQL
2. Deploy GoodGames to the Google App Engine Flexible Environment

Seed Data using Cloud SQL Proxy and PostgresSQL
-----------------------------------------------

1. Install [Cloud SQL Proxy] to proxy your PostgreSQL database. 

1. Create [PostGreSQL] instance on Google Cloud. Your newly created database instance id will now 
   be referred to as [YOUR_INSTANCE_CONNECTION_NAME]. Make sure to also create a database, user, and password of your choosing.
   Ensure that these variables are exported or manually edited in goodgames/settings.py
   
   ```bash
   export POSTGRES_NAME=DB_NAME
   export POSTGRES_USER=DB_USER
   export POSTGRES_PASSWORD=DB_PASSWORD
   ```
   
1. Connect to Google Cloud SQL using [Cloud SQL Proxy].

    ```bash
    ./cloud_sql_proxy -instances="[YOUR_INSTANCE_CONNECTION_NAME]"=tcp:5432
    ```
1. Enable Google [Cloud Natural Language API] in the Google Developers Console.

1. Setup development environment

    ```bash
    virtualenv env
    source env/bin/activate
    pip install -r requirements.txt
    ```

1. Enable CLOUD in your environment.
    
    Ensure that you have been authenticated before running
    this command. 
    
    Default is False. None of the user reviews or critic reviews
    for games will be analyzed by [Cloud Natural Language API].
    
    ```bash
    export ENABLE_CLOUD=True
    ```
    
1. Setup Django models

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

1. Seed your database. This may take awhile if you have set the `ENABLE_CLOUD` 
   environment variable. Each request to Google Natural Language has a 40 ms delay, 
   and has a max usage [quota] of 800,000 requests per day, 1000 requests per 100 seconds. 

    ```bash
    python manage.py seed
    ```
    This command also creates a `superuser(admin)`, `host` and a `participant user` with the following credentials.

    **SUPERUSER-** username: `admin` password: `password`  
    **HOST-** username: `host` password: `password`  
    **PARTICIPANT USER-** username: `participant` password: `password`    

1. (Optional): To delete data from database:

    ```bash
    python manage.py runscript delete
    ```

Deploy GoodGames to the Google App Engine Flexible Environment
--------------------------------------------------------------
1. Copy `app.dev.yaml` to `app.yaml`
      ```javascript
      cp app.dev.yaml app.yaml
      ```

1. All instructions to deploy a Django app in the Google Flex Environment
   can be found [here](https://cloud.google.com/python/django/flexible-environment#deploy_the_app_to_the_app_engine_flexible_environment). 

1. Add your database credentials ([YOUR_INSTANCE_CONNECTION_NAME]) in `app.yaml`.

1. Update in `app.yaml` `cloud_sql_instances` variable to point to [YOUR_INSTANCE_CONNECTION_NAME]

1. Make sure `gcloud` is in your PATH

    ```bash
    source ~/Applications/google-cloud-sdk/completion.bash.inc
    source ~/Applications/google-cloud-sdk/path.bash.inc
    ```

1. When a Django app is deployed to Cloud Platform, it uses the Gunicorn server. Gunicorn doesn't serve static content, so the app uses Google Cloud Storage to serve static content.
Create a Cloud Storage bucket and make it publicly readable. Replace <your-gcs-bucket> with a bucket name of your choice. For example, you could use your project ID as a bucket name:

    ```bash
    gsutil mb -p <project-id> gs://[YOUR-GCS-BUCKET]
    gsutil defacl -p <project-id> set public-read gs://[YOUR-GCS-BUCKET]
    ```

1. Gather all the static content locally into one folder:

    ```bash
    python manage.py collectstatic
    ```
    
1. Upload the static content to CloudStorage:

    ```bash
    gsutil rsync -R static/ gs://[YOUR-GCS-BUCKET]/static
    ```
    
1. Update `app.yaml` `STATIC_URL` to [YOUR-GCS-BUCKET]/static 

1. Generate a `Django secret key` for your project and set it in `app.yaml`. 
   Here is a script to generate a secret key. Keep it hidden.
   ```python
    #https://foxrow.com/generating-django-secret-keys
    import random
    ''.join(random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)') for i in range(50))
   ```

1. Deploy

    ```bash
    gcloud app deploy --version <version_number> --project <project-id>
    ```

1. Visit [GoodGames]

    ```bash
    https://goodgames-production.appspot.com
    ```

Installation Instructions on Local Machine
------------------------------------------

Setting up GoodGames on your local machine is really easy.
Follow this guide to setup your development machine.

1. Install [python] 2.7, [git], [postgresql-official] version >= 9.4 and [virtualenv], in your computer, if you don't have it already.

1. Get the source code on your machine via git.

    ```bash
    git clone https://github.com/mooshu1x2/goodgames.git goodgames
    ```

1. Create a python virtual environment and install python dependencies.

    ```bash
    cd goodgames
    virtualenv env
    source env/bin/activate  # run this command every time before working on project
    pip install -r requirements.txt
    ```

4. Change credentials in `goodgames/settings.py`. Use your postgres username and password for fields `USER` and `PASSWORD` in `settings.py` file.

5. Create an empty postgres database and run database migration.
    ```
    sudo -i -u (username)
    createdb goodgames
    python manage.py migrate
    ```

6. Seed the database with some data to work with.

    ```
    python manage.py seed
    ```
    This command also creates a `superuser(admin)`, `host` and a `participant user` with the following credentials.

    **SUPERUSER-** username: `admin` password: `password`  
    **HOST-** username: `host` password: `password`  
    **PARTICIPANT USER-** username: `participant` password: `password`    

7. That's it. Now you can run development server at [http://127.0.0.1:8000] (for serving backend)

    ```
    python manage.py runserver
    ```
    
[GoodGames]: https://goodgames-production.appspot.com
[python]: https://www.python.org/download/releases/2.7/
[git]: https://git-scm.com/downloads
[virtualenv]: https://virtualenv.pypa.io/
[postgresql-official]: http://www.postgresql.org/download/
[http://127.0.0.1:8888]: http://127.0.0.1:8888
[http://127.0.0.1:8000]: http://127.0.0.1:8000
[Cloud SQL Proxy]: https://cloud.google.com/appengine/docs/flexible/python/using-cloud-sql-postgres#setting_up_your_local_environment
[quota]: https://cloud.google.com/natural-language/quotas
[PostGreSQL]: https://cloud.google.com/sql/docs/postgres/quickstart
[Cloud Natural Language API]: https://cloud.google.com/natural-language/