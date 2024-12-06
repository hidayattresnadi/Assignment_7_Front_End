import { useState } from 'react';
import InputField from '../widgets/inputField';
import Button from '../elements/button';
import { failedSwal } from '../../helper';
import LoadingSpinner from '../elements/loading';

const RequestBookForm = ({ addBookRequest, errors }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        isbn: '',
        author: '',
        publisher: '',
        comments: ''
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
        setIsLoading(true);
        setTimeout(async () => {
            try {
                const result = await addBookRequest(formData);
                if ( Object.keys(result).length === 0) {
                    setFormData({
                        title: '',
                        isbn: '',
                        author: '',
                        publisher: '',
                        comments: ''
                    });
                }
            } catch (error) {
                console.error("Failed to submit the form:", error);
                failedSwal(error.response.data);
            } finally {
                setIsLoading(false);
            }
        }, 2000);
    };

    if (isLoading) return <LoadingSpinner />; 

    return (
        <>
            <form onSubmit={handleSubmit}>

                <InputField
                    label="Title"
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                {errors?.title ? <h6 className='text-start'>{errors.title}</h6> : ''}

                <InputField
                    label="ISBN"
                    type="text"
                    id="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                />
                {errors?.isbn ? <h6 className='text-start'>{errors.isbn}</h6> : ''}

                <InputField
                    label="Author"
                    type="text"
                    id="author"
                    value={formData.author}
                    onChange={handleInputChange}
                />
                {errors?.author ? <h6 className='text-start'>{errors.author}</h6> : ''}

                <InputField
                    label="Publisher"
                    type="text"
                    id="publisher"
                    value={formData.publisher}
                    onChange={handleInputChange}
                />
                {errors?.publisher ? <h6 className='text-start'>{errors.publisher}</h6> : ''}

                <InputField
                    label="Comments"
                    type="text"
                    id="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                />

                <Button type="submit" className="btn btn-primary mt-3 w-100">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default RequestBookForm;
