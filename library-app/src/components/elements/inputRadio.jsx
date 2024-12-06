const RadioButton = ({ id, name, value, checked, onChange }) => (
    <input 
        type="radio" 
        id={id} 
        name={name} 
        value={value} 
        checked={checked} 
        onChange={onChange} 
    />
);

export default RadioButton;