Using Docker
============

1. Install [Docker] on your machine.

1. Install [docker-compose].
   
   ```bash
   $ pip install docker-compose
   ```
   
1. Launch the database container. You will need to manually create a database, user, and password.
   ```bash
   docker exec -it <mycontainer> bash
   ```
   
1. Build and run the [Docker] containers. This might take a while. 
   You should be able to access GoodGames at localhost:8888. The backend
   is served on localhost:8000.

   ```bash
   docker-compose -f docker-compose.dev.yml up -d --build
   ```

[Docker]: http://docker.com
[docker-compose]: https://docs.docker.com/compose/install
