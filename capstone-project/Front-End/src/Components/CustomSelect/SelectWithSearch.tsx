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
  value: Option | null; // add the `value` prop here
  onChange: (value: Option | null) => void;
  isClearable?: boolean;
  styles?: Styles;
}

const SelectWithSearch: React.FC<Props> = ({
  options,
  value, // add `value` prop to destructured props
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
      // styles={styles}
      value={value} // pass `value` prop to `Select`
    />
  );
};

export default SelectWithSearch;
export { SelectWithSearch };
export type { Option };
