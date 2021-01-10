"""File with a model for Pet"""

from flask_sqlalchemy import SQLAlchemy,sqlalchemy
import os

db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)


class Pet(db.Model):
    """Pet."""

    __tablename__ = "pets"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    name = db.Column(db.Text,
                     nullable=False)
    species = db.Column(db.Text, nullable=False)
    photo_url = db.Column(db.Text)
    photo_upload = db.Column(db.Text)
    age = db.Column(db.Integer)
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean , server_default=sqlalchemy.text("True"))

    def get_photo_url(self):
        """return the photo url of the pet"""
        if self.photo_url:
            return self.photo_url
        if self.photo_upload:
            return os.path.join("/static/upload/" , self.photo_upload)
        return None