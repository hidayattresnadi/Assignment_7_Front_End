import RadioButton from '../elements/inputRadio';
import Label from '../elements/label';

const RadioOption = ({ id, name, value, label, checked, onChange }) => (
    <div className="radio-option me-3">
        <RadioButton 
            id={id} 
            name={name} 
            value={value} 
            checked={checked} 
            onChange={onChange} 
        />
        <Label htmlFor={id} className="form-label">{label}</Label>
    </div>
);

export default RadioOption;
