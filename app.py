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

    # return names from the database
    return jsonify({"names": data})
