import React, { useState } from "react";
import { Table, Pagination, Button } from "react-bootstrap";
import { InputActionMeta, SingleValue } from "react-select";
import TimeAndDate from "../TimeAndDate/TimeAndDate";
import Select from "react-select";
import SelectWithSearch from "../CustomSelect/SelectWithSearch";

interface Data {
  id: number;
  seccion: string;
  servicio: string;
  prioridad: string;
  edificio: string;
  numerDeOficina: string;
  descripcion: string;
  decanato: string;
  departamento: string;
  telefono: string;
  nombreActividad: string;
  fechaActividad: string;
  horaActividad: string;
  status: string;
}

const PendientesAEvaluar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(3);
  const [filters, setFilters] = useState({
    seccion: "",
    servicio: "",
    prioridad: "",
    edificio: "",
    descripcion: "",
    status: "",
  });

  const data: Data[] = [
    {
      id: 1,
      seccion: "electricidad",
      servicio: "corto circuito",
      prioridad: "emergencia",
      edificio: "Stefani",
      numerDeOficina: "S-113",
      descripcion:
        "El salon hizo un corto circuito en el switch para prender la luz al lado de la puerta principal",
      decanato: "Administracion",
      departamento: "Ingenieria electrica y de computadora",
      telefono: "123-456-7890",
      nombreActividad: "",
      fechaActividad: "",
      horaActividad: "",
      status: "Open",
    },
    {
      id: 2,
      seccion: "plomeria",
      servicio: "Service 2",
      prioridad: "Medium",
      edificio: "Building 2",
      numerDeOficina: "Office 2",
      descripcion: "Description 2",
      decanato: "Decanate 2",
      departamento: "Department 2",
      telefono: "234-567-8901",
      nombreActividad: "Activity 2",
      fechaActividad: "2023-05-02",
      horaActividad: "14:00:00",
      status: "In Progress",
    },
    {
      id: 3,
      seccion: "flora",
      servicio: "Service 3",
      prioridad: "Low",
      edificio: "Building 3",
      numerDeOficina: "Office 3",
      descripcion: "Description 3",
      decanato: "Decanate 3",
      departamento: "Department 3",
      telefono: "345-678-9012",
      nombreActividad: "Activity 3",
      fechaActividad: "2023-05-03",
      horaActividad: "15:00:00",
      status: "Closed",
    },
  ];

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data
    .filter(
      (item) =>
        item.seccion.toLowerCase().includes(filters.seccion.toLowerCase()) &&
        item.servicio.toLowerCase().includes(filters.servicio.toLowerCase()) &&
        item.prioridad
          .toLowerCase()
          .includes(filters.prioridad.toLowerCase()) &&
        item.edificio.toLowerCase().includes(filters.edificio.toLowerCase()) &&
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

  return (
    <>
      <div className="mt-1 mb-2 p-2">
        <div className="fs-3 fw-bolder text-decoration-underline">
          <span>Tables de Reportes - Pendientes a Evaluar</span>
        </div>
        <Table striped bordered hover style={{ fontSize: "13px" }}>
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
              <tr key={item.id}>
                <td>
                  <button
                    type="button"
                    className="btn btn-link"
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${item.id}`}
                  >
                    {item.id}
                  </button>
                  <div
                    className="modal"
                    tabIndex={-1}
                    id={`exampleModal${item.id}`}
                  >
                    <div className="modal-dialog modal-fullscreen">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="staticBackdropLabel"
                          >
                            Reporte - {item.id}
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
                                <SelectWithSearch
                                  options={Seccion}
                                  value={
                                    Seccion.find(
                                      (option) => option.value === item.seccion
                                    ) || null
                                  }
                                  onChange={setSeccion}
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
                                  value={{
                                    value: item.servicio,
                                    label: item.servicio,
                                  }}
                                  onChange={setServicioSeleccionado}
                                  options={Servicio}
                                  isClearable
                                  isSearchable
                                  styles={{
                                    container: (provided) => ({
                                      ...provided,
                                      width: 400,
                                    }),
                                  }}
                                  required // add this attribute
                                  inputValue={""}
                                  onInputChange={function (
                                    newValue: string,
                                    actionMeta: InputActionMeta
                                  ): void {
                                    throw new Error(
                                      "Function not implemented."
                                    );
                                  }}
                                  onMenuOpen={function (): void {
                                    throw new Error(
                                      "Function not implemented."
                                    );
                                  }}
                                  onMenuClose={function (): void {
                                    throw new Error(
                                      "Function not implemented."
                                    );
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
                                <div className="form-check me-1">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    required
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexRadioDefault1"
                                  >
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
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexRadioDefault2"
                                  >
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
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexRadioDefault3"
                                  >
                                    Emergencia
                                  </label>
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
                                  <span>Edificio:</span>
                                </label>
                              </div>
                              <div className="col-sm-3 d-flex align-items-center">
                                <Select
                                  value={{
                                    value: item.edificio,
                                    label: item.edificio,
                                  }}
                                  onChange={setEdificio}
                                  options={Edificio}
                                  isClearable
                                  isSearchable
                                  styles={{
                                    control: (provided) => ({
                                      ...provided,
                                      width: 500,
                                    }),
                                  }}
                                  required
                                  inputValue={""}
                                  onInputChange={function (
                                    newValue: string,
                                    actionMeta: InputActionMeta
                                  ): void {
                                    throw new Error(
                                      "Function not implemented."
                                    );
                                  }}
                                  onMenuOpen={function (): void {
                                    throw new Error(
                                      "Function not implemented."
                                    );
                                  }}
                                  onMenuClose={function (): void {
                                    throw new Error(
                                      "Function not implemented."
                                    );
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
                                    id="exampleFormControlTextarea1"
                                    rows={1}
                                    required
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
                                    id="exampleFormControlTextarea1"
                                    rows={2}
                                    style={{ width: "700px" }}
                                    required
                                  ></textarea>
                                </div>
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
                                  value={{
                                    value: item.decanato,
                                    label: item.decanato,
                                  }}
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
                                  required // add this attribute
                                  inputValue={""}
                                  onInputChange={function (
                                    newValue: string,
                                    actionMeta: InputActionMeta
                                  ): void {
                                    throw new Error(
                                      "Function not implemented."
                                    );
                                  }}
                                  onMenuOpen={function (): void {
                                    throw new Error(
                                      "Function not implemented."
                                    );
                                  }}
                                  onMenuClose={function (): void {
                                    throw new Error(
                                      "Function not implemented."
                                    );
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
                                    id="exampleFormControlTextarea1"
                                    rows={1}
                                    style={{ width: "500px" }}
                                    required
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
                                    id="exampleFormControlTextarea1"
                                    rows={1}
                                    style={{ width: "250px" }}
                                    required
                                  ></textarea>
                                </div>
                              </div>
                            </div>

                            <hr className="border border-success border-2 opacity-100 mt-4" />
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
                                    id="exampleFormControlTextarea1"
                                    rows={1}
                                    style={{ width: "600px" }}
                                    required
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
                                    id="exampleFormControlTextarea1"
                                    rows={1}
                                    style={{ width: "150px" }}
                                    placeholder="MM/DD/YYYY"
                                    required
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
                                    id="exampleFormControlTextarea1"
                                    rows={1}
                                    style={{ width: "150px" }}
                                    placeholder="HH:MM AM/PM"
                                    required
                                  ></textarea>
                                </div>
                              </div>

                              <div className="col-sm-2">
                                <div className="d-flex justify-content-center">
                                  <button
                                    type="button"
                                    className="btn btn-secondary me-1"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary ms-1"
                                  >
                                    Save changes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.seccion}</td>
                <td>{item.servicio}</td>
                <td>{item.prioridad}</td>
                <td>{item.edificio}</td>
                <td>{item.descripcion}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          {Array(Math.ceil(data.length / dataPerPage))
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
    </>
  );
};

export default PendientesAEvaluar;
