from datetime import datetime
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

    def create_ticket(self, user_id, service_category_id, service_id, ticket_priority, building_id, office_number,
                      job_description, dean, department, ticket_phone_number, ticket_activity_name=None,
                      ticket_activity_date=None, ticket_activity_time=None, ticket_assigned_to=None):
        cursor = self.conn.cursor()
        creation_date = datetime.now()
        status = 'open'
        query = "INSERT INTO tickets(user_id, service_category_id, service_id, ticket_priority, building_id, " \
                "office_number, job_description, dean, department, ticket_phone_number, ticket_activity_name, " \
                "ticket_activity_date, ticket_activity_time, ticket_assigned_to, ticket_creation_date, " \
                "ticket_update_date, ticket_status) " \
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING ticket_id"
        cursor.execute(query, (
            user_id, service_category_id, service_id, ticket_priority, building_id, office_number, job_description,
            dean, department, ticket_phone_number, ticket_activity_name, ticket_activity_date, ticket_activity_time,
            ticket_assigned_to, creation_date, None, status))
        ticket_id = cursor.fetchone()[0]
        self.conn.commit()
        return ticket_id

    def update_ticket(self, ticket_id, update_data):
        cursor = self.conn.cursor()
        # Build SET clause for SQL query based on updated data
        set_clause = ""
        update_values = []
        for key, value in update_data.items():
            if key == 'user_id':
                continue  # user_id cannot be updated
            set_clause += f"{key} = %s, "
            update_values.append(value)
        set_clause = set_clause[:-2]

        # Execute SQL query to update ticket record
        query = f"UPDATE tickets SET {set_clause}, ticket_update_date = %s WHERE ticket_id = %s;"
        update_values.extend([datetime.now(), ticket_id])
        cursor.execute(query, tuple(update_values))
        self.conn.commit()

