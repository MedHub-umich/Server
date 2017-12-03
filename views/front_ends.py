from flask import *

front_ends = Blueprint('front_ends', __name__, template_folder='templates')

@front_ends.route('/')
def main_index():
    return render_template("index.html")

@front_ends.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")