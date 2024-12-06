import apiClient from "../axiosConfig.jsx";

const getAll = async (params) => {
    return await apiClient.get("/Book", { params });
};

const get = async (id) => {
    return await apiClient.get(`/Book/${id}`);
};

const create = async (data) => {
    return await apiClient.post("/Book", data);
};

const update = async (id, data) => {
    return await apiClient.put(`/Book/${id}`, data);
};

const remove = async (id) => {
    return await apiClient.delete(`/Book/${id}`);
};

const addBookRequest = async (data) => {
    return await apiClient.post(`/Book/book_request/1`,data);
};

const getAllBookRequests = async (params) => {
    return await apiClient.get(`/Book/request-Book-List`,{ params });
};

const getBookRequest = async (id) => {
    return await apiClient.get(`/Book/request-Book-List-detail/${id}`);
};

const BookService = {
    getAll,
    get,
    create,
    update,
    remove,
    addBookRequest,
    getAllBookRequests,
    getBookRequest

};
    
export default BookService;