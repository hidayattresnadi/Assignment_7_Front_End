import { useState, useEffect, useRef } from 'react';
import InputField from '../widgets/inputField';
import SelectField from '../widgets/selectField';
import Button from '../elements/button';

const BookForm = ({ addBook, updateBook, editingBook, categories, isFormOpen, setIsFormOpen, errors, setNavigate,navigate }) => {
    const titleInputRef = useRef();
    const languages = [
        {
            id:1,
            language:'English'
        },
        {
            id:2,
            language:'French'
        },
        {
            id:3,
            language:'Spanish'
        }
    ]
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        publicationYear: '',
        isbn: '',
        publisher:'',
        description:'',
        price:'',
        purchaseDate:'',
        libraryLocation:'',
        availableBooks: '',
        language: ''
    });

    useEffect(() => {
        if (editingBook) {
            setFormData({
                title: editingBook.title,
                author: editingBook.author,
                category: editingBook.category,
                publicationYear: editingBook.publicationYear,
                isbn: editingBook.isbn,
                publisher: editingBook.publisher,
                description: editingBook.description,
                price: editingBook.price,
                purchaseDate: editingBook.purchaseDate,
                libraryLocation: editingBook.libraryLocation,
                availableBooks: editingBook.availableBooks,
                language:editingBook.language
            });
        } else {
            setFormData({
                title: '',
                author: '',
                category: '',
                publicationYear: '',
                isbn: '',
                publisher:'',
                description:'',
                price:'',
                purchaseDate:'',
                libraryLocation:'',
                availableBooks: '',
                language:''
            });
        }
    }, [editingBook]);

    useEffect(() => {
        if (isFormOpen && titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [isFormOpen]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingBook) {
            const result = await updateBook(formData);
            if (Object.keys(result).length === 0) {
                setFormData({
                    title: '',
                    author: '',
                    category: '',
                    publicationYear: '',
                    isbn: '',
                    publisher:'',
                    description:'',
                    price:'',
                    purchaseDate:'',
                    libraryLocation:'',
                    availableBooks: '',
                    language:''
                })
                setIsFormOpen(false)
                setNavigate(!navigate)
            }

        } else {
            const result = await addBook(formData);
            if (Object.keys(result).length === 0) {
                setFormData({
                    title: '',
                    author: '',
                    category: '',
                    publicationYear: '',
                    isbn: '',
                    publisher:'',
                    description:'',
                    price:'',
                    purchaseDate:'',
                    libraryLocation:'',
                    availableBooks: '',
                    language:''
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
                    label="Title"
                    type="text"
                    ref={titleInputRef}
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                {errors?.title ? <h6 className='text-start'>{errors.title}</h6> : ''}
                <InputField
                    label="Author"
                    type="text"
                    id="author"
                    value={formData.author}
                    onChange={handleInputChange}
                />
                {errors?.author ? <h6 className='text-start'>{errors.author}</h6> : ''}
                <InputField
                    label="Publication Year"
                    type="text"
                    placeholder="Example: 2023"
                    pattern="\d*"
                    id="publicationYear"
                    value={formData.publicationYear}
                    onChange={handleInputChange}
                />
                {errors?.publicationYear ? <h6 className='text-start'>{errors.publicationYear}</h6> : ''}
                <InputField
                    label="ISBN"
                    type="text"
                    id="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                />
                {errors?.isbn ? <h6 className='text-start'>{errors.isbn}</h6> : ''}
                <InputField
                    label="Publisher"
                    type="text"
                    id="publisher"
                    value={formData.publisher}
                    onChange={handleInputChange}
                />
                {errors?.publisher ? <h6 className='text-start'>{errors.publisher}</h6> : ''}
                <InputField
                    label="Description"
                    type="text"
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
                {errors?.description ? <h6 className='text-start'>{errors.description}</h6> : ''}
                <InputField
                    label="Price"
                    type="number"
                    id="price"
                    value={formData.price}
                    onChange={handleInputChange}
                />
                {errors?.price ? <h6 className='text-start'>{errors.price}</h6> : ''}
                <InputField
                    label="Available Books"
                    type="number"
                    id="availableBooks"
                    value={formData.availableBooks}
                    onChange={handleInputChange}
                />
                {errors?.availableBooks ? <h6 className='text-start'>{errors.availableBooks}</h6> : ''}
                <InputField
                    label="Library Location"
                    type="text"
                    id="libraryLocation"
                    value={formData.libraryLocation}
                    onChange={handleInputChange}
                />
                {errors?.libraryLocation ? <h6 className='text-start'>{errors.libraryLocation}</h6> : ''}
                <InputField
                    label="Purchase Date"
                    type="date"
                    id="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleInputChange}
                />
                {errors?.purchaseDate ? <h6 className='text-start'>{errors.purchaseDate}</h6> : ''}
                <SelectField
                    label="Book Language"
                    id="language"
                    options={languages}
                    value={formData.language}
                    onChange={handleInputChange}
                    className="form-select"
                    title={"Choose Book Language"}
                    displayProperty={"language"}
                    valueProperty={"language"}
                   
                />
                {errors?.language ? <h6 className='text-start'>{errors.language}</h6> : ''}
                
                <SelectField
                    label="Book Category"
                    id="category"
                    options={categories}
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-select"
                    title={"Choose Book Category"}
                    displayProperty={'categoryName'}
                    valueProperty={'categoryName'}
                />
                {errors?.bookCategory ? <h6 className='text-start'>{errors.bookCategory}</h6> : ''}
                <Button onClick={openForm} type="submit" className="btn btn-primary mt-3 w-100">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default BookForm;
