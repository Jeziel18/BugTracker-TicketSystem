from flask import jsonify
import mysql.connector
class UserDAO:

    def __init__(self):
        self.conn = mysql.connector.connect(
            host='v2uedk.stackhero-network.com',
            user='root',
            password='mqtpPGesxVvYN2SuboZZMvHzmQcPrcTj',
            database='root',
            port=3306
        )

    def get_all_users(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM users")
        rows = cursor.fetchall()
        result = []
        for row in rows:
            result.append(row)
        return result

    def get_user_by_id(self,user_id):
        cursor = self.conn.cursor()
        cursor.execute("Select * FROM users WHERE user_id = %s", (user_id,))
        rows = cursor.fetchone()
        cursor.close()
        if rows:
            return rows
        else:
            return None

    def create_user(self, first_name, last_name, email, password, phone_number, phone_extension):
        cursor = self.conn.cursor()
        query = "INSERT INTO users(first_name, last_name, email, password, role_id, phone_number, phone_extension) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING user_id;"
        cursor.execute(query, (first_name, last_name, email, password, 3, phone_number, phone_extension,))
        user_id = cursor.fetchone()[0]
        self.conn.commit()
        return user_id

    def update_user(self, user_id, update_data):
        cursor = self.conn.cursor()
        # Build SET clause for SQL query based on updated data
        set_clause = ""
        update_values = []
        for key, value in update_data.items():
            set_clause += f"{key} = %s, "
            update_values.append(value)
        set_clause = set_clause[:-2]

        # Execute SQL query to update user record
        query = f"UPDATE users SET {set_clause} WHERE user_id = %s;"
        update_values.append(user_id)
        cursor.execute(query, tuple(update_values))
        self.conn.commit()

    def get_user_by_role_id (self, role_id):
        cursor = self.conn.cursor()
        query = "SELECT * FROM users WHERE role_id = %s;"
        cursor.execute(query, (role_id,))
        users = cursor.fetchall()
        return users

    def delete_user(self, user_id):
        cursor = self.conn.cursor()
        cursor.execute("DELETE FROM users WHERE user_id = %s", (user_id,))
        self.conn.commit()
        cursor.close()
        return user_id