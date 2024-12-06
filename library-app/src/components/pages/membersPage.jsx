import { useNavigate } from 'react-router-dom';
import TableMembers from '../modules/tableMembers';
import TableLayout from '../templates/TableLayout';
import { useState } from 'react';
import LoadingSpinner from '../elements/loading';
import Container from '../elements/container';
import Swal from 'sweetalert2';
import { successSwal } from '../../helper';
import UserService from '../../services/userService';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import Label from '../elements/label';
import SelectOption from '../elements/selectOptions';

function MembersPage({ columns = { columns }}) {
    const navigate = useNavigate();
    const buttonTitle = 'Add Member';
    const onClick = () => navigate('/members/add')
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const handlePageClick = (data) => {
        const nextPage = data.selected + 1;
        setPage(nextPage);
    };

    const handleSizePage = (e) => {
        setPageSize(+e.target.value);
        setPage(1);
    };

    const fetchUsers = async ({ page, pageSize }) => {
        try {
            let response = await UserService.getAll({
                pageNumber: page,
                pageSize: pageSize
            });
            return response.data;
        } catch (error) {
            throw new Error(error, 'Error fetching books');
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['users', page, pageSize],
        queryFn: () => fetchUsers({ page, pageSize }),
        placeholderData: keepPreviousData,
    });

    const queryClient = useQueryClient();

    const deleteUserMutation = useMutation({
        mutationFn: (id) => UserService.remove(id),
        onSuccess: () => {
            successSwal('User Deleted successfully');
            queryClient.invalidateQueries(['users']); // Memicu refetch data buku
        },
        onError: () => {
            Swal.fire('Error', 'Failed to delete book', 'error');
        },
    });

    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                deleteUserMutation.mutate(id);
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <Container><h1>Error Happens...</h1></Container>;

    return (
        <>
            <TableLayout title="List of Members" buttonTitle={buttonTitle} onClick={onClick} >
                <Container className='mb-3'>
                    <Label className='me-3'>Select Total Items: </Label>
                    <select onChange={handleSizePage}>
                        <SelectOption value="5">5</SelectOption>
                        <SelectOption value="2">2</SelectOption>
                        <SelectOption value="3">3</SelectOption>
                    </select>
                </Container>
                <TableMembers columns={columns} members={data?.data} handleDeleteUser={handleDeleteUser} />
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

export default MembersPage;