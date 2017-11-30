from flask import *


main = Blueprint('main', __name__)


@main.route('/')
def main_index():
    return "Hello World"