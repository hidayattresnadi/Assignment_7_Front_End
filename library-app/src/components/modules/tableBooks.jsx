import TableHeader from '../widgets/tableHeader';
import TableBooksRow from '../widgets/tableBookRow';
import { useNavigate } from 'react-router-dom';

const TableBooks = ({ books, columns}) => {
    const navigate = useNavigate();

    return (
        <>
            <table key={books.length} className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {books.map((book) => (
                        <TableBooksRow
                            key={book.id}
                            book={book}
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

export default TableBooks;
