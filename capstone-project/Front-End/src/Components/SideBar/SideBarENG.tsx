import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./SideBar.css";

function SideBarENG() {
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
              <strong>Service Requests</strong>
            </span>

            <li className="nav-item">
              {
                <a className="text-white" href="/home">
                  <i className="bi bi-box-arrow-in-right me-3"></i>
                  <span>Application Introduction Page</span>
                </a>
              }
            </li>
            <li className="nav-item">
              {
                <a className="text-white" href="/">
                  <i className="bi bi-box-arrow-in-right me-3"></i>
                  <span>My Requests</span>
                </a>
              }
            </li>
            <li className="nav-item">
              {
                <a className="text-white" href="/crearReporte">
                  <i className="bi bi-box-arrow-in-right me-3"></i>
                  <span>Create a Service Request</span>
                </a>
              }
            </li>

            <hr className="text-third mt-4 new5" />
            <span className="mb-1 mt-2">
              <strong>Ongoing Requests</strong>
            </span>

            <li className="nav-item">
              {
                <a className="text-white" href="/pendientesAEvaluar">
                  <i className="bi bi-receipt me-3"></i>
                  <span>Open Tickets</span>
                </a>
              }
            </li>
            <li className="nav-item">
              {
                <a className="text-white" href="/pendientesAAtender">
                  <i className="bi bi-receipt me-3"></i>
                  <span>Pending Tickets</span>
                </a>
              }
            </li>
            <li className="nav-item">
              {
                <a className="text-white" href="/solicitudesCerradas">
                  <i className="bi bi-receipt me-3"></i>
                  <span>Closed Tickets</span>
                </a>
              }
            </li>
            <li className="nav-item">
              {
                <a className="text-white" href="/todosLosReportes">
                  <i className="bi bi-receipt me-3"></i>
                  <span>All Tickets</span>
                </a>
              }
            </li>

            <hr className="text-third mt-4 new5" />
            <span className="mb-1 mt-2">
              <strong>Services</strong>
            </span>

            <li className="nav-item">
              {
                <a className="text-white" href="/">
                  <i className="bi bi-person-workspace me-3"></i>
                  <span>Offered Services</span>
                </a>
              }
            </li>

            <hr className="text-third mt-4 new5" />
            <span className="mb-1 mt-2">
              <strong>Reports</strong>
            </span>

            <li className="nav-item">
              {
                <a className="text-white" href="/generarInformes">
                  <i className="bi bi-paperclip me-3"></i>
                  <span>Generate Reports</span>
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

export default SideBarENG;
