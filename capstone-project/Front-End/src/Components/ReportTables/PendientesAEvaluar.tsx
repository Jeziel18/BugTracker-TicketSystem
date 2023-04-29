import React, { useState } from "react";
import { Table, Pagination, Button } from "react-bootstrap";

interface Data {
  id: number;
  seccion: string;
  servicio: string;
  prioridad: string;
  edificio: string;
  descripcion: string;
  status: string;
}

const PendientesAEvaluar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(15);
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
      seccion: "Section A",
      servicio: "Service 1",
      prioridad: "High",
      edificio: "Building 1",
      descripcion: "Description 1",
      status: "Open",
    },
    {
      id: 2,
      seccion: "Section B",
      servicio: "Service 2",
      prioridad: "Medium",
      edificio: "Building 2",
      descripcion: "Description 2",
      status: "In Progress",
    },
    {
      id: 3,
      seccion: "Section C",
      servicio: "Service 3",
      prioridad: "Low",
      edificio: "Building 3",
      descripcion: "Description 3",
      status: "Closed",
    },
    // add 97 more items with random data
    // ...
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

  return (
    <>
      <div className="mt-1 mb-2 p-2">
        <div className="fs-3 fw-bolder text-decoration-underline">
          <span>Tables de Reportes - Pendientes a Evaluar</span>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Report ID</th>
              <th>
                Seccion
                <input
                  type="text"
                  name="seccion"
                  value={filters.seccion}
                  onChange={handleFilterChange}
                />
              </th>
              <th>
                Servicio
                <input
                  type="text"
                  name="servicio"
                  value={filters.servicio}
                  onChange={handleFilterChange}
                />
              </th>
              <th>
                Prioridad
                <input
                  type="text"
                  name="prioridad"
                  value={filters.prioridad}
                  onChange={handleFilterChange}
                />
              </th>
              <th>
                Edificio
                <input
                  type="text"
                  name="edificio"
                  value={filters.edificio}
                  onChange={handleFilterChange}
                />
              </th>
              <th>
                Descripcion
                <input
                  type="text"
                  name="descripcion"
                  value={filters.descripcion}
                  onChange={handleFilterChange}
                />
              </th>
              <th>
                Status
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
                    className="btn btn-primary"
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
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="staticBackdropLabel"
                          >
                            {item.edificio}
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <p>{item.seccion}</p>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" className="btn btn-primary">
                            Save changes
                          </button>
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
