from collections import OrderedDict

from flask import Flask, jsonify, request, session
from backend.dao.Building import BuildingDAO
from backend.dao.Service_Category import ServiceCategoryDAO
from backend.dao.Services import ServicesDAO
from backend.dao.Tickets import TicketsDAO
from datetime import datetime, time, date, timedelta
from backend.handler.Users import UserHandler

from backend.dao.Users import UserDAO


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

    def build_tickets_name_dict(self, row):
        result = OrderedDict()
        result['ticket_id'] = row[0],
        result['email'] = row[1],
        result['category_name'] = row[2],
        result['service_name'] = row[3],
        result['ticket_priority'] = row[4],
        result['building_name'] = row[5],
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
    def build_tickets_name_attributes(self, ticket_id, email, category_name, service_name, ticket_priority,
                                 building_name,
                                 office_number, job_description, dean, department, ticket_phone_number,
                                 ticket_activity_name, ticket_activity_date, ticket_activity_time, ticket_assigned_to,
                                 ticket_creation_date, ticket_update_date, ticket_status):
        ticket = {
            "ticket_id": ticket_id,
            "email": email,
            "category_name": category_name,
            "service_name": service_name,
            "ticket_priority": ticket_priority,
            "building_name": building_name,
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

    def get_user_tickets(self, user_id):
        rows = self.Tickets_DAO.get_all_tickets_by_user(user_id)
        tickets = []
        for row in rows:
            ticket = self.build_tickets_dict(row)
            tickets.append(ticket)
        return {"Tickets": tickets}

    def get_all_tickets_by_status(self, ticket_status):
        tickets = []
        try:
            results = self.Tickets_DAO.get_all_tickets_by_status(ticket_status)
            for row in results:
                ticket = self.build_tickets_dict(row)
                tickets.append(ticket)
        except:
            print("Error while fetching data from database")
        return tickets

    # def get_all_tickets_display_name(self):
    #     tickets = self.Tickets_DAO.get_all_tickets_display_name()
    #     result = []
    #     for row in tickets:
    #         ticket = (
    #             row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9],
    #             row[10], row[11], row[12], str(row[13]), row[14], row[15], row[16], row[17]
    #         )
    #         result.append(ticket)
    #     # Define the desired order of the keys
    #     order = [
    #         "ticket_id", "email", "category_name", "service_name", "ticket_priority",
    #         "building_name", "office_number", "job_description", "dean", "department",
    #         "ticket_phone_number", "ticket_activity_name", "ticket_activity_date", "ticket_activity_time",
    #         "ticket_assigned_to", "ticket_creation_date", "ticket_update_date", "ticket_status"
    #     ]
    #     # Sort the result list based on the order of the keys
    #     sorted_result = [dict(zip(order, t)) for t in result]
    #     return sorted_result
    def get_all_tickets_display_name(self):
        tickets = self.Tickets_DAO.get_all_tickets_display_name()
        result = []
        for row in tickets:
            ticket = self.build_tickets_name_dict(row)
            result.append(ticket)
        # Sort the list of dictionaries based on the ticket_id key
        sorted_result = sorted(result, key=lambda k: k['ticket_id'])
        return sorted_result

    def get_all_tickets_display_name_by_status(self, status):
        tickets = self.Tickets_DAO.get_all_tickets_display_name_by_status(status)
        result = []
        for row in tickets:
            ticket = self.build_tickets_name_dict(row)
            result.append(ticket)
        # Sort the list of dictionaries based on the ticket_id key
        sorted_result = sorted(result, key=lambda k: k['ticket_id'])
        return sorted_result

    #Statistics
    def count_total_tickets(self):
        total_tickets_created = self.Tickets_DAO.count_total_tickets()
        return jsonify(total_tickets_created)

    def get_monthly_yearly_tickets_created(self, years, months):

        if not years and not months:
            return jsonify(Error="Invalid request parameters"), 400

        elif not months:
            yearly_tickets = self.Tickets_DAO.get_tickets_created_by_year(years)
            return yearly_tickets

        elif not years:
            monthly_tickets = self.Tickets_DAO.get_tickets_created_by_month(months)
            return monthly_tickets

        else:
            monthly_yearly_tickets = self.Tickets_DAO.get_monthly_yearly_tickets_created(years, months)
            return monthly_yearly_tickets

    def get_monthly_yearly_tickets_by_status(self, years, months):

        if not years and not months:
            return jsonify(Error="Invalid request parameters"), 400

        elif not months:
            yearly_ticket_status = self.Tickets_DAO.get_ticket_status_by_year(years)
            return yearly_ticket_status

        elif not years:
            monthly_ticket_status = self.Tickets_DAO.get_ticket_status_by_month(months)
            return monthly_ticket_status

        else:
            monthly_yearly_tickets = self.Tickets_DAO.get_monthly_yearly_tickets_by_status(years, months)
            return monthly_yearly_tickets

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

    def get_full_report_by_year_and_month(self, year, month):
        dao = TicketsDAO()

        if year == [] and month == []:
            return jsonify(Error="Missing JSON request body"), 400

        elif not month:
            full_report = dao.get_full_report_by_year(year)
            return full_report

        elif not year:
            full_report = dao.get_full_report_by_month(month)
            return full_report

        else:
            full_report = dao.get_full_report_by_year_and_month(year, month)
            return full_report

    def get_category_report_by_year_and_month(self, year, month):
        dao = TicketsDAO()

        if year == [] and month == []:
            return jsonify(Error="Missing JSON request body"), 400

        elif not month:
            category_report = dao.get_category_report_by_year(year)
            return category_report

        elif not year:
            category_report = dao.get_category_report_by_month(month)
            return category_report

        else:
            category_report = dao.get_category_report_by_year_and_month(year, month)
            return category_report
