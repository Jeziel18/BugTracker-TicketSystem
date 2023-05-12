import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <>
      <div className="text-center mt-1 mb-2 p-2">
        <div className="fs-1 fw-bolder text-decoration-underline">
          <span>Application Information</span>
        </div>
        <div className="row">
          <div className="col mt-3 fs-3 badge bg-success text-wrap">
            Description
          </div>
          <p className="p-4 fs-4" style={{ textAlign: "justify" }}>
            Welcome to the reporting page of the UPRM Department of Buildings and Grounds!
            Our application is a powerful tool designed to simplify the process of reporting
            damages, maintenance requests, and other repair issues. Specifically created for
            university management, our platform allows you to create detailed reports for any
            problems you encounter on campus. With our intuitive interface and easy-to-use design,
            you can easily create tickets that include all necessary information such as the
            problem location, severity, and any other relevant details. Our application also
            features advanced tracking capabilities, allowing the Buildings and Grounds department
            to monitor the status of each ticket and ensure that all issues are timely resolved.
          </p>
        </div>
        <div className="row">
          <div className="">
            <img
              src="https://dev.uprm.edu/placement/assets/carousel/slide-1.jpg"
              alt="Image description"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
