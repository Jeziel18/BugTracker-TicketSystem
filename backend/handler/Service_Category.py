from flask import Flask, jsonify, request
from backend.dao.Service_Category import ServiceCategoryDAO


class ServiceCategoryHandler:
    def __init__(self):
        self.service_category_DAO = ServiceCategoryDAO()

    def build_servicecategory_dict(self, row):
        result = {}
        result['service_category_id'] = row[0],
        result['category_name'] = row[1]
        return result

    def build_servicecategory_attributes(self, service_category_id, category_name):
        result = {}
        result['service_category_id'] = service_category_id,
        result['category_name'] = category_name
        return result

    def get_all_service_categories(self):
        dao = self.service_category_DAO
        service_categories = dao.get_all_service_categories()
        result = []
        for service_category in service_categories:
            service_category_dict = self.build_servicecategory_dict(service_category)
            result.append(service_category_dict)
        return result

    def get_service_category_by_id(self, service_category_id):
        dao = self.service_category_DAO
        service_categories = dao.get_service_category_by_id(service_category_id)
        if not service_categories:
            return jsonify(Error="Service category not found."), 404
        else:
            service_category_dict = self.build_servicecategory_dict(service_categories)
            return jsonify(service_category_dict), 200

    def create_service_category(self, category_name):
        dao = self.service_category_DAO
        service_category_id = dao.create_service_category(category_name)
        return {'service_category_id': service_category_id}

    def update_service_category(self, service_category_id, update_data):
        # Check if service category exists
        service_category = self.service_category_DAO.get_service_category_by_id(service_category_id)
        if not service_category:
            return jsonify(Error="Service category not found"), 404

        # Update service category record
        try:
            self.service_category_DAO.update_service_category(service_category_id, update_data)
            return jsonify(Message="Service category updated successfully"), 200
        except:
            return jsonify(Error="Failed to update service category"), 500

    def delete_service_category(self, service_category_id):
        dao = ServiceCategoryDAO()
        if not dao.get_service_category_by_id(service_category_id):
            return jsonify(Error="Service Category not found."), 404
        else:
            dao.delete_service_category(service_category_id)
            return jsonify(DeleteStatus = "OK"), 200
    def get_category_name_by_id(self, category_id):
        return self.service_category_DAO.get_category_name_by_id(category_id)