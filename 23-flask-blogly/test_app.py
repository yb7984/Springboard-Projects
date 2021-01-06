from unittest import TestCase
from app import app,db
from models import User, connect_db


#Use test database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()

class FlaskTests(TestCase):
    """Test class for Blogly app"""


    def setUp(self):
        """Clean up any exists users and add a new user"""
        User.query.delete()

        user = User(first_name="AAA" , last_name="BBB" , image_url="sample_url")
        db.session.add(user)
        db.session.commit()

        self.user_id = user.id

    def tearDown(self):
        """Clean up any faulted transaction."""
        db.session.rollback()



    def test_users(self):
        """Testing the all users page"""
        with app.test_client() as client:
            res = client.get('/users')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("AAA BBB", html)

    def test_user(self):
        """Testing the user detail page"""
        with app.test_client() as client:
            res = client.get(f'/users/{self.user_id}')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("AAA BBB", html)
            self.assertIn("sample_url" , html)

    
    def test_user_new(self):
        """Testing the add user form"""
        with app.test_client() as client:
            res = client.get(f'/users/new')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("Create a User", html)
    def test_user_new_post(self):
        """Testing the add user form handling"""
        with app.test_client() as client:
            res = client.post(f'/users/new' , data={"first_name":"CCC" , "last_name":"DDD" , "image_url":"test_url"} , follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code , 200)
            # self.assertIn("http://localhost/users/" , res.location)
            self.assertIn("CCC DDD" , html)

    def test_user_edit(self):
        """Testing the edit user form"""
        user = User.query.first()

        with app.test_client() as client:
            res = client.get(f'/users/{user.id}/edit')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("Edit a User", html)
            self.assertIn(user.first_name , html)
            self.assertIn(user.last_name , html)

    def test_user_edit_post(self):
        """Testing the update user handling"""
        user = User.query.first()
        with app.test_client() as client:
            res = client.post(f'/users/{user.id}/edit' , data={"id":user.id, "first_name":"CCC" , "last_name":"DDD" , "image_url":"test_url"} , follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code , 200)
            # self.assertIn("http://localhost/users/" , res.location)
            self.assertIn("CCC DDD" , html)

    def test_user_delete(self):
        """Testing the delete user handling"""
        user = User.query.first()
        id = user.id
        with app.test_client() as client:
            res = client.post(f'/users/{user.id}/delete' , data={} , follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code , 200)
            # self.assertIn("http://localhost/users/" , res.location)
            self.assertNotIn(user.get_full_name() , html)

    

    


