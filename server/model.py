from peewee import *

mysql_db = MySQLDatabase('dairy', host='localhost', port=3306, user='root', passwd='password')

mysql_db.connect()

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
