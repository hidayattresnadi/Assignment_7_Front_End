import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import BookService from '../../services/bookService';
import { useParams } from 'react-router-dom';
import BookRequestDetailCard from '../modules/bookRequestCard';

function RequestBookDetailPage() {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookRequestData, setBookRequestData] = useState();
    useEffect(() => {
        const loadData = async () => {
            try {
                const bookRequestResponse = await BookService.getBookRequest(id);
                setBookRequestData(bookRequestResponse.data);
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
            <BookRequestDetailCard detailBookRequest={bookRequestData} />
        </>
    )
}

export default RequestBookDetailPage;