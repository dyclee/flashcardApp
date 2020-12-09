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
    # sets = Set.query.all()
    allsets = Set.query.options( \
        joinedload(Set.createdBy), \
        joinedload(Set.card), \
        joinedload(Set.like), \
        joinedload(Set.favorite), \
        joinedload(Set.subjectId)) \
        .all()
    set_data = dump_data_list(allsets, set_schema)
    for i in range(len(set_data)):
        set_data[i]["cards"] = []
        set_data[i]["likes"] = []
        set_data[i]["favorites"] = []
        print(set_data[i])
        for j in range(len(set_data[i]["card"])):
            set_data[i]["cards"].append(card_schema.dump(allsets[i].card[j]))
            card = card_schema.dump(allsets[i].card[j])
            set_data[i]["cards"][j] = card
        for k in range(len(set_data[i]["like"])):
            set_data[i]["likes"].append(like_schema.dump(allsets[i].like[k]))
            like = like_schema.dump(allsets[i].like[k])
            set_data[i]["likes"][k] = like
        for m in range(len(set_data[i]["favorite"])):
            set_data[i]["favorites"].append(favorite_schema.dump(allsets[i].favorite[m]))
            favorite = favorite_schema.dump(allsets[i].favorite[m])
            set_data[i]["favorites"][m] = favorite
        set_data[i]["subject"] = subject_schema.dump(allsets[i].subjectId)

    sets = {}
    cards = {}
    likes = {}
    favorites = {}
    print("SET DATA", set_data)
    for each in set_data:
        cards.update({card["id"]:card for card in each["cards"]})
        # each["cards"] = [card["id"] for card in each["cards"]]
        sets.update({each["id"]: each})

        likes.update({like["id"]:like for like in each["likes"]})
        # each["likes"] = [like["id"] for like in each["likes"]]

        favorites.update({favorite["id"]:favorite for favorite in each["favorites"]})
        # each["favorites"] = [favorite["id"] for favorite in each["favorites"]]

    print("SETS", sets)
    print("CARDS", cards)
    print("LIKES", likes)
    print("FAVORITES", favorites)

    return jsonify(
        sets=sets,
        cards=cards,
        likes=likes,
        favorites=favorites
    )


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
        # print("FORM DATA", form.data)
        title = form.data['title']
        subject = form.data['subject']
        description = form.data['description']
        created_by = request.json['created_by']
        # print("SUBJECT", subject)
        if subject == "" or subject == "None":
            # print("CHECK")
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
        # print("FIND SUBJECT", findSubject)
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
        # print("CHOSEN SET", chosenSet)
        # print("FORM DATA", form.data)
        # print(set_schema.dump(chosenSet))
        if form.data["subject"] == "" or form.data["subject"] == "None":
            chosenSet.title = form.data["title"]
            chosenSet.description = form.data["description"]
            del chosenSet.subjectId
            db.session.add(chosenSet)
            db.session.commit()
            setData = set_schema.dump(chosenSet)
            return jsonify(setData)
        # print("form data ---------", form.data)
        chosenSet.title = form.data["title"]
        chosenSet.description = form.data["description"]
        findSubject = Subject.query.filter(Subject.name == form.data["subject"]).one()
        foundSubject = subject_schema.dump(findSubject)
        # print("FOUND SUBJECT", foundSubject)
        chosenSet.subject_id = foundSubject["id"]
        db.session.add(chosenSet)
        db.session.commit()
        setData = set_schema.dump(chosenSet)
        setData["subject"] = subject_schema.dump(chosenSet.subject_id)
        return jsonify(setData)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
