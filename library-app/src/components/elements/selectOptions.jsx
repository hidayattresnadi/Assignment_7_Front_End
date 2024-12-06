const SelectOption = ({ value, children,disabled }) => (
    <option disabled={disabled} value={value}>{children}</option>
);

export default SelectOption;
