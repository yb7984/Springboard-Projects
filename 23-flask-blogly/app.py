"""Blogly application."""

from flask import Flask,request,session,render_template,redirect,flash,jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db,User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True


connect_db(app)
# db.create_all()

app.config["SECRET_KEY"] = "so-so"
debug = DebugToolbarExtension(app)

@app.route("/")
def show_index():
    """Show the main page"""

    return redirect("/users")

@app.route("/users")
def show_users():
    """Show all users"""

    users = User.query.all()

    return render_template("users.html" , users=users)

@app.route("/users/new")
def show_user_new():
    """Show the new user form"""
    return render_template("user_new.html")

@app.route("/users/new" , methods = ["POST"])
def handle_user_new():
    """Handle the add user post action"""
    first_name = request.form.get("first_name")
    last_name = request.form.get("last_name")
    image_url = request.form.get("image_url")

    if first_name is None or last_name is None:
        message = "First Name and Last Name are required!"
        return render_template("user_new.html" , first_name=first_name , last_name=last_name , image_url=image_url , message=message)
    
    user = User(first_name=first_name , last_name=last_name , image_url = image_url)
    db.session.add(user)
    db.session.commit()

    return redirect(f"/users/{user.id}")

@app.route("/users/<int:id>")
def show_user(id):
    """Show user detail page"""

    user = User.query.get_or_404(id)

    return render_template("user.html" , user=user)

@app.route("/users/<int:id>/edit")
def show_user_edit(id):
    """Show user edit form"""

    user = User.query.get_or_404(id)

    return render_template("user_edit.html" , user=user)

@app.route("/users/<int:id>/edit" , methods=["POST"])
def handle_user_edit(id):
    """Handle user edit action"""
    
    first_name = request.form.get("first_name")
    last_name = request.form.get("last_name")
    image_url = request.form.get("image_url")

    user = User.query.get_or_404(id)

    user.first_name = first_name
    user.last_name = last_name
    user.image_url = image_url

    if first_name is None or last_name is None:
        message = "First Name and Last Name are required!"
        return render_template("user_edit.html" , user=user , message=message)
    
    
    db.session.add(user)
    db.session.commit()

    return redirect(f"/users/{user.id}")


@app.route("/users/<int:id>/delete" , methods=["POST"])
def handle_user_delete(id):
    """Handle the user delete action"""

    User.query.filter_by(id=id).delete()

    db.session.commit()
    
    flash("Successfully delete a user!")

    return redirect("/users")








