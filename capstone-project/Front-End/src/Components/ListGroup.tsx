function ListGroup() {
  const menuHeaders = [
    "Servicio de Solicitud",
    "Solicitudes Recibidas",
    "Servicios",
    "Informes",
  ];

  const firstHeader = [
    "Inicio e info. de la aplicacion",
    "Lista de mis solicitudes",
    "Someter una solicitud de servisio",
  ];

  const secondHeader = [
    "Pendientes a evaluar",
    "Pendientes a atender",
    "Solicitudes Atendidas",
    "Solicitudes no Atendidas",
    "Todas las solicitudes",
  ];

  const thirdHeader = ["Servicios ofrecidos"];

  const fourthtHeader = ["Generar Informes"];

  return (
    <>
      <div>
        <h1 className="p-3 mb-2 bg-success text-white">UPRM HOME PORTAL</h1>
        <div className="img">
          <img
            src="https://www.uprm.edu/wdt/resources/seal-rum-uprm-1280x1280px.png"
            className="img-fluid"
            alt="Responsive image"
            width="100"
          />
        </div>
      </div>
      <div>
        <ul className="list-group">
          <p className="list-group fw-bold fs-5">{" Servicio de Solicitud "}</p>
          {firstHeader.map((selection) => (
            <li className="list-group-item " key={selection}>
              {
                <button
                  type="button"
                  className="btn btn-outline-success btn-sm fw-bold"
                >
                  {selection}
                </button>
              }
            </li>
          ))}

          <p className="list-group fw-bold fs-5">{" Solicitudes Recibidas "}</p>
          {secondHeader.map((selection) => (
            <li className="list-group-item " key={selection}>
              {
                <button
                  type="button"
                  className="btn btn-outline-success btn-sm fw-bold"
                >
                  {selection}
                </button>
              }
            </li>
          ))}

          <p className="list-group fw-bold fs-5">{" Servicios "}</p>
          {thirdHeader.map((selection) => (
            <li className="list-group-item " key={selection}>
              {
                <button
                  type="button"
                  className="btn btn-outline-success btn-sm fw-bold"
                >
                  {selection}
                </button>
              }
            </li>
          ))}

          <p className="list-group fw-bold fs-5">{" Informes "}</p>
          {fourthtHeader.map((selection) => (
            <li className="list-group-item " key={selection}>
              {
                <button
                  type="button"
                  className="btn btn-outline-success btn-sm fw-bold"
                >
                  {selection}
                </button>
              }
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ListGroup;
