import axiosClient from "./axiosClient";

export const receiptCreatedAPI = async (value) => {
    const {data} = await axiosClient.post('/receipt', value);
    return data;
};

export const receiptAPIGetAll = async () => {
    const {data} = await axiosClient.post('/receipt/search/all');
    return data;
};

export const receiptAPIGetByPagination = async (value) => {
    const {data} = await axiosClient.post('/receipt/search/', value);
    return data;
};

export const receiptAPIDeleteById = async (id) => {
    const {data} = await axiosClient.delete(`/receipt/${id}`);
    return data;
};

export const receiptEditAPIByID = async (value) => {
    const {data} = await axiosClient.put('/receipt', value);
    return data;
};