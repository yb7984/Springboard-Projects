from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from stories import Story, story

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

debug = DebugToolbarExtension(app)

@app.route("/")
def index():
    """Display the form to input all the prompts"""
    return render_template("index.html" , words = story.prompts)

@app.route("/story")
def get_story():
    """Get the prompts and diplay the story"""
    answers = {}
    for word in story.prompts:
        answers[word] = request.args.get(word)

    story_content = story.generate(answers)
    
    return render_template("story.html" , story = story_content)
