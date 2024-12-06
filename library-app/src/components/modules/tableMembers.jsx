import TableHeader from '../widgets/tableHeader';
import TableMemberRow from '../widgets/tableMemberRow';
import { useNavigate } from 'react-router-dom';


const TableMembers = ({ members, columns, handleDeleteUser }) => {
    const navigate = useNavigate();
    
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {members.map((member) => (
                        <TableMemberRow
                            key={member.userId}
                            member={member}
                            onEdit={() => {
                                navigate(`/members/edit/${member.userId}`)
                            }}
                            onDelete={() => handleDeleteUser(member.userId)}
                            onDetail={() => {
                                navigate(`/members/${member.userId}`)
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableMembers;
