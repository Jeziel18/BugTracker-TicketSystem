from flask import Flask, jsonify, request
from backend.dao.Building import BuildingDAO

class BuildingHandler:
    def __init__(self):
        self.building_dao = BuildingDAO()
    def build_building_dict(self, row):
        result = {}
        result['building_id'] = row[0],
        result['building_name'] = row[1],
        result['building_number'] = row[2]
        return result

    def build_building_attributes(self, building_id, building_name, building_number):
        result = {}
        result['building_id'] = building_id,
        result['building_name'] = building_name,
        result['building_number'] = building_number
        return result
    def get_all_buildings(self):
        buildings = self.building_dao.get_all_buildings()
        building_list = []
        for building in buildings:
            building_list.append(self.build_building_dict(building))
        return jsonify(Buildings=building_list), 200

    def get_building_by_id(self, building_id):
        building = self.building_dao.get_building_by_id(building_id)
        if building is None:
            return jsonify(Error="Building not found."), 404
        else:
            return jsonify(self.build_building_dict(building)), 200
    def create_building(self, building_name, building_number):
        building_id = self.building_dao.create_building(building_name, building_number)
        return {'building_id': building_id}

    def update_building(self, building_id, update_data):
        # Check if building exists
        building = self.building_dao.get_building_by_id(building_id)
        if not building:
            return jsonify(Error="Building not found"), 404

        # Get update data from request body
        update_data = request.get_json()
        if not update_data:
            return jsonify(Error="Missing JSON request body"), 400

        # Update building record
        try:
            self.building_dao.update_building(building_id, update_data)
            return jsonify(Message="Building updated successfully"), 200
        except:
            return jsonify(Error="Failed to update building"), 500
