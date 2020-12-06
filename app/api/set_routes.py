from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Set, User, Subject
from app.schemas import user_schema, set_schema, subject_schema, card_schema, like_schema, favorite_schema
from app.forms import SetForm


set_routes = Blueprint('sets', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@set_routes.route('/')
# @login_required
def getAllSets():
    allsets = Set.query.all()
    sets = [set_schema.dump(set) for set in allsets]

    print("SETS", sets)
    return jsonify(sets)


@set_routes.route('/create', methods=["POST"])
# @login_required
def createSet():
    form = SetForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        # print("FORM DATA", form.data)
        title = form.data['title']
        subject = form.data['subject']
        description = form.data['description']
        created_by = request.json['created_by']

        if subject == "":
            newSet = Set(
                title=title,
                description=description,
                created_by=created_by
            )
            db.session.add(newSet)
            db.session.commit()
            newSet = Set.query.get(newSet.id)
            createdSet = set_schema.dump(newSet)
            return jsonify(createdSet)

        checkSubject = Subject.query.filter(Subject.name == subject).all()
        # print("CHECK SUBJECT", checkSubject)
        if len(checkSubject) == 0:
            newSubject = Subject(
                name=subject
            )
            db.session.add(newSubject)
            db.session.commit()
            # create new set with new subject
            findSubject = Subject.query.filter(Subject.name == newSubject.name).one()
            print("FIND SUBJECT", findSubject)
            foundSubject = subject_schema.dump(findSubject)
            subject_id = foundSubject["id"]
            newSet = Set(
                title=title,
                subject_id=subject_id,
                description=description,
                created_by=created_by
            )
            db.session.add(newSet)
            db.session.commit()
            newSet = Set.query.get(newSet.id)
            createdSet = set_schema.dump(newSet)
            return jsonify(createdSet)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@set_routes.route('/delete/<int:setId>', methods=["DELETE"])
def deleteSet(setId):
    deleteSet = Set.query.get(setId)
    db.session.delete(deleteSet)
    db.session.commit()
    return "Removed set"
