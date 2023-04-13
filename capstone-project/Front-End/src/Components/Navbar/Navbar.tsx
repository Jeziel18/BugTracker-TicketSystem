import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" aria-current="page">
          <i className="bi bi-book"></i> Ordenes de Mantenimiento
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-1 border rounded border-success">
              <a
                className="nav-link active text-white"
                aria-current="page"
                href="#"
              >
                <i className="bi-house-fill"></i> Home
              </a>
            </li>
            <li className="nav-item mx-1 border rounded border-success">
              <a
                className="nav-link active text-white"
                aria-current="page"
                href="#"
              >
                <i className="bi bi-person-dash"></i> Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
