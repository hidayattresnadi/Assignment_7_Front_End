import { useState } from 'react';
import InputField from '../widgets/inputField';
import Button from '../elements/button';

const LoginForm = ({ loginUser, errors }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { id, name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [type === "radio" ? name : id]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await loginUser(formData);
        if (result.length > 0) {
            setFormData({
                email: '',
                password: ''
            });
        }

    };

    return (
        <>
            <form onSubmit={handleSubmit}>

                <InputField
                    label="Email"
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                {errors?.email ? <h6 className='text-start'>{errors.email}</h6> : ''}

                <InputField
                    label="Password"
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />

                <Button type="submit" className="btn btn-primary mt-3 w-100">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default LoginForm;
