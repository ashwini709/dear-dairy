from flask import Flask, request, json
from flask_cors import CORS, cross_origin
from peewee import *
import datetime

app = Flask(__name__)
CORS(app)

mysql_db = MySQLDatabase('dairy', host='localhost', port=3306, user='root', passwd='password')

class Entry(Model):
    id = PrimaryKeyField()
    title = CharField()
    text = CharField()
    created_at = DateTimeField()
    updated_at = DateTimeField()
    class Meta:
        database = mysql_db

# Json request: { title, text }, sql query to save, return { id, error }

@app.route('/entry', methods=['POST'])
def create_entry():
    title = "\'" + request.json["title"] + "\'"
    text = "\'" + request.json["text"] + "\'"

    entry = Entry(title=title, text=text, created_at=datetime.datetime.now())
    entry.save()

    return json.dumps(entry.id)

@app.route('/entry/<entry_id>', methods=['GET', 'PUT'])
def update_entry(entry_id):
    entry = Entry.get(Entry.id==entry_id)

    if request.method == 'PUT':
        entry.title = "\'" + request.json["title"] + "\'"
        entry.text = "\'" + request.json["text"] + "\'"
        entry.updated_at=datetime.datetime.now()
        entry.save()

    result = {
        'id': entry.id,
        'title': entry.title,
        'text': entry.text,
        'created_at': entry.created_at,
        'updated_at': entry.updated_at
    }
    return json.dumps(result)

@app.route('/', methods=['GET'])
def get_all_entries():
    listy = []
    for entry in Entry.select():
        result = {
            'id': entry.id,
            'title': entry.title,
            'text': entry.text,
            'created_at': entry.created_at,
            'updated_at': entry.updated_at
        }
        listy.append(result)
    return json.dumps(listy)

@app.route('/search', methods=['GET'])
def search_entries():
    title = request.args.get('title')
    query = Entry.select().where(Entry.title.contains(title))

    listy = []
    for entry in query:
        result = {
            'id': entry.id,
            'title': entry.title,
            'text': entry.text,
            'created_at': entry.created_at,
            'updated_at': entry.updated_at
        }
        listy.append(result)
    return json.dumps(listy)

if __name__ == "__main__":
    app.run()
