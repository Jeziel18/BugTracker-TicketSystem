import shutil
import csv
import datetime
import os
import time


class JSONtoCSV:

    def total_year_month_created_tickets(self, data):
        # Verifying that tickets are found, if empty then no report is generated
        if not data:
            return print(f"There is no data.")

            # Create the reports folder if it doesn't exist
        if not os.path.exists("reports"):
            os.makedirs("reports")

            # Get the current date and time
        now = datetime.datetime.now()
        current_time = now.strftime("%Y-%m-%d_%H-%M-%S")

        # Create the filename with the current date and time
        filename = f"Ticket Amount per Year and Month Report-{current_time}.csv"

        # Open the file in write mode
        with open(os.path.join("reports", filename), 'w', newline='') as file:
            # Create a CSV writer
            writer = csv.writer(file)

            # Write the header row
            writer.writerow(['Year', 'Month', 'Monthly Total', 'Yearly Total'])

            # Loop through the JSON data and write each row to the CSV file
            for item in data:
                year = item.get('year', '')
                month = item.get('month', '')
                monthly_total = item.get('monthly_total', 0)
                yearly_total = item.get('yearly_total', 0)
                writer.writerow([year, month, monthly_total, yearly_total])

        # potential code to move file between directories
        # dest_path = os.path.abspath(os.path.join(r"C:\\Users\\carlo\\PycharmProjects\\BugTracker-TicketSystem\capstone-project\Front-End\public", "reports"))
        # dest_file = os.path.join(dest_path, filename)
        # shutil.move(os.path.join(os.getcwd(), "reports", filename), dest_file)

        print(f"CSV file '{filename}' created successfully.")
        return filename

    def year_month_status_report(self, data):
        # Verifying that tickets are found, if empty then no report is generated
        if data == {}:
            return print(f"There are no tickets.")
        # Create the reports folder if it doesn't exist
        if not os.path.exists("reports"):
            os.makedirs("reports")
        # Get the current date and time
        now = datetime.datetime.now()
        current_time = now.strftime("%Y-%m-%d_%H-%M-%S")

        # Create the filename with the current date and time
        filename = f"Ticket Status Report-{current_time}.csv"

        # Open the file in write mode
        with open(os.path.join("reports", filename), 'w', newline='') as file:
            # Create a CSV writer
            writer = csv.writer(file)

            # Write the header row
            writer.writerow(['Year', 'Month', 'Open', 'Pending', 'Closed'])

            # Loop through the JSON data and write each row to the CSV file
            for year in data:
                for month in data[year]:
                    try:
                        open_count = data[year][month]['open']
                    except KeyError:
                        open_count = 0
                    try:
                        pending_count = data[year][month]['pending']
                    except KeyError:
                        pending_count = 0
                    try:
                        closed_count = data[year][month]['closed']
                    except KeyError:
                        closed_count = 0
                    writer.writerow([year, month, open_count, pending_count, closed_count])

            print(f"CSV file '{filename}' created successfully.")
            return filename

    def full_tickets_report(self, data):
        # Verifying that tickets are found, if empty then no report is generated
        if data == {}:
            return print(f"There are no tickets.")
        # Create the reports folder if it doesn't exist
        if not os.path.exists("reports"):
            os.makedirs("reports")
        # Get the current date and time
        now = datetime.datetime.now()
        current_time = now.strftime("%Y-%m-%d_%H-%M-%S")

        # Create the filename with the current date and time
        filename = f"Full Tickets Report-{current_time}.csv"

        # Open the file in write mode
        with open(os.path.join("reports", filename), 'w', newline='') as file:
            # Create a CSV writer
            writer = csv.writer(file)

            # Write the header row
            writer.writerow(['Year', 'Month', 'Category', 'Service', 'Priority', 'Status', 'Total Tickets'])

            # Loop through the JSON data and write each row to the CSV file
            for item in data:
                year = item.get('year', '')
                month = item.get('month', '')
                category = item.get('category', '')
                service = item.get('service', '')
                priority = item.get('priority', '')
                status = item.get('status', '')
                total_tickets = item.get('total_tickets', '')
                writer.writerow([year, month, category, service, priority, status, total_tickets])

            print(f"CSV file '{filename}' created successfully.")
            return filename

    def ticket_category_report(self, data):
        # Verifying that tickets are found, if empty then no report is generated
        if data == {}:
            return print(f"There are no tickets.")
        # Create the reports folder if it doesn't exist
        if not os.path.exists("reports"):
            os.makedirs("reports")
        # Get the current date and time
        now = datetime.datetime.now()
        current_time = now.strftime("%Y-%m-%d_%H-%M-%S")

        # Create the filename with the current date and time
        filename = f"Ticket Category Report-{current_time}.csv"

        # Open the file in write mode
        with open(os.path.join("reports", filename), 'w', newline='') as file:
            # Create a CSV writer
            writer = csv.writer(file)

            # Write the header row
            writer.writerow(['Year', 'Month', 'Category', 'Total Tickets'])

            # Loop through the JSON data and write each row to the CSV file
            for item in data:
                year = item.get('year', '')
                month = item.get('month', '')
                category = item.get('category', '')
                total_tickets = item.get('total_tickets', '')
                writer.writerow([year, month, category, total_tickets])

            print(f"CSV file '{filename}' created successfully.")
            return filename