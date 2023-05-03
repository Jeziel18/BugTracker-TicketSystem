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
        cursor.execute("SELECT * FROM service_catergory_supervisor")
        rows = cursor.fetchall()
        result = []
        for row in rows:
            result.append(row)
        return result

