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
