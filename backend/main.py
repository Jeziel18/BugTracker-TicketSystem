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

@app.route('/users/role/<int:role_id>', methods=['GET'])
def get_user_by_role_id(role_id):
    if request.method == 'GET':
        return UserHandler().get_user_by_role_id(role_id)
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/users/<int:user_id>', methods=['GET', 'POST'])
def get_or_update_user_by_id(user_id):
    if request.method == 'GET':
        return UserHandler().get_user_by_id(user_id)

    elif request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify(Error="Missing JSON request body"), 400
        try:
            update_data = {}
            for key, value in data.items():
                if key in ['first_name', 'last_name', 'email', 'password', 'role_id', 'phone_number',
                           'phone_extension']:
                    update_data[key] = value
            if not update_data:
                return jsonify(Error="Invalid request parameters"), 400
        except KeyError:
            return jsonify(Error="Invalid request parameters"), 400

        result = UserHandler().update_user(user_id, update_data)
        if result:
            return jsonify(Message="User updated successfully"), 200
        else:
            return jsonify(Error="User not found or no changes made"), 404
    else:
        return jsonify(Error="Method not allowed."), 405


@app.route('/new-user', methods=['POST'])
def insert_user():
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify(Error="Missing JSON request body"), 400
        try:
            first_name = data['first_name']
            last_name = data['last_name']
            email = data['email']
            password = data['password']
            phone_number = data['phone_number']
            phone_extension = data.get('phone_extension', None) # Optional field
        except KeyError:
            return jsonify(Error="Invalid request parameters"), 400

        # Call the create_user method in the UserHandler class
        result = UserHandler().create_user(first_name, last_name, email, password, phone_number, phone_extension)
        return jsonify(User=result), 201
    else:
        return jsonify(Error="Method not allowed."), 405


if __name__ == '__main__':
    app.run(debug = 1)

