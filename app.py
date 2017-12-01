from flask import Flask
import config
import views
import api

app = Flask(__name__, template_folder='templates')

app.config.from_object(config.Config)

# Serving up views since '03
app.register_blueprint(views.front_ends)

# API endpoints
app.register_blueprint(api.add_data, url_prefix="/api/v1.0/add_data")
app.register_blueprint(api.sensor_data, url_prefix="/api/v1.0/sensor")
app.register_blueprint(api.alert, url_prefix="/api/v1.0/alert")

# from apis import posts

# @app.route('/')
# @app.route('/index')
# def index():
#     return "Hello World"

if __name__ == '__main__':
    # listen on external IPs
    app.run(host=app.config['HOST'], port=app.config['PORT'], debug=app.config['DEBUG'])