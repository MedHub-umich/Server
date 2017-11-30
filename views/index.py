from views import front_ends

@front_ends.route('/')
@front_ends.route('/index')
def index():
    return "Hello World"