import { useState } from "react";


const BorrowBookForm = ({ members, books, onSubmit, title}) => {
    const [formData, setFormData] = useState({
        userId: "",
        bookIds: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddBook = (bookId) => {
        if (formData.bookIds.length < 3 && !formData.bookIds.includes(bookId)) {
            setFormData({
                ...formData,
                bookIds: [...formData.bookIds, bookId],
            });
        }
    };

    const handleRemoveBook = (bookId) => {
        setFormData({
            ...formData,
            bookIds: formData.bookIds.filter((id) => id !== bookId),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            userId: "",
            bookIds: [],
        });
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <h3 className="mb-4">{title}</h3>

            {/* User Dropdown */}
            <div className="mb-3">
                <label htmlFor="userId" className="form-label">
                    Select User
                </label>
                <select
                    id="userId"
                    name="userId"
                    className="form-select"
                    value={formData.userId}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>-- Select User --</option>
                    {members.map((user) => (
                        <option key={user.userId} value={user.userId}>
                            {`${user.firstName} ${user.lastName}`}
                        </option>
                    ))}
                </select>
            </div>

            {/* Borrowed Books */}
            <div className="mb-3">
                <label className="form-label">Select Books (Max 3)</label>
                <div className="d-flex flex-wrap">
                    {books.map((book) => (
                        <div key={book.id} className="me-2 mb-2">
                            <button
                                type="button"
                                className={`btn ${formData.bookIds.includes(book.id) ? "btn-success" : "btn-outline-primary"}`}
                                onClick={() =>
                                    formData.bookIds.includes(book.id)
                                        ? handleRemoveBook(book.id)
                                        : handleAddBook(book.id)
                                }
                                disabled={!formData.bookIds.includes(book.id) && formData.bookIds.length >= 3}
                            >
                                {formData.bookIds.includes(book.id) ? "Remove" : "Add"} {book.title}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <button type="submit" className="btn btn-primary">
                {title}
            </button>
        </form>
    );
};

export default BorrowBookForm;
