import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-select/dist/css/bootstrap-select.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from "bootstrap";
import "bootstrap-select/dist/js/bootstrap-select";
import TimeAndDate from "../TimeAndDate/TimeAndDate";
import "./CreateReport.css";
import { error } from "jquery";

function CreateReport() {
  //------------------------------------------------------------------------------------
  //   This part of the code has the dummy data to test the Create Report page.
  //------------------------------------------------------------------------------------
  const Seccion = [
    { value: "electricidad", label: "electricidad" },
    { value: "plomeria", label: "plomeria" },
    { value: "flora", label: "flora" },
    { value: "mesas y sillas", label: "mesas y sillas" },
  ];

  const ServicioElectricidad = [
    { value: "luz mala", label: "luz mala" },
    { value: "receptaculo no sirve", label: "receptaculo no sirve" },
    { value: "switch no sirve", label: "switch no sirve" },
    { value: "corto circuito", label: "corto circuito" },
  ];

  const ServicioPlomeria = [{ value: "tubo roto", label: "tubo roto" }];

  const ServicioFlora = [{ value: "arbol caido", label: "arbol caido" }];

  const ServicioMesasYSillas = [{ value: "silla rota", label: "silla rota" }];

  const Prioridad = [
    { value: "Rutina  ", label: "Rutina" },
    { value: "Urgente", label: "Urgente" },
    { value: "Emergencia", label: "Emergencia" },
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
    {
      value: "Decanato de Administracion",
      label: "Decanato de Administracion",
    },
    { value: "Decanato de Estudiantes", label: "Decanato de Estudiantes" },
    {
      value: "Decanato de Asuntos Academicos",
      label: "Decanato de Asuntos Academicos",
    },
  ];

  //------------------------------------------------------------------------------------
  //    This part of the code has all the useState value to change state in the
  //                          select and input boxes.
  //------------------------------------------------------------------------------------
  const [seccion, setSeccion] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);

  const [servicio, setServicio] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);

  const [edificio, setEdificio] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);

  const [decanato, setDecanato] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);

  const [prioridad, setPrioridad] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);

  //------------------------------------------------------------------------------------
  //   This part of the code has all useStates and hanldes for the input text boxes.
  //                   This get the values that the user inputs.
  //------------------------------------------------------------------------------------
  const [numeroOficina, setNumeroOficina] = useState<string>("");
  function handleNumeroOficinaChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setNumeroOficina(event.target.value);
  }

  const [descripcion, setDescripcion] = useState<string>("");
  function handleDescripcionChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setDescripcion(event.target.value);
  }

  const [departamento, setDepartamento] = useState<string>("");
  function handleDepartamentoChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setDepartamento(event.target.value);
  }

  const [telefono, setTelefono] = useState<string>("");
  function handleTelefonoChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setTelefono(event.target.value);
  }

  const [nombreActividad, setNombreActividad] = useState<string>("");
  function handleNombreActividadChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setNombreActividad(event.target.value);
  }

  const [fechaActividad, setFechaActividad] = useState<string>("");
  function handleFechaActividadChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setFechaActividad(event.target.value);
  }

  const [horaActividad, setHoraActividad] = useState<string>("");
  function handleHoraActividadChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setHoraActividad(event.target.value);
  }

  //------------------------------------------------------------------------------------
  //    This useEffect make the tooltip for the extra information on the boxes.
  //------------------------------------------------------------------------------------
  useEffect(() => {
    // initialize tooltips
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  //------------------------------------------------------------------------------------
  //   This function make the "Servicio" select dependant of the "Seccion" select.
  //------------------------------------------------------------------------------------
  function serviceOptions(
    section: SingleValue<{ value: string; label: string } | null>
  ) {
    switch (section?.value) {
      case "electricidad":
        return ServicioElectricidad;
      case "plomeria":
        return ServicioPlomeria;
      case "flora":
        return ServicioFlora;
      case "mesas y sillas":
        return ServicioMesasYSillas;
    }
  }

  //------------------------------------------------------------------------------------
  // This cont variable set the useState for the validation of the boxes.
  //------------------------------------------------------------------------------------
  const [reportError, setReportError] = useState("");

  //------------------------------------------------------------------------------------
  //       This function handle the sumbit event when the button is click.
  //          It also create the error string if there is an empty box.
  //------------------------------------------------------------------------------------
  function handleSumbitReport(
    section: SingleValue<{ value: string; label: string } | null>,
    service: SingleValue<{ value: string; label: string } | null>,
    priority: SingleValue<{ value: string; label: string } | null>,
    building: SingleValue<{ value: string; label: string } | null>,
    officeNumber: string,
    jobDescription: string,
    deanery: SingleValue<{ value: string; label: string } | null>,
    department: string,
    phone: string,
    activityName: string,
    activityDate: string,
    activityTime: string
  ) {
    let errorString = "Verifique los siguientes campos: ";
    if (
      !section?.value ||
      !service?.value ||
      !priority?.value ||
      !building?.value ||
      !officeNumber ||
      !jobDescription ||
      !deanery?.value ||
      !department ||
      !phone
    ) {
      if (section === null) {
        errorString += "Seccion-";
      }
      if (service === null) {
        errorString += "Servicio-";
      }
      if (priority === null) {
        errorString += "Prioridad-";
      }
      if (building === null) {
        errorString += "Edificio-";
      }
      if (officeNumber === "") {
        errorString += "Numero de Oficina-";
      }
      if (jobDescription == "") {
        errorString += "Descripcion del Trabajo-";
      }
      if (deanery === null) {
        errorString += "Decanato-";
      }
      if (department == "") {
        errorString += "Departamento-";
      }
      if (phone == "") {
        errorString += "Telefono-";
      }
      setReportError(errorString);
    } else {
      setReportError("");
      console.log(
        section,
        service,
        priority,
        building,
        officeNumber,
        jobDescription,
        deanery,
        department,
        phone,
        activityName,
        activityDate,
        activityTime
      );
    }
  }

  //------------------------------------------------------------------------------------
  //        This return displays and render all the frontend for the user.
  //------------------------------------------------------------------------------------
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
                When user name and email is recived from the db, insert here
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
                className=""
                value={seccion}
                onChange={setSeccion}
                options={Seccion}
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
                value={servicio}
                onChange={setServicio}
                options={serviceOptions(seccion)}
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
              <Select
                value={prioridad}
                onChange={setPrioridad}
                options={Prioridad}
                isClearable
                isSearchable
                styles={{
                  container: (provided) => ({ ...provided, width: 300 }),
                }}
              />
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
              <textarea
                className="form-control"
                id="numeroDeOficina"
                name="numeroDeOficina"
                rows={1}
                value={numeroOficina}
                onChange={handleNumeroOficinaChange}
              ></textarea>
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
                  id="descripcionTrabajo"
                  name="descripcionTrabajo"
                  rows={2}
                  value={descripcion}
                  onChange={handleDescripcionChange}
                  style={{ width: "700px" }}
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
                  id="departamento"
                  name="departamento"
                  rows={1}
                  value={departamento}
                  onChange={handleDepartamentoChange}
                  style={{ width: "500px" }}
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
                  id="telefono"
                  name="telefono"
                  rows={1}
                  value={telefono}
                  onChange={handleTelefonoChange}
                  style={{ width: "250px" }}
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
            datos (Esta seccion no es obligatoria):
          </p>

          <div className="row mb-2 mt-3">
            <div className="col-sm-2">
              <label
                htmlFor="selectbox"
                className="col-form-label fs-6 badge bg-success text-wrap"
              >
                <span>Nombre de la Actividad:</span>
              </label>
            </div>
            <div className="col-sm-3 d-flex align-items-center">
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="nombreActividad"
                  name="nombreActividad"
                  rows={1}
                  value={nombreActividad}
                  onChange={handleNombreActividadChange}
                  style={{ width: "600px" }}
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
                <span>Fecha:</span>
              </label>
            </div>
            <div className="col-sm-3 d-flex align-items-center">
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="fechaActividad"
                  name="fechaActividad"
                  rows={1}
                  value={fechaActividad}
                  onChange={handleFechaActividadChange}
                  style={{ width: "150px" }}
                  placeholder="MM/DD/YYYY"
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
                <span>Hora de Inicio:</span>
              </label>
            </div>
            <div className="col-sm-3 d-flex align-items-center">
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="horaActividad"
                  name="horaActividad"
                  rows={1}
                  value={horaActividad}
                  onChange={handleHoraActividadChange}
                  style={{ width: "150px" }}
                  placeholder="HH:MM AM/PM"
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
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  onClick={() => {
                    handleSumbitReport(
                      seccion,
                      servicio,
                      prioridad,
                      edificio,
                      numeroOficina,
                      descripcion,
                      decanato,
                      departamento,
                      telefono,
                      nombreActividad,
                      fechaActividad,
                      horaActividad
                    );
                  }}
                >
                  Someter Reporte
                </button>
              </div>
            </div>
            <div className="fs-6 col-sm-5 badge bg-danger text-wrap">
              {reportError}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateReport;
