from flask import *

sensor_data = Blueprint('sensor_data', __name__)

# ALL OF THESE USE request.args.get('amount')
@sensor_data.route('/<user>/<data_type>', methods=['GET'])
def get_sensor_data():
    pass

