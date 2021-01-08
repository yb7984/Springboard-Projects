"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy, sqlalchemy
import datetime


db = SQLAlchemy()


def connect_db(app):
    """Connect the database to our Flask app."""

    db.app = app
    db.init_app(app)


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

    posts = db.relationship("Post" , cascade="all, delete" , passive_deletes=True)

    @property
    def full_name(self):
        """Return the full name of the user"""
        return f"{self.first_name} {self.last_name}"

    def __repr__(self):
        e = self
        return f"<User {e.id} {e.first_name} {e.last_name}>"


class Post(db.Model):
    """Post."""

    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text)
    created_at = db.Column(db.TIMESTAMP(timezone=True),
                           nullable=False, server_default=sqlalchemy.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id' , ondelete="CASCADE"))

    user = db.relationship("User")
    
    posts_tags = db.relationship("PostTag" , backref="post" , cascade="all, delete" , passive_deletes=True)
    tags = db.relationship("Tag" , secondary="posts_tags" , backref="posts")

    def has_tag(self , tag_id):
        """Check if has the tag_id"""
        for post_tag in self.posts_tags:
            if post_tag.tag_id == tag_id:
                return True
        return False

    def __repr__(self):
        e = self
        return f"<Post {e.id} {e.title}>"


class Tag(db.Model):
    """Tag."""

    __tablename__ = "tags"

    id = db.Column(db.Integer , primary_key=True , autoincrement=True)
    name = db.Column(db.Text , nullable=False, unique=True)

    posts_tags = db.relationship("PostTag" , backref="tag" , cascade="all, delete" , passive_deletes=True)

    def __repr__(self):
        e = self
        return f"<Tag {e.id} {e.name}>"

class PostTag(db.Model):
    """Post Tags."""

    __tablename__ = "posts_tags"

    post_id = db.Column(db.Integer , db.ForeignKey('posts.id' , ondelete="CASCADE") , primary_key=True)
    tag_id = db.Column(db.Integer , db.ForeignKey("tags.id" , ondelete="CASCADE") , primary_key=True)

    def __repr__(self):
        e = self
        return f"<PostTag {e.post_id} {e.tag_id}>"