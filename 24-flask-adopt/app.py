from flask import Flask, render_template, flash, redirect, render_template,request
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from werkzeug.utils import secure_filename
import os

from forms import PetForm, PetEditForm

app = Flask(__name__)
app.config["SECRET_KEY"] = "oh-so-secret"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgres:///adopt"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# debug = DebugToolbarExtension(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__) , "static/upload/")
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

connect_db(app)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def homepage():
    """Show homepage links."""
    pets_available = Pet.query.filter(Pet.available == True).all()
    pets_unavailable = Pet.query.filter(Pet.available == False).all()

    return render_template("index.html", pets_available=pets_available, pets_unavailable=pets_unavailable)


@app.route("/add", methods=["GET", "POST"])
def add_pet():
    """handle add a pet form."""
    form = PetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        notes = form.notes.data
        age = form.age.data
        available = form.available.data

        photo_upload = upload_file(form.photo_upload.name)

        pet = Pet(
            name=name, 
            species=species, 
            photo_url=photo_url, 
            photo_upload=photo_upload,
            notes=notes, 
            age=age, 
            available=available)

        db.session.add(pet)
        db.session.commit()

        flash(f"{name} is added!")
        return redirect(f"/{pet.id}")
    else:
        return render_template("add.html", form=form)


@app.route("/<int:pet_id>", methods=["GET", "POST"])
def show_pet(pet_id):
    """Show pet detail"""
    pet = Pet.query.get(pet_id)

    form = PetEditForm(obj=pet)

    if form.validate_on_submit():

        # set_form_value(pet, form)
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data

        if not pet.photo_url:
            photo_upload = upload_file(form.photo_upload_update.name)

            if photo_upload is not None:
                pet.photo_upload = photo_upload


        db.session.add(pet)
        db.session.commit()

        flash(f"{pet.name} is updated!")
        return redirect(f"/{pet.id}")
    else:
        return render_template("pet.html", form=form, pet=pet)


# def set_form_value(pet, form):
#     """set the pet value from form data"""

#     for field in form:
#         if hasattr(pet , field.name):
#             setattr(pet, field.name, field.data)

def upload_file(fieldname):
    """Upload file and return the filename"""
    file = request.files[fieldname]
    filename = secure_filename(file.filename)
    if file.filename != "" and file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return filename
    return None


        
