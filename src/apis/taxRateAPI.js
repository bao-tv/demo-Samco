import axiosClient from "./axiosClient";

export const taxRateCreatedAPI = async (value) => {
    const {data} = await axiosClient.post('/delivery-config', value);
    return data;
};

export const taxRateAPIGetAll = async () => {
    const {data} = await axiosClient.post('/delivery-config/search/all');
    return data;
};

export const taxRateAPIDeleteById = async (id) => {
    const {data} = await axiosClient.delete(`/delivery-config/${id}`);
    return data;
};

export const taxRateEditAPIByID = async (value) => {
    const {data} = await axiosClient.put('/delivery-config', value);
    return data;
};