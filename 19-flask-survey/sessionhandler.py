from flask import request, session
from surveys import *

def get_responses():
    """Return the responses from session"""
    return session.get("responses" , {})

def get_current_responses():
    """Return the responses for current survey"""
    return get_responses().get(get_current_survey_key() , [])

def set_responses(responses):
    """Set the responses value"""
    session["responses"] = responses

def set_current_responses(item):
    """Set the current responses value"""
    responses = get_responses()
    current_responses = get_current_responses()
    current_responses.append(item)

    survey = get_current_survey_key()

    responses[survey] = current_responses

    set_responses(responses)

def reset_current_responses():
    """Reset the current responses to empty"""
    responses = get_responses()
    survey = get_current_survey_key()
    responses[survey] = []
    set_responses(responses)

def get_current_survey_key():
    """Return the current survey key"""
    if request.args.get("survey"):
        return request.args.get("survey")
    return session.get("current_survey" , "satisfaction")

def set_current_survey(survey):
    """Set the current survey to session"""
    session["current_survey"] = survey

def get_current_survey():
    """Return current survey"""
    return surveys.get(get_current_survey_key() , satisfaction_survey)