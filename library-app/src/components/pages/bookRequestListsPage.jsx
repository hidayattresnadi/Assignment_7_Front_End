import TableLayout from '../templates/TableLayout';
import { useState } from 'react';
import LoadingSpinner from '../elements/loading';
import Container from '../elements/container';
import { keepPreviousData, useQuery} from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import Label from '../elements/label';
import SelectOption from '../elements/selectOptions';
import BookService from '../../services/bookService';
import TableBookRequests from '../modules/tableBookRequest';
import Button from '../elements/button';

function BooksRequestListsPage() {
    const columns = ["Process Id", "Request Date", "Requester", "Book Title", "Author", "Publisher","ISBN","Status","Detail"]
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortBy, setSortBy] = useState('ProcessId');
    const [sortOrder, setSortOrder] = useState(false);

    const handlePageClick = (data) => {
        const nextPage = data.selected + 1;
        setPage(nextPage);
    };

    const handleSizePage = (e) => {
        setPageSize(+e.target.value);
        setPage(1);
    };

    const handleSort = (field) => {
        if (field === sortBy) {
            setSortOrder(sortOrder === true ? false : true)
        }
        else {
            setSortBy(field);
            setSortOrder(true);
        }
    }

    const getSortIcon = (field) => {

        if (sortBy !== field) return '↕️';

        return sortOrder === true ? '↑' : '↓';

    };

    const fetcBookRequests = async ({ page, pageSize, sortBy, sortOrder }) => {
        try {
            let response = await BookService.getAllBookRequests({
                pageNumber: page,
                pageSize: pageSize,
                sort: sortBy,
                isAscending: sortOrder,
            });
            return response.data;
        } catch (error) {
            throw new Error(error, 'Error fetching book requests');
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['users', page, pageSize, sortBy, sortOrder,],
        queryFn: () => fetcBookRequests({ page, pageSize, sortBy, sortOrder, }),
        placeholderData: keepPreviousData,
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <Container><h1>Error Happens...</h1></Container>;

    return (
        <>
            <TableLayout title="List of Book Requests" >
                <Container className='mb-3'>
                    <Button className='btn btn-dark me-3' onClick={() => handleSort('Author')}>Author {getSortIcon('Author')}</Button>
                    <Button className='btn btn-dark me-3' onClick={() => handleSort('Title')}>Title {getSortIcon('Title')}</Button>
                    <Button className='btn btn-dark me-3' onClick={() => handleSort('Publisher')}>Publisher {getSortIcon('Publisher')}</Button>
                    <Button className='btn btn-dark me-3' onClick={() => handleSort('ISBN')}>ISBN {getSortIcon('ISBN')}</Button>
                    <Label className='me-3'>Select Total Items: </Label>
                    <select onChange={handleSizePage}>
                        <SelectOption value="5">5</SelectOption>
                        <SelectOption value="2">2</SelectOption>
                        <SelectOption value="3">3</SelectOption>
                    </select>
                </Container>
                <TableBookRequests columns={columns} bookRequests={data?.data} />
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"page-item"}
                    pageCount={data?.totalPages || 0}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName="pagination justify-content-center" // Bootstrap pagination container
                    activeClassName="active" // Bootstrap active class
                    pageClassName="page-item" // Bootstrap page item class
                    pageLinkClassName="page-link" // Bootstrap page link class
                    previousClassName="page-item" // Bootstrap previous button class
                    previousLinkClassName="page-link" // Bootstrap previous link class
                    nextClassName="page-item" // Bootstrap next button class
                    nextLinkClassName="page-link" // Bootstrap next link class
                />
            </TableLayout>
        </>
    )
}

export default BooksRequestListsPage;