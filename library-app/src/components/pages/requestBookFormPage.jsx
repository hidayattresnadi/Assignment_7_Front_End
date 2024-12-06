import FormLayout from '../templates/FormLayout';
import { failedSwal, successSwal, validateRequestBook} from '../../helper';
import RequestBookForm from '../modules/requestBookForm';
import BookService from '../../services/bookService';

function RequestBookFormPage({ setErrors, errors }) {

    const addBookRequest = async (bookRequest) => {
        try {
            const listErrors = validateRequestBook(bookRequest)
            setErrors(listErrors);
            if (Object.keys(listErrors).length === 0) {
                const result = await BookService.addBookRequest(bookRequest)
                if (result) {
                    successSwal('Request Book add successfully');
                }
            }
            return listErrors;

        } catch (error) {
            setErrors(error.response.data)
            failedSwal(error.response.data)
            return error
        }
    };

    return (
        <FormLayout title={"Add Book Request"}>
            <RequestBookForm
                addBookRequest={addBookRequest }
                errors={errors}
            />
        </FormLayout>
    )
}

export default RequestBookFormPage;