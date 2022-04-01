from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

import datetime

app = Flask(__name__)
cors = CORS(app, supports_credentials = True)

app.config["MONGO_URI"] = "mongodb://localhost:27017/cs411"
mongo = PyMongo(app)

# for demonstration purposes; returns the current date to the client
@app.route('/date')
def date():
    return jsonify({"date": str(datetime.datetime.utcnow())})