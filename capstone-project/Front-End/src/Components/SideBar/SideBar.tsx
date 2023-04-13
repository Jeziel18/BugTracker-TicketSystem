import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./SideBar.css";

function SideBar() {
  const ServiciosDeSolicitud = [
    "Inicio e info. de la aplicacion",
    "Lista de mis solicitudes",
    "Someter una solicitud de servisio",
  ];

  const SolicitudesRecibidas = [
    "Pendientes a evaluar",
    "Pendientes a atender",
    "Solicitudes Atendidas",
    "Solicitudes no Atendidas",
    "Todas las solicitudes",
  ];

  const Servicios = ["Servicios ofrecidos"];

  const Informes = ["Generar Informes"];

  return (
    <>
      <div className="sidebar d-flex justify-content-between flex-column bg-dark text-white p-3 vh-100">
        <div>
          <h1 className="mt-1">
            <a className="me-2" href="">
              <img
                src="https://www.uprm.edu/wdt/resources/seal-rum-uprm-1280x1280px.png"
                alt="logo"
                width={70}
              />
            </a>
            URPM Home Portal
          </h1>

          <hr className="text-fifth mt-4 new5" />
          <ul className="nav nav-pills flex-column">
            <span className="mb-1 mt-2">
              <strong>Servicios De Solicitud</strong>
            </span>

            {ServiciosDeSolicitud.map((selection) => (
              <li className="nav-item" key={selection}>
                {
                  <a className="text-white" href="">
                    <i className="bi bi-box-arrow-in-right me-3"></i>
                    <span>{selection}</span>
                  </a>
                }
              </li>
            ))}
            <hr className="text-third mt-4 new5" />
            <span className="mb-1 mt-2">
              <strong>Solicitudes Recibidas</strong>
            </span>

            {SolicitudesRecibidas.map((selection) => (
              <li className="nav-item" key={selection}>
                {
                  <a className="text-white" href="">
                    <i className="bi bi-receipt me-3"></i>
                    <span>{selection}</span>
                  </a>
                }
              </li>
            ))}

            <hr className="text-third mt-4 new5" />
            <span className="mb-1 mt-2">
              <strong>Servicios</strong>
            </span>

            {Servicios.map((selection) => (
              <li className="nav-item" key={selection}>
                {
                  <a className="text-white" href="">
                    <i className="bi bi-person-workspace me-3"></i>
                    <span>{selection}</span>
                  </a>
                }
              </li>
            ))}

            <hr className="text-third mt-4 new5" />
            <span className="mb-1 mt-2">
              <strong>Informes</strong>
            </span>

            {Informes.map((selection) => (
              <li className="nav-item" key={selection}>
                {
                  <a className="text-white" href="">
                    <i className="bi bi-paperclip me-3"></i>
                    <span>{selection}</span>
                  </a>
                }
              </li>
            ))}
          </ul>
        </div>
        <div>
          <hr className="mt-4 new5" />
          <center>
            <p className="bi bi-c-circle fst-italic">
              <i className="ms-2">UPRM COPYRIGHT</i>
            </p>
          </center>
        </div>
      </div>
    </>
  );
}

export default SideBar;
