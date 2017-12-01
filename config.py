# Do NOT commit this file to github
# Make a seperate one for your deployed environment
# Do not change the host, it is referring to database host not website host

class Config(object):
	HOST = '127.0.0.1'
	PORT = 3000
	DEBUG = True
	TESTING = False
	DB_URL = "mongodb://MedHub_Server:NordicRules5@ds125906.mlab.com:25906/medhub_prod"
	DB_NAME = "medhub_prod"
