from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

friendships = db.Table('friendships',
  db.Column('id', db.Integer, primary_key=True),
  db.Column('friender', db.Integer, db.ForeignKey('users.id'), nullable=False),
  db.Column('friended', db.Integer, db.ForeignKey('users.id'), nullable=False),
  db.Column('pending', db.Boolean, nullable=False, default=True)
)
messages = db.Table('messages',
  db.Column('id', db.Integer, primary_key=True),
  db.Column('sender', db.Integer, db.ForeignKey('users.id'), nullable=False),
  db.Column('to', db.Integer, db.ForeignKey('users.id'), nullable=False),
  db.Column('received', db.Boolean, nullable=False, default=False),
  db.Column('message', db.Text, nullable=False),
  db.Column('created_at', db.DateTime, nullable = False, default=datetime.now())
)
recommendations = db.Table('recommendations',
  db.Column('id', db.Integer, primary_key=True),
  db.Column('sender', db.Integer, db.ForeignKey('users.id'), nullable=False),
  db.Column('to', db.Integer, db.ForeignKey('users.id'), nullable=False),
  db.Column('set_id', db.Integer, db.ForeignKey('sets.id'), nullable=False),
  db.Column('received', db.Boolean, nullable=False, default=False),
)

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(100), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  color = db.Column(db.String(7), nullable=False, default="#000")
  created_at = db.Column(db.DateTime, nullable = False, default=datetime.now())

  setss = db.relationship("Set", back_populates="createdBy")
  like = db.relationship("Like", back_populates="userId")
  favorite = db.relationship("Favorite", back_populates="userId")

  friends = db.relationship(
    'User', secondary=friendships,
    primaryjoin=(friendships.c.friender == id),
    secondaryjoin=(friendships.c.friended == id),
    backref=db.backref('friendships', lazy='dynamic'), lazy='dynamic')

  message = db.relationship(
    'User', secondary=messages,
    primaryjoin=(messages.c.sender == id),
    secondaryjoin=(messages.c.to == id),
    backref=db.backref('messages', lazy='dynamic'), lazy='dynamic')

  recommendation = db.relationship(
    'User', secondary=recommendations,
    primaryjoin=(recommendations.c.sender == id),
    secondaryjoin=(recommendations.c.to == id),
    backref=db.backref('recommendations', lazy='dynamic'), lazy='dynamic')


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "color": self.color
    }


  # __tablename__ = "friends"
  # id = db.Column(db.Integer, primary_key=True)
  # friender = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  # friended = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  # pending = db.Column(db.Boolean, nullable=False, default=True)

  # friends = db.relationship("User", )

class Set(db.Model):
  __tablename__ = "sets"
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  description = db.Column(db.String(255))
  subject_id = db.Column(db.Integer, db.ForeignKey("subjects.id"))
  created_by = db.Column(db.Integer, db.ForeignKey("users.id"))

  subjectId = db.relationship("Subject", back_populates="setss")
  createdBy = db.relationship("User", back_populates="setss")
  card = db.relationship("Card", back_populates="setId")
  like = db.relationship("Like", back_populates="setId")
  favorite = db.relationship("Favorite", back_populates="setId")

class Subject(db.Model):
  __tablename__ = "subjects"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False, unique=True)

  setss = db.relationship("Set", back_populates="subjectId")

class Card(db.Model):
  __tablename__ = "cards"
  id = db.Column(db.Integer, primary_key=True)
  question = db.Column(db.Text)
  answer = db.Column(db.Text)
  set_id = db.Column(db.Integer, db.ForeignKey("sets.id"))

  setId = db.relationship("Set", back_populates="card")

class Like(db.Model):
  __tablename__ = "likes"
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  set_id = db.Column(db.Integer, db.ForeignKey("sets.id"), nullable=False)

  userId = db.relationship("User", back_populates="like")
  setId = db.relationship("Set", back_populates="like")

class Favorite(db.Model):
  __tablename__ = "favorites"
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  set_id = db.Column(db.Integer, db.ForeignKey("sets.id"), nullable=False)

  userId = db.relationship("User", back_populates="favorite")
  setId = db.relationship("Set", back_populates="favorite")
