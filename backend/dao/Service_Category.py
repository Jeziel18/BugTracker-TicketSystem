from flask import jsonify
import mysql.connector

class ServiceCategoryDAO:
    def __init__(self):
        self.conn = mysql.connector.connect(
            host='v2uedk.stackhero-network.com',
            user='root',
            password='mqtpPGesxVvYN2SuboZZMvHzmQcPrcTj',
            database='root',
            port=3306
        )

    def get_all_service_categories(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM service_category")
        rows = cursor.fetchall()
        result = []
        for row in rows:
            result.append(row)
        return result

    def get_service_category_by_id(self, service_category_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM service_category WHERE service_category_id = %s", (service_category_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return row
        else:
            return None

    def create_service_category(self, category_name):
        cursor = self.conn.cursor()
        query = "INSERT INTO service_category(category_name) VALUES (%s) RETURNING service_category_id;"
        cursor.execute(query, (category_name,))
        service_category_id = cursor.fetchone()[0]
        self.conn.commit()
        return service_category_id

    def update_service_category(self, service_category_id, update_data):
        cursor = self.conn.cursor()
        query = "UPDATE service_category SET category_name = %s WHERE service_category_id = %s;"
        cursor.execute(query, (update_data['category_name'], service_category_id))
        self.conn.commit()

        # Check if any row was modified
        if cursor.rowcount == 0:
            return False
        else:
            return True

    def delete_service_category(self, service_category_id):
        cursor = self.conn.cursor()
        query = "DELETE FROM service_category WHERE service_category_id = %s;"
        cursor.execute(query, (service_category_id,))
        self.conn.commit()
        return service_category_id

    def get_category_name(self, category_id):
        cursor = self.conn.cursor()
        query = "SELECT category_name FROM service_categories WHERE category_id = %s"
        cursor.execute(query, (category_id,))
        category = cursor.fetchone()
        if not category:
            return None
        return category[0]