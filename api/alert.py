from flask import *
import settings
from datetime import datetime

db = settings.db

alert = Blueprint('alert', __name__)

# If it is a post, it will have request.args.get('alert_type')
# If it is a get, it will return 203 if there are no notifications
# If it is a get and it is there, it will return the alert type and such and remove the alert from its queue
# /api/v1.0/alert/<user>
# If it is is a post, it will take a message type and any data associated with it
@alert.route('/<user>', methods=['GET', 'POST'])
def get_alert(user):
    if request.method == 'POST':
        ourJson = request.get_json()
        alertData = ourJson['data']
        db.Users.find_one_and_update({"_id": int(user)}, 
          {'$push': {'info.alerts': {
              '$each': [{
                  'data': alertData,
                  'time': str(datetime.now())
              }],
              '$position': 0
              }
             }
         } 
           , {'upsert': True})
        return respond_success()
    else:
        res = db.Users.find({"_id": int(user)})
        alertsForUser = res[0]['info']['alerts']
        if (alertsForUser == []) :
            return jsonify(alerts=[]), 203
        db.Users.find_one_and_update({"_id": int(user)}, { "$set": { "info.alerts": [] }})
        return jsonify(alerts=alertsForUser), 200

@alert.route('/panic/<user>', methods=['GET', 'POST'])
def get_panic(user):
    if request.method == 'POST':
        db.Users.find_one_and_update({"_id": int(user)}, {'$set': {'info.panic': True}}, {'upsert': True})
        return respond_success()
    else:
        res = db.Users.find({"_id": int(user)})
        panicForUser = res[0]['info']['panic']
        db.Users.find_one_and_update({"_id": int(user)}, { "$set": { "info.panic": False }})
        return jsonify(panic=panicForUser), 200

def respond_success():
    return jsonify(), 200

def respond_failure(message):
    return jsonify(message=message), 500

# db.Users.findOneAndUpdate({"_id": 2}, 
#           {'$push': {'ecg.data': {
#               '$each': [4, 5, 6],
#               '$position': 0
#               }
#              }
#          } 
#            , {upsert: true})

