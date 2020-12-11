from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Set, User, Subject, Card, Favorite
from app.schemas import user_schema, set_schema, subject_schema, card_schema, like_schema, favorite_schema
from app.forms import SetForm, CardForm


favorite_routes = Blueprint('favorites', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@favorite_routes.route('/create', methods=["POST"])
def createFav():
    set_id = request.json["setId"]
    user_id = request.json["userId"]
    print("SET AND USER", set_id, user_id)
    newFav = Favorite(
        set_id=set_id,
        user_id=user_id
    )
    db.session.add(newFav)
    db.session.commit()
    favInfo = favorite_schema.dump(newFav)
    # editedSet = Set.query.get(set_id)
    # print("NEW SET", set_schema.dump(editedSet))
    return jsonify(favObj=favInfo)


@favorite_routes.route('/delete', methods=["DELETE"])
def deleteFav():
    set_id = request.json["setId"]
    user_id = request.json["userId"]
    findFave = Favorite.query.filter(Favorite.set_id == set_id, Favorite.user_id == user_id).one()
    print("FOUND FAVE", findFave)
    favObj = favorite_schema.dump(findFave)
    db.session.delete(findFave)
    db.session.commit()
    return jsonify(favObj=favObj)
