import requests
from flask import Flask, jsonify, request, redirect, session
from flask_pymongo import PyMongo
from flask_cors import CORS

from bson.json_util import dumps, loads
import datetime

app = Flask(__name__)
cors = CORS(app, supports_credentials = True)

# set up mongoDB to work with flask
app.config["MONGO_URI"] = "mongodb://localhost:27017/cs411"
mongo = PyMongo(app)

#################
# DEMONSTRATION #
#################

# for demonstration purposes; returns the current date to the client as JSON
@app.route('/date', methods=["GET"])
def date():
    return jsonify({"date": str(datetime.datetime.utcnow())})

# inserts a name into the database
@app.route('/name', methods=["POST"])
def name():
    # get the data from the request
    data = request.get_json()

    # insert the data into the database under the "names" collection
    mongo.db.names.insert_one(data)

    # return success message
    return jsonify({'success': True})

# fetch names from the database
@app.route('/names', methods=["GET"])
def names():
    data = []

    # get all the names from the database
    for name in mongo.db.names.find():
        name['_id'] = str(name['_id']) # https://stackoverflow.com/a/64267192
        data.append(name)
        
    # return names from the database, here data is a list
    return jsonify({"names": data})


#################
# Deliverable 3 #
#################

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import api_keys
import startup

# get the artist name from front end, then hit Spotify api and display albums on the front end
@app.route('/albumsearch', methods=['GET','POST'])
def getalbumsbyname():
    album_list = []
    
    client_credentials_manager = SpotifyClientCredentials(client_id=api_keys.spotify_id,client_secret=api_keys.spotify_secret)
    spotify = spotipy.Spotify(client_credentials_manager = client_credentials_manager)
    
    if request.method == 'POST':
        aname = request.get_json()['artistName']
            
        artist_result = spotify.search(q='artist:' + aname, type='artist')
        artist_uri = artist_result['artists']['items'][0]['uri']
        #print(artist_uri)
        
        album_result = spotify.artist_albums(artist_uri, album_type='album')
        albums = album_result['items']
        while album_result['next']:
            album_result = spotify.next(album_result)
            albums.extend(album_result['items'])
            
        album_list = [album['name'] for album in albums]
        #print(album_list)
    
    return jsonify({"albums": album_list})

#################
# Spotify OAuth #
#################

@app.route('/login')
def login():
    response = startup.getUser()
    return jsonify({"redirect": response})

@app.route('/callback/')
def callback():
    # error case (e.g. user denied access)
    if request.args.get('error'):
        return redirect('http://localhost:3000')

    # get the authorization code and redirect to the front end
    startup.getUserToken(request.args.get('code'))
    return redirect('http://localhost:3000')

@app.route('/playlists', methods=['GET'])
def get_playlists():
    token = startup.getAccessToken() # get the access token

    # no user token, success false
    if not token:
        return jsonify({"playlists": [], "success": False})

    # get the user's playlists
    get = requests.get('https://api.spotify.com/v1/me/playlists', headers=token[1])
    return jsonify({"playlists": get.json(), "success": True})

@app.route('/playlist', methods=['GET'])
def get_playlist():
    token = startup.getAccessToken() # get the access token

    # no playlist ID or user token found; error case
    if (not request.args.get('id')) or not token:
        return jsonify({"success": False})

    # get the playlist
    get = requests.get('https://api.spotify.com/v1/playlists/' + request.args.get('id'), headers=token[1])
    return jsonify({"playlist": get.json(), "success": True})