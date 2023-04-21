import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-select/dist/css/bootstrap-select.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from "bootstrap";
import "bootstrap-select/dist/js/bootstrap-select";
import TimeAndDate from "../TimeAndDate/TimeAndDate";

function CreateReport() {
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "bombillas", label: "Cambiar bombillas de un edificio raro" },
  ];

  useEffect(() => {
    // initialize tooltips
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  return (
    <>
      <div className="mt-1 mb-2 p-2">
        <div className="fs-3 fw-bolder text-decoration-underline">
          <span>Departamento de Edificios y Terrenos</span>
        </div>
        <div className="container-fluid mt-3 mb-3 p-0">
          <div className="row justify-content-start mb-3">
            <div className="col">
              <div className="me-2 fs-6 badge bg-primary text-wrap">
                <TimeAndDate />
              </div>
              <div className="fs-6 badge bg-primary text-wrap">
                Jeziel Torres - jeziel.torres1@upr.edu
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-1">
              <label
                htmlFor="selectbox"
                className="col-form-label fs-6 badge bg-success text-wrap"
              >
                <span className="text-danger me-2">*</span>
                <span>Seccion:</span>
              </label>
            </div>

            <div className="col-sm-3 d-flex align-items-center">
              <Select
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isClearable
                isSearchable
                styles={{
                  container: (provided) => ({ ...provided, width: 400 }),
                }}
              />
              <button
                type="button"
                className="ms-4 btn btn-secondary bi bi-question-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Escoga la Seccion con la que tiene que ver el servicio"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateReport;
