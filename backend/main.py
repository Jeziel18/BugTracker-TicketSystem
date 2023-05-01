from flask import Flask, jsonify, request
from flask_cors import CORS
from backend.handler.Users import UserHandler
import mysql.connector

app = Flask(__name__)
CORS(app)


@app.route('/users', methods=['GET'])
def get_all_users():
    if request.method == 'GET':
        return UserHandler().get_all_users()
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    if request.method == 'GET':
        return UserHandler().get_user_by_id(user_id)
    else:
        return jsonify(Error="Method not allowed."), 405

if __name__ == '__main__':
    app.run(debug=1)

