from flask import *
import settings

front_ends = Blueprint('front_ends', __name__, template_folder='templates')
db = settings.db

@front_ends.route('/')
def main_index():
	return render_template("index.html")

@front_ends.route('/user')
def dashboard():
	userID = int(request.args.get('userID'))
	ourUser = db.Users.find({'_id': userID})
	options = {
		"userID": userID,
		"name": ourUser[0]['info']['first_name'] + " " + ourUser[0]['info']['last_name']
	}
	return render_template("user.html", **options)

@front_ends.route('/users')
def users():
	dbUsers = db.Users.find({})
	users = []
	for user in dbUsers:
		userReturn = {
			'id': user['_id'],
			'name': user['info']['first_name'] + " " + user['info']['last_name'],
			'lastAccess': findLastTimestamp(user),
			'userLink': 'user?userID=' + str(user['_id'])
		}
		users.append(userReturn)
	users.reverse()
	options = {
		"users": users,
		"numUsers": len(users)
	}
	print(options)
	return render_template("users.html", **options)

def findLastTimestamp(user):
	if 'ecg' in user and user['ecg']['data']:
		return user['ecg']['data'][0]['time']
	else :
		return "No Check in Found"