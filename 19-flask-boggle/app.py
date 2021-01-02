from boggle import Boggle
from flask import Flask, request, render_template, redirect, flash, jsonify, session
from flask_debugtoolbar import DebugToolbarExtension
from datetime import datetime

boggle_game = Boggle()

app = Flask(__name__)
app.config["SECRET_KEY"] = "so-so"

# debug = DebugToolbarExtension(app)

@app.route("/")
def show_index():
    """Show the main page and display the board"""

    board = boggle_game.make_board()
    session["board"] = board

    history = session.get("scores" , [])
    session["scores"] = history

    return render_template("index.html" , board = board , history=history)

@app.route("/find")
def find_word():
    """Check the word submitted and return the result"""
    word = request.args.get("word" , "")

    return jsonify(result = boggle_game.check_valid_word(session["board"] , word))

@app.route("/end" , methods=["POST"])
def end_game():
    """End the game and get the score from the front end"""

    scores = session.get("scores" , []);
    scores.append({"time": datetime.now(), "score":request.json.get("score" , 0)})
    session["scores"] = scores

    return jsonify(scores)

