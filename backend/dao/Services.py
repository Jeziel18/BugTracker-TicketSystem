from flask import jsonify
import mysql.connector
class ServicesDAO:
    def __init__(self):
        self.conn = mysql.connector.connect(
            host='v2uedk.stackhero-network.com',
            user='root',
            password='mqtpPGesxVvYN2SuboZZMvHzmQcPrcTj',
            database='root',
            port=3306
        )

    def get_all_services(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM services")
        rows = cursor.fetchall()
        result = []
        for row in rows:
            result.append(row)
        return result

    def get_service_by_id(self, service_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM services WHERE service_id = %s", (service_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return row
        else:
            return None

    def create_service(self, service_name, service_category_id):
        cursor = self.conn.cursor()
        query = "INSERT INTO services(service_name, service_category_id) VALUES (%s, %s) RETURNING service_id;"
        cursor.execute(query, (service_name, service_category_id,))
        service_id = cursor.fetchone()[0]
        self.conn.commit()
        return service_id

    def update_service(self, service_id, update_data):
        cursor = self.conn.cursor()

        # Build SET clause for SQL query based on updated data
        set_clause = ""
        update_values = []
        for key, value in update_data.items():
            set_clause += f"{key} = %s, "
            update_values.append(value)
        set_clause = set_clause[:-2]

        # Execute SQL query to update service record
        query = f"UPDATE services SET {set_clause} WHERE service_id = %s;"
        update_values.append(service_id)
        cursor.execute(query, tuple(update_values))
        self.conn.commit()

        return {'service_id': service_id}

    def get_service_category_by_id(self, service_category_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM service_category WHERE service_category_id = %s", (service_category_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return row
        else:
            return None

    def delete_service(self, service_id):
        cursor = self.conn.cursor()
        cursor.execute("DELETE FROM services WHERE service_id = %s", (service_id,))
        self.conn.commit()
        cursor.close()
        return service_id
    def get_service_name_by_id(self, service_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT service_name FROM services WHERE service_id=%s", (service_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return row[0]
        else:
            return None
