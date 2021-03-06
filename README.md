GoodGames
=========
GoodGames is a social service to allow gamers to curate their list of games and 
see what their friends are playing, agnostic of console/pc platforms. 

How to Start
------------
1. [Frontend](https://goodgames-production.firebaseapp.com) and [GoodGames](https://goodgames-production.appspot.com/docs/)
1. Scraper
1. GoodGames
1. Frontend

Assumptions
-----------
* Already have a Google Developers account created.
* Already have the latest Cloud Tools (v. 182.0.0) installed.
* Running either Linux or Mac. Deployment steps have not been tests on Windows.
* Already created a project in the Google Developers Console.
* Have `python 2.7` and `virtualenv` installed on your machine. 

Deployment Options
------------------
* Deploy GoodGames in Local Development Environment
* Deploy GoodGames to the Google App Engine Flexible Environment
* Deploy GoodGames with Docker

Current Features
----------------
* Modified web scraper to mine [Metacritic] and [VGChartz] for video game data
  and its associated sales content.
* Automated the process to seed the database with collected data from the scraper tool.
* Django (1.11.7 ) backend REST API to serve games and friends information.
  * Integrated with Google Natural Language API to analyze sentiment from collected user and critic reviews.
* Angular2 (v.5) frontend application integrated with Materialize CSS Framework. 
* Google authentication
* Basic search and filtering

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
* CORS is still an issue, but for now I've disabled CORS checking. 

Bugs
----
* Bug when logging out. Page does not update; need manual refresh to update data bindings.
* Sticky footer does not stick.
* Dropdown select menus are cutoff in mobile view.
* Search icon overlaps textbox.
* Angular AOT bug for google-signin component.

The Team
--------
GoodGames is currently maintained by [Michelle Beard].

[VGChartz]: http://www.vgchartz.com/
[Metacritic]: www.metacritic.com
[Michelle Beard]: https://www.linkedin.com/in/michelle-b-3756a815/