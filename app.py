from flask import Flask
import config
import views

app = Flask(__name__)

app.config.from_object(config.Config)
app.register_blueprint(views.front_ends)

# from apis import posts

# @app.route('/')
# @app.route('/index')
# def index():
#     return "Hello World"

if __name__ == '__main__':
    # listen on external IPs
    app.run(host=app.config['HOST'], port=app.config['PORT'], debug=app.config['DEBUG'])