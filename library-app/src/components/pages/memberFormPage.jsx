import { failedSwal, successSwal, validateInputMember } from '../../helper';
import MemberForm from '../modules/memberForm'
import FormLayout from '../templates/FormLayout';
import LoadingSpinner from '../elements/loading';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../services/userService';

function MemberFormPage({ setErrors, editingMember, isFormOpen, setIsFormOpen, errors, setEditingMember }) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [ErrorStatus, setErrorStatus] = useState();
    const [navigate,setNavigate] =useState();
    const navigate1 = useNavigate()

    const addMember = async (member) => {
        try {
            const listErrors = validateInputMember(member);
            setErrors(listErrors);
    
            if (Object.keys(listErrors).length === 0) {
                await UserService.create(member); 
                successSwal('Member Added successfully');
            }
            return listErrors;
            
        } catch (error) {
            console.log(error.response.data.errors)
            failedSwal(error.response.data)
        }
       
    };

    const updateMember = async (member) => {
        try {
            const listErrors = validateInputMember(member);
            setErrors(listErrors);
    
            if (Object.keys(listErrors).length === 0) {
                member.idIdentity = editingMember.idIdentity
                // ga boleh nama duplikat
                await UserService.update(id, member)
                successSwal('Member Edited successfully');
                setEditingMember(null);
            }
            return listErrors;
        } catch (error) {
            failedSwal(error.response.data)
        }
       
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                if (!id) {
                    setLoading(false); 
                    setIsFormOpen(true);
                    return;
                }
                const memberResponse = await UserService.get(id);
                setEditingMember(memberResponse.data);
                setIsFormOpen(true);
            } catch (error) {
                setErrorStatus(true);
                console.log(error);
            } finally {
                setLoading(false); 
            }
        };
        loadData();
    }, [id,setIsFormOpen,setEditingMember]);

    useEffect(() => {
        if (navigate) {
            navigate1('/members'); // Ganti '/books' dengan path tujuanmu
        }
    }, [navigate, navigate1]);

    return (
        <>
            {loading ? <LoadingSpinner /> : ErrorStatus ? <div><h1>Terjadi Gangguan...</h1></div> :
                <FormLayout title={editingMember ? "Form to Update Member" : "Form to Add Member"}>
                    <MemberForm
                        addMember={addMember}
                        updateMember={updateMember}
                        editingMember={editingMember}
                        isFormOpen={isFormOpen}
                        setIsFormOpen={setIsFormOpen}
                        errors={errors}
                        navigate={navigate}
                        setNavigate={setNavigate}
                    />
                </FormLayout>
            }
        </>
    )
}

export default MemberFormPage;