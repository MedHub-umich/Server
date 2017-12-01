from flask import *
import settings

db = settings.db

class PacketTypes:
    HEART_RATE = 3
    ECG = 2
    BREATHING_RATE = 4
    TEMPERATURE = 5
    BLOOD_PRESSURE = 1

class PacketPeriods:
    ECG = 1

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
    packets = request.get_json()['packets']
    for packet in packets:
        if packet.type == PacketTypes.HEART_RATE:
            return ingestHeartRate(packet)
        elif packet.type == PacketTypes.ECG:
            return ingestECG(packet)
        elif packet.type == PacketTypes.BREATHING_RATE:
            return ingestBreathingRate(packet)
        elif packet.type == PacketTypes.TEMPERATURE:
            return ingestTemperature(packet)
        elif packet.type == PacketTypes.BLOOD_PRESSURE:
            return ingestBloodPressure(packet)

def ingestECG(packet):
    pass

def ingestHeartRate(packet):
    pass

def ingestBreathingRate(packet):
    pass

def ingestTemperature(packet):
    pass

def ingestBloodPressure(packet):
    pass

def respond_success():
    return jsonify(), 200

def respond_failure(message):
    message = {"message": message}
    return message, 500




#HELP
# db.Users.insert({"_id": 2, 
#     "info": {
#         "first_name": "Tyler",
#         "last_name": "Siegel"
#     },
# })

#TO PUSH
# db.Users.findOneAndUpdate({"_id": 2}, 
#           {'$push': {'ecg.data': {
#               '$each': [4, 5, 6],
#               '$position': 0
#               }
#              }
#          } 
#            , {upsert: true})