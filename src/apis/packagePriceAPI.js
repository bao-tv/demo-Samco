import axiosClient from "./axiosClient";

export const packagePriceCreatedAPI = async (value) => {
    const {data} = await axiosClient.post('/packaging-price', value);
    return data;
};

export const packagePriceAPIGetAll = async () => {
    const {data} = await axiosClient.post('/packaging-price/search/all');
    return data;
};

export const packagePriceAPIGetByPagination = async (value) => {
    const {data} = await axiosClient.post('/packaging-price/search/', value);
    return data;
};

export const packagePriceAPIDeleteById = async (id) => {
    const {data} = await axiosClient.delete(`/packaging-price/${id}`);
    return data;
};

export const packagePriceEditAPIByID = async (value) => {
    const {data} = await axiosClient.put('/packaging-price', value);
    return data;
};