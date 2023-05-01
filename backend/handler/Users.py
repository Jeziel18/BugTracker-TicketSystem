from flask import jsonify
from backend.dao.Users import UserDAO


class UserHandler:

    # def __init__(self):
    #     self.dao = UserDAO()

    # def build_user_dict(self, row):
    #     return {
    #         'user_id': row[0],
    #         'first_name': row[1],
    #         'last_name': row[2],
    #         'email': row[3],
    #         'password': row[4],
    #         'role_id': row[5],
    #         'phone_number': row[6],
    #         'phone_extension': row[7]
    #     }
    #
    # def build_user_attributes(self, user_id, first_name, last_name, email, password, role_id, phone_number,
    #                           phone_extension):
    #     return {
    #         'user_id': user_id,
    #         'first_name': first_name,
    #         'last_name': last_name,
    #         'email': email,
    #         'password': password,
    #         'role_id': role_id,
    #         'phone_number': phone_number,
    #         'phone_extension': phone_extension
    #     }
    def build_user_dict(self, row):
        result = {}
        result['user_id'] = row[0],
        result['first_name'] = row[1],
        result['last_name'] = row[2],
        result['email'] = row[3],
        result['password'] = row[4],
        result['role_id'] = row[5],
        result['phone_number'] = row[6],
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