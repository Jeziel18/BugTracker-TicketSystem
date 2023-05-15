import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./SideBar.css";

function SideBar() {
  return (
    <>
      <div className="sidebar d-flex justify-content-between flex-column bg-dark text-white p-3 vh-100">
        <div>
          <h1 className="mt-1">
            <a className="me-2" href="/home">
              <img
                src="https://www.uprm.edu/wdt/resources/seal-rum-uprm-1280x1280px.png"
                alt="logo"
                width={70}
              />
            </a>
            UPRM Home Portal
          </h1>

          <hr className="text-fifth mt-4 new5" />
          <ul className="nav nav-pills flex-column">
            <span className="mb-1 mt-2">
              <strong>Servicios De Solicitud</strong>
            </span>

            <li className="nav-item">
              {
                <a className="text-white" href="/home">
                  <i className="bi bi-box-arrow-in-right me-3"></i>
                  <span>Inicio e info. de la aplicacion</span>
                </a>
              }
            </li>
            <li className="nav-item">
              {
                <a className="text-white" href="/">
                  <i className="bi bi-box-arrow-in-right me-3"></i>
                  <span>Lista de mis solicitudes</span>
                </a>
              }
            </li>
            <li className="nav-item">
              {
                <a className="text-white" href="/crearReporte">
                  <i className="bi bi-box-arrow-in-right me-3"></i>
                  <span>Someter una solicitud de servicio</span>
                </a>
              }
            </li>

            <hr className="text-third mt-4 new5" />
            <span className="mb-1 mt-2">
              <strong>Solicitudes Recibidas</strong>
            </span>

            <li className="nav-item">
              {
                <a className="text-white" href="/pendientesAEvaluar">
                  <i className="bi bi-receipt me-3"></i>
                  <span>Solicitudes Abiertas</span>
                </a>
              }
            </li>
            <li className="nav-item">
              {
                <a className="text-white" href="/pendientesAAtender">
                  <i className="bi bi-receipt me-3"></i>
                  <span>Solicitudes Pendientes</span>
                </a>
              }
            </li>
            <li className="nav-item">
              {
                <a className="text-white" href="/solicitudesCerradas">
                  <i className="bi bi-receipt me-3"></i>
                  <span>Solicitudes Cerradas</span>
                </a>
              }
            </li>
            <li className="nav-item">
              {
                <a className="text-white" href="/todosLosReportes">
                  <i className="bi bi-receipt me-3"></i>
                  <span>Todas las solicitudes</span>
                </a>
              }
            </li>

            <hr className="text-third mt-4 new5" />
            <span className="mb-1 mt-2">
              <strong>Servicios</strong>
            </span>

            <li className="nav-item">
              {
                <a className="text-white" href="/">
                  <i className="bi bi-person-workspace me-3"></i>
                  <span>Servicios ofrecidos</span>
                </a>
              }
            </li>

            <hr className="text-third mt-4 new5" />
            <span className="mb-1 mt-2">
              <strong>Informes</strong>
            </span>

            <li className="nav-item">
              {
                <a className="text-white" href="/generarInformes">
                  <i className="bi bi-paperclip me-3"></i>
                  <span>Generar Informes</span>
                </a>
              }
            </li>
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
