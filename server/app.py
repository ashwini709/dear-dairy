from flask import Flask, request, json, session
from flask_cors import CORS, cross_origin
from flask_jwt import JWT, jwt_required, current_identity
from peewee import *

from werkzeug import generate_password_hash, check_password_hash

from entry import create_entry, update_entry, search_entries, get_all_entries

from model import User
import datetime

app = Flask(__name__)
CORS(app)

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
  print user.password
  print password
  print check_password_hash(user.password, password)

  if check_password_hash(user.password, password):
    jwt = JWT(app, authenticate, identity)

    print jwt

    result = {
      access_token: jwt,
      created_at: datetime.datetime.now(),
      expires_in: 86400
    }
  else:
    result = {
      'error': {
        'message': 'Unauthorized Authentication',
        'code': '400'
      }
    }

  return json.dumps(result)

@jwt.authentication_handler
def authenticate(username, password):
    user = User.query.filter(User.username == username).scalar()
    if bcrypt.check_password_hash(user.password, password):
        return user

@jwt.identity_handler
def identify(payload):
    return User.query.filter(User.id == payload['identity']).scalar()








# Json request: { title, text }, sql query to save, return { id, error }

@jwt_required()
@app.route('/entry', methods=['POST'])
def create_entry_endpoint():
  return create_entry(request)


@jwt_required()
@app.route('/entry/<entry_id>', methods=['GET', 'PUT'])
def update_entry_endpoint(entry_id):
  return update_entry(entry_id, request)


@jwt_required()
@app.route('/', methods=['GET'])
def get_all_entries_endpoint():
  return get_all_entries()


@jwt_required()
@app.route('/search', methods=['GET'])
def search_entries_endpoint():
  return search_entries(request)

if __name__ == "__main__":
  app.run()
