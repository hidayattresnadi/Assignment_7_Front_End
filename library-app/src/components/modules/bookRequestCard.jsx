import MemberDetail from "../widgets/dataDetail";
import '../../bookCard.css'
import Container from "../elements/container";
import { formatDateWithOrdinal } from "../../helper";
import { useState } from "react";
import ProcessService from "../../services/processService";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const BookRequestDetailCard = ({ detailBookRequest }) => {
    const { user: currentUser } = useSelector(state => state.auth);
    const [comment, setComment] = useState('');
    const [requestStatus, setRequestStatus] = useState('');

    const handleSubmit = async () => {
        if (!comment || !requestStatus) {
            toast.error("Both comments and status must be filled out!");
            return;
        }

        try {
            const payload = { comment, requestStatus };
            Swal.fire({
                title: `Are you sure you want to update status into ${requestStatus}?`,
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, update it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await ProcessService.create(payload, detailBookRequest.processId);
                    toast.success("Request updated successfully!");
                }
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to update request.");
        }
    };
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <Container className="card w-75 container-fluid text-start">
                {/* Book Request Details */}
                <Container className="mb-4">
                    <h4 className="mb-3">Requester Details</h4>
                    <div className="row">
                        <div className="col-6">
                            <MemberDetail label="Requester" value={detailBookRequest.requester} />
                            <MemberDetail label="Request Date" value={formatDateWithOrdinal(detailBookRequest.requestDate)} />
                        </div>
                        <div className="col-6">
                            <MemberDetail label="Process Id" value={detailBookRequest.processId} />
                            <MemberDetail label="Current Status" value={detailBookRequest.currentStatus} />
                        </div>
                    </div>
                </Container>

                {/* Book Details */}
                <Container className="mb-4">
                    <h4 className="mb-3">Book Details</h4>
                    <div className="row">
                        <div className="col-4">
                            <MemberDetail label="Book Title" value={detailBookRequest.bookTitle} />
                        </div>
                        <div className="col-4">
                            <MemberDetail label="Author" value={detailBookRequest.author} />
                        </div>
                        <div className="col-4">
                            <MemberDetail label="Publisher" value={detailBookRequest.publisher} />
                        </div>
                    </div>
                </Container>

                {/* Request History */}
                <Container>
                    <h4 className="mb-3">Request History</h4>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Review Date</th>
                                <th>Action By</th>
                                <th>Action</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailBookRequest.requestHistory.map((history, index) => (
                                <tr key={index}>
                                    <td>{formatDateWithOrdinal(history.actionDate)}</td>
                                    <td>{history.actionBy}</td>
                                    <td>{history.action}</td>
                                    <td>{history.comments}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Container>
                {currentUser.roles[0] != "Library User" ?
                    <Container>
                        <h4 className="mb-3">Add Comments and Update Status</h4>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="comments" className="form-label">Comments</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="comments"
                                    placeholder="Enter your comments"
                                    onChange={(e) => setComment(e.target.value)} // Replace with state handler
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">Request Status</label>
                                <select
                                    id="status"
                                    className="form-select"
                                    onChange={(e) => setRequestStatus(e.target.value)} // Replace with state handler
                                >
                                    <option value="">Select Status</option>
                                    <option value="Request Approved">Approved</option>
                                    <option value="Request Rejected">Rejected</option>
                                </select>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSubmit} // Replace with your submission handler
                            >
                                Submit
                            </button>
                        </form>
                    </Container> : ''

                }

            </Container>

        </>

    );
};

export default BookRequestDetailCard;
