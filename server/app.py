from flask import Flask, request, json, jsonify, session
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from peewee import *

from werkzeug import generate_password_hash, check_password_hash

from entry import create_entry, update_entry, search_entries, get_all_entries

from model import User
import datetime

app = Flask(__name__)
app.secret_key = '4V\xcc\x88\x88D\xf5\xcc}>\xb9H\x0bw\xd9\x02\n/\xa3\x9a\xa3\xe3\xcb@'

CORS(app)
jwt = JWTManager(app)

@app.route('/signup', methods=['POST'])
def signup():
  name = "\'" + request.json["name"] + "\'"
  email = "\'" + request.json["email"] + "\'"
  password = "\'" + request.json["password"] + "\'"

  pw_hash = generate_password_hash(password)

  user = User(name=name, email=email, password=pw_hash, created_at=datetime.datetime.now(), updated_at=datetime.datetime.now())
  user.save()

  return json.dumps(user.id)

@app.route('/login', methods=['POST'])
def login():
  email = "\'" + request.json["email"] + "\'"
  password = "\'" + request.json["password"] + "\'"

  user = User.get(User.email.contains(email))

  if check_password_hash(user.password, password):
    result = {
      'access_token': create_access_token(identity=user.name),
      'created_at': datetime.datetime.now(),
      'expires_in': 86400
    }
  else:
    result = {
      'error': {
        'message': 'Unauthorized Authentication',
        'statusCode': '401'
      }
    }

  return json.dumps(result)

@jwt_required
@app.route('/entry', methods=['POST'])
def create_entry_endpoint():
  return create_entry(request)


@jwt_required
@app.route('/entry/<entry_id>', methods=['GET', 'PUT'])
def update_entry_endpoint(entry_id):
  return update_entry(entry_id, request)


@jwt_required
@app.route('/', methods=['GET'])
def get_all_entries_endpoint():
  return get_all_entries()


@jwt_required
@app.route('/search', methods=['GET'])
def search_entries_endpoint():
  return search_entries(request)

if __name__ == "__main__":
  app.run()
