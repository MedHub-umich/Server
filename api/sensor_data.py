from flask import *
import settings

db = settings.db

sensor_data = Blueprint('sensor_data', __name__)

# ALL OF THESE USE request.args.get('amount')
# so the url is /user/data_type?amount=x
@sensor_data.route('/<user>/<data_type>', methods=['GET'])
def get_sensor_data(user, data_type):
	amount = int(request.args.get('amount'))
	res = db.Users.find({"_id": int(user)})
	if (res.count() != 1):
		print("invalid user")
		return respond_failure("invalid user")
	if (amount > len(res[0][data_type]["data"])):
		amount = len(res[0][data_type]["data"])
	elif(amount < 0):
		print("Negative amount is bad!")
		amount = 0
	return jsonify(data=res[0][data_type]["data"][0:amount]), 200

def respond_failure(message):
    return jsonify(message=message), 500