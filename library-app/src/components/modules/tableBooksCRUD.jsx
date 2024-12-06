import TableHeader from '../widgets/tableHeader';
import { useNavigate } from 'react-router-dom';
import TableBookRowCrud from '../widgets/tableBooksRowCRUD';

const TableBooksCRUD = ({ books, columns, handleDeleteBook}) => {
    const navigate = useNavigate();

    return (
        <>
            <table key={books.length} className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {books.map((book) => (
                        <TableBookRowCrud
                            key={book.id}
                            book={book}
                            onEdit={() => {
                                navigate(`/books/edit/${book.id}`)
                            }}
                            onDelete={() => handleDeleteBook(book.id)}
                            onDetail={() => {
                                navigate(`/books/${book.id}`)
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableBooksCRUD;