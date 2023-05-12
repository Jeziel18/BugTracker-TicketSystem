from flask import Flask, jsonify, request
import json
import csv
import datetime
import os

class JSONtoCSV:

    def total_year_month_created_tickets(self, data):
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
        filename = f"Total Tickets Report by Year and Month-{current_time}.csv"

        with open(os.path.join("reports", filename), 'w', newline='') as file:
            # Create a CSV writer
            writer = csv.writer(file)

            # Write the header row
            writer.writerow(['Year', 'Month', 'Open', 'Pending'])

            # Loop through the JSON data and write each row to the CSV file
            for year in data:
                for month in data[year]:
                    try:
                        open_count = data[year][month]['open']
                    except KeyError:
                        open_count = None
                    try:
                        pending_count = data[year][month]['pending']
                    except KeyError:
                        pending_count = None
                    writer.writerow([year, month, open_count, pending_count])

        print(f"CSV file '{filename}' created successfully.")

    def year_month_status_report(self, data):

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
