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