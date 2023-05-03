from flask import Flask, jsonify, request
from backend.dao.Roles import RolesDAO

class RolesHandler:
    def __init__(self):
        self.roles_dao = RolesDAO()
    def build_role_dict(self, row):
        result = {}
        result['role_id'] = row[0],
        result['role_name'] = row[1],
        return result

    def build_role_attributes(self, role_id, role_name):
        result = {}
        result['role_id'] = role_id,
        result['role_name'] = role_name,
        return result

    def get_all_roles(self):
        roles = self.roles_dao.get_all_roles()
        role_list = []
        for role in roles:
            role_list.append(self.build_role_dict(role))
        return jsonify(Roles=role_list), 200

    def get_role_by_id(self, role_id):
        role = self.roles_dao.get_role_by_id(role_id)
        if role is None:
            return jsonify(Error="Role not found."), 404
        else:
            return jsonify(self.build_role_dict(role)), 200

    def create_role(self, role_name):
        role_id = self.roles_dao.create_role(role_name)
        return {'role_id': role_id}

    def update_role(self, role_id, update_data):
        # Check if role exists
        role = self.roles_dao.get_role_by_id(role_id)
        if not role:
            return jsonify(Error="Role not found"), 404

        # Get update data from request body
        update_data = request.get_json()
        if not update_data:
            return jsonify(Error="Missing JSON request body"), 400

        # Update role record
        try:
            self.roles_dao.update_role(role_id, update_data)
            return jsonify(Message="Role updated successfully"), 200
        except:
            return jsonify(Error="Failed to update role"), 500