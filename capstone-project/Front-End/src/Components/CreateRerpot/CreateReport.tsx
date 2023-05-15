import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-select/dist/css/bootstrap-select.min.css";
import * as bootstrap from "bootstrap";
import "bootstrap-select/dist/js/bootstrap-select";
import TimeAndDate from "../TimeAndDate/TimeAndDate";
import "./CreateReport.css";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";


//--------------------------------------------------------------------------------
//  Interface to work with the userID that comes from the App.tsx after log in
//--------------------------------------------------------------------------------
interface Props {
  user_id: number | null;
}

const CreateReport: React.FC<Props> = ({ user_id }) => {
  //--------------------------------------------------------------------------
  //          Variables to store the userID from the App.tsx
  //--------------------------------------------------------------------------
  const storedUserID = localStorage.getItem("userID");
  const userID = user_id ?? (storedUserID ? parseInt(storedUserID) : null);

  //-----------------------------------------------------------------------------------
  //             Here are all the arrays and useState variables for the
  //                  service dependant select from the section.
  //-----------------------------------------------------------------------------------
  const service1Array: Array<{value: string, label: string}> = [];
  const [service1, setService1] = useState<Array<{value: string, label: string}>>([]);
  const service2Array: Array<{value: string, label: string}> = [];
  const [service2, setService2] = useState<Array<{value: string, label: string}>>([]);
  const service3Array: Array<{value: string, label: string}> = [];
  const [service3, setService3] = useState<Array<{value: string, label: string}>>([]);
  const service4Array: Array<{value: string, label: string}> = [];
  const [service4, setService4] = useState<Array<{value: string, label: string}>>([]);
  const service5Array: Array<{value: string, label: string}> = [];
  const [service5, setService5] = useState<Array<{value: string, label: string}>>([]);
  const service6Array: Array<{value: string, label: string}> = [];
  const [service6, setService6] = useState<Array<{value: string, label: string}>>([]);
  const service7Array: Array<{value: string, label: string}> = [];
  const [service7, setService7] = useState<Array<{value: string, label: string}>>([]);
  const service8Array: Array<{value: string, label: string}> = [];
  const [service8, setService8] = useState<Array<{value: string, label: string}>>([]);
  const service9Array: Array<{value: string, label: string}> = [];
  const [service9, setService9] = useState<Array<{value: string, label: string}>>([]);
  const service10Array: Array<{value: string, label: string}> = [];
  const [service10, setService10] = useState<Array<{value: string, label: string}>>([]);
  const service11Array: Array<{value: string, label: string}> = [];
  const [service11, setService11] = useState<Array<{value: string, label: string}>>([]);
  const service12Array: Array<{value: string, label: string}> = [];
  const [service12, setService12] = useState<Array<{value: string, label: string}>>([]);
  const service13Array: Array<{value: string, label: string}> = [];
  const [service13, setService13] = useState<Array<{value: string, label: string}>>([]);
  const service14Array: Array<{value: string, label: string}> = [];
  const [service14, setService14] = useState<Array<{value: string, label: string}>>([]);
  const service15Array: Array<{value: string, label: string}> = [];
  const [service15, setService15] = useState<Array<{value: string, label: string}>>([]);

  //--------------------------------------------------------------------------
  //          Variables to store information from the database.
  //--------------------------------------------------------------------------
  const [connectDB, setConnectDB] = useState(true);
  const [buildingDB, setBuildingDB] = useState([]);
  const [sectionDB, setSectionDB] = useState([]);
  const [userEmail, setUserEmail] = useState("");


  //--------------------------------------------------------------------------
  //       Variables for animations and success submission of the report.
  //--------------------------------------------------------------------------
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successSubmission, setSuccessSubmission] = useState("");

  //--------------------------------------------------------------------------
  //         Connection to the database and sort all information.
  //                Also set the animation and disable it.
  //--------------------------------------------------------------------------
  if (connectDB) {
    setLoading(true);

    fetch(`http://127.0.0.1:5000/users/${userID}`)
      .then(response => response.json())
      .then(data => {
        setUserEmail(data.email);
      })

    fetch('http://127.0.0.1:5000/buildings')
      .then(response => response.json())
      .then(data => {
        const buildings = data.Buildings;
        const buildingValues = buildings.map((building: { building_id: string[], building_name: string[] }) => ({
          value: building.building_id[0],
          label: building.building_name[0]
        }));
        setBuildingDB(buildingValues);
      });

    fetch('http://127.0.0.1:5000/service_categories')
      .then(response => response.json())
      .then(data => {
        const serviceCategories = data.map((category: any) => ({
          value: category.service_category_id[0],
          label: category.category_name
        }));
        setSectionDB(serviceCategories);
      });

    fetch('http://127.0.0.1:5000/services')
      .then(response => response.json())
      .then(data => {
        const services = data;
        for (let i = 0; i < services.length; i++) {
          const subArray = services[i];
          if (subArray[2] == "1"){
            service1Array.push({value: subArray[0], label: subArray[1]});
          }
          else if (subArray[2] == "2") {
            service2Array.push({value: subArray[0], label: subArray[1]});
          }
          else if (subArray[2] == "3") {
            service3Array.push({value: subArray[0], label: subArray[1]});
          }
          else if (subArray[2] == "4") {
            service4Array.push({value: subArray[0], label: subArray[1]});
          }
          else if (subArray[2] == "5") {
            service5Array.push({value: subArray[0], label: subArray[1]});
          }
          else if (subArray[2] == "6") {
            service6Array.push({value: subArray[0], label: subArray[1]});
          }
          else if (subArray[2] == "7") {
            service7Array.push({value: subArray[0], label: subArray[1]});
          }
          else if (subArray[2] == "8") {
            service8Array.push({value: subArray[0], label: subArray[1]});
          }
          else if (subArray[2] == "9") {
            service9Array.push({value: subArray[0], label: subArray[1]});
          }
          else if (subArray[2] == "10") {
            service10Array.push({value: subArray[0], label: subArray[1]});
          }
          else if (subArray[2] == "11") {
            service11Array.push({value: subArray[0], label: subArray[1]});
          }
          else if (subArray[2] == "12") {
            service12Array.push({value: subArray[0], label: subArray[1]});
          }
          else if (subArray[2] == "13") {
            service13Array.push({value: subArray[0], label: subArray[1]});
          }
          else if (subArray[2] == "14") {
            service14Array.push({value: subArray[0], label: subArray[1]});
          }
          else if (subArray[2] == "15") {
            service15Array.push({value: subArray[0], label: subArray[1]});
          }
        }
        setService1(service1Array);
        setService2(service2Array);
        setService3(service3Array);
        setService4(service4Array);
        setService5(service5Array);
        setService6(service6Array);
        setService7(service7Array);
        setService8(service8Array);
        setService9(service9Array);
        setService10(service10Array);
        setService11(service11Array);
        setService12(service12Array);
        setService13(service13Array);
        setService14(service14Array);
        setService15(service15Array);
        setLoading(false);
      });
    setConnectDB(false);
  }

  //------------------------------------------------------------------------------------
  //   This part of the code has the dummy data to test the Create Report page.
  //------------------------------------------------------------------------------------
  const Prioridad = [
    { value: "routine", label: "Rutina" },
    { value: "urgent", label: "Urgente" },
    { value: "emergency", label: "Emergencia" },
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

  //--------------------------------------------------------------------------------------
  //   This part of the code has all the useState value to change state in the select
  //--------------------------------------------------------------------------------------
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
  //   This part of the code has all useStates and handles for the input text boxes.
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
    tooltipTriggerList.map((tooltipTriggerEl) => {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  //---------------------------------------------------------------------------------------
  //   This function reset all values after correct submission of report to database
  //---------------------------------------------------------------------------------------
  function resetAllValues(){
    setSeccion(null);
    setServicio(null);
    setPrioridad(null);
    setEdificio(null);
    setNumeroOficina("");
    setDescripcion("");
    setDecanato(null);
    setDepartamento("");
    setTelefono("");
    setNombreActividad("");
    setFechaActividad("");
    setHoraActividad("");
    setSuccessSubmission("Su reporte a sido sometido correctamente. Puede ver su reporte en pagina: Lista de mis solicitudes");
    setTimeout(() => {
      setSuccessSubmission("");
    },7000)
  }

  //------------------------------------------------------------------------------------
  //   This function make the "Servicio" select dependant of the "Seccion" select.
  //------------------------------------------------------------------------------------
  function serviceOptions(
    section: SingleValue<{ value: string; label: string } | null>
  ) {
    if(section?.value == "1") {
  return service1;
  }
  else if(section?.value == "2"){
    return service2;
  }
  else if(section?.value == "3"){
    return service3;
  }
  else if(section?.value == "4"){
    return service4;
  }
  else if(section?.value == "5"){
    return service5;
  }
  else if(section?.value == "6"){
    return service6;
  }
  else if(section?.value == "7"){
    return service7;
  }
  else if(section?.value == "8"){
    return service8;
  }
  else if(section?.value == "9"){
    return service9;
  }
  else if(section?.value == "10"){
    return service10;
  }
  else if(section?.value == "11"){
    return service11;
  }
  else if(section?.value == "12"){
    return service12;
  }
  else if(section?.value == "13"){
    return service13;
  }
  else if(section?.value == "14"){
    return service14;
  }
  else if(section?.value == "15"){
    return service15;
  }
  else{
    return [];
    }
  }

  //------------------------------------------------------------------------------------
  // This cont variable set the useState for the validation of the boxes.
  //------------------------------------------------------------------------------------
  const [reportError, setReportError] = useState("");

  //------------------------------------------------------------------------------------
  //        This function handle the submit event when the button is click.
  //          It also creates the error string if there is an empty box.
  //------------------------------------------------------------------------------------
  function handleSummitReport(
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
      if (!section) {
        errorString += "Seccion-";
      }
      if (!service) {
        errorString += "Servicio-";
      }
      if (!priority) {
        errorString += "Prioridad-";
      }
      if (!building) {
        errorString += "Edificio-";
      }
      if (officeNumber === "") {
        errorString += "Numero de Oficina-";
      }
      if (jobDescription == "") {
        errorString += "Descripcion del Trabajo-";
      }
      if (!deanery) {
        errorString += "Decanato-";
      }
      if (department == "") {
        errorString += "Departamento-";
      }
      if (phone == "") {
        errorString += "Telefono-";
      }
      setReportError(errorString);
    }
    else if (activityName || activityDate || activityTime){
      if(!activityName || !activityDate || !activityTime){
        if (!activityName){
          errorString += "Nombre de la actividad-";
        }
        if (!activityDate){
          errorString += "Dia de la actividad-";
        }
        if (!activityTime){
          errorString += "Hora de la actividad-";
        }
        setReportError(errorString);
      }
      else{
        setReportError("");
        setIsSubmitting(true);
        const submitNewTicketWithActivity = {
          user_id: userID,
          service_category_id: parseInt(section.value, 10),
          service_id: parseInt(service.value, 10),
          ticket_priority: priority.value,
          building_id: parseInt(building.value,10),
          office_number: officeNumber,
          job_description: jobDescription,
          dean: deanery.value,
          department: department,
          ticket_phone_number: phone,
          ticket_activity_name: activityName,
          ticket_activity_date: activityDate,
          ticket_activity_time: activityTime
        }
        axios.post('http://127.0.0.1:5000/new-ticket', submitNewTicketWithActivity)
            .then(response => {
              console.log(response.data);
              setIsSubmitting(false);
              resetAllValues();
            })
            .catch((error) => {
              console.log(error);
              setIsSubmitting(false);
              setReportError("Occurio un error al someter el reporte. Intentelo de nuevo mas tarde");
            });
      }
    }
    else {
      setReportError("");
      setIsSubmitting(true);
      const submitNewTicket = {
        user_id: userID,
        service_category_id: parseInt(section.value, 10),
        service_id: parseInt(service.value, 10),
        ticket_priority: priority.value,
        building_id: parseInt(building.value,10),
        office_number: officeNumber,
        job_description: jobDescription,
        dean: deanery.value,
        department: department,
        ticket_phone_number: phone
      }
      axios.post('http://127.0.0.1:5000/new-ticket', submitNewTicket)
          .then(response => {
            console.log(response.data);
            setIsSubmitting(false);
            resetAllValues();
          })
          .catch((error) => {
            console.log(error);
            setIsSubmitting(false);
            setReportError("Occurio un error al someter el reporte. Intentelo de nuevo mas tarde");
          });

    }
  }
  //------------------------------------------------------------------------------------
  //        This return displays and render all the frontend for the user.
  //------------------------------------------------------------------------------------
  return (
    <>
      {
        loading ?
            <div className = "d-flex justify-content-center align-items-center vh-100">
              <BeatLoader
                loading={loading}
                color= "#016b28"
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            </div>

            :
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
                      {userEmail}
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
                      options={sectionDB}
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
                      options={buildingDB}
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
                        placeholder="YYYY-MM-DD"
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
                      {isSubmitting ? ( // Conditionally render the loading animation or the button text
                            <BeatLoader
                              loading={isSubmitting}
                              color= "#016b28"
                              size={25}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                        ) : (
                          <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                              onClick={() => {
                                handleSummitReport(
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
                              disabled={isSubmitting} // Disable the button while the report is being submitted
                      >
                        "Someter Reporte"
                      </button>
                        )}
                    </div>
                  </div>
                  <div className="col-sm-5">
                    {reportError && <div className="fs-6 badge bg-danger text-wrap">{reportError}</div>}
                    {successSubmission && <div className="fs-6 badge bg-success text-wrap">{successSubmission}</div>}
                  </div>
                </div>
              </div>
            </div>
      }

    </>
  );
}

export default CreateReport;
