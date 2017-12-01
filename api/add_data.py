from flask import *
import settings

db = settings.db

add_data = Blueprint('add_data', __name__)

# body it expect..
# {"packets": [{
#             "User_id": <user's id>,
#             "Data_Type": <data_type>,
#             "Timestamp": <Timestamp in datetime format>, // Reconstruct given data
#             "Data": [
#                 <raw data values>
#             ]
#         },
#         {
#             Other packets...
#         }
#     ]
# }
@add_data.route('', methods=['GET', 'POST'])
def add_data_func():
    db.Users.insert_one({
            "test": True
    }) 
    return jsonify(), 200