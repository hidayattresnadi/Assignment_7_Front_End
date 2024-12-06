const Checkbox = ({ id, checked, onChange, label }) => (
    <div className="form-check mb-3">
        <input
            type="checkbox"
            className="form-check-input"
            id={id}
            checked={checked}
            onChange={onChange}
        />
        <label className="form-check-label" htmlFor={id}>
            {label}
        </label>
    </div>
);

export default Checkbox;

