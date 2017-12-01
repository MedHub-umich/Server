from flask import *

alert = Blueprint('alert', __name__)

# If it is a post, it will have request.args.get('alert_type')
# If it is a get, it will return 203 if there are no notifications
# If it is a get and it is there, it will return the alert type and such and remove the alert from its queue
@alert.route('/<user>', methods=['GET', 'POST'])
def get_alert():
    pass


