import pandas as pd
import flask
from flask import Flask, request, send_from_directory, send_file

app = Flask(__name__)
@app.route('/')
def index():
    return send_file('../templates/static/build/index.html')


@app.route('/css/<path>')
def css(path):
    print('Path =>', path)
    return send_file('../templates/static/build/css/'+path)


@app.route('/static/js/<path>')
def static_js(path):
    print('Path =>', path)
    return send_file('../templates/static/build/static/js/'+path)


@app.route('/static/css/<path>')
def static_css(path):
    print('Path =>', path)
    return send_file('../templates/static/build/static/css/'+path)


@app.route('/js/<path>')
def js(path):
    print('Path =>', path)
    return send_file('../templates/static/build/static/js/'+path)

@app.route('/api/tables')
def tables():
    df = pd.read_json('../tables.json')
    result = df.to_json(orient='records')

    return flask.Response(response=result, status=200, mimetype='application/json')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)