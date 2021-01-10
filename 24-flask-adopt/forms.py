"""Forms for adopt app."""

from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, SelectField, BooleanField, FileField, HiddenField , validators
from wtforms.validators import InputRequired, Optional, URL, NumberRange, ValidationError

# class PhotoValidator(object):
#     """Validator for only photo_url or photo_upload can't be filled"""

#     def __init__(self, second_field , message=None):
#         self.second_field = second_field
#         if not message:
#             message = "Can only enter Photo Url or Photo Upload, Can't be both!"
#         self.message = message

#     def __call__(self, form, field):
#         l1 = len(field.data)
#         l2 = len(self.second_field.data)
#         if l1 > 0 and l2 > 0:
#             raise ValidationError(self.message)


class PetForm(FlaskForm):
    """Form for adding pet."""

    name = StringField("Name",
                       validators=[InputRequired("Name is required.")])
    species = SelectField("Species",
                          choices=[
                              ("cat", "Cat"),
                              ("dog", "Dog"),
                              ("porcupÎine", "Porcupine")
                          ])
    photo_url = StringField("Photo Url",
                            validators=[
                                URL(message="Must be a photo url."),
                                Optional()])
    photo_upload = FileField("Photo Upload", validators=[Optional()])

    age = IntegerField("Age",
                       validators=[NumberRange(min=0, max=30, message="Age must be between 0 and 30."), Optional()])

    notes = TextAreaField("Notes", validators=[Optional()])
    available = BooleanField("Available", default="checked")

    def validate_photo_url(form, field):
        """Validate the photo url and photo upload, only one of them can have data"""
        if len(field.data) > 0 and form.photo_upload.data:
            raise ValidationError(
                "You can only either enter the URL or upload the photo. Thank you!")


class PetEditForm(FlaskForm):
    """Pet form for edit"""

    photo_url = StringField("Photo Url",
                            validators=[URL(message="Must be a photo url."), Optional()])
    photo_upload = HiddenField()
    photo_upload_update = FileField("Photo Upload", validators=[Optional()])

    notes = TextAreaField("Notes", validators=[Optional()])
    available = BooleanField("Available", default="checked")

    def validate_photo_url(form, field):
        """Validate the photo url and photo upload, only one of them can have data"""
        if len(field.data) > 0 and form.photo_upload_update.data:
            raise ValidationError(
                "You can only either enter the URL or upload the photo. Thank you!")

