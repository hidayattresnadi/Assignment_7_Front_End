import TextArea from '../elements/text-area';

const LabeledTextArea = ({ label, id, value, onChange, placeholder, required, rows }) => (
    <div className="form-group mb-4">
        <label htmlFor={id}>{label}</label>
        <TextArea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={rows}
        />
    </div>
);

export default LabeledTextArea;
