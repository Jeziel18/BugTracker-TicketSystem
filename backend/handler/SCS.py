from flask import Flask, jsonify, request
from backend.dao.SCS import SCSDao

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