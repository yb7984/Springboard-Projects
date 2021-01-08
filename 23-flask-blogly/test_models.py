from unittest import TestCase
from app import app,db
from models import User,Post,Tag,PostTag, connect_db

#Use test database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()

class UserModelTest(TestCase):
    """Test class for Data Model"""

    def setUp(self):
        """Clean up any exists users."""
        User.query.delete()

    def tearDown(self):
        """Clean up any faulted transaction."""
        db.session.rollback()

    def test_full_name(self):
        """Testing the get_full_name method"""
        user = User(first_name="A" , last_name="B" , image_url="url")

        self.assertEqual(user.full_name , "A B")


class PostModelTest(TestCase):
    """Test class for Data Model"""

    def setUp(self):
        """Clean up any exists users."""
        Post.query.delete()


        user = User(first_name="f1" ,last_name="f2")
        db.session.add(user)
        db.session.commit()

        post = Post(title = "A" , content="B"  , user_id=user.id)
        tag = Tag(name="tag name")
        db.session.add(post)
        db.session.add(tag)
        db.session.commit()

        post.tags.append(tag)
        db.session.commit()

        self.user_id = user.id
        self.post_id = post.id
        self.tag_id = tag.id

    def tearDown(self):
        """Clean up any faulted transaction."""
        db.session.rollback()

    def test_has_tag(self):
        """Testing the has_tag method"""

        post  = Post.query.get(self.post_id)
        self.assertEqual(post.has_tag(self.tag_id) , True)
        self.assertEqual(post.has_tag(self.tag_id + 1), False)


