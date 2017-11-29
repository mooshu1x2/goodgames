GoodGames
=========
GoodGames is a social service to allow gamers to curate their list of games and 
see what their friends are playing, agnostic of console/pc platforms. 

Deployment Options
------------------
* Deploy GoodGames in Development Environment
* Deploy GoodGames to the Google App Engine Flexible Environment
* Deploy GoodGames with Docker

If you do not have a Google Cloud account and just want to simply deploy
GoodGames, use Docker.

Using Docker
------------
1. Install [Docker] on your machine.

1. Install [docker-compose].
   
   ```bash
   $ pip install docker-compose
   ```
   
1. Build and run the [Docker] containers. This might take a while. 
   You should be able to access GoodGames at localhost:8888. The backend
   is served on localhost:8000.

   ```bash
   docker-compose -f docker-compose.dev.yml up -d --build
   ```
 
## The Team

GoodGames is currently maintained by [Michelle Beard](https://www.linkedin.com/in/michelle-b-3756a815/).

[Docker]: http://docker.com
[docker-compose]: https://docs.docker.com/compose/install
[virtualenv]: https://virtualenv.pypa.io/