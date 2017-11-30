from flask import *

posts = Blueprint('posts', __name__)

@posts.route('/api/v1.0/post_data')
def post_data():
    return "InPost"