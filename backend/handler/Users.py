from flask import Flask, jsonify, request
from backend.dao.Users import UserDAO


class UserHandler:

    def build_user_dict(self, row):
        result = {}
        result['user_id'] = row[0],
        result['first_name'] = row[1],
        result['last_name'] = row[2],
        result['email'] = row[3],
        result['password'] = row[4],
        result['role_id'] = row[5],
        result['phone_number'] = row[6],
        if len(row) > 7:
            result['phone_extension'] = row[7]
        return result


    def build_user_attributes(self, user_id, first_name, last_name, email, password, role_id, phone_number,
                              phone_extension):
        result = {}
        result['user_id'] = user_id,
        result['first_name'] = first_name,
        result['last_name'] = last_name,
        result['email'] = email,
        result['password'] = password,
        result['role_id'] = role_id,
        result['phone_number'] = phone_number,
        result['phone_extension'] = phone_extension
        return result

    def __init__(self):
        self.user_dao = UserDAO()

    def get_all_users(self):
        dao = UserDAO()
        users = dao.get_all_users()
        result = []
        for user in users:
            user_dict = self.build_user_dict(user)
            result.append(user_dict)
        return result

    def get_user_by_id(self, user_id):
        dao = UserDAO()
        users = dao.get_user_by_id(user_id)
        if not users:
            return jsonify(Error="User not found."), 404
        else:
            user_dict = self.build_user_dict(users)
            return jsonify(user_dict), 200

    def create_user(self, first_name, last_name, email, password, phone_number, phone_extension=None):
        if not phone_extension:
            phone_extension = ''
        dao = UserDAO()
        user_id = dao.create_user(first_name, last_name, email, password, phone_number, phone_extension)
        return {'user_id': user_id}

    def update_user(self, user_id, update_data):
        # Check if user exists
        user = self.user_dao.get_user_by_id(user_id)
        if not user:
            return jsonify(Error="User not found"), 404

        # Get update data from request body
        update_data = request.get_json()
        if not update_data:
            return jsonify(Error="Missing JSON request body"), 400

        # Update user record
        try:
            self.user_dao.update_user(user_id, update_data)
            return jsonify(Message="User updated successfully"), 200
        except:
            return jsonify(Error="Failed to update user"), 500

    def get_user_by_role_id(self, role_id):
        try:
            role_id = int(role_id)
        except ValueError:
            return jsonify(Error="Invalid role ID"), 400

        users = self.user_dao.get_user_by_role_id(role_id)
        if not users:
            return jsonify(Error="No users found for the specified role ID"), 404

        user_list = []
        for user in users:
            user_list.append({
                "user_id": user[0],
                "first_name": user[1],
                "last_name": user[2],
                "email": user[3],
                "password": user[4],
                "role_id": user[5],
                "phone_number": user[6],
                "phone_extension": user[7]
            })

        return jsonify(Users=user_list), 200

    def delete_user(self, user_id):
        dao = UserDAO()
        if not dao.get_user_by_id(user_id):
            return jsonify(Error="User not found."), 404
        else:
            dao.delete_user(user_id)
            return jsonify(DeleteStatus="OK"), 200

    def get_user_by_login(self, login_data):
        dao = UserDAO()
        login_data = request.get_json()
        if not login_data:
            return jsonify(Error = "Missing JSON Request"), 400

        validation = dao.get_user_by_login(login_data)
        if validation[0] == 1:
            return jsonify(Message = "Login Successful"), 200, validation[1], validation[2]
        else:
            return jsonify(Error = "Failed to Login"), 500

    def get_email_by_id(self, user_id):
        email = self.user_dao.get_email_by_id(user_id)
        return email if email is not None else 'User not found'