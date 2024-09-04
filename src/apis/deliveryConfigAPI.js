import axiosClient from "./axiosClient";

export const deliveryConfigCreatedAPI = async (value) => {
    const {data} = await axiosClient.post('/delivery-config', value);
    return data;
};

export const deliveryConfigAPIGetAll = async () => {
    const {data} = await axiosClient.post('/delivery-config/search/all');
    return data;
};

export const deliveryConfigAPIDeleteById = async (id) => {
    const {data} = await axiosClient.delete(`/delivery-config/${id}`);
    return data;
};

export const deliveryConfigEditAPIByID = async (value) => {
    const {data} = await axiosClient.put('/delivery-config', value);
    return data;
};