import React, {useEffect, useState} from "react";
import { Table, Pagination, Button } from "react-bootstrap";
import { InputActionMeta, SingleValue } from "react-select";
import TimeAndDate from "../TimeAndDate/TimeAndDate";
import Select from "react-select";
import BeatLoader from "react-spinners/BeatLoader";
import axios, {all} from "axios";

interface ticketObject {
  ticketID: number;
  seccion: { value: number; label: string; };
  servicio: { value: number; label: string; };
  prioridad: string;
  edificio: { value: number; label: string; };
  numerDeOficina: string;
  descripcion: string;
  decanato: { value: string; label: string; };
  departamento: string;
  telefono: string;
  nombreActividad: string;
  fechaActividad: string;
  horaActividad: string;
  status: string;
  ticketCreationDate: string;
  userID: number;
}

const TodosLosReportes = () => {


  const allServicesArray: Array<{value: number, label: string}> = [];
  const [allServices, setAllServices] = useState<Array<{value: number, label: string}>>([]);
  const service1Array: Array<{value: number, label: string}> = [];
  const [service1, setService1] = useState<Array<{value: number, label: string}>>([]);
  const service2Array: Array<{value: number, label: string}> = [];
  const [service2, setService2] = useState<Array<{value: number, label: string}>>([]);
  const service3Array: Array<{value: number, label: string}> = [];
  const [service3, setService3] = useState<Array<{value: number, label: string}>>([]);
  const service4Array: Array<{value: number, label: string}> = [];
  const [service4, setService4] = useState<Array<{value: number, label: string}>>([]);
  const service5Array: Array<{value: number, label: string}> = [];
  const [service5, setService5] = useState<Array<{value: number, label: string}>>([]);
  const service6Array: Array<{value: number, label: string}> = [];
  const [service6, setService6] = useState<Array<{value: number, label: string}>>([]);
  const service7Array: Array<{value: number, label: string}> = [];
  const [service7, setService7] = useState<Array<{value: number, label: string}>>([]);
  const service8Array: Array<{value: number, label: string}> = [];
  const [service8, setService8] = useState<Array<{value: number, label: string}>>([]);
  const service9Array: Array<{value: number, label: string}> = [];
  const [service9, setService9] = useState<Array<{value: number, label: string}>>([]);
  const service10Array: Array<{value: number, label: string}> = [];
  const [service10, setService10] = useState<Array<{value: number, label: string}>>([]);
  const service11Array: Array<{value: number, label: string}> = [];
  const [service11, setService11] = useState<Array<{value: number, label: string}>>([]);
  const service12Array: Array<{value: number, label: string}> = [];
  const [service12, setService12] = useState<Array<{value: number, label: string}>>([]);
  const service13Array: Array<{value: number, label: string}> = [];
  const [service13, setService13] = useState<Array<{value: number, label: string}>>([]);
  const service14Array: Array<{value: number, label: string}> = [];
  const [service14, setService14] = useState<Array<{value: number, label: string}>>([]);
  const service15Array: Array<{value: number, label: string}> = [];
  const [service15, setService15] = useState<Array<{value: number, label: string}>>([]);

  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingReportLoading, setUpdatingReportLoading] = useState(false);
  const [getAllDBTickets, setGetAllDBTickets] = useState(false);
  const [getAllDBInfo, setGetAllDBInfo] = useState(true);
  const [allTicket, setAllTickets] = useState<ticketObject[]>([]);
  const [buildingDB, setBuildingDB] = useState<Array<{value: number, label: string}>>([]);
  const [sectionDB, setSectionDB] = useState<Array<{value: number, label: string}>>([]);


  if (getAllDBInfo){
    fetch('http://127.0.0.1:5000/buildings')
      .then(response => response.json())
      .then(data => {
        const buildings = data.Buildings;
        const buildingValues = buildings.map((building: { building_id: string[], building_name: string[] }) => ({
          value: building.building_id[0],
          label: building.building_name[0]
        }));
        setBuildingDB(buildingValues);
        setLoading(true);
      });

    fetch('http://127.0.0.1:5000/service_categories')
      .then(response => response.json())
      .then(data => {
        const serviceCategories = data.map((category: any) => ({
          value: category.service_category_id[0],
          label: category.category_name
        }));
        setSectionDB(serviceCategories);
        setLoading(true);
      });

    fetch('http://127.0.0.1:5000/services')
      .then(response => response.json())
      .then(data => {
        const services = data;
        for (let i = 0; i < services.length; i++) {
          const subArray = services[i];
          allServicesArray.push({value: subArray[0], label: subArray[1]});
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
        setAllServices(allServicesArray);
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
        setGetAllDBInfo(false);
        setGetAllDBTickets(true);
        setLoading(true);
      });

  }


  function getSection(serviceCategoryID: number){
    for(let i = 0; i < sectionDB.length; i++){
      if(sectionDB[i].value == serviceCategoryID){
        return {value: serviceCategoryID, label: sectionDB[i].label};
        break;
      }
    }
    return { value: 0, label: "Unknown" };
  }

  function getService(serviceID: number){
    for(let i = 0; i < allServices.length; i++){
      if(allServices[i].value == serviceID){
        return {value: serviceID, label: allServices[i].label};
        break;
      }
    }
    return {value: 0, label: "Unknown"}
  }

  function getBuilding(buildingID: number){
    for(let i = 0; i < buildingDB.length; i++){
      if(buildingDB[i].value == buildingID){
        return {value: buildingID, label: buildingDB[i].label};
        break;
      }
    }
    return {value: 0, label: "Unknown"}
  }


  if (getAllDBTickets){
    let tempAllTicket: ticketObject[] = [];
    axios.get("http://127.0.0.1:5000/tickets")
        .then(async (response) => {
          const allTickets = response.data;

          for(let key in allTickets){
            for (let i = 0; i<allTickets[key].length; i++){
              const serviceCategoryName = getSection(allTickets[key][i].service_category_id[0]);
              const serviceName = getService(allTickets[key][i].service_id[0]);
              const buildingName = getBuilding(allTickets[key][i].building_id[0]);
              tempAllTicket.push({
                ticketID: allTickets[key][i].ticket_id[0],
                seccion: serviceCategoryName,
                servicio: serviceName,
                prioridad: allTickets[key][i].ticket_priority[0],
                edificio: buildingName,
                numerDeOficina: allTickets[key][i].office_number[0],
                descripcion: allTickets[key][i].job_description[0],
                decanato: { value: allTickets[key][i].dean[0], label: allTickets[key][i].dean[0]},
                departamento: allTickets[key][i].department[0],
                telefono: allTickets[key][i].ticket_phone_number[0],
                nombreActividad: allTickets[key][i].ticket_activity_name[0],
                fechaActividad: allTickets[key][i].ticket_activity_date[0],
                horaActividad: allTickets[key][i].ticket_activity_time[0],
                status: allTickets[key][i].ticket_status,
                ticketCreationDate: allTickets[key][i].ticket_creation_date[0],
                userID: allTickets[key][i].user_id[0]
              })
            }
          }
          setAllTickets(tempAllTicket);
          setGetAllDBTickets(false);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Failed to load all tickets", error);
          setGetAllDBTickets(false);
          setLoading(false);
        });

  }


  function getUserEmail(userID: number){
    setUserEmail("");
    fetch(`http://127.0.0.1:5000/users/${userID}`)
      .then(response => response.json())
      .then(data => {
        setUserEmail(data.email);
      })
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(12);
  const [filters, setFilters] = useState({
    seccion: "",
    servicio: "",
    prioridad: "",
    edificio: "",
    descripcion: "",
    status: "",
  });


  const Prioridad = [
    { value: "routine", label: "rutina" },
    { value: "urgent", label: "urgente" },
    { value: "emergency", label: "emergencia" },
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

  const Status = [
    { value: "open", label: "abierto" },
    { value: "pending", label: "pendiente" },
    { value: "closed", label: "cerado" },
  ];


  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = allTicket
    .filter(
      (item) =>
        item.seccion.label.toLowerCase().includes(filters.seccion.toLowerCase()) &&
        item.servicio.label.toLowerCase().includes(filters.servicio.toLowerCase()) &&
        item.prioridad
          .toLowerCase()
          .includes(filters.prioridad.toLowerCase()) &&
        item.edificio.label.toLowerCase().includes(filters.edificio.toLowerCase()) &&
        item.descripcion
          .toLowerCase()
          .includes(filters.descripcion.toLowerCase()) &&
        item.status.toLowerCase().includes(filters.status.toLowerCase())
    )
    .slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const [seccion, setSeccion] =
    useState<SingleValue<{ value: number; label: string } | null>>(null);
  const [seccionOriginal, setSeccionOriginal] =
    useState<SingleValue<{ value: number; label: string } | null>>(null);

  const [servicio, setServicio] =
    useState<SingleValue<{ value: number; label: string } | null>>(null);
  const [servicioOriginal, setServicioOriginal] =
    useState<SingleValue<{ value: number; label: string } | null>>(null);

  const [edificio, setEdificio] =
    useState<SingleValue<{ value: number; label: string } | null>>(null);
  const [edificioOriginal, setEdificioOriginal] =
    useState<SingleValue<{ value: number; label: string } | null>>(null);

  const [decanato, setDecanato] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);
  const [decanatoOriginal, setDecanatoOriginal] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);

  const [prioridad, setPrioridad] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);
  const [prioridadOriginal, setPrioridadOriginal] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);

  const [status, setStatus] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);
  const [statusOriginal, setStatusOriginal] =
    useState<SingleValue<{ value: string; label: string } | null>>(null);

  const [numeroOficina, setNumeroOficina] = useState<string>("");
  function handleNumeroOficinaChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setNumeroOficina(event.target.value);
  }
  const [numeroOficinaOriginal, setNumeroOficinaOriginal] = useState<string>("");

  const [descripcion, setDescripcion] = useState<string>("");
  function handleDescripcionChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setDescripcion(event.target.value);
  }
  const [descripcionOriginal, setDescripcionOriginal] = useState<string>("");

  const [departamento, setDepartamento] = useState<string>("");
  function handleDepartamentoChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setDepartamento(event.target.value);
  }
  const [departamentoOriginal, setDepartamentoOriginal] = useState<string>("");

  const [telefono, setTelefono] = useState<string>("");
  function handleTelefonoChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setTelefono(event.target.value);
  }
  const [telefonoOriginal, setTelefonoOriginal] = useState<string>("");

  const [nombreActividad, setNombreActividad] = useState<string>("");
  function handleNombreActividadChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setNombreActividad(event.target.value);
  }
  const [nombreActividadOriginal, setNombreActividadOriginal] = useState<string>("");

  const [fechaActividad, setFechaActividad] = useState<string>("");
  function handleFechaActividadChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setFechaActividad(event.target.value);
  }
  const [fechaActividadOriginal, setFechaActividadOriginal] = useState<string>("");

  const [horaActividad, setHoraActividad] = useState<string>("");
  function handleHoraActividadChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setHoraActividad(event.target.value);
  }
  const [horaActividadOriginal, setHoraActividadOriginal] = useState<string>("");


  function serviceOptions(
      section: SingleValue<{ value: number; label: string } | null>
  ) {
    if(section?.value == 1) {
      return service1;
    }
    else if(section?.value == 2){
      return service2;
    }
    else if(section?.value == 3){
      return service3;
    }
    else if(section?.value == 4){
      return service4;
    }
    else if(section?.value == 5){
      return service5;
    }
    else if(section?.value == 6){
      return service6;
    }
    else if(section?.value == 7){
      return service7;
    }
    else if(section?.value == 8){
      return service8;
    }
    else if(section?.value == 9){
      return service9;
    }
    else if(section?.value == 10){
      return service10;
    }
    else if(section?.value == 11){
      return service11;
    }
    else if(section?.value == 12){
      return service12;
    }
    else if(section?.value == 13){
      return service13;
    }
    else if(section?.value == 14){
      return service14;
    }
    else if(section?.value == 15){
      return service15;
    }
    else{
      return [];
    }
  }

  function handelReportInfo(
    section: {value: number, label: string},
    service: {value: number, label: string},
    priority: string,
    building: {value: number, label: string},
    officeNumber: string,
    description: string,
    deanery: {value: string, label: string},
    department: string,
    phone: string,
    activityName: string,
    activityDate: string,
    activityTime: string,
    status: string
  ) {
    setSeccion(section);
    setSeccionOriginal(section);
    setServicio(service);
    setServicioOriginal(service);
    setPrioridad({ value: priority, label: priority });
    setPrioridadOriginal({ value: priority, label: priority });
    setEdificio(building);
    setEdificioOriginal(building);
    setNumeroOficina(officeNumber);
    setNumeroOficinaOriginal(officeNumber);
    setDescripcion(description);
    setDescripcionOriginal(description);
    setDecanato(deanery);
    setDecanatoOriginal(deanery);
    setDepartamento(department);
    setDepartamentoOriginal(department);
    setTelefono(phone);
    setTelefonoOriginal(phone);
    if(activityName === null){
      setNombreActividad("");
      setNombreActividadOriginal("");
    }
    else{
      setNombreActividad(activityName);
      setNombreActividadOriginal(activityName);
    }
    if(activityDate === null){
      setFechaActividad("");
      setFechaActividadOriginal("");
    }
    else{
      setFechaActividad(activityDate);
      setFechaActividadOriginal(activityDate);
    }
    if (activityTime == "None"){
      setHoraActividad("");
      setHoraActividadOriginal("");
    }
    else{
      setHoraActividad(activityTime);
      setHoraActividadOriginal(activityTime);
    }
    setStatus({ value: status, label: status });
    setStatusOriginal({ value: status, label: status });
  }


  function updateTicket(ticketID: number, updateValueJSON: any){
    setUpdatingReportLoading(true);
    axios.put(`http://127.0.0.1:5000/tickets/${ticketID}`, updateValueJSON)
        .then(response =>{
          console.log(response);

        })
        .catch(error => {
          console.log(error);
          setUpdatingReportLoading(false)
          setReportError("Occurio un error al actualizar el reporte. Intentelo de nuevo mas tarde");
          setSuccessUpdate("");
        })
  }

  const [reportError, setReportError] = useState("");
  const [successUpdate, setSuccessUpdate] = useState("")

  function handelSaveReport(
    section: SingleValue<{ value: number; label: string } | null>,
    service: SingleValue<{ value: number; label: string } | null>,
    priority: SingleValue<{ value: string; label: string } | null>,
    building: SingleValue<{ value: number; label: string } | null>,
    officeNumber: string,
    jobDescription: string,
    dean: SingleValue<{ value: string; label: string } | null>,
    department: string,
    phone: string,
    activityName: string,
    activityDate: string,
    activityTime: string,
    status: SingleValue<{ value: string; label: string } | null>,
    ticketID: number
  ) {
    let errorString = "Verifique los siguientes campos: ";
    if (
      !section?.value ||
      !service?.value ||
      !priority?.value ||
      !building?.value ||
      !officeNumber ||
      !jobDescription ||
      !dean?.value ||
      !department ||
      !phone ||
      !status?.value
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
      if (!dean) {
        errorString += "Decanato-";
      }
      if (department == "") {
        errorString += "Departamento-";
      }
      if (phone == "") {
        errorString += "Telefono-";
      }
      if(!status){
        errorString += "Status-"
      }
      if (activityName || activityDate || activityTime) {
      if (activityName == "" || activityDate == "" || activityTime == "") {
        if (activityName == "") {
          errorString += "Nombre de la actividad-";
        }
        if (activityDate == "") {
          errorString += "Dia de la actividad-";
        }
        if (activityTime == "") {
          errorString += "Hora de la actividad-";
        }
        setReportError(errorString);
      }
    }
      setReportError(errorString);
    }
    else {
      setUpdatingReportLoading(true);
      setReportError("");
      if(section.label !== seccionOriginal?.label){
        for(let i = 0; i<sectionDB.length; i++){
          if(section.label === sectionDB[i].label){
            const json = {service_category_id: sectionDB[i].value};
            updateTicket(ticketID, json);
            break;
          }
        }
      }
      if(service.label !== servicioOriginal?.label){
        for(let i = 0; i<allServices.length; i++){
          if(service.label === allServices[i].label){
            const json = {service_id: allServices[i].value};
            updateTicket(ticketID, json);
            break;
          }
        }
      }
      if(priority.value !== prioridadOriginal?.value){
        const json = {ticket_priority: priority.value};
        updateTicket(ticketID, json);
      }
      if(building.label !== edificioOriginal?.label){
        for(let i = 0; i<buildingDB.length; i++){
          if(building.label === buildingDB[i].label){
            const json = {building_id: buildingDB[i].value};
            updateTicket(ticketID, json);
            break;
          }
        }
      }
      if(officeNumber !== numeroOficinaOriginal){
        const json = {office_number: officeNumber};
        updateTicket(ticketID, json);
      }
      if(jobDescription !== descripcionOriginal){
        const json = {job_description: jobDescription};
        updateTicket(ticketID, json);
      }
      if(dean.value !== decanatoOriginal?.value){
        const json = {dean: dean.value};
        updateTicket(ticketID, json);
      }
      if(department !== departamentoOriginal){
        const json = {department: department};
        updateTicket(ticketID, json);
      }
      if(phone !== telefonoOriginal){
        const json = {ticket_phone_number: phone};
        updateTicket(ticketID, json);
      }
      if(activityName !== nombreActividadOriginal){
        const json = {ticket_activity_name: activityName};
        updateTicket(ticketID, json);
      }
      if(activityDate !== fechaActividadOriginal){
        const json = {ticket_activity_date: activityDate};
        updateTicket(ticketID, json);
      }
      if(activityTime !== horaActividadOriginal){
        const json = {ticket_activity_time: activityTime};
        updateTicket(ticketID, json);
      }
      if(status.value !== statusOriginal?.value){
        const json = {ticket_status: status.value};
        updateTicket(ticketID, json);
      }

      setTimeout(() => {
        setUpdatingReportLoading(false);
        setSuccessUpdate("Su reporte a sido actualizado correctamente");
        setGetAllDBTickets(true);
        setTimeout(() => {
          setSuccessUpdate("");
          },7000)
      },5000);
    }
  }


  return (
    <>
      {loading ?
          <div className="d-flex col justify-content-center align-items-center text-center vh-100">
            <BeatLoader
                loading={loading}
                color="#016b28"
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="mx-auto"
            />
          </div>

          :
          <div className="mt-1 mb-2 p-2">
            <div className="fs-3 fw-bolder text-decoration-underline">
              <span>Tablas de Reportes - Todas Las Solicitudes</span>
            </div>
            <Table striped bordered hover style={{fontSize: "13px"}}>
              <thead>
              <tr>
                <th>Report ID</th>
                <th>
                  Seccion:
                  <input
                      type="text"
                      name="seccion"
                      value={filters.seccion}
                      onChange={handleFilterChange}
                  />
                </th>
                <th>
                  Servicio:
                  <input
                      type="text"
                      name="servicio"
                      value={filters.servicio}
                      onChange={handleFilterChange}
                  />
                </th>
                <th>
                  Prioridad:
                  <input
                      type="text"
                      name="prioridad"
                      value={filters.prioridad}
                      onChange={handleFilterChange}
                  />
                </th>
                <th>
                  Edificio:
                  <input
                      type="text"
                      name="edificio"
                      value={filters.edificio}
                      onChange={handleFilterChange}
                  />
                </th>
                <th>
                  Descripcion:
                  <input
                      type="text"
                      name="descripcion"
                      value={filters.descripcion}
                      onChange={handleFilterChange}
                  />
                </th>
                <th>
                  Status:
                  <input
                      type="text"
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                  />
                </th>
              </tr>
              </thead>
              <tbody>
              {currentData.map((item) => (
                  <tr key={item.ticketID}>
                    <td>
                      <button
                          type="button"
                          className="btn btn-link"
                          data-bs-toggle="modal"
                          data-bs-target={`#exampleModal${item.ticketID}`}
                          onClick={() => {
                            getUserEmail(item.userID);
                            handelReportInfo(
                                item.seccion,
                                item.servicio,
                                item.prioridad,
                                item.edificio,
                                item.numerDeOficina,
                                item.descripcion,
                                item.decanato,
                                item.departamento,
                                item.telefono,
                                item.nombreActividad,
                                item.fechaActividad,
                                item.horaActividad,
                                item.status
                            );
                          }}
                      >
                        {item.ticketID}
                      </button>
                      <div
                          className="modal"
                          tabIndex={-1}
                          id={`exampleModal${item.ticketID}`}
                      >
                        <div className="modal-dialog modal-fullscreen">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                  className="modal-title fs-5"
                                  id="staticBackdropLabel"
                              >
                                Reporte - {item.ticketID}
                              </h1>
                              <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="container-fluid mt-1 mb-2 p-0">
                                <div className="row justify-content-start mb-3">
                                  <div className="col-sm-2">
                                    <div className="fs-6 badge bg-primary text-wrap">
                                      {item.ticketCreationDate}
                                    </div>
                                  </div>
                                  <div className="col-sm-3">
                                    <div className="me-5 fs-6 badge bg-primary text-wrap">
                                      {userEmail}
                                    </div>
                                  </div>
                                  <div className="col-sm-1">
                                    <label
                                        htmlFor="selectbox"
                                        className="col-form-label fs-6 badge bg-success text-wrap"
                                    >
                                      <span className="text-danger me-2">*</span>
                                      <span>Status:</span>
                                    </label>
                                  </div>
                                  <div className="col-sm-2 d-flex align-items-center">
                                    <Select
                                        value={status}
                                        onChange={setStatus}
                                        options={Status}
                                        isClearable
                                        isSearchable
                                        styles={{
                                          container: (provided) => ({
                                            ...provided,
                                            width: 170,
                                          }),
                                        }}
                                    />
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
                                        options={sectionDB}
                                        isClearable
                                        isSearchable
                                        styles={{
                                          container: (provided) => ({
                                            ...provided,
                                            width: 400,
                                          }),
                                        }}
                                    />
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
                                          container: (provided) => ({
                                            ...provided,
                                            width: 400,
                                          }),
                                        }}
                                    />
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
                                          container: (provided) => ({
                                            ...provided,
                                            width: 400,
                                          }),
                                        }}
                                    />
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
                                          container: (provided) => ({
                                            ...provided,
                                            width: 500,
                                          }),
                                        }}
                                    />
                                  </div>
                                </div>

                                <div className="row mb-2 mt-3">
                                  <div className="col-sm-3">
                                    <label
                                        htmlFor="selectbox"
                                        className="col-form-label fs-6 badge bg-success text-wrap"
                                    >
                                      <span className="text-danger me-2">*</span>
                                      <span>
                                    Numero de Oficina, Cuarto o Salon:
                                  </span>
                                    </label>
                                  </div>
                                  <div className="col-sm-2 d-flex align-items-center">
                                    <div className="form-group">
                                  <textarea
                                      className="form-control"
                                      id="numeroDeOficina"
                                      name="numeroDeOficina"
                                      rows={1}
                                      value={numeroOficina}
                                      onChange={handleNumeroOficinaChange}
                                  ></textarea>
                                    </div>
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
                                      style={{width: "700px"}}
                                  ></textarea>
                                    </div>
                                  </div>
                                </div>

                                <hr className="border border-success border-2 opacity-100 mt-3"/>

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
                                          container: (provided) => ({
                                            ...provided,
                                            width: 400,
                                          }),
                                        }}
                                    />
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
                                      style={{width: "500px"}}
                                  ></textarea>
                                    </div>
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
                                      style={{width: "250px"}}
                                  ></textarea>
                                    </div>
                                  </div>
                                </div>

                                <hr className="border border-success border-2 opacity-100 mt-4"/>
                                <p className="fs-6 fw-bolder text-decoration-underline">
                                  <i className="bi bi-info-circle-fill me-2"></i>
                                  Si el Trabajo esta relacionado a una actividad,
                                  entre los siguientes datos:
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
                                      id="nombreActividad"
                                      name="nombreActividad"
                                      rows={1}
                                      value={nombreActividad}
                                      onChange={handleNombreActividadChange}
                                      style={{width: "600px"}}
                                  ></textarea>
                                    </div>
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
                                      id="fechaActividad"
                                      name="fechaActividad"
                                      rows={1}
                                      value={fechaActividad}
                                      onChange={handleFechaActividadChange}
                                      style={{width: "150px"}}
                                      placeholder="MM/DD/YYYY"
                                  ></textarea>
                                    </div>
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
                                      id="horaActividad"
                                      name="horaActividad"
                                      rows={1}
                                      value={horaActividad}
                                      onChange={handleHoraActividadChange}
                                      style={{width: "150px"}}
                                      placeholder="HH:MM AM/PM"
                                  ></textarea>
                                    </div>
                                  </div>

                                  <div className="col-sm-2">
                                    <div className="d-flex justify-content-center">
                                      {updatingReportLoading ? (
                                        <BeatLoader
                                          loading={updatingReportLoading}
                                          color="#016b28"
                                          size={25}
                                          aria-label="Loading Spinner"
                                          data-testid="loader"
                                        />
                                      ) : (
                                        <>
                                          <button
                                            type="button"
                                            className="btn btn-secondary me-1"
                                            data-bs-dismiss="modal"
                                            onClick={() => setReportError("")}
                                          >
                                            Close
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-primary ms-1"
                                            onClick={() =>
                                              handelSaveReport(
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
                                                horaActividad,
                                                status,
                                                item.ticketID
                                              )
                                            }
                                            disabled={updatingReportLoading}
                                          >
                                            Save changes
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-sm-5">
                                    {reportError && <div className="fs-6 badge bg-danger text-wrap">{reportError}</div>}
                                    {successUpdate && <div className="fs-6 badge bg-success text-wrap">{successUpdate}</div>}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.seccion.label}</td>
                    <td>{item.servicio.label}</td>
                    <td>{item.prioridad}</td>
                    <td>{item.edificio.label}</td>
                    <td>{item.descripcion}</td>
                    <td>{item.status}</td>
                  </tr>
              ))}
              </tbody>

            </Table>
            <Pagination>
              {Array(Math.ceil(allTicket.length / dataPerPage))
                  .fill(null)
                  .map((_, index) => (
                      <Pagination.Item
                          key={index}
                          active={index + 1 === currentPage}
                          onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                  ))}
            </Pagination>
          </div>
      }
    </>
  );
};

export default TodosLosReportes;
