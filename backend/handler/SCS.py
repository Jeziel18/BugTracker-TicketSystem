from flask import Flask, jsonify, request
from backend.dao.SCS import SCSDao
from backend.dao.Users import UserDAO


class SCSHandler:
    def __init__(self):
        self.scs_dao = SCSDao()
    def build_scs_dict(self, row):
        result = {}
        result['scs_id'] = row[0],
        result['service_category_id'] = row[1],
        result['user_id'] = row[2],
        return result

    def build_scs_attributes(self, scs_id, service_category_id, user_id):
        result = {}
        result['scs_id'] = scs_id,
        result['service_category_id'] = service_category_id,
        result['user_id'] = user_id,
        return result

    def get_all_supervisors(self):
        supervisors = self.scs_dao.get_all_supervisors()
        supervisor_list = []
        for supervisor in supervisors:
            supervisor_list.append(self.build_scs_dict(supervisor))
        return jsonify(Supervisor=supervisor_list), 200
    def get_scs_by_id(self, scs_id):
        dao = SCSDao()
        scs = dao.get_scs_by_id(scs_id)
        if not scs:
            return jsonify(Error="Service category supervisor not found."), 404
        else:
            scs_dict = self.build_scs_dict(scs)
            return jsonify(scs_dict), 200

    def create_scs(self, service_category_id, user_id):
        # Check if user has supervisor role
        user_dao = UserDAO()
        user = user_dao.get_user_by_id(user_id)
        if not user:
            return jsonify(Error="User not found"), 404

        if user['role_id'] != 2:
            return jsonify(Error="User does not have supervisor role"), 401

        # Create SCS record
        dao = SCSDao()
        scs_id = dao.create_scs(service_category_id, user_id)
        return {'scs_id': scs_id}

    def update_scs(self, scs_id, update_data):
        # Check if SCS exists
        dao = SCSDao()
        scs = dao.get_scs_by_id(scs_id)
        if not scs:
            return jsonify(Error="Service category supervisor not found"), 404

        # Check if user has supervisor role
        user_dao = UserDAO()
        user = user_dao.get_user_by_id(scs['user_id'])
        if user['role_id'] != 2:
            return jsonify(Error="User does not have supervisor role"), 400

        # Get update data from request body
        update_data = request.get_json()
        if not update_data:
            return jsonify(Error="Missing JSON request body"), 400

        # Update SCS record
        try:
            dao.update_scs(scs_id, update_data)
            return jsonify(Message="Service category supervisor updated successfully"), 200
        except:
            return jsonify(Error="Failed to update service category supervisor"), 500

    def delete_scs(self, scs_id):
        dao = SCSDao()
        if not dao.get_scs_by_id(scs_id):
            return jsonify(Error="Service category supervisor not found"), 404
        else:
            dao.delete_scs(scs_id)
            return jsonify(Message="Service category supervisor deleted successfully"), 200