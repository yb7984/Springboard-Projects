from flask import Flask, request, render_template, redirect, flash, jsonify, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import Question, Survey, satisfaction_survey, personality_quiz, surveys

app = Flask(__name__)
app.config["SECRET_KEY"] = "so-so"

debug = DebugToolbarExtension(app)

# responses = []

@app.route("/")
def show_index():
    """Show the starting page of the survey"""

    survey = request.args.get("survey")
    if not survey:
        survey = "satisfaction"

    session["current_survey"] = survey

    return render_template("index.html" , survey = surveys[survey])


@app.route("/", methods=["POST"])
def start_survey():
    """Start the survey and redirect to the first question"""

    responses = session["responses"]

    if not responses:
        responses = {}
    
    if not responses[session["current_survey"]]:
        responses[session["current_survey"]] = []

    session["resposes"] = responses

    return redirect("/questions/0")

@app.route("/surveys")
def show_surveys():
    return render_template("surveys.html" , surveys = surveys)

    
@app.route("/questions/<int:question_index>")
def show_question(question_index):
    """Show the question page"""
    current_survey = get_current_survey()

    responses = session['responses']

    print(responses)

    if question_index != len(responses[session["current_survey"]]):
        flash("Please take this survey in order. Thank you!")
        return redirect(f"/questions/{len(responses[session['current_survey']])}")

    if question_index < len(current_survey.questions):
        return render_template("question.html" , survey = current_survey , question_index = question_index)
    
    else:
        return redirect("/thankyou")


@app.route("/answer")
def get_answer():
    """Handle the answer and redirect to next question"""
    question_index  = int(request.args.get("question_index"))
    question_answer = int(request.args.get("radio_choice"))

    current_survey = get_current_survey()

    responses = session["responses"]
    responses[session["current_survey"]].append(current_survey.questions[question_index].choices[question_answer])
    session["responses"] = responses

    return redirect(f"/questions/{question_index + 1}")

@app.route("/thankyou")
def show_thankyou():
    """Show the thank you page"""

    current_survey = get_current_survey()

    return render_template("thankyou.html" , survey = current_survey , responses = session["responses"][session["current_survey"]])

@app.route("/reset" , methods=["POST"])
def reset():
    """Reset the survey"""

    responses = session["responses"]
    responses[session["current_survey"]] = []
    session["responses"] = responses

    return redirect("/")    

def get_current_survey():
    """Return current survey"""
    return surveys[session["current_survey"]]