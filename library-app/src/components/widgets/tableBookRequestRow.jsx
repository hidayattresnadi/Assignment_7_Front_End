import { formatDateWithOrdinal } from '../../helper';
import Button from '../elements/button';
import Icon from '../elements/icon';
import TableCell from '../elements/tableCell';

const TableBookRequestRow = ({ onDetail, bookRequest }) => (
    <tr>
        <TableCell>{bookRequest.processId}</TableCell>
        <TableCell>{formatDateWithOrdinal(bookRequest.requestDate)}</TableCell>
        <TableCell>{bookRequest.requester}</TableCell>
        <TableCell>{bookRequest.bookTitle}</TableCell>
        <TableCell>{bookRequest.author}</TableCell>
        <TableCell>{bookRequest.publisher}</TableCell>
        <TableCell>{bookRequest.isbn}</TableCell>
        <TableCell>
            {bookRequest.status === "Accepted" ? (
                <Button className="btn btn-success btn-sm not-clickable">
                    <Icon className="bi bi-check-circle-fill"></Icon> Accepted
                </Button>
            ) : bookRequest.status === "Rejected" ? (
                <Button className="btn btn-danger btn-sm not-clickable">
                    <Icon className="bi bi-x-circle-fill"></Icon> Rejected
                </Button>
            ) : (
                <Button className="btn btn-warning btn-sm not-clickable" disabled>
                    <Icon className="bi bi-exclamation-circle-fill"></Icon> {bookRequest.status}
                </Button>
            )}
        </TableCell>


        <TableCell>
            <Button onClick={onDetail} className="btn btn-primary" aria-label="Detail Book">
                <Icon className="fas fa-eye" />
            </Button>
        </TableCell>
    </tr>
);

export default TableBookRequestRow;
