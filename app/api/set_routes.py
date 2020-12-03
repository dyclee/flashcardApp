from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Set, User
from app.schemas import user_schema, set_schema, subject_schema, card_schema, like_schema, favorite_schema

set_routes = Blueprint('sets', __name__)


@set_routes.route('/')
# @login_required
def getUserSets():
    allsets = Set.query.all()
    sets = [set_schema.dump(set) for set in allsets]

    print("SETS", sets)
    return jsonify(sets)
