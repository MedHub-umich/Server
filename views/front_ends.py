from flask import *

front_ends = Blueprint('front_ends', __name__, template_folder='templates')

@front_ends.route('/')
def main_index():
    return "Hello World"