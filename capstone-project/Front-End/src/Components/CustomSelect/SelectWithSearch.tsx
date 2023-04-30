import React, { useState } from "react";
import Select, {
  CSSObjectWithLabel,
  ContainerProps,
  GroupBase,
} from "react-select";

interface Option {
  value: string;
  label: string;
}

interface Styles {
  container?: (
    base: CSSObjectWithLabel,
    props: ContainerProps<Option | null, false, GroupBase<Option | null>>
  ) => CSSObjectWithLabel;
}

interface Props {
  options: Option[];
  onChange: (value: Option | null) => void;
  isClearable?: boolean;
  styles?: Styles; // include styles prop with type of Styles
}

const SelectWithSearch: React.FC<Props> = ({
  options,
  onChange,
  isClearable,
  styles,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleChange = (selectedOption: Option | null) => {
    onChange(selectedOption);
  };

  return (
    <Select
      options={filteredOptions}
      onChange={handleChange}
      onInputChange={setSearchValue}
      isClearable={!!isClearable}
      placeholder="Select"
      noOptionsMessage={() => "No options found"}
      styles={styles} // use styles prop
    />
  );
};

export default SelectWithSearch;
export { SelectWithSearch };
export type { Option };
