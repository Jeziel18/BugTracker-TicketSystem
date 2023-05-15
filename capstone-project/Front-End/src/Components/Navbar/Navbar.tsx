import React from "react";

interface NavbarProps {
  onLogout: () => void;
  onLanguageChange: (lang: string) => void;
}

function Navbar(props: NavbarProps) {
  const handleLanguageChange = (lang: string) => {
    props.onLanguageChange(lang);
  };

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
                href="/home"
              >
                <i className="bi-house-fill"></i> Inicio
              </a>
            </li>
            <li className="nav-item mx-1 border rounded border-success">
              <a
                className="nav-link active text-white"
                aria-current="page"
                href="/LogIn"
                onClick={props.onLogout}
              >
                <i className="bi bi-person-dash"></i> Cerrar Sesión
              </a>
            </li>
            <li className="nav-item mx-1 border rounded border-success">
              <a
                className="nav-link active text-white"
                aria-current="page"
                href="#"
                onClick={() => handleLanguageChange("en")}
              >
                <i className="bi bi-translate"></i> Ingles
              </a>
            </li>
            <li className="nav-item mx-1 border rounded border-success">
              <a
                className="nav-link active text-white"
                aria-current="page"
                href="#"
                onClick={() => handleLanguageChange("es")}
              >
                <i className="bi bi-globe2"></i> Español
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
