from peewee import *

from werkzeug import generate_password_hash, check_password_hash

mysql_db = MySQLDatabase('dairy', host='localhost', port=3306, user='root', passwd='password')

class Entry(Model):
  id = PrimaryKeyField()
  title = CharField()
  text = CharField()
  created_at = DateTimeField()
  updated_at = DateTimeField()

  class Meta:
      database = mysql_db

class User(Model):
  id = PrimaryKeyField()
  name = CharField()
  email = CharField()
  password = CharField()
  created_at = DateTimeField()
  updated_at = DateTimeField()

  class Meta:
      database = mysql_db