# Statistics Down
    def count_total_tickets(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM tickets")
        total_tickets_created = cursor.fetchone()[0]
        return total_tickets_created

    def get_tickets_created_by_year(self, years):
        cursor = self.conn.cursor()
        query = """
            SELECT 
                YEAR(ticket_creation_date) AS year, 
                MONTH(ticket_creation_date) AS month, 
                COUNT(*) AS monthly_total,
                (SELECT COUNT(*) FROM tickets t2 WHERE YEAR(t2.ticket_creation_date) = YEAR(t.ticket_creation_date)) AS yearly_total
            FROM tickets t
            WHERE YEAR(ticket_creation_date) IN ({})
            GROUP BY YEAR(ticket_creation_date), MONTH(ticket_creation_date)
            ORDER BY YEAR(ticket_creation_date) ASC, MONTH(ticket_creation_date) ASC
        """.format(",".join("%s" for _ in range(len(years))))
        cursor.execute(query, (*years,))
        yearly_tickets = []
        for row in cursor:
            yearly_tickets.append({
                "year": row[0],
                "month": row[1],
                "monthly_total": row[2],
                "yearly_total": row[3]
            })
        return yearly_tickets

    def get_tickets_created_by_month(self, months):
        cursor = self.conn.cursor()
        query = """
            SELECT 
                YEAR(ticket_creation_date) AS year, 
                MONTH(ticket_creation_date) AS month, 
                COUNT(*) AS monthly_total,
                (SELECT COUNT(*) FROM tickets t2 WHERE YEAR(t2.ticket_creation_date) = YEAR(t.ticket_creation_date)) AS yearly_total
            FROM tickets t
            WHERE MONTH(ticket_creation_date) IN ({})
            GROUP BY YEAR(ticket_creation_date), MONTH(ticket_creation_date)
            ORDER BY YEAR(ticket_creation_date) ASC, MONTH(ticket_creation_date) ASC
        """.format(",".join("%s" for _ in range(len(months))))
        cursor.execute(query, (*months,))
        monthly_tickets = []
        for row in cursor:
            monthly_tickets.append({
                "year": row[0],
                "month": row[1],
                "monthly_total": row[2],
                "yearly_total": row[3]
            })
        return monthly_tickets

    def get_monthly_yearly_tickets_created(self, years, months):
        cursor = self.conn.cursor()
        query = """
            SELECT 
                YEAR(ticket_creation_date) AS year, 
                MONTH(ticket_creation_date) AS month, 
                COUNT(*) AS monthly_total,
                (SELECT COUNT(*) FROM tickets t2 WHERE YEAR(t2.ticket_creation_date) = YEAR(t.ticket_creation_date)) AS yearly_total
            FROM tickets t
            WHERE YEAR(ticket_creation_date) IN ({})
            AND MONTH(ticket_creation_date) IN ({})
            GROUP BY YEAR(ticket_creation_date), MONTH(ticket_creation_date)
            ORDER BY YEAR(ticket_creation_date) ASC, MONTH(ticket_creation_date) ASC
        """.format(",".join("%s" for _ in range(len(years))), ",".join("%s" for _ in range(len(months))))
        cursor.execute(query, (*years, *months))
        monthly_yearly_tickets = []
        for row in cursor:
            monthly_yearly_tickets.append({
                "year": row[0],
                "month": row[1],
                "monthly_total": row[2],
                "yearly_total": row[3]
            })
        return monthly_yearly_tickets

    def get_monthly_yearly_tickets_by_status(self, years, months):
        cursor = self.conn.cursor()
        query = """
            SELECT YEAR(ticket_creation_date) as year, MONTH(ticket_creation_date) as month, ticket_status, COUNT(*) as count
            FROM tickets
            WHERE YEAR(ticket_creation_date) IN ({})
            AND MONTH(ticket_creation_date) IN ({})
            GROUP BY YEAR(ticket_creation_date), MONTH(ticket_creation_date), ticket_status
            ORDER BY YEAR(ticket_creation_date), MONTH(ticket_creation_date), count DESC;
        """.format(",".join("%s" for _ in range(len(years))), ",".join("%s" for _ in range(len(months))))
        cursor.execute(query, (*years, *months))
        monthly_count = {}
        for row in cursor:
            year = row[0]
            month = row[1]
            status = row[2]
            count = row[3]
            if year not in monthly_count:
                monthly_count[year] = {}
            if month not in monthly_count[year]:
                monthly_count[year][month] = {}
            monthly_count[year][month][status] = count
        return monthly_count

    def get_tickets_count_by_status(self):
        cursor = self.conn.cursor()
        query = "SELECT ticket_status, COUNT(*) as total_tickets FROM tickets GROUP BY ticket_status"
        cursor.execute(query)
        tickets_count_by_status = {}
        for status, count in cursor:
            tickets_count_by_status[status] = count
        return tickets_count_by_status

    def get_top_buildings(self, limit=5):
        cursor = self.conn.cursor()
        query = "SELECT buildings.building_name, COUNT(*) as total_tickets " \
                "FROM tickets " \
                "JOIN buildings ON tickets.building_id = buildings.building_id " \
                "GROUP BY buildings.building_name " \
                "ORDER BY total_tickets DESC " \
                "LIMIT %s"
        cursor.execute(query, (limit,))
        top_buildings = {}
        for row in cursor:
            top_buildings[row[0]] = row[1]
        return top_buildings

    def get_top_service_categories(self, limit=3):
        cursor = self.conn.cursor()
        query = "SELECT sc.category_name, COUNT(*) as total_tickets " \
                "FROM tickets t " \
                "JOIN service_category sc ON t.service_category_id = sc.service_category_id " \
                "GROUP BY sc.category_name " \
                "ORDER BY total_tickets DESC " \
                "LIMIT %s"
        cursor.execute(query, (limit,))
        top_categories = []
        for row in cursor:
            top_categories.append((row[0], row[1]))
        return top_categories

    def get_top_service_categories_by_year_and_month(self, years, months):
        cursor = self.conn.cursor()
        query = """
            SELECT sc.category_name, COUNT(*) as total_tickets
            FROM tickets t
            JOIN service_category sc ON t.service_category_id = sc.service_category_id
            WHERE YEAR(t.ticket_creation_date) IN ({})
            AND MONTH(t.ticket_creation_date) IN ({})
            GROUP BY sc.service_category_id
            ORDER BY total_tickets DESC
            LIMIT 3;
        """.format(",".join("%s" for _ in range(len(years))), ",".join("%s" for _ in range(len(months))))
        cursor.execute(query, (*years, *months))
        top_service_categories = []
        for row in cursor:
            top_service_categories.append((row[0], row[1]))
        return top_service_categories

    def get_full_report_by_year(self, years):
        cursor = self.conn.cursor()
        query = """
                SELECT YEAR(ticket_creation_date) AS year,
                MONTH(ticket_creation_date) AS month,
                sc.category_name,
                s.service_name,
                t.ticket_priority,
                t.ticket_status,
                COUNT(*) as total_tickets
                    FROM tickets t
                    JOIN service_category sc ON t.service_category_id = sc.service_category_id
                    JOIN services s ON t.service_id = s.service_id
                    WHERE YEAR(t.ticket_creation_date) IN ({})
                    GROUP BY s.service_id
                    ORDER BY year ASC, month ASC;
                """.format(",".join("%s" for _ in range(len(years))))
        cursor.execute(query, (*years,))
        full_ticket_report = []
        for row in cursor:
            full_ticket_report.append({
                "year": row[0],
                "month": row[1],
                "category": row[2],
                "service": row[3],
                "priority": row[4],
                "status": row[5],
                "total_tickets": row[6]
            })
        return full_ticket_report

    def get_full_report_by_month(self, months):
        cursor = self.conn.cursor()
        query = """
                SELECT YEAR(ticket_creation_date) AS year,
                MONTH(ticket_creation_date) AS month,
                sc.category_name,
                s.service_name,
                t.ticket_priority,
                t.ticket_status,
                COUNT(*) as total_tickets
                    FROM tickets t
                    JOIN service_category sc ON t.service_category_id = sc.service_category_id
                    JOIN services s ON t.service_id = s.service_id
                    WHERE MONTH(t.ticket_creation_date) IN ({})
                    GROUP BY s.service_id
                    ORDER BY year ASC, month ASC;
                """.format(",".join("%s" for _ in range(len(months))))
        cursor.execute(query, (*months,))
        full_ticket_report = []
        for row in cursor:
            full_ticket_report.append({
                "year": row[0],
                "month": row[1],
                "category": row[2],
                "service": row[3],
                "priority": row[4],
                "status": row[5],
                "total_tickets": row[6]
            })
        return full_ticket_report

    def get_full_report_by_year_and_month(self, years, months):
        cursor = self.conn.cursor()
        query = """
                SELECT YEAR(ticket_creation_date) AS year,
                MONTH(ticket_creation_date) AS month,
                sc.category_name,
                s.service_name,
                t.ticket_priority,
                t.ticket_status,
                COUNT(*) as total_tickets
                    FROM tickets t
                    JOIN service_category sc ON t.service_category_id = sc.service_category_id
                    JOIN services s ON t.service_id = s.service_id
                    WHERE YEAR(t.ticket_creation_date) IN ({}) AND MONTH(t.ticket_creation_date) IN ({})
                    GROUP BY s.service_id
                    ORDER BY year ASC, month ASC;
                """.format(",".join("%s" for _ in range(len(years))), ",".join("%s" for _ in range(len(months))))
        cursor.execute(query, (*years, *months))
        full_ticket_report = []
        for row in cursor:
            full_ticket_report.append({
                "year": row[0],
                "month": row[1],
                "category": row[2],
                "service": row[3],
                "priority": row[4],
                "status": row[5],
                "total_tickets": row[6]
            })
        return full_ticket_report

    def get_category_report_by_year(self, years):
        cursor = self.conn.cursor()
        query = """
                SELECT YEAR(ticket_creation_date) AS year,
                MONTH(ticket_creation_date) AS month,
                sc.category_name,
                COUNT(*) as total_tickets
                    FROM tickets t
                    JOIN service_category sc ON t.service_category_id = sc.service_category_id
                    WHERE YEAR(t.ticket_creation_date) IN ({})
                    GROUP BY sc.service_category_id
                    ORDER BY year ASC, month ASC;
                """.format(",".join("%s" for _ in range(len(years))))
        cursor.execute(query, (*years,))
        category_report = []
        for row in cursor:
            category_report.append({
                "year": row[0],
                "month": row[1],
                "category": row[2],
                "total_tickets": row[3]
            })
        return category_report

    def get_category_report_by_month(self, months):
        cursor = self.conn.cursor()
        query = """
                SELECT YEAR(ticket_creation_date) AS year,
                MONTH(ticket_creation_date) AS month,
                sc.category_name,
                COUNT(*) as total_tickets
                    FROM tickets t
                    JOIN service_category sc ON t.service_category_id = sc.service_category_id
                    WHERE MONTH(t.ticket_creation_date) IN ({})
                    GROUP BY sc.service_category_id
                    ORDER BY year ASC, month ASC;
                """.format(",".join("%s" for _ in range(len(months))))
        cursor.execute(query, (*months,))
        category_report = []
        for row in cursor:
            category_report.append({
                "year": row[0],
                "month": row[1],
                "category": row[2],
                "total_tickets": row[3]
            })
        return category_report

    def get_category_report_by_year_and_month(self, years, months):
        cursor = self.conn.cursor()
        query = """
                SELECT YEAR(ticket_creation_date) AS year,
                MONTH(ticket_creation_date) AS month,
                sc.category_name,
                COUNT(*) as total_tickets
                    FROM tickets t
                    JOIN service_category sc ON t.service_category_id = sc.service_category_id
                    WHERE YEAR(t.ticket_creation_date) IN ({}) AND MONTH(t.ticket_creation_date) IN ({})
                    GROUP BY sc.service_category_id
                    ORDER BY year ASC, month ASC;
                """.format(",".join("%s" for _ in range(len(years))), ",".join("%s" for _ in range(len(months))))
        cursor.execute(query, (*years, *months))
        category_report = []
        for row in cursor:
            category_report.append({
                "year": row[0],
                "month": row[1],
                "category": row[2],
                "total_tickets": row[3]
            })
        return category_report