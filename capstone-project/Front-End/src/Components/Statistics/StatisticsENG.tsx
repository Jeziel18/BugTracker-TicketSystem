import React, {useEffect, useState} from "react";
import Select, {MultiValue, ActionMeta, SingleValue} from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";

function StatisticsENG() {
    const months = [
    { value: 1, label: "January"},
    { value: 2, label: "February"},
    { value: 3, label: "March"},
    { value: 4, label: "April"},
    { value: 5, label: "May"},
    { value: 6, label: "June"},
    { value: 7, label: "July"},
    { value: 8, label: "August"},
    { value: 9, label: "September"},
    { value: 10, label: "October"},
    { value: 11, label: "November"},
    { value: 12, label: "December"},
  ];

  const years = [];

  const report = [
      {value: 1, label: "Full Report"},
      {value: 2, label: "Report: Amount of Tickets"},
      {value: 3, label: "Report: Service Category"},
      {value: 4, label: "Report: Ticket Status"}
  ];

  for (let i = 2013; i <= 2050; i++) {
    years.push({ value: i, label: i });
  }

  const [selectedYears, setSelectedYears] = useState<
    MultiValue<{ value: number; label: number }>
  >([]);

  const handleSelectYears = (
    newValue: MultiValue<{ value: number; label: number }>,
    actionMeta: ActionMeta<{ value: number; label: number }>
  ) => {
    setSelectedYears(newValue);
  };

  const [selectedMonths, setSelectedMonths] = useState<
    MultiValue<{ value: number; label: string;}>
  >([]);

  const handleSelectMonths = (
    newValue: MultiValue<{ value: number; label: string;}>,
    actionMeta: ActionMeta<{ value: number; label: string;}>
  ) => {
    setSelectedMonths(newValue);
  };

  const [selectedReport, setSelectedReport] = useState<
    SingleValue<{ value: number; label: string } | null | undefined>
  >();

  const animatedComponents = makeAnimated();

  const generateStatistics = (selectedReport:{value: number;label: string} | null | undefined,
                              selectedYears: MultiValue<{value: number; label: number}>,
                              selectedMonths: MultiValue<{value: number;label: string}>) => {

    if (selectedReport?.value == 1){ //Full Report
        axios.get("http://127.0.0.1:5000/report/full_report", {
          params: {
            year: selectedYears.map((y) => y?.value).join(","),
            month: selectedMonths.map((m) => m?.value).join(","),
          },
        })
        .then((response) => {
          const filename = response.data;
          console.log(filename[1])
          console.log(`File ${filename[1]} generated successfully.`);
          downloadReport(filename[1])
        })
        .catch((error) => {
          console.error("Failed to generate statistics", error);
        });
    }
    else if (selectedReport?.value == 2){ //Report: Amount of Tickets
        axios.get("http://127.0.0.1:5000/report/tickets_created_year_month", {
          params: {
            year: selectedYears.map((y) => y?.value).join(","),
            month: selectedMonths.map((m) => m?.value).join(","),
          },
        })
        .then((response) => {
          const filename = response.data;
          console.log(`File ${filename[1]} generated successfully.`);
          downloadReport(filename[1])
        })
        .catch((error) => {
          console.error("Failed to generate statistics", error);
        });
    }
    else if (selectedReport?.value == 3){ //Report: Service Category
        axios.get("http://127.0.0.1:5000/report/ticket_category_report", {
          params: {
            year: selectedYears.map((y) => y?.value).join(","),
            month: selectedMonths.map((m) => m?.value).join(","),
          },
        })
        .then((response) => {
          const filename = response.data;
          console.log(`File ${filename[1]} generated successfully.`);
          downloadReport(filename[1])
        })
        .catch((error) => {
          console.error("Failed to generate statistics", error);
        });
    }
    else if (selectedReport?.value == 4){ //Report: Ticket Status
        axios.get("http://127.0.0.1:5000/report/ticket_status_by_year_month", {
          params: {
            year: selectedYears.map((y) => y?.value).join(","),
            month: selectedMonths.map((m) => m?.value).join(","),
          },
        })
        .then((response) => {
          const filename = response.data;
          console.log(`File ${filename[1]} generated successfully.`);
          downloadReport(filename[1])
        })
        .catch((error) => {
          console.error("Failed to generate statistics", error);
        });
    }
    else //Missing Report type
        console.error("Failed to generate statistics, missing type of report");
};

  const downloadReport = (filename: string) => {
    const link = document.createElement('a');
    link.href = `backend/reports/${filename}`;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


   return (
    <>
      <div className="mt-1 mb-2 p-2">
        <div className="fs-3 fw-bolder text-decoration-underline bi bi-calendar-day-fill">
          <span className="ms-2">Generate Reports</span>
        </div>
        <p className="fs-6 fw-bolder fst-italic text-decoration-underline">
          <i className="bi bi-info-circle-fill me-2"></i>
          The reports will be compiled then available to download as an excel doc.
        </p>

          <div className="row">
          <div className="col-9">
            <div className="fs-5 badge bg-success text-wrap mb-3">
              Choose the type of report:
            </div>
            <Select
                className="Report"
                value={selectedReport}
                onChange={setSelectedReport}
                options={report}
                isClearable
                isSearchable
            />
          </div>
        </div>

        <div className="row">
          <div className="col-9">
            <div className="fs-5 badge bg-success text-wrap mb-3 mt-3">
              Choose which months you want the report to be based on:
            </div>
            <Select
              isMulti
              closeMenuOnSelect={false}
              components={animatedComponents}
              name="months"
              options= {months}
              value={selectedMonths}
              onChange={handleSelectMonths}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-9">
            <div className="fs-5 badge bg-success text-wrap mb-3">
              Choose which years you want the report to be based on:
            </div>
            <Select
              isMulti
              closeMenuOnSelect={false}
              components={animatedComponents}
              name="years"
              options={years}
              value={selectedYears}
              onChange={handleSelectYears}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="">
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                onClick={() => {
                  generateStatistics(selectedReport, selectedYears, selectedMonths);
                }}
              >
                Generate Statistics
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StatisticsENG;
