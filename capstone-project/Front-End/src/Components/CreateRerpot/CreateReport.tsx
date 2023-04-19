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
      <div className="container-fluid mt-3 mb-3 p-0">
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
        <div className="row">
          <div className="col-sm-1">
            <label
              htmlFor="selectbox"
              className="col-form-label fs-6 badge bg-success text-wrap"
            >
              Seccion:
            </label>
          </div>
          <div className="col-sm-3">
            <select className="form-select" id="selectbox">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateReport;
