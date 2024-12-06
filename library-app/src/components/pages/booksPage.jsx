import { useNavigate } from 'react-router-dom';
import TableLayout from '../templates/TableLayout';
import { useState } from 'react';
import LoadingSpinner from '../elements/loading';
import Swal from 'sweetalert2';
import { successSwal } from '../../helper';
import BookService from '../../services/bookService';

import TableBooksCRUD from '../modules/tableBooksCRUD';
import ReactPaginate from 'react-paginate';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Container from '../elements/container';
import Label from '../elements/label';
import Button from '../elements/button';
import Input from '../elements/input';
import SelectOption from '../elements/selectOptions';

function BooksPage({ columns = { columns } }) {
    const navigate = useNavigate();
    const buttonTitle = 'Add Book';
    const onClick = () => navigate('/books/add')
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Title');
    const [sortOrder, setSortOrder] = useState(false);
    const [filterLanguage, setFilterLanguage] = useState();

    const handlePageClick = (data) => {
        const nextPage = data.selected + 1;
        setPage(nextPage);
    };

    const handleFilterLanguage = (e) => {
        setFilterLanguage(e.target.value);
        setPage(1);
    };

    const handleSizePage = (e) => {
        setPageSize(+e.target.value);
        setPage(1);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
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

    const fetchBooks = async ({ page, pageSize, searchQuery, sortBy, sortOrder, filterLanguage }) => {
        try {
            let response = await BookService.getAll({
                pageNumber: page,
                pageSize: pageSize,
                keyWord: searchQuery,
                sort: sortBy,
                isAscending: sortOrder,
                language: filterLanguage
            });
            return response.data;
        } catch (error) {
            throw new Error(error, 'Error fetching books');
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['books', page, pageSize, searchQuery, sortBy, sortOrder, filterLanguage],
        queryFn: () => fetchBooks({ page, pageSize, searchQuery, sortBy, sortOrder, filterLanguage }),
        placeholderData: keepPreviousData,
    });

    const queryClient = useQueryClient();

    const deleteBookMutation = useMutation({
        mutationFn: (id) => BookService.remove(id),
        onSuccess: () => {
            successSwal('Book Deleted successfully');
            queryClient.invalidateQueries(['books']); // Memicu refetch data buku
        },
        onError: () => {
            Swal.fire('Error', 'Failed to delete book', 'error');
        },
    });

    const handleDeleteBook = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBookMutation.mutate(id); // Gunakan mutasi delete
            }
        });
    };
    

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <Container><h1>Error Happens...</h1></Container>;


    return (
        <>
            <TableLayout title="List of Books" buttonTitle={buttonTitle} onClick={onClick}>
                <Container className='input-group mb-3' >
                    <span className='input-group-text'>Search</span>
                    <Input label="ISBN" type="text" placeholder='search by Title' className='form-control' value={searchQuery} onChange={handleSearch} />
                </Container>

                <Container className='mb-3'>
                    <Button className='btn btn-dark me-3' onClick={() => handleSort('Author')}>Author {getSortIcon('Author')}</Button>
                    <Button className='btn btn-dark me-3' onClick={() => handleSort('Title')}>Title {getSortIcon('Title')}</Button>
                    <Button className='btn btn-dark me-3' onClick={() => handleSort('Category')}>Category {getSortIcon('Category')}</Button>
                    <Label className='me-3'>Select Language: </Label>
                    <select className='me-3' onChange={handleFilterLanguage}>
                        <SelectOption value="">All</SelectOption>
                        <SelectOption value="English">English</SelectOption>
                        <SelectOption value="Spanish">Spanish</SelectOption>
                        <SelectOption value="French">French</SelectOption>
                        <SelectOption value="Japan">Japan</SelectOption>
                    </select>
                    <Label className='me-3'>Select Total Items: </Label>
                    <select onChange={handleSizePage}>
                        <SelectOption value="5">5</SelectOption>
                        <SelectOption value="10">10</SelectOption>
                        <SelectOption value="15">15</SelectOption>
                    </select>
                </Container>
                <TableBooksCRUD columns={columns} books={data?.data} handleDeleteBook={handleDeleteBook} />
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

export default BooksPage;