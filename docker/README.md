Using Docker
============

1. Install [Docker] on your machine.

1. Install [docker-compose].
   
   ```bash
   $ pip install docker-compose
   ```
   
1. Register your GoogleCloud Account and make sure to update the `ENABLE_CLOUD`
   environment variable in `docker/dev/django/container-start.sh`.
   
   Export your credentials file (named credentials.json) and place it in the
   docker/ directory.
   
1. Build and run the [Docker] containers. This might take a while. 
   You should be able to access GoodGames at localhost:4200. The backend
   is served on localhost:8000.

   ```bash
   docker-compose -f docker-compose.dev.yml up -d --build
   ```

[Docker]: http://docker.com
[docker-compose]: https://docs.docker.com/compose/install
