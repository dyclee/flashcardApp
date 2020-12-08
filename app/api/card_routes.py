from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Set, User, Subject, Card
from app.schemas import user_schema, set_schema, subject_schema, card_schema, like_schema, favorite_schema
from app.forms import SetForm, CardForm


card_routes = Blueprint('cards', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@card_routes.route('/create', methods=["POST"])
def createCard():
    print("REQUEST", request.json)
    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("FORM DATA", form.data)
    if form.validate():
        question = form.data["question"]
        answer = form.data["answer"]
        set_id = request.json["setId"]
        print("question", question)
        newCard = Card(
            question=question,
            answer=answer,
            set_id=set_id
        )
        db.session.add(newCard)
        db.session.commit()
        cardObj = card_schema.dump(newCard)
        return jsonify(cardObj)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@card_routes.route('/<int:cardId>/delete', methods=["DELETE"])
# @login_required
def deleteCard(cardId):
    card = Card.query.get(cardId)
    deletedCard = card_schema.dump(card)
    db.session.delete(card)
    db.session.commit()
    return jsonify(deletedCard)
