import { useNavigate, useParams } from 'react-router-dom';
import Form from '../modules/bookForm';
import FormLayout from '../templates/FormLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import { failedSwal, successSwal, validateInputBook } from '../../helper';
import BookService from '../../services/bookService';

function BookFormPage({ setBooks,setErrors, errors, setCategories, setEditingBook, editingBook, isFormOpen, setIsFormOpen }) {
    const { id } = useParams();
    const navigate1 = useNavigate()
    const [loading, setLoading] = useState(true);
    const [ErrorStatus, setErrorStatus] = useState();
    const [navigate,setNavigate] =useState();

    const categories = [
        {
            id:1,
            categoryName:'Biography'
        },
        {
            id:2,
            categoryName:'Novel'
        },
        {
            id:3,
            categoryName:'Comic'
        }
    ]

    const addBook = async (book) => {
        try {
            const listErrors = validateInputBook(book);
            setErrors(listErrors);

        if (Object.keys(listErrors).length === 0) {
            book.purchaseDate = new Date(`${book.purchaseDate}T00:00:00Z`).toISOString()
            await BookService.create(book); 
            successSwal('Book Added successfully');
        }
        return listErrors;
            
        } 
        catch (error) {
            setErrors(error.response.data)
            failedSwal(error.response.data.error)
            return error.response.data
        }
    };

    const updateBook = async (book) => {
        try {
            const listErrors = validateInputBook(book);
            setErrors(listErrors);

        if (Object.keys(listErrors).length === 0) {
            book.purchaseDate = new Date(`${book.purchaseDate}T00:00:00Z`).toISOString()
            await BookService.update(id,book);
            successSwal('Book Edited successfully');
            setEditingBook(null);
        }
        return listErrors;   
        } 
        catch (error) {
            setErrors(error.response.data)
            failedSwal(error.response.data)
            return error.response.data
        }
        
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                setCategories(categories);
    
                if (!id) {
                    setLoading(false); 
                    setIsFormOpen(true);
                    return;
                }
    
                const bookResponse = await BookService.get(id);
                setEditingBook(bookResponse.data);
                setIsFormOpen(true);
            } catch (error) {
                setErrorStatus(true);
                console.log(error);
            } finally {
                setLoading(false); 
            }
        };
        loadData();
    }, [id,setCategories, setIsFormOpen,setEditingBook]);

    useEffect(() => {
        if (navigate) {
            navigate1('/books'); // Ganti '/books' dengan path tujuanmu
        }
    }, [navigate, navigate1]);
    
    return (
        <>
            {loading ? <LoadingSpinner /> : ErrorStatus ? <div><h1>Terjadi Gangguan...</h1></div> :
                <FormLayout title={id ? "Form to Update Book" : "Form to Add Book"}>
                    <Form
                        addBook={addBook}
                        setBooks={setBooks}
                        updateBook={updateBook}
                        editingBook={editingBook}
                        categories={categories}
                        isFormOpen={isFormOpen}
                        setIsFormOpen={setIsFormOpen}
                        errors={errors}
                        navigate={navigate}
                        setNavigate={setNavigate}
                    />
                </FormLayout>
            }
        </>
    );
}

export default BookFormPage;
