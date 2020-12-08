from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Set, User, Subject
from app.schemas import user_schema, set_schema, subject_schema, card_schema, like_schema, favorite_schema
from app.forms import SetForm
from sqlalchemy.orm import joinedload
from app.utils import dump_data_list


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


@set_routes.route('/<int:setId>')
def getOneSet(setId):

    selectedSet = Set.query.filter(Set.id == setId).options( \
        joinedload(Set.createdBy), \
        joinedload(Set.card), \
        joinedload(Set.like), \
        joinedload(Set.favorite)) \
        .one()
    # print("SELECTEDSET" , selectedSet)
    setObj = set_schema.dump(selectedSet)
    setObj["createdBy"] = user_schema.dump(selectedSet.createdBy)
    setObj["card"] = [card for card in dump_data_list(selectedSet.card, card_schema)]
    setObj["like"] = [like for like in dump_data_list(selectedSet.like, like_schema)]
    setObj["favorite"] = [favorite for favorite in dump_data_list(selectedSet.favorite, favorite_schema)]
    print("SET OBJ" , setObj)
    return jsonify(setObj)


@set_routes.route('/create', methods=["POST"])
# @login_required
def createSet():
    form = SetForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        print("FORM DATA", form.data)
        title = form.data['title']
        subject = form.data['subject']
        description = form.data['description']
        created_by = request.json['created_by']

        if subject == "" or "None":
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

        findSubject = Subject.query.filter(Subject.name == subject).one()
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


@set_routes.route('/<int:setId>/delete', methods=["DELETE"])
def deleteSet(setId):
    deleteSet = Set.query.get(setId)
    selectedSet = set_schema.dump(deleteSet)
    db.session.delete(deleteSet)
    db.session.commit()
    return jsonify(selectedSet)


@set_routes.route('/<int:setId>/edit', methods=["PATCH"])
def editSet(setId):
    form = SetForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        chosenSet = Set.query.get(setId)
        if form.data["subject"] == "":
            chosenSet.title = form.data["title"]
            chosenSet.description = form.data["description"]
            chosenSet.subject_id = None
            db.session.commit()
            setData = set_schema.dump(chosenSet)
            return jsonify(setData)
        # print("form data ---------", form.data)
        chosenSet.title = form.data["title"]
        chosenSet.description = form.data["description"]
        chosenSet.subject_id = form.data["subject"]
        db.session.commit()
        setData = set_schema.dump(chosenSet)
        setData["subject"] = subject_schema.dump(chosenSet.subject_id)
        return jsonify(setData)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
