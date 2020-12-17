from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def home_page():
    """Show home page"""
    return ""

@app.route("/welcome")
def say_welcome():
    """
    Show welcome
    """
    return "welcome"

@app.route("/welcome/home")
def say_welcome_home():
    """
    Show welcome home
    """
    return "welcome home"

@app.route("/welcome/back")
def say_welcome_back():
    """
    Show welcom back
    """
    return "welcome back"