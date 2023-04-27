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

  const animatedComponents = makeAnimated();

  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<{ value: string; label: string }>
  >([]);

  const handleSelectChange = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    setSelectedOptions(newValue);
  };

  return (
    <>
      <div className="mt-1 mb-2 p-2">
        <div className="fs-3 fw-bolder text-decoration-underline">
          <span>Generar Informes</span>
        </div>
        <p className="fs-6 fw-bolder fst-italic text-decoration-underline">
          <i className="bi bi-info-circle-fill me-2"></i>
          Si el Trabajo esta relacionado a una actividad, entre los siguientes
          datos:
        </p>

        <div className="col-9">
          <Select
            isMulti
            closeMenuOnSelect={false}
            components={animatedComponents}
            name="months"
            options={months}
            value={selectedOptions}
            onChange={handleSelectChange}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
      </div>
    </>
  );
}

export default Statistics;
