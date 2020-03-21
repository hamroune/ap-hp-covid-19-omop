from flask import Flask
import pandas as pd
import flask

app = Flask(__name__,
 	static_folder = './templates/public',
 	template_folder="./templates/static")
@app.route('/')
def index():
    return "Hello, World!"


@app.route('/api/tables')
def tables():
    df = pd.read_csv('../tables.csv')
    result = df.to_json(orient='records')

    return flask.Response(response=result, status=200, mimetype='application/json')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)