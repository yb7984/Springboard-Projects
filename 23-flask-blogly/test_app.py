from unittest import TestCase
from app import app, db
from models import User, Post, Tag, PostTag, connect_db


# Use test database
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
        Post.query.delete()
        Tag.query.delete()

        user = User(first_name="AAA", last_name="BBB", image_url="sample_url")
        db.session.add(user)
        db.session.commit()

        post = Post(user_id=user.id, title="test title",
                    content="test content")
        db.session.add(post)
        db.session.commit()

        tag = Tag(name="tag test")
        db.session.add(tag)
        db.session.commit()

        post.tags.append(tag)
        db.session.add(post)
        db.session.commit()

        self.user_id = user.id
        self.post_id = post.id
        self.tag_id = tag.id

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
            self.assertIn("sample_url", html)
            self.assertIn("test title", html)

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
            res = client.post(
                f'/users/new', data={"first_name": "CCC", "last_name": "DDD", "image_url": "test_url"}, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            # self.assertIn("http://localhost/users/" , res.location)
            self.assertIn("CCC DDD", html)

    def test_user_edit(self):
        """Testing the edit user form"""
        user = User.query.first()

        with app.test_client() as client:
            res = client.get(f'/users/{user.id}/edit')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("Edit a User", html)
            self.assertIn(user.first_name, html)
            self.assertIn(user.last_name, html)

    def test_user_edit_post(self):
        """Testing the update user handling"""
        user = User.query.first()
        with app.test_client() as client:
            res = client.post(f'/users/{user.id}/edit', data={"id": user.id, "first_name": "CCC",
                                                              "last_name": "DDD", "image_url": "test_url"}, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            # self.assertIn("http://localhost/users/" , res.location)
            self.assertIn("CCC DDD", html)

    def test_user_delete(self):
        """Testing the delete user handling"""
        user = User.query.first()
        id = user.id
        with app.test_client() as client:
            res = client.post(
                f'/users/{user.id}/delete', data={}, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            # self.assertIn("http://localhost/users/" , res.location)
            self.assertNotIn(user.full_name, html)

    def test_index(self):
        """Testing the home page"""
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("Blogly Recent Posts", html)

    def test_post(self):
        """Testing the post detail page"""
        with app.test_client() as client:
            res = client.get(f'/posts/{self.post_id}')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("test title", html)

    def test_post_new(self):
        """Testing the add post form"""

        user = User.query.get(self.user_id)

        with app.test_client() as client:
            res = client.get(f'/users/{self.user_id}/posts/new')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn(f"Add Post for {user.full_name}", html)

    def test_post_new_post(self):
        """Testing the add post form handling"""
        with app.test_client() as client:
            res = client.post(f'/users/{self.user_id}/posts/new', data={
                              "title": "test title 1", "content": "test content 1"}, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            # self.assertIn("http://localhost/users/" , res.location)
            self.assertIn("test title 1", html)
            self.assertIn("test content 1", html)

    def test_post_edit(self):
        """Testing the edit post form"""
        post = Post.query.first()

        with app.test_client() as client:
            res = client.get(f'/posts/{post.id}/edit')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("Edit Post", html)
            self.assertIn(post.title, html)
            self.assertIn(post.content, html)

    def test_post_edit_post(self):
        """Testing the update post handling"""
        post = Post.query.first()
        with app.test_client() as client:
            res = client.post(f'/posts/{post.id}/edit', data={"id": post.id,
                                                              "title": "title update", "content": "content update"}, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)

            self.assertIn("title update", html)
            self.assertIn("content update", html)

    def test_post_delete(self):
        """Testing the delete user handling"""
        post = Post.query.first()
        id = post.id
        with app.test_client() as client:
            res = client.post(
                f'/posts/{post.id}/delete', data={}, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertNotIn(post.title, html)

    def test_tags(self):
        """Testing the tags page"""
        with app.test_client() as client:
            res = client.get('/tags')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("Tags", html)

    def test_tag(self):
        """Testing the tag detail page"""
        with app.test_client() as client:
            res = client.get(f'/tags/{self.tag_id}')
            html = res.get_data(as_text=True)

            tag = Tag.query.get(self.tag_id)

            self.assertEqual(res.status_code, 200)
            self.assertIn(tag.name, html)

    def test_post_new(self):
        """Testing the add tag form"""

        with app.test_client() as client:
            res = client.get(f'/tags/new')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("Create a Tag", html)

    def test_post_new_post(self):
        """Testing the add tag form handling"""
        with app.test_client() as client:
            res = client.post(f'/tags/new', data={"name": "tag test 1"}, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("tag test 1", html)

            # test the duplicate situation
            res = client.post(f'/tags/new', data={"name": "tag test"})
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn(
                "tag test already exist! Please try another one!", html)

    def test_tag_edit(self):
        """Testing the edit tag form"""
        tag = Tag.query.first()

        with app.test_client() as client:
            res = client.get(f'/tags/{tag.id}/edit')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("Edit a Tag", html)
            self.assertIn(tag.name, html)

    def test_tag_edit_post(self):
        """Testing the update tag handling"""
        tag = Tag.query.first()
        with app.test_client() as client:
            res = client.post(
                f'/tags/{tag.id}/edit', data={"id": tag.id, "name": "tag1"}, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)

            self.assertIn("tag1", html)

            tag2 = Tag(name='tag2')
            db.session.add(tag2)
            db.session.commit()

            res = client.post(f'/tags/{tag.id}/edit',
                              data={"id": tag.id, "name": "tag2"})
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("tag2 already exist! Please try another one!", html)

    def test_tag_delete(self):
        """Testing the delete user handling"""
        tag = Tag.query.first()
        id = tag.id
        with app.test_client() as client:
            res = client.post(f'/tags/{tag.id}/delete',
                              data={}, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertNotIn(tag.name, html)
