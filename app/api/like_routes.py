from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Set, User, Subject, Card, Favorite, Like
from app.schemas import user_schema, set_schema, subject_schema, card_schema, like_schema, favorite_schema
from app.forms import SetForm, CardForm


like_routes = Blueprint('likes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@like_routes.route('/create', methods=["POST"])
def createLike():
    set_id = request.json["setId"]
    user_id = request.json["userId"]
    print("SET AND USER", set_id, user_id)
    newLike = Like(
        set_id=set_id,
        user_id=user_id
    )
    db.session.add(newLike)
    db.session.commit()
    likeInfo = like_schema.dump(newLike)
    return jsonify(likeObj=likeInfo)


@like_routes.route('/delete', methods=["DELETE"])
def deleteLike():
    set_id = request.json["setId"]
    user_id = request.json["userId"]
    findLike = Like.query.filter(Like.set_id == set_id, Like.user_id == user_id).one()
    print("FOUND LIKE", findLike)
    likeObj = like_schema.dump(findLike)
    db.session.delete(findLike)
    db.session.commit()
    return jsonify(likeObj=likeObj)
