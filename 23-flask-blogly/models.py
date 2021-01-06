"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


##############################################################################
# Model definitions


class User(db.Model):
    """User."""

    __tablename__ = "users"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text)

    def get_full_name(self):
        """Return the full name of the user"""
        return f"{self.first_name} {self.last_name}"

    def __repr__(self):
        e = self
        return f"<User {e.id} {e.first_name} {e.last_name}>"




def connect_db(app):
    """Connect the database to our Flask app."""

    db.app = app
    db.init_app(app)