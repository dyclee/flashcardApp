from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, Set, User, Subject
from app.schemas import user_schema, set_schema, subject_schema, card_schema, like_schema, favorite_schema

set_routes = Blueprint('sets', __name__)


@set_routes.route('/')
@login_required
def getAllSets():
    allsets = Set.query.all()
    sets = [set_schema.dump(set) for set in allsets]

    print("SETS", sets)
    return jsonify(sets)


@set_routes.route('/create', methods=["POST"])
# @login_required
def createSet(title, subject, description, created_by):
    checkSubject = Subject.query.filter(Subject.name == subject).one()
    print("CHECK SUBJECT", checkSubject)
    if checkSubject.name == None:
        newSubject = Subject(
            name=subject
        )
        db.session.add(newSubject)
        db.session.commit()
        # create new set with new subject
        newSet = Set(
            title=title,
            subject=newSubject,
            description=description,
            created_by=created_by
        )
        db.session.add(newSet)
        db.session.commit()
        return
