from wtforms import StringField, SubmitField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired

class CardForm(FlaskForm):
    question = StringField(validators=[DataRequired()])
    answer = StringField(validators=[DataRequired()])
    submit = SubmitField()
