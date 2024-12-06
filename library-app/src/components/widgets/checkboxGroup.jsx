import Checkbox from '../elements/checkbox';

const CheckboxGroup = ({ options, checked, onChange }) => (
    <div className="checkbox-group">
        {options.map((option) => (
            <Checkbox
                key={option.id}
                id={option.id}
                checked={checked.includes(option.id)}  // Periksa apakah ID ada dalam array `availability`
                onChange={(e) => onChange(e, option.id)}  // Kirim ID saat terjadi perubahan
                label={option.label}
            />
        ))}
    </div>
);

export default CheckboxGroup;
