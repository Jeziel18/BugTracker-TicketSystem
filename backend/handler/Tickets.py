from flask import Flask, jsonify, request, session
from backend.dao.Building import BuildingDAO
from backend.dao.Service_Category import ServiceCategoryDAO
from backend.dao.Tickets import TicketsDAO
from datetime import datetime, time, date

class TicketsHandler:
    def __init__(self):
        self.Tickets_DAO = TicketsDAO()
        self.building_dao = BuildingDAO()
        self.service_category_dao = ServiceCategoryDAO()

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
        result['ticket_activity_time'] = str(row[13]),  # convert timedelta to string
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

    def update_ticket(self, ticket_id, update_data):
        # Check if ticket exists
        ticket = self.Tickets_DAO.get_ticket_by_id(ticket_id)
        if not ticket:
            return jsonify(Error="Ticket not found"), 404

        # Get update data from request body
        update_data = request.get_json()
        if not update_data:
            return jsonify(Error="Missing JSON request body"), 400

        # Update ticket record
        try:
            self.Tickets_DAO.update_ticket(ticket_id, update_data)
            return jsonify(Message="Ticket updated successfully"), 200
        except:
            return jsonify(Error="Failed to update ticket"), 500

#Statistics
    def count_total_tickets(self):
        total_tickets_created = self.Tickets_DAO.count_total_tickets()
        return jsonify(total_tickets_created)

    def get_monthly_yearly_tickets_created(self, year, months):
        monthly_tickets_created = self.Tickets_DAO.get_monthly_tickets_created(year, months)
        yearly_tickets_created = self.Tickets_DAO.get_yearly_tickets_created(year)
        return jsonify({'monthly_tickets_created': monthly_tickets_created,
                         'yearly_tickets_created': yearly_tickets_created})

    def get_monthly_tickets_by_status(self, year, months):
        monthly_tickets_by_status = {"open": {}, "pending": {}, "closed": {}}
        tickets = self.Tickets_DAO.get_monthly_tickets_by_status(year, months)
        for status, counts in tickets.items():
            for month, count in counts.items():
                monthly_tickets_by_status[status][month] = count
        return monthly_tickets_by_status

    def get_yearly_tickets_by_status(self, year):
        yearly_tickets_by_status = {"open": 0, "pending": 0, "closed": 0}
        tickets = self.Tickets_DAO.get_yearly_tickets_by_status(year)
        for status, count in tickets.items():
            yearly_tickets_by_status[status] = count
        return yearly_tickets_by_status

    def get_monthly_yearly_tickets_by_status(self, year, months):
        yearly_count = self.get_yearly_tickets_by_status(year)
        monthly_count = self.get_monthly_tickets_by_status(year, months)
        return {"yearly_count": yearly_count, "monthly_count": monthly_count}

    def get_total_tickets_by_status(self):
        total_tickets_by_status = {"open": 0, "pending": 0, "closed": 0}
        tickets_count_by_status = self.Tickets_DAO.get_tickets_count_by_status()
        for status, count in tickets_count_by_status.items():
            total_tickets_by_status[status] = count
        return total_tickets_by_status

    def get_top_buildings(self, limit=5):
        top_buildings = self.Tickets_DAO.get_top_buildings(limit)
        top_buildings_with_names = {}
        for building_name, count in top_buildings.items():
            top_buildings_with_names[building_name] = count
        return top_buildings_with_names

    def get_top_service_categories(self, limit=3):
        top_categories = self.Tickets_DAO.get_top_service_categories(limit)
        top_categories_with_names = {}
        for category_name, count in top_categories:
            top_categories_with_names[category_name] = count
        return top_categories_with_names

    def get_top_service_categories_by_year_and_month(self, year, months):
        top_categories = self.Tickets_DAO.get_top_service_categories_by_year_and_month(year, months)
        top_categories_with_names = {}
        for category_name, count in top_categories:
            top_categories_with_names[category_name] = count
        return top_categories_with_names







