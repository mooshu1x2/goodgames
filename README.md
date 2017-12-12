GoodGames
=========
GoodGames is a social service to allow gamers to curate their list of games and 
see what their friends are playing, agnostic of console/pc platforms. 

How to Start
------------
1. [Main site](https://goodgames-production.firebaseapp.com) and [REST Client](https://goodgames-production.appspot.com/docs/)
1. Scraper
1. GoodGames
1. Frontend

Deployment Options
------------------
* Deploy GoodGames in Development Environment
* Deploy GoodGames to the Google App Engine Flexible Environment
* Deploy GoodGames with Docker

If you do not have a Google Cloud account and just want to simply deploy
GoodGames, use Docker.

Current Features
----------------
* Modified web scraper to mine [Metacritic] and [VGChartz] for video game data
  and its associated sales content.
* Automated the process to seed the database with collected data from the scraper tool.
* Django (1.11.7 ) backend REST API to serve games and friends information.
  * Integrated with Google Natural Language API to analyze sentiment from collected user and critic reviews.
* Angular2 (v.5) frontend application integrated with Materialize CSS Framework. 
* Google authentication

Missing Features
----------------
* Facebook authentication.
* Ability to remove games from inventory.
* Display friends and what they are playing and reviewing.

Potential Improvements
----------------------
* Cache results from Google Natural Language API and attach a session timeout so 
  to not exhaust request tokens.
* Utilize message queue or Pub/Sub service to schedule analysis tasks.
* Completely fix up the frontend interface. Materialze CSS does not play well with Angular2. 
* Rewrite DRF serializers to simplify parsing.
* Reorganize frontend to modularize certain pages (gameresults page and search page are nearly identical, but exist as two separate components).
* Learn more about how to integrate OAuth2 with Django backend. All authenticaton was performed in frontend.  
* Setup pagination on the search results, dashboard, and comments page.

Bugs
----
* Bug when logging out. Page does not update; need manual refresh to update data bindings.
* Sticky footer does not stick.
* Dropdown select menus are cutoff in mobile view.
* Search icon overlaps textbox.

The Team
--------
GoodGames is currently maintained by [Michelle Beard].

[VGChartz]: http://www.vgchartz.com/
[Metacritic]: www.metacritic.com
[Michelle Beard]: https://www.linkedin.com/in/michelle-b-3756a815/