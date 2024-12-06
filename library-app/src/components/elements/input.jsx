import { forwardRef } from 'react';

const Input = forwardRef(({ type, id, required, value, onChange, placeholder, pattern, className }, ref) => (
    <input
        type={type}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        pattern={pattern}
        ref={ref}
        className={className}
    />
));

Input.displayName = 'Input';

export default Input;

