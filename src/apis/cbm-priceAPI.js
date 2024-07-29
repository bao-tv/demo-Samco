import axiosClient from "./axiosClient";

export const cbm_priceCreatedAPI = async (value) => {
    const {data} = await axiosClient.post('/cbm-price', value);
    return data;
};

export const cbm_priceAPIGetAll = async () => {
    const {data} = await axiosClient.post('/cbm-price/search/all');
    return data;
};

export const cbm_priceAPIDeleteById = async (id) => {
    const {data} = await axiosClient.delete(`/cbm-price/${id}`);
    return data;
};

export const cbm_priceEditAPIByID = async (value) => {
    const {data} = await axiosClient.put('/cbm-price', value);
    return data;
};