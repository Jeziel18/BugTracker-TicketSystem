from datetime import datetime
from flask import jsonify
import mysql.connector

class TicketsDAO:
    def __init__(self):
        self.conn = mysql.connector.connect(
            host='v2uedk.stackhero-network.com',
            user='root',
            password='mqtpPGesxVvYN2SuboZZMvHzmQcPrcTj',
            database='root',
            port=3306
        )

    def get_all_tickets(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM tickets")
        rows = cursor.fetchall()
        return rows

    def get_ticket_by_id(self, ticket_id):
        cursor = self.conn.cursor()
        query = "SELECT * FROM tickets WHERE ticket_id = %s"
        cursor.execute(query, (ticket_id,))
        result = cursor.fetchone()
        return result

    def create_ticket(self, user_id, service_category_id, service_id, ticket_priority, building_id, office_number,
                      job_description, dean, department, ticket_phone_number, ticket_activity_name=None,
                      ticket_activity_date=None, ticket_activity_time=None, ticket_assigned_to=None):
        cursor = self.conn.cursor()
        creation_date = datetime.now()
        status = 'open'
        query = "INSERT INTO tickets(user_id, service_category_id, service_id, ticket_priority, building_id, " \
                "office_number, job_description, dean, department, ticket_phone_number, ticket_activity_name, " \
                "ticket_activity_date, ticket_activity_time, ticket_assigned_to, ticket_creation_date, " \
                "ticket_update_date, ticket_status) " \
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING ticket_id"
        cursor.execute(query, (
            user_id, service_category_id, service_id, ticket_priority, building_id, office_number, job_description,
            dean, department, ticket_phone_number, ticket_activity_name, ticket_activity_date, ticket_activity_time,
            ticket_assigned_to, creation_date, None, status))
        ticket_id = cursor.fetchone()[0]
        self.conn.commit()
        return ticket_id

    def update_ticket(self, ticket_id, update_data):
        cursor = self.conn.cursor()
        # Build SET clause for SQL query based on updated data
        set_clause = ""
        update_values = []
        for key, value in update_data.items():
            if key == 'user_id':
                continue  # user_id cannot be updated
            set_clause += f"{key} = %s, "
            update_values.append(value)
        set_clause = set_clause[:-2]

        # Execute SQL query to update ticket record
        query = f"UPDATE tickets SET {set_clause}, ticket_update_date = %s WHERE ticket_id = %s;"
        update_values.extend([datetime.now(), ticket_id])
        cursor.execute(query, tuple(update_values))
        self.conn.commit()





