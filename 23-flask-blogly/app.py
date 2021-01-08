"""Blogly application."""

from flask import Flask,request,session,render_template,redirect,flash,jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db,User,Post,Tag,PostTag

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

    q = db.session.query(Post)
    q.limit(10)
    q.order_by("created_at DESC")

    posts = q.all()
    return render_template("index.html" , posts=posts)

@app.route("/users")
def show_users():
    """Show all users"""
    q  = User.query
    q.order_by("last_name" , "first_name")

    users = q.all()

    return render_template("users.html" , users=users)

@app.route("/users/new")
def show_user_new():
    """Show the new user form"""
    return render_template("user_new.html")

@app.route("/users/new" , methods = ["POST"])
def handle_user_new():
    """Handle the add user post action"""
    first_name = request.form.get("first_name" , "").strip()
    last_name = request.form.get("last_name" , "").strip()
    image_url = request.form.get("image_url")

    if len(first_name) == 0 or len(last_name) == 0:
        message = "First Name and Last Name are required!"
        return render_template("user_new.html" , first_name=first_name , last_name=last_name , image_url=image_url , message=message)
    
    try:
        user = User(first_name=first_name , last_name=last_name , image_url = image_url)
        db.session.add(user)
        db.session.commit()

        return redirect(f"/users/{user.id}")
    except:
        db.session.rollback()
        message = "Erro when adding a user!"
        return render_template("user_new.html" , first_name=first_name , last_name=last_name , image_url=image_url , message=message)
    

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

    first_name = request.form.get("first_name" , "").strip()
    last_name = request.form.get("last_name" , "").strip()
    image_url = request.form.get("image_url")

    user = User.query.get_or_404(id)

    user.first_name = first_name
    user.last_name = last_name
    user.image_url = image_url

    if len(first_name) == 0 or len(last_name) == 0:
        message = "First Name and Last Name are required!"
        return render_template("user_edit.html" , user=user , message=message)
    
    try:
        db.session.add(user)
        db.session.commit()
        return redirect(f"/users/{user.id}")
    except:
        db.session.rollback()
        message = "Error when updating a user!"
        return render_template("user_edit.html" , user=user , message=message)



@app.route("/users/<int:id>/delete" , methods=["POST"])
def handle_user_delete(id):
    """Handle the user delete action"""

    try:
        User.query.filter_by(id=id).delete()

        db.session.commit()
        
        flash("Successfully delete a user!")

        return redirect("/users")
    except:
        db.session.rollback()
        flash("Error when deleting a user!")

        return redirect(f"/users/{id}")


@app.route("/users/<int:id>/posts/new")
def show_new_post_form(id):
    """Show the add new post form"""
    user = User.query.get_or_404(id)
    tags = Tag.query.all()

    return render_template("post_new.html" , user=user , tags=tags)

@app.route("/users/<int:id>/posts/new" , methods=["POST"])
def handle_new_post_form(id):
    """Handle the new post action"""
    user = User.query.get_or_404(id)
    title = request.form.get("title" , "").strip()
    content = request.form.get("content" , "")
    tags = request.form.getlist("tags")

    if len(title) == 0:
        message = "Title is required"
        return render_template("post_new.html" , user=user , title=title , content=content , message=message)
    
    try:
        post = Post(user_id = user.id , title=title , content=content)

        db.session.add(post)
        db.session.commit()

        if tags:
            for tag_id in tags:
                tag = Tag.query.get(int(tag_id))    
                post.tags.append(tag)
            
            db.session.add(post)
            db.session.commit()

        return redirect(f"/posts/{post.id}")
    except:
        db.session.rollback()
        message = "Error when adding a post!"
        return render_template("post_new.html" , user=user , title=title , content=content , message=message)
    
    


@app.route("/posts/<int:id>")
def show_post(id):
    """Show post page"""

    post = Post.query.get_or_404(id)

    return render_template("post.html" , post=post)

@app.route("/posts/<int:id>/edit")
def show_edit_post_form(id):
    """Show the edit edit post form"""
    post = Post.query.get_or_404(id)
    tags = Tag.query.all()

    return render_template("post_edit.html" , post=post , tags=tags)

