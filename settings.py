from pymongo import MongoClient

def connect_to_db(url, db_name):
    mongo = MongoClient(url)
    global db
    db = mongo[db_name]
