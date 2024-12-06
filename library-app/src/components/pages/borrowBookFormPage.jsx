import FormLayout from '../templates/FormLayout';
import LoadingSpinner from '../elements/loading';
import { useEffect, useState } from 'react';
import BorrowBookForm from '../modules/borrowBookForm';
import { failedSwal, successSwal } from '../../helper';
import UserService from '../../services/userService';
import BookService from '../../services/bookService';
import BorrowService from '../../services/borrowService';
import { useLocation } from 'react-router-dom';

function BorrowFormPage({ books, members, setBooks, setMembers, setErrors, refresh, setRefresh }) {
    const [loading, setLoading] = useState(true);
    const [ErrorStatus, setErrorStatus] = useState();
    const location = useLocation();

    useEffect(() => {
        const myFetch = async () => {
            try {
                let response = await UserService.getAll();
                await setMembers(response.data.data)

                let dresponse;
                if (location.pathname === '/borrow') {
                    dresponse = await BookService.getAll();
                    await setBooks(dresponse.data.data)
                }
                else if (location.pathname === '/return') {
                    dresponse = await BorrowService.getAll();
                    await setBooks(dresponse.data)
                }
            }
            catch (error) {
                setErrorStatus(true);
                console.log(error);
            }
            finally {
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            }
        }
        myFetch();
    }, [setBooks, setMembers, refresh]);

    const submitBookForm = async (borrow) => {
        try {
            if (location.pathname === "/borrow") {
                await BorrowService.borrow(borrow)
                successSwal('borrow request succes created')
            }
            else {
                await BorrowService.returning(borrow)
                setRefresh(!refresh)
                successSwal('return book succes')
            }

        } catch (error) {
            setErrors(error.response.data)
            failedSwal(error.response.data)
            return error.response.data;
        }
    };

    return (
        <>
            {loading ? <LoadingSpinner /> : ErrorStatus ? <div><h1>Terjadi Gangguan...</h1></div> :
                <FormLayout title={location.pathname == "/borrow" ? "Form to Borrow Book" : "Form to Return Book"}>
                    <BorrowBookForm
                        members={members}
                        setMembers={setMembers}
                        books={books}
                        title ={location.pathname == "/borrow" ? "Borrow Book" : "Return Book"}
                        setBooks={setBooks}
                        onSubmit={submitBookForm}
                    />
                </FormLayout>
            }
        </>
    )
}

export default BorrowFormPage;