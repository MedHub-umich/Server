from flask import Flask
import config
import views
import api

app = Flask(__name__, template_folder='templates')

app.register_blueprint(views.front_ends)
app.register_blueprint(api.posts, url_prefix="/api")

# from apis import posts

# @app.route('/')
# @app.route('/index')
# def index():
#     return "Hello World"

if __name__ == '__main__':
    # listen on external IPs
    app.run(host=config.env['host'], port=config.env['port'], debug=True)