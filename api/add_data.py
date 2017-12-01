from flask import *
import settings
from datetime import datetime,timedelta
# from helpers import *

db = settings.db

class PacketTypes:
    HEART_RATE = 3
    ECG = 2
    BREATHING_RATE = 4
    TEMPERATURE = 5
    BLOOD_PRESSURE = 1

# TODO: Make real periods
# TODO: Figure out how to modify time
class PacketPeriods:
    ECG = 4000
    HEART_RATE = 10000000
    BREATHING_RATE = 60000000
    TEMPERATURE = 60000000
    BLOOD_PRESSURE = -1

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
    print(len(packets))
    for packet in packets:
        if packet['type'] == PacketTypes.HEART_RATE:
            response = ingestHeartRate(packet)
        elif packet['type'] == PacketTypes.ECG:
            response = ingestECG(packet)
        elif packet['type'] == PacketTypes.BREATHING_RATE:
            response = ingestBreathingRate(packet)
        elif packet['type'] == PacketTypes.TEMPERATURE:
            response = ingestTemperature(packet)
        elif packet['type'] == PacketTypes.BLOOD_PRESSURE:
            response = ingestBloodPressure(packet)

    return response

#TODO: Check if too much data storing
def ingestECG(packet):
    data = parse_data(packet['data'], PacketPeriods.ECG, packet['time'])
    db.Users.find_one_and_update({"_id": packet['user']}, {'$push': {'ecg.data': {'$each': data,'$position': 0}}} , {'upsert': True})
    return respond_success()

def ingestHeartRate(packet):
    data = parse_data(packet['data'], PacketPeriods.HEART_RATE, packet['time'])
    db.Users.find_one_and_update({"_id": packet['user']}, {'$push': {'heart_rate.data': {'$each': data,'$position': 0}}} , {'upsert': True})
    return respond_success()

def ingestBreathingRate(packet):
    data = parse_data(packet['data'], PacketPeriods.BREATHING_RATE, packet['time'])
    db.Users.find_one_and_update({"_id": packet['user']}, {'$push': {'breathing_rate.data': {'$each': data,'$position': 0}}} , {'upsert': True})
    return respond_success()

def ingestTemperature(packet):
    data = parse_data(packet['data'], PacketPeriods.TEMPERATURE, packet['time'])
    db.Users.find_one_and_update({"_id": packet['user']}, {'$push': {'temperature.data': {'$each': data,'$position': 0}}} , {'upsert': True})
    return respond_success()

def ingestBloodPressure(packet):
    data = parse_data(packet['data'], PacketPeriods.BLOOD_PRESSURE, packet['time'])
    db.Users.find_one_and_update({"_id": packet['user']}, {'$push': {'blood_pressure.data': {'$each': data,'$position': 0}}} , {'upsert': True})
    return respond_success()

def parse_data(raw_data, period, starting_time):
    data = []
    currTime = datetime.strptime(starting_time, "%Y-%m-%d %H:%M:%S.%f")
    for databit in raw_data:
        data.append({
            'data': databit,
            'time': currTime
        })
        currTime += timedelta(microseconds=period)
    data.reverse()
    return data

def respond_success():
    return jsonify(), 200

def respond_failure(message):
    return jsonify(message=message), 500



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