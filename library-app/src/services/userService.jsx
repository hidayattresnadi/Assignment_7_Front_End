import apiClient from "../axiosConfig.jsx";

const getAll = async (params) => {
    return await apiClient.get("/User", { params });
};

const get = async (id) => {
    return await apiClient.get(`/User/${id}`);
};

const create = async (data) => {
    return await apiClient.post("/User", data);
};

const update = async (id, data) => {
    return await apiClient.put(`/User/${id}`, data);
};

const remove = async (id) => {
    return await apiClient.delete(`/User/${id}`);
};

const UserService = {
    getAll,
    get,
    create,
    update,
    remove
};
    
export default UserService;