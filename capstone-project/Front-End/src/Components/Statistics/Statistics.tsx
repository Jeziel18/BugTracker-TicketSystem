import React, { useState } from "react";
import Select, { MultiValue, ActionMeta } from "react-select";
import makeAnimated from "react-select/animated";

function Statistics() {
  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const years = [];

  for (let i = 2013; i <= 2050; i++) {
    years.push({ value: i.toString(), label: i.toString() });
  }

  const [selectedYears, setSelectedYears] = useState<
    MultiValue<{ value: string; label: string }>
  >([]);

  const handleSelectYears = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    setSelectedYears(newValue);
  };

  const [selectedMonths, setSelectedMonths] = useState<
    MultiValue<{ value: string; label: string }>
  >([]);

  const handleSelectMonths = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    setSelectedMonths(newValue);
  };

  const animatedComponents = makeAnimated();

  return (
    <>
      <div className="mt-1 mb-2 p-2">
        <div className="fs-3 fw-bolder text-decoration-underline bi bi-calendar-day-fill">
          <span className="ms-2">Generar Informes</span>
        </div>
        <p className="fs-6 fw-bolder fst-italic text-decoration-underline">
          <i className="bi bi-info-circle-fill me-2"></i>
          Los reportes se recopilaran y se bajaran a un excel
        </p>

        <div className="row">
          <div className="col-9">
            <div className="fs-5 badge bg-success text-wrap mb-3">
              Selecciones los meses que quiere para la estadistica
            </div>
            <Select
              isMulti
              closeMenuOnSelect={false}
              components={animatedComponents}
              name="months"
              options={months}
              value={selectedMonths}
              onChange={handleSelectMonths}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-9">
            <div className="fs-5 badge bg-success text-wrap mb-3">
              Selecciones los anos que quiere para la estadistica
            </div>
            <Select
              isMulti
              closeMenuOnSelect={false}
              components={animatedComponents}
              name="years"
              options={years}
              value={selectedYears}
              onChange={handleSelectYears}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="">
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary btn-lg">
                Generar Estadisticas
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Statistics;
