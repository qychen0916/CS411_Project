from flask import Flask, jsonify, request
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


###########################
# YouTube API Integration #
###########################

from googleapiclient import build

# get the song name from user playlist on front end, then hit YouTube api and display list of related video titles on the front end
@app.route('/youtubesearch', methods=['GET','POST'])
def getVideosByName():
    video_list = []
    
    youtube = build('youtube', 'v3', developer_key=api_keys.youtube_id)
      
    if request.method == 'POST':
        vid_name = request.get_json()['videoName']
        
        results = youtube.Search.list('id,snippet', q=vid_name, maxResults=1);
        videos = results['items']
        # results_uri = results['videos']['items'][0]['uri']
        #print(artist_uri)
        for i in results.videos:
            video = results.items[i];
            # Logger.log('[%s] Title: %s', video.id.videoId, video.snippet.title);
            videos.extend(results['items'])
            
        video_list = [video['name'] for video in videos]
        #print(album_list)
        
    youtube.close()
    
    return jsonify({"videos": video_list})





