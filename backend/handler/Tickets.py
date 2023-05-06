from flask import Flask, jsonify, request
from backend.dao.Tickets import TicketsDAO
from datetime import datetime, time, date

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

    def build_tickets_attributes(self, ticket_id, user_id, service_category_id, service_id, ticket_priority,
                                 building_id,
                                 office_number, job_description, dean, department, ticket_phone_number,
                                 ticket_activity_name, ticket_activity_date, ticket_activity_time, ticket_assigned_to,
                                 ticket_creation_date, ticket_update_date, ticket_status):
        ticket = {
            "ticket_id": ticket_id,
            "user_id": user_id,
            "service_category_id": service_category_id,
            "service_id": service_id,
            "ticket_priority": ticket_priority,
            "building_id": building_id,
            "office_number": office_number,
            "job_description": job_description,
            "dean": dean,
            "department": department,
            "ticket_phone_number": ticket_phone_number,
            "ticket_activity_name": ticket_activity_name,
            "ticket_activity_date": ticket_activity_date,
            "ticket_activity_time": ticket_activity_time,
            "ticket_assigned_to": ticket_assigned_to,
            "ticket_creation_date": ticket_creation_date,
            "ticket_update_date": ticket_update_date,
            "ticket_status": ticket_status
        }
        return ticket

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
    def create_ticket(self, user_id, service_category_id, service_id, ticket_priority, building_id, office_number,
                      job_description, dean, department, ticket_phone_number, ticket_activity_name=None,
                      ticket_activity_date=None, ticket_activity_time=None, ticket_assigned_to=None):
        dao = TicketsDAO()
        ticket_id = dao.create_ticket(user_id, service_category_id, service_id, ticket_priority, building_id,
                                      office_number, job_description, dean, department, ticket_phone_number,
                                      ticket_activity_name, ticket_activity_date, ticket_activity_time,
                                      ticket_assigned_to)
        if ticket_id:
            # Build the attributes for the response
            result = self.build_tickets_attributes(ticket_id, user_id, service_category_id, service_id, ticket_priority,
                                                   building_id, office_number, job_description, dean, department,
                                                   ticket_phone_number, ticket_activity_name, ticket_activity_date,
                                                   ticket_activity_time, ticket_assigned_to, datetime.now(), None,
                                                   "open")
            return jsonify(Ticket=result), 201
        else:
            return jsonify(Error="Failed to create ticket."), 400

