from flask import jsonify
from backend.config.network_config import config
import mysql.connector

class RolesDAO:
    def __init__(self):
        self.conn = mysql.connector.connect(
            host='q0h7yf5pynynaq54.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user='jft56bslc0rwwcwt',
            password='q3npybt3z33q7v3i',
            database='i3ivmnq2iqbac8me',
            port=3306
        )

    def get_all_roles(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM roles")
        rows = cursor.fetchall()
        result = []
        for row in rows:
            result.append(row)
        return result

    def get_role_by_id(self, role_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM roles WHERE role_id = %s", (role_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return row
        else:
            return None

    def create_role(self, role_name):
        cursor = self.conn.cursor()
        query = "INSERT INTO roles(role_name) VALUES (%s) RETURNING role_id;"
        cursor.execute(query, (role_name,))
        role_id = cursor.fetchone()[0]
        self.conn.commit()
        return role_id

    def update_role(self, role_id, update_data):
        cursor = self.conn.cursor()

        # Build SET clause for SQL query based on updated data
        set_clause = ""
        update_values = []
        for key, value in update_data.items():
            set_clause += f"{key} = %s, "
            update_values.append(value)
        set_clause = set_clause[:-2]

        # Execute SQL query to update role record
        query = f"UPDATE roles SET {set_clause} WHERE role_id = %s;"
        update_values.append(role_id)
        cursor.execute(query, tuple(update_values))
        self.conn.commit()

        return {'role_id': role_id}

    def delete_role(self, role_id):
        cursor = self.conn.cursor()
        cursor.execute("DELETE FROM roles WHERE role_id = %s", (role_id,))
        self.conn.commit()
        cursor.close()
        return role_id
