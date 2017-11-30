from flask import Flask
import config
import views


app = Flask(__name__)

app.register_blueprint(views.main)

# from apis import posts

# @app.route('/')
# @app.route('/index')
# def index():
#     return "Hello World"

if __name__ == '__main__':
    # listen on external IPs
    app.run(host=config.env['host'], port=config.env['port'], debug=True)