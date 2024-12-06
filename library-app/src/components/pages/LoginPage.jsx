import LoadingSpinner from '../elements/loading';
import FormLayout from '../templates/FormLayout';
import { useNavigate } from 'react-router-dom';
import { useEffect} from 'react';
import { failedSwal, successSwal,  validateLogin } from '../../helper';
import LoginForm from '../modules/loginForm';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../slices/authSilce';

function LoginFormPage({ setErrors, errors }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isSuccess || user) {
            navigate('/profile');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const loginUser = async (user) => {
        try {
            const listErrors = validateLogin(user)
            setErrors(listErrors);
            if (Object.keys(listErrors).length === 0) {
                const result = await dispatch(login(user)).unwrap();
                if (result) {
                    successSwal('Login successfully');
                }
            }
            return listErrors;

        } catch (error) {
            console.log(error)
            setErrors(error)
            failedSwal(error)
            return error
        }
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <p>Error loading login</p>;

    return (
        <FormLayout title={"Form Login"}>
            <LoginForm
                loginUser={loginUser}
                errors={errors}
            />
        </FormLayout>
    )
}

export default LoginFormPage;