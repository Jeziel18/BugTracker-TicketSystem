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
      <div className="container-fluid mt-3 mb-3 p-2">
        <div className="row mb-3">
          <div className="col-2 fs-6 me-2 badge bg-primary text-wrap">
            Fecha y Hora: <TimeAndDate />
          </div>
          <div className="col-2 fs-6 badge bg-primary text-wrap">
            Username and Email are going to be here
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <div className="mb-3 fs-6 badge bg-success text-wrap">
              <span>Seccion: </span>
              <div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3 col-sm-7">
        <select className="form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
  );
}
export default CreateReport;
