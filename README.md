# CS411

## Setting up the Front-End

1. Install Node.js and npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2. Install dependencies: `npm i`
3. Start front-end: `npm start`

## Setting up the Database

1. Install MongoDB Community Edition: https://www.mongodb.com/docs/manual/administration/install-community/
2. Follow above URL to start MongoDB on local machine

## Setting up the Back-End

1. Install Python 3.X: https://www.python.org/downloads/
2. Install dependencies: `pip3 install -r requirements.txt`
3. Enable development mode: `export FLASK_ENV=development`
4. Start Flask server: `flask run`

## For Deliverable 3
1. Get your Spotify client id and client secret from https://developer.spotify.com/dashboard/login
2. Create a blank .py file in the your local folder using the name api_keys.py
3. Write the following lines of code in your api_keys.py:
  > spotify_id = 'yourClientId'
  > spotify_secret = 'yourClientSecret'
4. Now you are ready to checkout the new search function! Start the front end and the back end, then go to the /albums page. api_keys.py is added to .gitignore so your api keys will not be pushed to git when you commit new changes.
