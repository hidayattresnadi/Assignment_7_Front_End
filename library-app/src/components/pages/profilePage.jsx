import DetailLayout from '../templates/detailLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import { useSelector } from 'react-redux';
import UserService from '../../services/userService';
import MemberDetailCard from '../modules/memberCard';

function ProfilePage() {
    const { user: currentUser } = useSelector(state => state.auth);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState();
    useEffect(() => {
        const loadData = async () => {
            try {
                const UserResponse = await UserService.get(currentUser.user.userId);
                setUserData(UserResponse.data);
                console.log(userData)
            } catch (error) {
                setError(true);
                console.log(error);
            }
            finally {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <DetailLayout title="Member Details">
                <MemberDetailCard detailMember={userData} />
            </DetailLayout>
        </>
    )
}

export default ProfilePage;