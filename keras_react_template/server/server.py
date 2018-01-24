from ml import *
from flask import jsonify, request, Flask, render_template
from flask_cors import CORS
import pprint
import requests

pp = pprint.PrettyPrinter()

app = Flask(__name__, static_folder='../static/dist', template_folder='../static')
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/recipes", methods=['POST'])
def recipes():
    # try:
    imagefile = request.files['file']
    objects = image2obj(imagefile, topx=1)
    return jsonify(objects)
    # recipes = get_recipes(objects, app_id, app_key)
    # return jsonify(recipes)
    # return render_template("result.html",result = recipes)
    # except:
    #     return 'error processing image'

def get_recipes(objects, app_id, app_key):
    res = []
    ep = 'http://www.recipepuppy.com/api/'
    for o in objects:
        r = requests.get(ep + '?q=' + o + '&app_id=' + app_id + '&app_key=' + app_key)
        if r.status_code == 200:
            res.extend([
                {'label': i['recipe']['label'],
                'uri': i['recipe']['uri']} for i in r.json()['hits']])
    return res

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

if __name__ == "__main__":
    app.run(debug=True)
    # httpie post example
    # http --form POST localhost:5000 imagefile@/Users/yuki/Downloads/802f7cdc166aa144a295d0315ca6be7a_4066cd9d-8ef6-464b-a8f1-1210d63a37ec.png