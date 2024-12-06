import { useState, useEffect, useRef } from 'react';
import InputField from '../widgets/inputField';
import Button from '../elements/button';

const MemberForm = ({ addMember, updateMember, editingMember, isFormOpen, setIsFormOpen, errors, navigate, setNavigate }) => {
    const fullNameInputRef = useRef();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        position: '',
        privilege: '',
    });

    useEffect(() => {
        if (editingMember) {
            setFormData({
                firstName: editingMember.firstName,
                lastName: editingMember.lastName,
                position: editingMember.position,
                privilege: editingMember.privilege
            });
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                position: '',
                privilege: ''
            });
        }
    }, [editingMember]);

    useEffect(() => {
        if (isFormOpen && fullNameInputRef.current) {
            fullNameInputRef.current.focus();
        }
    }, [isFormOpen]);

    const handleInputChange = (e) => {
        const { id, name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [type === "radio" ? name : id]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingMember) {
            const result = await updateMember(formData);
            if (Object.keys(result).length === 0) {
                setFormData({
                    firstName: '',
                    lastName: '',
                    position: '',
                    privilege: ''
                });
                setIsFormOpen(false);
                setNavigate(!navigate);
            }
        } else {
            const result = await addMember(formData);
            if (Object.keys(result).length === 0) {
                setFormData({
                    firstName: '',
                    lastName: '',
                    position: '',
                    privilege: ''
                });
                setIsFormOpen(false);
                setNavigate(!navigate);
            }
        }
    };

    const openForm = () => {
        setIsFormOpen(true);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="First Name"
                    type="text"
                    ref={fullNameInputRef}
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                {errors?.firstName ? <h6 className='text-start'>{errors.firstName}</h6> : ''}
                <InputField
                    label="Last Name"
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
                {errors?.lastName ? <h6 className='text-start'>{errors.lastName}</h6> : ''}
                <InputField
                    label="Position"
                    type="text"
                    id="position"
                    value={formData.position}
                    onChange={handleInputChange}
                />
                {errors?.position ? <h6 style={{ marginBottom: '50px' }} className='text-start'>{errors.position}</h6> : ''}
                <InputField
                    label="Privilege"
                    type="text"
                    id="privilege"
                    value={formData.privilege}
                    onChange={handleInputChange}
                />
                {errors?.privilege ? <h6 style={{ marginBottom: '50px' }} className='text-start'>{errors.privilege}</h6> : ''}
                <Button onClick={openForm} type="submit" className="btn btn-primary mt-3 w-100">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default MemberForm;
