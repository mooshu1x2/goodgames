Deploying GoodGames REST API
============================

Installation Instructions on Local Machine
------------------------------------------

Setting up GoodGames on your local machine is really easy.
Follow this guide to setup your development machine.

1. Install [python] 2.x, [git], [postgresql] version >= 9.4 and [virtualenv], in your computer, if you don't have it already.

1. Get the source code on your machine via git.

    ```bash
    git clone https://github.com/mooshu1x2/goodgames.git goodgames
    ```

1. Create a python virtual environment and install python dependencies.

    ```bash
    cd goodgames
    virtualenv env
    source env/bin/activate  # run this command every time before working on project
    pip install -r requirements/dev.txt
    ```

4. Change credential in `settings/dev.py`. Use your postgres username and password for fields `USER` and `PASSWORD` in `dev.py` file.

5. Create an empty postgres database and run database migration.

    ```
    sudo -i -u (username)
    createdb goodgames
    python manage.py migrate --settings=settings.dev
    ```

6. Seed the database with some data to work with.

    ```
    python manage.py seed --settings=settings.dev
    ```
    This command also creates a `superuser(admin)` and a `participant user` with following credentials.

    **SUPERUSER-** username: `admin` password: `password`  
    **PARTICIPANT USER-** username: `participant` password: `password`    

7. That's it. Now you can run development server at [http://127.0.0.1:8000] (for serving backend)

    ```
    python manage.py runserver --settings=settings.dev
    ```
    
Deploy GoodGames in Development Environment with Cloud SQL
----------------------------------------------------------
1. Install Google Cloud SQL Proxy to proxy your PostgreSQL database. 

1. Connect to Google Cloud DB using [Cloud SQL Proxy].

    ```bash
    ./cloud_sql_proxy -instances="[INSTANCE_CONNECTION_NAME]"=tcp:5432
    ```

1. Setup development environment

    ```bash
    virtualenv env
    source env/bin/activate
    pip install -r requirements.txt
    ```

1. Setup Django models

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

1. Seed your database

    ```bash
    python manage.py seed
    ```
   
1. (Optional): To delete data from database

    ```bash
    python manage.py runscript delete
    ```

1. Start local webserver

    ```bash
    python manage.py runserver
    ```

1. In your web browser, enter

    ```bash
    http://localhost:8000
    ```

Deploy GoodGames to the Google App Engine Flexible Environment
--------------------------------------------------------------

1. Make sure gcloud is in your PATH

    ```bash
    source ~/Applications/google-cloud-sdk/completion.bash.inc
    source ~/Applications/google-cloud-sdk/path.bash.inc
    ```

1. When the app is deployed to Cloud Platform, it uses the Gunicorn server. Gunicorn doesn't serve static content, so the app uses Google Cloud Storage to serve static content.
Create a Cloud Storage bucket and make it publically readable. Replace <your-gcs-bucket> with a bucket name of your choice. For example, you could use your project ID as a bucket name:

    ```bash
    gsutil mb gs://[YOUR_INSTANCE_CONNECTION_NAME]
    gsutil defacl set public-read gs://[YOUR_INSTANCE_CONNECTION_NAME]
    ```

1. Gather all the static content locally into one folder:

    ```bash
    python manage.py collectstatic
    ```
    
1. Upload the static content to CloudStorage:

    ```bash
    gsutil rsync -R static/ gs://[YOUR_INSTANCE_CONNECTION_NAME]/static
    ```

1. Deploy

    ```bash
    gcloud app deploy
    ```

1. Visit [GoodGames]

    ```bash
    https://goodgames-185922.appspot.com
    ```

[GoodGames]: https://goodgames-185922.appspot.com
[python]: https://www.python.org/download/releases/2.7/
[git]: https://git-scm.com/downloads
[virtualenv]: https://virtualenv.pypa.io/
[postgresql]: http://www.postgresql.org/download/
[http://127.0.0.1:8888]: http://127.0.0.1:8888
[http://127.0.0.1:8000]: http://127.0.0.1:8000
[Cloud SQL Proxy]: https://cloud.google.com/appengine/docs/flexible/python/using-cloud-sql-postgres