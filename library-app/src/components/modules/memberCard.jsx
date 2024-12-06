import MemberDetail from "../widgets/dataDetail";
import '../../bookCard.css'
import Container from "../elements/container";
import { formatDateWithOrdinal } from "../../helper";
import { useSelector } from "react-redux";

const MemberDetailCard = ({ detailMember }) => {
    const { user: currentUser } = useSelector(state => state.auth);
    return (
        <>
            <Container className="book-details">
                <MemberDetail label="Id" value={detailMember.userId} />
                <MemberDetail label="Full Name" value={`${detailMember.firstName} ${detailMember.lastName}`} />
                <MemberDetail label="Position" value={detailMember.position} />
                <MemberDetail label="Privilege" value={detailMember.privilege} />
                <MemberDetail label="Library Card Number" value={detailMember.libraryCardNumber} />
                <MemberDetail label="Library Card Expiring Date" value={formatDateWithOrdinal(detailMember.libraryCardExpiringDate)} />
                <MemberDetail label="Roles" value={currentUser.roles}/>
            </Container>
        </>

    );
};

export default MemberDetailCard;
