import apiClient from "../axiosConfig.jsx";

const borrow = async (data) => {
    return await apiClient.post("/Borrowing", data);
};
const returning = async (data) => {
    return await apiClient.patch("/Returning", data);
};
const getAll = async (params) => {
    return await apiClient.get("/Borrowing", { params });
};

const BorrowService = {
    borrow,
    getAll,
    returning
};
    
export default BorrowService;