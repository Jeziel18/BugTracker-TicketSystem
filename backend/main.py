from flask import Flask, jsonify, request
from flask_cors import CORS

from backend.dao.Service_Category import ServiceCategoryDAO
from backend.dao.Services import ServicesDAO
from backend.handler.Roles import RolesHandler
from backend.handler.Service_Category import ServiceCategoryHandler
from backend.handler.Services import ServicesHandler
from backend.handler.Users import UserHandler
from backend.handler.Building import BuildingHandler
import mysql.connector

app = Flask(__name__)
CORS(app)

#User routes and methods
@app.route('/users', methods=['GET'])
def get_all_users():
    if request.method == 'GET':
        return UserHandler().get_all_users()
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/users/role/<int:role_id>', methods=['GET', 'DELETE'])
def get_user_by_role_id(role_id):
    if request.method == 'GET':
        return UserHandler().get_user_by_role_id(role_id)
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def get_or_update_user_by_id(user_id):
    if request.method == 'GET':
        return UserHandler().get_user_by_id(user_id)

    elif request.method == 'DELETE':
        return UserHandler().delete_user(user_id)

    elif request.method == 'PUT':
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

#buildings routes and methods
@app.route('/buildings', methods=['GET'])
def get_all_buildings():
    if request.method == 'GET':
        return BuildingHandler().get_all_buildings()
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/buildings/<int:building_id>', methods=['GET', 'DELETE'])
def get_building_by_id(building_id):
    if request.method == 'GET':
        return BuildingHandler().get_building_by_id(building_id)
    elif request.method == 'DELETE':
        return BuildingHandler().delete_building(building_id)
    else:
        return jsonify(Error="Method not allowed."), 405

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

#roles routes and methods
@app.route('/roles', methods=['GET'])
def get_all_roles():
    if request.method == 'GET':
        return RolesHandler().get_all_roles()
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/roles/<int:role_id>', methods=['GET', 'DELETE'])
def get_role_by_id(role_id):
    if request.method == 'GET':
        return RolesHandler().get_role_by_id(role_id)
    elif request.method == 'DELETE':
        return RolesHandler().delete_role(role_id)
    else:
        return jsonify(Error="Method not allowed."), 405

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

#services routes and methods
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

@app.route('/services', methods=['POST'])
def create_service():
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify(Error="Missing JSON request body"), 400
        try:
            service_name = data['service_name']
            service_category_id = data['service_category_id']
        except KeyError:
            return jsonify(Error="Invalid request parameters"), 400

        # Check if the service_category_id exists
        if not ServiceCategoryDAO().get_service_category_by_id(service_category_id):
            return jsonify(Error="Service category not found"), 404

        service_id = ServicesHandler().create_service(service_name, service_category_id)
        return jsonify(service_id), 201
    else:
        return jsonify(Error="Method not allowed."), 405

def validate_service_update_data(update_data):
    # Check if required fields are present, this method is to validate service_category_id before updating
    if 'service_name' not in update_data and 'service_category_id' not in update_data:
        return jsonify(Error="Missing required fields"), 400

    # Check if service_category_id is valid
    service_category_id = update_data.get('service_category_id')
    if service_category_id is not None:
        try:
            service_category_id = int(service_category_id)
        except ValueError:
            return jsonify(Error="Invalid service category ID"), 400

        if not ServiceCategoryDAO().get_service_category_by_id(service_category_id):
            return jsonify(Error="Service category not found"), 404

    return None

@app.route('/services/<int:service_id>', methods=['PUT'])
def update_service(service_id):
    if request.method == 'PUT':
        data = request.get_json()
        if not data:
            return jsonify(Error="Missing JSON request body"), 400

        error_response = validate_service_update_data(data)
        if error_response:
            return error_response

        # Check if the service exists
        service = ServicesHandler().get_service_by_id(service_id)
        if not service:
            return jsonify(Error="Service not found"), 404

        ServicesHandler().update_service(service_id, data)
        return jsonify(Message="Service updated successfully"), 200

    else:
        return jsonify(Error="Method not allowed."), 405

# @app.route('/services/<int:service_id>', methods=['PUT'])
# def update_service(service_id):
#     if request.method == 'PUT':
#         data = request.get_json()
#         print("data:", data)
#         if not data:
#             return jsonify(Error="Missing JSON request body"), 400
#         try:
#             update_data = {}
#             for key, value in data.items():
#                 if key in ['service_name', 'service_category_id']:
#                     update_data[key] = value
#             print("update_data:", update_data)
#             if not update_data:
#                 return jsonify(Error="Invalid request parameters"), 400
#         except KeyError:
#             return jsonify(Error="Invalid request parameters"), 400
#
#         # Check if the service exists
#         service = ServicesHandler().get_service_by_id(service_id)
#         if service is None:
#             return jsonify(Error="Service not found"), 404
#         print("service:", service)
#
#         # Check if the service_category_id exists
#         service_category_id = int(update_data.get('service_category_id', service['service_category_id']))
#         print("service_category_id:", service_category_id)
#         if not ServiceCategoryDAO().get_service_category_by_id(service_category_id):
#             return jsonify(Error="Service category not found"), 404
#
#         ServicesHandler().update_service(service_id, update_data)
#         return jsonify(Message="Service updated successfully"), 200
#     else:
#         return jsonify(Error="Method not allowed."), 405

#service category routes and methods
@app.route('/service_categories', methods=['GET'])
def get_all_service_categories():
    if request.method == 'GET':
        return ServiceCategoryHandler().get_all_service_categories()
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/service_categories/<int:service_category_id>', methods=['GET', 'DELETE'])
def get_service_category_by_id(service_category_id):
    if request.method == 'GET':
        return ServiceCategoryHandler().get_service_category_by_id(service_category_id)
    elif request.method == 'DELETE':
        return ServiceCategoryHandler().delete_service_category(service_category_id)
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/service_categories', methods=['POST'])
def create_service_category():
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify(Error="Missing JSON request body"), 400
        try:
            category_name = data['category_name']
        except KeyError:
            return jsonify(Error="Invalid request parameters"), 400
        result = ServiceCategoryHandler().create_service_category(category_name)
        return jsonify(result), 201
    else:
        return jsonify(Error="Method not allowed."), 405

@app.route('/service_categories/<int:service_category_id>', methods=['PUT'])
def update_service_category(service_category_id):
    if request.method == 'PUT':
        data = request.get_json()
        if not data:
            return jsonify(Error="Missing JSON request body"), 400
        try:
            update_data = {}
            for key, value in data.items():
                if key in ['category_name']:
                    update_data[key] = value
            if not update_data:
                return jsonify(Error="Invalid request parameters"), 400
        except KeyError:
            return jsonify(Error="Invalid request parameters"), 400

        result = ServiceCategoryHandler().update_service_category(service_category_id, update_data)
        if result:
            return jsonify(Message="Service category updated successfully"), 200
        else:
            return jsonify(Error="Service category not found or no changes made"), 404
    else:
        return jsonify(Error="Method not allowed."), 405


@app.route('/supervisors', methods=['GET'])
def get_all_supervisors():
    if request.method == 'GET':
        return


if __name__ == '__main__':
    app.run(debug = 1)
