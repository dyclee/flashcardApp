from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow_sqlalchemy.fields import Nested
from app.models import User, Set, Subject, Card, Like, Favorite, friendships, messages, recommendations


class FavoriteSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Favorite
        include_relationships = True
        load_instance = True
favorite_schema = FavoriteSchema()

class LikeSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Like
        include_relationships = True
        load_instance = True
like_schema = LikeSchema()

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_relationships = True
        load_instance = True
user_schema = UserSchema()

class SetSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Set
        include_relationships = True
        load_instance = True
set_schema = SetSchema()

class SubjectSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Subject
        include_relationships = True
        load_instance = True
subject_schema = SubjectSchema()

class CardSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Card
        include_relationships = True
        load_instance = True
card_schema = CardSchema()
