import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <>
      <div className="text-center mt-1 mb-2 p-2">
        <div className="fs-1 fw-bolder text-decoration-underline">
          <span>Inicio e Informacion de la Aplicacion</span>
        </div>
        <div className="row">
          <div className="col mt-3 fs-3 badge bg-success text-wrap">
            Descripcion
          </div>
          <p className="p-3 fs-6" style={{ textAlign: "justify" }}>
            ¡Bienvenido a la pagina de reportes del Departamento de Edificion y
            Terrenios de UPRM! Nuestra aplicación es una herramienta poderosa
            diseñada para simplificar el proceso de informar daños, solicitudes
            de mantenimiento y otros problemas de reparación. Creada
            específicamente para la administración universitaria, nuestra
            plataforma le permite crear informes detallados para cualquier
            problema que encuentre en el campus. Con nuestra interfaz intuitiva
            y diseño fácil de usar, puede crear fácilmente tickets que incluyan
            toda la información necesaria, como la ubicación del problema, su
            gravedad y cualquier otro detalle relevante. Nuestra aplicación
            también cuenta con capacidades avanzadas de seguimiento, lo que
            permite al departamento de edificios y terrenos monitorear el estado
            de cada ticket y asegurarse de que todos los problemas se resuelvan
            de manera oportuna.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