@app.route("/posts/<int:id>/edit" , methods=["POST"])
def handle_edit_post_form(id):
    """Handle the edit post action"""
    post = Post.query.get_or_404(id)
    post.title = request.form.get("title" , "").strip()
    post.content = request.form.get("content" , "")
    tags = request.form.getlist("tags")

    if len(post.title) == 0:
        message = "Title is required"
        return render_template("post_edit.html" , post=post , message=message)

    post.tags.clear() 
    for tag_id in tags:
        tag = Tag.query.get(int(tag_id))    
        post.tags.append(tag)

    try:
        db.session.add(post)
        db.session.commit()
    except:
        db.session.rollback()
        message = "Error when updating a post!"
        return render_template("post_edit.html" , post=post , message=message)


    return redirect(f"/posts/{post.id}")


@app.route("/posts/<int:id>/delete" , methods=["POST"])
def handle_delete_post(id):
    """Handle the delete post action"""

    post = Post.query.get_or_404(id)
    user_id = post.user_id

    try:
        Post.query.filter_by(id=id).delete()

        db.session.commit()
        
        flash("Successfully delete a post!")

        return redirect(f"/users/{user_id}")
    except:
        db.session.rollback()

        flash("Error when deleting a post!")

        return redirect(f"/posts/{id}")
    



@app.route("/tags")
def show_tags():
    """Show all tags"""

    tags = Tag.query.all()

    return render_template("tags.html" , tags=tags)


@app.route("/tags/new")
def show_tag_new():
    """Show the new tag form"""
    return render_template("tag_new.html")

@app.route("/tags/new" , methods = ["POST"])
def handle_tag_new():
    """Handle the add tag post action"""
    name = request.form.get("name" , "").strip()

    if len(name) == 0:
        message = "Name is required!"
        return render_template("tag_new.html" , name=name , message=message)
    elif Tag.query.filter_by(name=name).count() > 0:
        message = f"{name} already exist! Please try another one!"
        return render_template("tag_new.html" , name=name , message=message)
    try:
        tag = Tag(name=name)
        db.session.add(tag)
        db.session.commit()
    except:
        db.session.rollback()
        message = "Error when adding a tag!"
        return render_template("tag_new.html" , name=name , message=message)


    return redirect(f"/tags/{tag.id}")

@app.route("/tags/<int:id>")
def show_tag(id):
    """Show tag detail page"""

    tag = Tag.query.get_or_404(id)

    return render_template("tag.html" , tag=tag)


@app.route("/tags/<int:id>/edit")
def show_edit_tag_form(id):
    """Show the edit edit tag form"""
    tag = Tag.query.get_or_404(id)
    return render_template("tag_edit.html" , tag=tag)

@app.route("/tags/<int:id>/edit" , methods=["POST"])
def handle_edit_tag_form(id):
    """Handle the edit tag action"""
    tag = Tag.query.get_or_404(id)
    name = request.form.get("name" , "").strip()

    if len(name) == 0:
        message = "Name is required!"
        return render_template("tag_edit.html" , tag=tag , message=message)
    elif Tag.query.filter(Tag.name==name , Tag.id != tag.id).count() > 0:
        message = f"{name} already exist! Please try another one!"
        return render_template("tag_edit.html" , tag=tag , message=message)

    try:
        tag.name = name
        db.session.add(tag)
        db.session.commit()

        return redirect(f"/tags/{tag.id}")
    except:
        db.session.rollback()
        message = "Error when updating tag!"
        return render_template("tag_edit.html" , tag=tag , message=message)
        

@app.route("/tags/<int:id>/delete" , methods=["POST"])
def handle_delete_tag(id):
    """Handle the delete tag action"""

    tag = Tag.query.get_or_404(id)

    try:
        Tag.query.filter_by(id=id).delete()
        db.session.commit()

        flash("Successfully delete a tag!")

        return redirect(f"/tags")
    except:
        db.session.rollback()
        flash("Error when deleting tag!")
        return redirect(f"/tags/{id}")


@app.errorhandler(404)
def page_not_found(e):
    # note that we set the 404 status explicitly
    return render_template('404.html'), 404







