from flask import *

front_ends = Blueprint('front_ends', __name__, template_folder='templates')

@front_ends.route('/')
def main_index():
    return render_template("index.html")

@front_ends.route('/user')
def dashboard():
    options = {
        "userID": int(request.args.get('userID'))
    }
    return render_template("dashboard.html", **options)

@front_ends.route('/users')
def users():
    return render_template("users.html")