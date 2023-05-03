from flask import Flask, jsonify, request
from backend.dao.Services import ServicesDAO
class ServicesHandler:
    def __init__(self):
        self.services_dao = ServicesDAO()
    def build_services_dict(self, row):
        result = {}
        result['service_id'] = row[0],
        result['service_name'] = row[1],
        return result

    def build_role_attributes(self, service_id, service_name):
        result = {}
        result['service_id'] = service_id,
        result['service_name'] = service_name,
        return result
    def get_all_services(self):
        return self.services_dao.get_all_services()

    def get_service_by_id(self, service_id):
        service = self.services_dao.get_service_by_id(service_id)
        if service is None:
            return jsonify(Error="Service not found."), 404
        else:
            return jsonify(self.build_services_dict(service)), 200
    def create_service(self, service_name, service_category_id):
        # check if the corresponding service_category_id exists
        if not self.services_dao.get_service_category_by_id(service_category_id):
            return jsonify(Error="Invalid service category ID"), 400

        service_id = self.services_dao.create_service(service_name, service_category_id)
        if service_id:
            return {'service_id': service_id}, 201
        else:
            return jsonify(Error="Failed to create service"), 500

    def update_service(self, service_id, update_data):
        # check if the corresponding service_category_id exists
        if 'service_category_id' in update_data:
            if not self.services_dao.get_service_category_by_id(update_data['service_category_id']):
                return jsonify(Error="Invalid service category ID"), 400

        result = self.services_dao.update_service(service_id, update_data)
        if result:
            return jsonify(Message="Service updated successfully"), 200
        else:
            return jsonify(Error="Service not found or no changes made"), 404