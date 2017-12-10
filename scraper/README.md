MetaCritic Scraper
==================

How to Run
----------

1. Install dependencies
    ```bash
    cd scraper
    virtualenv env
    source env/bin/activate
    pip install -r requirements.txt
    ```
    
1. Run scraper and collect raw game data. Note: Can skip this step
   if referencing GoodGames DB.
   For example, we will be collecting 50 games from metacritic, including critic and user reviews.
    ```bash
    python scrape.py -m 50 -r True -w 1
    ```
    For additional options/parameters,
    ```bash
    python scrape.py --help
    ```
1. Output is stored in a json file, and this file will be used to 
   seed our PostgreSQL database.
   Make sure to copy and rename it over to the goodgames/script directory.
   ```bash
    cp gamedata* ../goodgames/scripts/gamedata.json
    ```
