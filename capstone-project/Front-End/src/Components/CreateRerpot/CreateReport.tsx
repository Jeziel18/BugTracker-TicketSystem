import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-select/dist/css/bootstrap-select.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from "bootstrap";
import "bootstrap-select/dist/js/bootstrap-select";
import TimeAndDate from "../TimeAndDate/TimeAndDate";
import "./CreateReport.css";
import SelectWithSearch, { Option } from "../CustomSelect/SelectWithSearch";

function CreateReport() {
  const [seccion, setSeccion] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);

  const [servicioSeleccionado, setServicioSeleccionado] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);

  const [edificio, setEdificio] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);

  const [decanato, setDecanato] =
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

  const Decanato = [
    { value: "Administracion", label: "Decanato de Administracion" },
    { value: "Estudiantes", label: "Decanato de Estudiantes" },
    { value: "Asuntos Academicos", label: "Decanato de Asuntos Academicos" },
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
        <div className="container-fluid mt-1 mb-2 p-0">
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
                value={seccion}
                onChange={setSeccion}
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
                onChange={setEdificio}
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
                data-bs-title="De detalles importantes y especificos del trabajo requerido (Trate de ser lo mas corto y conciso posible)"
              ></button>
            </div>
          </div>

          <hr className="border border-success border-2 opacity-100 mt-3" />

          <div className="row mb-2">
            <div className="col-sm-1">
              <label
                htmlFor="selectbox"
                className="col-form-label fs-6 badge bg-success text-wrap"
              >
                <span className="text-danger me-2">*</span>
                <span>Decanato:</span>
              </label>
            </div>
            <div className="col-sm-3 d-flex align-items-center">
              <Select
                value={decanato}
                onChange={setDecanato}
                options={Decanato}
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
                data-bs-title="Escoga el Decanato en donde usted trabaja"
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
                <span>Departamento u Oficina:</span>
              </label>
            </div>
            <div className="col-sm-3 d-flex align-items-center">
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={1}
                  style={{ width: "500px" }}
                  required
                ></textarea>
              </div>
              <button
                type="button"
                className="ms-4 btn btn-secondary bi bi-question-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Indique el Departamento u Oficina en la que usted trabaja"
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
                <span>Extension o Telefono:</span>
              </label>
            </div>
            <div className="col-sm-2 d-flex align-items-center">
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={1}
                  style={{ width: "250px" }}
                  required
                ></textarea>
              </div>
              <button
                type="button"
                className="ms-4 btn btn-secondary bi bi-question-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Entre el Numero de Telefono y/o extension para poder contactarle"
              ></button>
            </div>
          </div>

          <hr className="border border-success border-2 opacity-100 mt-4" />
          <p className="fs-6 fw-bolder text-decoration-underline">
            <i className="bi bi-info-circle-fill me-2"></i>
            Si el Trabajo esta relacionado a una actividad, entre los siguientes
            datos:
          </p>

          <div className="row mb-2 mt-3">
            <div className="col-sm-2">
              <label
                htmlFor="selectbox"
                className="col-form-label fs-6 badge bg-success text-wrap"
              >
                <span className="text-danger me-2">*</span>
                <span>Nombre de la Actividad:</span>
              </label>
            </div>
            <div className="col-sm-3 d-flex align-items-center">
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={1}
                  style={{ width: "600px" }}
                  required
                ></textarea>
              </div>
              <button
                type="button"
                className="ms-4 btn btn-secondary bi bi-question-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Indique el Nombre de la actividad para el cual se haria el trabajo"
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
                <span>Fecha:</span>
              </label>
            </div>
            <div className="col-sm-3 d-flex align-items-center">
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={1}
                  style={{ width: "150px" }}
                  placeholder="MM/DD/YYYY"
                  required
                ></textarea>
              </div>
              <button
                type="button"
                className="ms-4 btn btn-secondary bi bi-question-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Indique Fecha de la actividad"
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
                <span>Hora de Inicio:</span>
              </label>
            </div>
            <div className="col-sm-3 d-flex align-items-center">
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={1}
                  style={{ width: "150px" }}
                  placeholder="HH:MM AM/PM"
                  required
                ></textarea>
              </div>
              <button
                type="button"
                className="ms-4 btn btn-secondary bi bi-question-circle"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Indique Fecha de la actividad"
              ></button>
            </div>

            <div className="col-sm-2">
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary btn-lg">
                  Someter Reporte
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateReport;
