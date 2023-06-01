from flask import jsonify
import mysql.connector
class UserDAO:

    def __init__(self):
        self.conn = mysql.connector.connect(
            host='q0h7yf5pynynaq54.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user='jft56bslc0rwwcwt',
            password='q3npybt3z33q7v3i',
            database='i3ivmnq2iqbac8me',
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

    def get_user_by_login(self, login_data):
        cursor = self.conn.cursor()

        search_clause = ""
        login_values = []
        for key, value in login_data.items():
            search_clause += f"{key} = %s and "
            login_values.append(value)
        search_clause = search_clause[:-4]

        query = f"SELECT count(user_id), user_id, email FROM users WHERE {search_clause}"
        cursor.execute(query, tuple(login_values))
        login = cursor.fetchone()
        self.conn.connect()
        return login

    def get_email_by_id(self, user_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT email FROM users WHERE user_id = %s", (user_id,))
        email = cursor.fetchone()
        if email is not None:
            return email[0]
        return None
