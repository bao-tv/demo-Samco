import axiosClient from "./axiosClient";

export const region_priceCreatedAPI = async (value) => {
    const {data} = await axiosClient.post('/region-price', value);
    return data;
};

export const region_priceAPIGetAll = async () => {
    const {data} = await axiosClient.post('/region-price/search/all');
    return data;
};

export const region_priceAPIDeleteById = async (id) => {
    const {data} = await axiosClient.delete(`/region-price/${id}`);
    return data;
};

export const region_priceEditAPIByID = async (value) => {
    const {data} = await axiosClient.put('/region-price', value);
    return data;
};