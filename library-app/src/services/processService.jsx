import apiClient from "../axiosConfig.jsx";

const create = async (data,id) => {
    return await apiClient.post(`/Process/${id}`, data);
};


const ProcessService = {
    create
};
    
export default ProcessService;