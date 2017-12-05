from flask import *

alert = Blueprint('alert', __name__)

# If it is a post, it will have request.args.get('alert_type')
# If it is a get, it will return 203 if there are no notifications
# If it is a get and it is there, it will return the alert type and such and remove the alert from its queue
# /api/v1.0/alert/<user>
# If it is is a post, it will take a message type and any data associated with it
@alert.route('/<user>', methods=['GET', 'POST'])
def get_alert(user):
    if request.method == 'POST':
        return respond_success()
    else:
        return respond_failure("Not implemented!")



def respond_success():
    return jsonify(), 200

def respond_failure(message):
    return jsonify(message=message), 500


