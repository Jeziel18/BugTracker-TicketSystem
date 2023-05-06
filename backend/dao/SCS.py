from flask import jsonify
import mysql.connector

class SCSDao:
    def __init__(self):
        self.conn = mysql.connector.connect(
            host='v2uedk.stackhero-network.com',
            user='root',
            password='mqtpPGesxVvYN2SuboZZMvHzmQcPrcTj',
            database='root',
            port=3306
        )

    def get_all_supervisors(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM service_category_supervisor")
        rows = cursor.fetchall()
        result = []
        for row in rows:
            result.append(row)
        return result

    def get_scs_by_id(self, scs_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM service_category_supervisor WHERE scs_id = %s", (scs_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return row
        else:
            return None

    def create_scs(self, service_category_id, user_id):
        cursor = self.conn.cursor()
        query = "INSERT INTO service_category_supervisor(service_category_id, user_id) VALUES (%s, %s) RETURNING scs_id;"
        cursor.execute(query, (service_category_id, user_id,))
        scs_id = cursor.fetchone()[0]
        self.conn.commit()
        return scs_id

    def update_scs(self, scs_id, update_data):
        cursor = self.conn.cursor()
        query = "UPDATE service_category_supervisor SET"
        params = []

        if 'service_category_id' in update_data:
            query += " service_category_id = %s,"
            params.append(update_data['service_category_id'])

        if 'user_id' in update_data:
            query += " user_id = %s,"
            params.append(update_data['user_id'])

        # Remove trailing comma from query string
        query = query.rstrip(',')

        # Add WHERE clause to specify the SCS record to update
        query += " WHERE scs_id = %s"
        params.append(scs_id)

        cursor.execute(query, params)
        self.conn.commit()
        cursor.close()
    def delete_scs(self, scs_id):
        cursor = self.conn.cursor()
        query = "DELETE FROM service_category_supervisors WHERE scs_id = %s;"
        cursor.execute(query, (scs_id,))
        self.conn.commit()
        return scs_id
    def get_service_category_supervisor(self, user_id, service_category_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM service_category_supervisor WHERE user_id = %s AND service_category_id = %s", (user_id, service_category_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return row
        else:
            return None



