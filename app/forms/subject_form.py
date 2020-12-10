from wtforms import StringField, SubmitField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired

class SubjectForm(FlaskForm):
    name = StringField(validators=[DataRequired()])
    submit = SubmitField()
