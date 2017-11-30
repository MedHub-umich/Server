from flask import *

@app.route('/')
@app.route('/index')
def index():
    return "Hello World"