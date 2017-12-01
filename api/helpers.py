from flask import *

def respond_success():
    return jsonify(), 200

def respond_failure(message):
    message = {"message": message}
    return message, 500