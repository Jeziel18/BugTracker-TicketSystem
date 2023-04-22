import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-select/dist/css/bootstrap-select.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from "bootstrap";
import "bootstrap-select/dist/js/bootstrap-select";
import TimeAndDate from "../TimeAndDate/TimeAndDate";
import "./CreateReport.css";

function CreateReport() {
  const [seccionSeleccionado, setSeccionSeleccionado] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);

  const [servicioSeleccionado, setServicioSeleccionado] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);

  const [edificio, setEdificioo] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);

  const Seccion = [
    { value: "electricidad", label: "electricidad" },
    { value: "plomeria", label: "plomeria" },
    { value: "flora", label: "flora" },
    { value: "mesas y sillas", label: "mesas y sillas" },
  ];

  const Servicio = [
    { value: "luz mala", label: "luz mala" },
    { value: "receptaculo no sirve", label: "receptaculo no sirve" },
    { value: "switch no sirve", label: "switch no sirve" },
    { value: "corto circuito", label: "corto circuito" },
  ];

  const Edificio = [
    { value: "Stefani", label: "Stefani" },
    { value: "Enfermeria", label: "Enfermeria" },
    {
      value: "Administracion de Empresas",
      label: "Administracion de Empresas",
    },
    { value: "Chardon", label: "Chardon" },
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
          <div className="row mb-2">
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
                value={seccionSeleccionado}
                onChange={setSeccionSeleccionado}
                options={Seccion}
                isClearable
                isSearchable
                styles={{
                  container: (provided) => ({ ...provided, width: 400 }),
                }}
                required // add this attribute
              />
              <button
                type="button"
                className="ms-4 btn btn-secondary bi bi-question-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Escoga la Seccion con la que tiene que ver el servicio"
              ></button>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-sm-1">
              <label
                htmlFor="selectbox"
                className="col-form-label fs-6 badge bg-success text-wrap"
              >
                <span className="text-danger me-2">*</span>
                <span>Servicio:</span>
              </label>
            </div>

            <div className="col-sm-3 d-flex align-items-center">
              <Select
                value={servicioSeleccionado}
                onChange={setServicioSeleccionado}
                options={Servicio}
                isClearable
                isSearchable
                styles={{
                  container: (provided) => ({ ...provided, width: 400 }),
                }}
                required // add this attribute
              />
              <button
                type="button"
                className="ms-4 btn btn-secondary bi bi-question-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Escoga el Servicio requerido"
              ></button>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-sm-1">
              <label
                htmlFor="selectbox"
                className="col-form-label fs-6 badge bg-success text-wrap"
              >
                <span className="text-danger me-2">*</span>
                <span>Prioridad:</span>
              </label>
            </div>

            <div className="col-sm-3 d-flex align-items-center">
              <div className="form-check me-1">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  required
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Rutina
                </label>
              </div>
              <div className="form-check ms-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  required
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Urgente
                </label>
              </div>
              <div className="form-check ms-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault3"
                  required
                />
                <label className="form-check-label" htmlFor="flexRadioDefault3">
                  Emergencia
                </label>
              </div>
              <button
                type="button"
                className="ms-4 btn btn-secondary bi bi-question-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Escoga la Prioridad y la Importancia del problema a reportarse"
              ></button>
            </div>
          </div>

          <div className="row mb-2 mt-3">
            <div className="col-sm-1">
              <label
                htmlFor="selectbox"
                className="col-form-label fs-6 badge bg-success text-wrap"
              >
                <span className="text-danger me-2">*</span>
                <span>Edificio:</span>
              </label>
            </div>
            <div className="col-sm-3 d-flex align-items-center">
              <Select
                value={edificio}
                onChange={setEdificioo}
                options={Edificio}
                isClearable
                isSearchable
                styles={{
                  control: (provided) => ({ ...provided, width: 500 }),
                }}
                required
              />
              <button
                type="button"
                className="ms-4 btn btn-secondary bi bi-question-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Escoga el Edficio que necesita el servicio"
              ></button>
            </div>
          </div>

          <div className="row mb-2 mt-3">
            <div className="col-sm-3">
              <label
                htmlFor="selectbox"
                className="col-form-label fs-6 badge bg-success text-wrap"
              >
                <span className="text-danger me-2">*</span>
                <span>Numero de Oficina, Cuarto o Salon:</span>
              </label>
            </div>
            <div className="col-sm-2 d-flex align-items-center">
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={1}
                  required
                ></textarea>
              </div>
              <button
                type="button"
                className="ms-4 btn btn-secondary bi bi-question-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Indique el numero de Oficina, Cuarto o Salon (Si no tiene numero, indique el mas cercano)"
              ></button>
            </div>
          </div>

          <div className="row mb-2 mt-3">
            <div className="col-sm-2">
              <label
                htmlFor="selectbox"
                className="col-form-label fs-6 badge bg-success text-wrap"
              >
                <span className="text-danger me-2">*</span>
                <span>Descripcion Del Trabajo:</span>
              </label>
            </div>
            <div className="col-sm-2 d-flex align-items-center">
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={2}
                  style={{ width: "700px" }}
                  required
                ></textarea>
              </div>
              <button
                type="button"
                className="ms-4 btn btn-secondary bi bi-question-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="De detalles importantes y especificos del trabajo requerido"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateReport;
