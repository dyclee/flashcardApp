from wtforms import StringField, SubmitField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired

class SetForm(FlaskForm):
    title = StringField(validators=[DataRequired()])
    description = StringField()
    subject = StringField()
    submit = SubmitField()
