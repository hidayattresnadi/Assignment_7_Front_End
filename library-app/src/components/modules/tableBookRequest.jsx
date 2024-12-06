import TableHeader from '../widgets/tableHeader';
import TableBookRequestRow from '../widgets/tableBookRequestRow';
import { useNavigate } from 'react-router-dom';

const TableBookRequests = ({ bookRequests, columns}) => {
    const navigate = useNavigate();

    return (
        <>
            <table key={bookRequests.length} className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {bookRequests.map((bookRequest) => (
                        <TableBookRequestRow
                            key={bookRequest.processId}
                            bookRequest={bookRequest}
                            onDetail={()=>navigate(`/bookRequest/detail/${bookRequest.processId}`)}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableBookRequests;
