import axiosClient from "./axiosClient";

export const packageCreatedAPI = async (value) => {
    const {data} = await axiosClient.post('/package', value);
    return data;
};

export const packageAPIGetAll = async () => {
    const {data} = await axiosClient.post('/package/search/all');
    return data;
};

export const packageAPIDeleteById = async (id) => {
    const {data} = await axiosClient.delete(`/package/${id}`);
    return data;
};

export const packageEditAPIByID = async (value) => {
    const {data} = await axiosClient.put('/package', value);
    return data;
};