import Label from '../elements/label';
import SelectOption from '../elements/selectOptions';

const SelectField = ({ label, options, id, value, onChange, className, title, valueProperty, displayProperty }) => (
    <div className="mb-4">
        <Label htmlFor={id} className="form-label">{label}</Label>
        <select id={id} className={className} value={value} onChange={onChange}>
            <SelectOption value="" disabled={true}>{title}</SelectOption>
            {options.map((option, index) => (
                <SelectOption key={index} value={option[valueProperty]}>{option[displayProperty]}</SelectOption>
            ))}
        </select>
    </div>
);

export default SelectField;
