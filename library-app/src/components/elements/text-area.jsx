const TextArea = ({ id, value, onChange, placeholder, required, rows = 4 }) => (
    <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="form-control"
    />
);

export default TextArea;
