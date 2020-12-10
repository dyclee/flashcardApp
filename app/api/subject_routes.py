from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Set, User, Subject
from app.schemas import user_schema, set_schema, subject_schema, card_schema, like_schema, favorite_schema
from app.forms import SetForm
from sqlalchemy.orm import joinedload
from app.utils import dump_data_list
from app.forms import SubjectForm


subject_routes = Blueprint('subjects', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@subject_routes.route('/')
def getSubjects():
    subjects = Subject.query.all()
    allSubjects = dump_data_list(subjects, subject_schema)
    subjectNames = []
    for each in allSubjects:
        subjectNames.append(each["name"])
    return jsonify(subjectNames)


@subject_routes.route('/create', methods=["POST"])
def createSubject():
    form = SubjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        name = form.data['name']
        checkName = Subject.query.filter(Subject.name == name).all()
        if len(checkName) == 0:
            newSubject = Subject(
                name=name
            )
            db.session.add(newSubject)
            db.session.commit()
            subjectObj = subject_schema.dump(newSubject)
            return jsonify(subjectObj)
        return {'errors': "Subject already exists"}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
