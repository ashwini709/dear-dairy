from flask import json
import datetime

from model import Entry

def create_entry(request):
  title = "\'" + request.json["title"] + "\'"
  text = "\'" + request.json["text"] + "\'"

  entry = Entry(title=title, text=text, created_at=datetime.datetime.now())
  entry.save()

  return json.dumps(entry.id)

def update_entry(entry_id, request):
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

def search_entries(request):
  title = request.args.get('title')
  query = Entry.select().where(Entry.title.contains(title))

  entries = []
  for entry in query:
      result = {
          'id': entry.id,
          'title': entry.title,
          'text': entry.text,
          'created_at': entry.created_at,
          'updated_at': entry.updated_at
      }
      entries.append(result)
  return json.dumps(entries)

def get_all_entries():
  entries = []
  for entry in Entry.select():
      result = {
          'id': entry.id,
          'title': entry.title,
          'text': entry.text,
          'created_at': entry.created_at,
          'updated_at': entry.updated_at
      }
      entries.append(result)
  return json.dumps(entries)
