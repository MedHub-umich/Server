from flask import *


front_ends = Blueprint('front_ends', __name__)


@front_ends.route('/')
def main_index():
    return "Hello World"