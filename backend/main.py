from flask import Flask, jsonify, request
from flask_cors import CORS

from backend.handler.Roles import RolesHandler
from backend.handler.Services import ServicesHandler
from backend.handler.Users import UserHandler
from backend.handler.Building import BuildingHandler
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

@app.route('/buildings', methods=['GET'])
def get_all_buildings():
    if request.method == 'GET':
        return BuildingHandler().get_all_buildings()
    else:
        return jsonify(Error="Method not allowed."), 405
@app.route('/buildings/<int:building_id>', methods=['GET'])
def get_building_by_id(building_id):
    if request.method == 'GET':
        return BuildingHandler().get_building_by_id(building_id)
@app.route('/buildings', methods=['POST'])
def insert_building():
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify(Error="Missing JSON request body"), 400
        try:
            building_name = data['building_name']
            building_number = data['building_number']
        except KeyError:
            return jsonify(Error="Invalid request parameters"), 400
        result = BuildingHandler().create_building(building_name, building_number)
        return jsonify(result), 201
    else:
        return jsonify(Error="Method not allowed."), 405
@app.route('/buildings/<int:building_id>', methods=['PUT'])
def update_building(building_id):
    if request.method == 'PUT':
        data = request.get_json()
        if not data:
            return jsonify(Error="Missing JSON request body"), 400
        try:
            update_data = {}
            for key, value in data.items():
                if key in ['building_name', 'building_number', 'building_address']:
                    update_data[key] = value
            if not update_data:
                return jsonify(Error="Invalid request parameters"), 400
        except KeyError:
            return jsonify(Error="Invalid request parameters"), 400

        result = BuildingHandler().update_building(building_id, update_data)
        if result:
            return jsonify(Message="Building updated successfully"), 200
        else:
            return jsonify(Error="Building not found or no changes made"), 404
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/roles', methods=['GET'])
def get_all_roles():
    if request.method == 'GET':
        return RolesHandler().get_all_roles()
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/roles/<int:role_id>', methods=['GET'])
def get_role_by_id(role_id):
    if request.method == 'GET':
        return RolesHandler().get_role_by_id(role_id)

@app.route('/roles', methods=['POST'])
def insert_role():
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify(Error="Missing JSON request body"), 400
        try:
            role_name = data['role_name']
        except KeyError:
            return jsonify(Error="Invalid request parameters"), 400
        result = RolesHandler().create_role(role_name)
        return jsonify(result), 201
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/roles/<int:role_id>', methods=['PUT'])
def update_role(role_id):
    if request.method == 'PUT':
        data = request.get_json()
        if not data:
            return jsonify(Error="Missing JSON request body"), 400
        try:
            update_data = {}
            for key, value in data.items():
                if key in ['role_name']:
                    update_data[key] = value
            if not update_data:
                return jsonify(Error="Invalid request parameters"), 400
        except KeyError:
            return jsonify(Error="Invalid request parameters"), 400

        result = RolesHandler().update_role(role_id, update_data)
        if result:
            return jsonify(Message="Role updated successfully"), 200
        else:
            return jsonify(Error="Role not found or no changes made"), 404
    else:
        return jsonify(Error="Method not allowed."), 405
@app.route('/services', methods=['GET'])
def get_all_services():
    if request.method == 'GET':
        return ServicesHandler().get_all_services()
    else:
        return jsonify(Error="Method not allowed."), 405


@app.route('/services/<int:service_id>', methods=['GET'])
def get_service_by_id(service_id):
    if request.method == 'GET':
        return ServicesHandler().get_service_by_id(service_id)

# @app.route('/services', methods=['POST'])
# def create_service():
#     if request.method == 'POST':
#         data = request.get_json()
#         if not data:
#             return jsonify(Error="Missing JSON request body"), 400
#         try:
#             service_name = data['service_name']
#             service_category_id = data['service_category_id']
#         except KeyError:
#             return jsonify(Error="Invalid request parameters"), 400
#
#         # Check if the service_category_id exists
#         if not ServiceCategoryDAO().get_category_by_id(service_category_id):
#             return jsonify(Error="Service category not found"), 404
#
#         service_id = ServicesHandler().create_service(service_name, service_category_id)
#         return jsonify(service_id), 201
#     else:
#         return jsonify(Error="Method not allowed."), 405


# @app.route('/services/<int:service_id>', methods=['PUT'])
# def update_service(service_id):
#     if request.method == 'PUT':
#         data = request.get_json()
#         if not data:
#             return jsonify(Error="Missing JSON request body"), 400
#         try:
#             update_data = {}
#             for key, value in data.items():
#                 if key in ['service_name', 'service_category_id']:
#                     update_data[key] = value
#             if not update_data:
#                 return jsonify(Error="Invalid request parameters"), 400
#         except KeyError:
#             return jsonify(Error="Invalid request parameters"), 400
#
#         # Check if the service exists
#         service = ServicesHandler().get_service_by_id(service_id)
#         if not service:
#             return jsonify(Error="Service not found"), 404
#
#         # Check if the service_category_id exists
#         service_category_id = update_data.get('service_category_id', service['service_category_id'])
#         if not ServiceCategoryDAO().get_category_by_id(service_category_id):
#             return jsonify(Error="Service category not found"), 404
#
#         ServicesHandler().update_service(service_id, update_data)
#         return jsonify(Message="Service updated successfully"), 200
#     else:
#         return jsonify(Error="Method not allowed."), 405

if __name__ == '__main__':
    app.run(debug = 1)

