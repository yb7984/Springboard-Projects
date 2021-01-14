from flask import Flask, render_template, redirect, session, flash , url_for, abort , request
from functools import wraps
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db, User , Feedback
from forms import *
from sqlalchemy.exc import IntegrityError
from secrets import token_urlsafe
from mail import config_mail

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgres:///feedback"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "abc123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


connect_db(app)

mail = config_mail(app)

toolbar = DebugToolbarExtension(app)


def login_required(func):
    """
    For the route need to login
    Check if the username in session
    Redirect to login page if not login yet
    """

    @wraps(func)
    def func_wrapper(*args , **kwargs):
        if 'username' not in session:
            # flash("Please login first!", "danger")
            # return redirect('/login')

            abort(401 , 'Login only!')

        return func(*args , **kwargs)

    return func_wrapper

def yourself_only(func):
    """
    For the route need to login and only the user created can view
    Check if the username in session
    Redirect to login page if not login yet
    """
    @wraps(func)
    def func_wrapper(username , *args , **kwargs):
        if 'username' not in session:
            # flash("Please login first!", "danger")
            # return redirect('/login')

            abort(401 , 'Login only!')

        if username != login_username():
            # flash("View your own page only please!" , "danger")
            # return redirect(f'/users/{login_username()}')
            abort(401 , 'View your own page only please!')

        return func(username , *args , **kwargs)

    return func_wrapper

def login_username():
    """Return current login username"""
    return session.get('username' , None)


@app.route('/')
def home_page():
    return redirect('/register')
    # return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register_user():
    if (login_username()):
        return redirect(url_for("show_user" , username=login_username()))

    form = UserForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data 

        new_user = User.register(username, password , email , first_name , last_name)

        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username taken.  Please pick another')
            return render_template('register.html', form=form)
        session['username'] = new_user.username
        flash('Welcome! Successfully Created Your Account!', "success")
        return redirect(f'/users/{new_user.username}')

    return render_template('register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login_user():

    if (login_username()):
        return redirect(url_for("show_user" , username=login_username()))


    form = UserLoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)
        if user:
            flash(f"Welcome Back, {user.full_name}!", "primary")
            session['username'] = user.username
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ['Invalid username/password.']

    return render_template('login.html', form=form)

@app.route('/users/<string:username>')
@yourself_only
def show_user(username):
    """Show the user profile page"""

    user = User.query.get_or_404(username)

    return render_template('user.html' , user=user)


@app.route('/users/<string:username>/delete' , methods=['POST'])
@yourself_only
def delete_user(username):
    """Delete account"""

    user = User.query.get_or_404(username)

    User.query.filter_by(username = username).delete()

    db.session.commit()

    flash('Successfull delete a user!' , 'success')
    
    session.pop("username")

    return redirect(url_for("home_page"))

@app.route('/users/reset_password' , methods=['POST' , 'GET'])
def reset_password():
    """Handle the password reset"""

    token = request.args.get('token' , None)

    if token is None:
        form = ResetPasswordEmailForm()

        if form.validate_on_submit():
            email = form.email.data

            user = User.query.filter_by(email = email).first()

            if user:
                user.password_token = token_urlsafe()
                db.session.commit()

                mail.send_message(
                    subject='Feedback password reset' ,
                    sender='bobowu98@gmail.com',
                    recipients=[email] ,
                    body=f'http://127.0.0.1:5000/users/reset_password?token={user.password_token}'
                )

                flash('The reset email has been sent to you email address!' , 'success')
                return redirect(url_for('login_user'))

            flash('Email is not found!' , 'danger')

        return render_template('reset_password.html' , form=form)
    
    # Set the new password
    form = ResetPasswordForm()

    if form.validate_on_submit():
        password = form.password.data

        user = User.update_password(token=token , pwd=password)

        if user:
            session['username'] = user.username

            flash('Successfully updated password!' , 'success')
            return redirect(url_for('show_user' , username=user.username))
        
        flash('Error when updating password!' , 'danger')

    return render_template('reset_password.html' , form=form)

@app.route('/users/<string:username>/feedback/add' , methods=['POST' , 'GET']) 
@yourself_only
def add_feedback(username):
    """Adding a feedback"""

    user = User.query.get_or_404(username)
    form = FeedbackForm()

    if form.validate_on_submit():
        feedback = Feedback(username=username , title = form.title.data , content=form.content.data)

        db.session.add(feedback)
        db.session.commit()

        return redirect(url_for("show_user" , username=username))

    return render_template('feedback.html' , user=user , form=form)

@app.route('/feedback/<int:feedback_id>/update' , methods=['POST' , 'GET']) 
@login_required
def update_feedback(feedback_id):
    """Update a feedback"""

    feedback = Feedback.query.get(feedback_id)

    if feedback.username != login_username():
        # flash('Update your own feedback only, Please!' , 'danger')

        # return redirect(url_for("show_user" , username=login_username()))
        abort(401 , 'Update your own feedback only, Please!')

    form = FeedbackForm(obj=feedback)

    if form.validate_on_submit():
        form.populate_obj(feedback)

        db.session.commit()

        return redirect(url_for("show_user" , username=login_username()))

    return render_template('feedback.html' , user=feedback.user , form=form , feedback=feedback)

@app.route('/feedback/<int:feedback_id>/delete' , methods=['POST']) 
@login_required
def delete_feedback(feedback_id):
    """Delete a feedback"""

    feedback = Feedback.query.get(feedback_id)

    if feedback.username != login_username():
        # flash('Delete your own feedback only, Please!' , 'danger')

        # return redirect(url_for("show_user" , username=login_username()))

        abort(401 , 'Delete your own feedback only, Please!')

    Feedback.query.filter_by(id=feedback_id).delete()
    db.session.commit()

    flash('Delete a feedback successfully!' , 'success')
    return redirect(url_for("show_user" , username=login_username()))

@app.route('/logout')
def logout_user():
    session.pop('username')
    flash("Goodbye!", "info")
    return redirect(url_for("home_page"))


@app.errorhandler(404)
def page_not_found(e):
    # note that we set the 404 status explicitly
    return render_template('404.html'), 404
