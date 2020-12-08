from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Set
from app.utils import dump_data_list
from app.schemas import set_schema

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/sets')
def userSets(id):
    userSets = Set.query.filter(Set.created_by == id).all()
    setObjs = dump_data_list(userSets, set_schema)
    return jsonify(setObjs)
