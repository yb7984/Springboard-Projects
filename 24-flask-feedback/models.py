from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()

bcrypt = Bcrypt()


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)


class Feedback(db.Model):
    """Feedback"""
    __tablename__ = 'feedbacks'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text , nullable=False)
    username = db.Column(db.String(20), db.ForeignKey('users.username', ondelete="CASCADE"))


class User(db.Model):
    """User."""
    __tablename__ = 'users'

    username = db.Column(db.String(20), nullable=False, primary_key=True,  unique=True)

    password = db.Column(db.Text, nullable=False)

    email = db.Column(db.String(50) , nullable=False , unique=True)

    first_name = db.Column(db.String(30) , nullable=False)

    last_name = db.Column(db.String(30) , nullable=False)

    password_token = db.Column(db.Text , nullable=True)

    feedbacks = db.relationship("Feedback" , cascade="all, delete" , passive_deletes=True , backref="user")

    @property
    def full_name(self):
        """Return the full name of user"""

        return f'{self.first_name} {self.last_name}'

    @classmethod
    def register(cls, username, pwd , email , first_name , last_name):
        """Register user w/hashed password & return user."""

        hashed = bcrypt.generate_password_hash(pwd)
        # turn bytestring into normal (unicode utf8) string
        hashed_utf8 = hashed.decode("utf8")

        # return instance of user w/username and hashed pwd
        return cls(username=username, password=hashed_utf8 , email=email , first_name= first_name, last_name=last_name)

    @classmethod
    def authenticate(cls, username, pwd):
        """Validate that user exists & password is correct.

        Return user if valid; else return False.
        """

        u = User.query.filter_by(username=username).first()

        if u and bcrypt.check_password_hash(u.password, pwd):
            # return user instance
            return u
        else:
            return False

    @classmethod
    def update_password(cls , token , pwd):
        """Update password by token"""

        u = User.query.filter_by(password_token=token).first()

        if u:
            u.password = bcrypt.generate_password_hash(pwd)
            u.password_token = None
            db.session.commit()

            return u

        return False
