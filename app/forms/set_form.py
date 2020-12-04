from wtforms import StringField, SelectField, SubmitField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired

class SetForm(FlaskForm):
    title = StringField(validators=[DataRequired()])
