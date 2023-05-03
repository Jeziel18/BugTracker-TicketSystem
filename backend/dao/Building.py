from flask import jsonify
import mysql.connector

class BuildingDAO:
    def __init__(self):
        self.conn = mysql.connector.connect(
            host='v2uedk.stackhero-network.com',
            user='root',
            password='mqtpPGesxVvYN2SuboZZMvHzmQcPrcTj',
            database='root',
            port=3306
        )

    def get_all_buildings(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM buildings")
        rows = cursor.fetchall()
        result = []
        for row in rows:
            result.append(row)
        return result

    def get_building_by_id(self, building_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM buildings WHERE building_id = %s", (building_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return row
        else:
            return None

    def create_building(self, building_name, building_number):
        cursor = self.conn.cursor()
        query = "INSERT INTO buildings(building_name, building_number) VALUES (%s, %s) RETURNING building_id;"
        cursor.execute(query, (building_name, building_number,))
        building_id = cursor.fetchone()[0]
        self.conn.commit()
        return building_id

    def update_building(self, building_id, update_data):
        cursor = self.conn.cursor()

        # Build SET clause for SQL query based on updated data
        set_clause = ""
        update_values = []
        for key, value in update_data.items():
            set_clause += f"{key} = %s, "
            update_values.append(value)
        set_clause = set_clause[:-2]

        # Execute SQL query to update building record
        query = f"UPDATE buildings SET {set_clause} WHERE building_id = %s;"
        update_values.append(building_id)
        cursor.execute(query, tuple(update_values))
        self.conn.commit()

        return {'building_id': building_id}

    def delete_building(self, building_id):
        cursor = self.conn.cursor()
        cursor.execute("DELETE FROM buildings WHERE building_id = %s", (building_id,))
        self.conn.commit()
        cursor.close()
        return building_id


