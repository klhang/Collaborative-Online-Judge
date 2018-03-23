import json
from flask import Flask, jsonify, request
app = Flask(__name__)


import executor_utils as eu

@app.route('/build_and_run', methods=['POST'])

def build_and_run():
    data = request.get_json()
    if 'code' not in data or 'lang' not in data:
        return 'You should provide "code" and "lang"'

    code = data['code']
    lang = data['lang']
     # %s: string place holder
    print("API got called with code: %s in %s" % (code, lang))

    result = eu.build_and_run(code, lang)
    # conver object to json format
    return jsonify(result)

# main function
# run program on command line:python executor_server.py will =>
if __name__ == '__main__':
    #  load docker image
    eu.load_image()
    # monitoring the code change and recompile
    app.run(debug=True)
