from flask import Flask, jsonify, request
from backend.dao.Tickets import TicketsDAO

class TicketsHandler:
    def __init__(self):
        self.Tickets_DAO = TicketsDAO()
    def build_tickets_dict(self, row):
        result = {}
        result['ticket_id'] = row[0],
        result['user_id'] = row[1],
        result['service_category_id'] = row[2],
        result['service_id'] = row[3],
        result['ticket_priority'] = row[4],
        result['building_id'] = row[5],
        result['office_number'] = row[6],
        result['job_description'] = row[7],
        result['dean'] = row[8],
        result['department'] = row[9],
        result['ticket_phone_number'] = row[10],
        result['ticket_activity_name'] = row[11],
        result['ticket_activity_date'] = row[12],
        result['ticket_activity_time'] = row[13],
        result['ticket_assigned_to'] = row[14],
        result['ticket_creation_date'] = row[15],
        result['ticket_update_date'] = row[16],
        result['ticket_status'] = row[17]
        return result

    def build_tickets_attributes(self, ticket_id, user_id, service_category_id, service_id, ticket_priority, building_id, office_number, job_description, dean, department, ticket_phone_number, ticket_activity_name, ticket_activity_date, ticket_activity_time, ticket_assigned_to, ticket_creation_date, ticket_update_date, ticket_status):
        result = {}
        result['ticket_id'] = ticket_id,
        result['user_id'] = user_id,
        result['service_category_id'] = service_category_id,
        result['service_id'] = service_id,
        result['ticket_priority'] = ticket_priority,
        result['building_id'] = building_id,
        result['office_number'] = office_number,
        result['job_description'] = job_description,
        result['dean'] = dean,
        result['department'] = department,
        result['ticket_phone_number'] = ticket_phone_number,
        result['ticket_activity_name'] = ticket_activity_name,
        result['ticket_activity_date'] = ticket_activity_date,
        result['ticket_activity_time'] = ticket_activity_time,
        result['ticket_assigned_to'] = ticket_assigned_to,
        result['ticket_creation_date'] = ticket_creation_date,
        result['ticket_update_date'] = ticket_update_date,
        result['ticket_status'] = ticket_status
        return result

    def get_all_tickets(self):
        tickets = self.Tickets_DAO.get_all_tickets()
        ticket_list = []
        for ticket in tickets:
            ticket_list.append(self.build_tickets_dict(ticket))
        return jsonify(Tickets=ticket_list), 200

    def get_ticket_by_id(self, ticket_id):
        dao = TicketsDAO()
        ticket = dao.get_ticket_by_id(ticket_id)
        if not ticket:
            return jsonify(Error="Ticket not found."), 404
        else:
            result = self.build_tickets_dict(ticket)
            return jsonify(result), 200
