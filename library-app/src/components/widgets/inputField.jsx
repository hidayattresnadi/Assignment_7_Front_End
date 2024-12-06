import Label from '../elements/label';
import Input from '../elements/input';
import React from 'react';

const InputField = React.forwardRef(({ label, ...inputProps }, ref) => (
    <div className="mb-4">
        <Label htmlFor={inputProps.id} className="form-label">{label}</Label>
        <Input ref={ref} {...inputProps}  className="form-control" />
    </div>
));

// Menambahkan displayName untuk menghindari peringatan ESLint
InputField.displayName = 'InputField';

export default InputField;
