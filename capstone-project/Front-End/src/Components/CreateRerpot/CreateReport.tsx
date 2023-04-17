import TimeAndDate from "../TimeAndDate/TimeAndDate";

function CreateReport() {
  return (
    <div className="mt-1 mb-2 p-2">
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js"
        integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT"
        crossOrigin="anonymous"
      ></script>
      <div className="fs-3 fw-bolder text-decoration-underline">
        <span>Departamento de Edificios y Terrenos</span>
      </div>
      <div className="mt-3 wrapper">
        <div>
          <span className="mb-3 fs-6 badge bg-primary text-wrap">
            Fecha y Hora: <TimeAndDate />
          </span>
        </div>
        <div className="mb-3 fs-6 badge bg-success text-wrap">
          <span>Seccion: </span>
        </div>
        <div className="mb-3 col-sm-7">
          <select className="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="mb-3 fs-6 badge bg-success text-wrap">
          <span>Servicio: </span>
        </div>
        <div className="mb-3 col-sm-7">
          <select className="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="mb-3 fs-6 badge bg-success text-wrap">
          <span>Prioridad: </span>
        </div>
        <div className="mb-3 col-sm-4">
          <select className="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="mb-3 fs-6 badge bg-success text-wrap">
          <span>Edificio: </span>
        </div>
        <div className="mb-3 col-sm-10">
          <select className="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
    </div>
  );
}
export default CreateReport;
