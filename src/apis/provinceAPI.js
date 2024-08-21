import axiosClient from "./axiosClient";

export const provinceCreatedAPI = async (value) => {
    const {data} = await axiosClient.post('/province', value);
    return data;
};

export const provinceAPIGetAll = async () => {
    const {data} = await axiosClient.post('/province/search/all');
    return data;
};

export const provinceAPIGetByPagination = async (value) => {
    const {data} = await axiosClient.post('/province/search/', value);
    return data;
};

export const provinceAPIDeleteById = async (id) => {
    const {data} = await axiosClient.delete(`/province/${id}`);
    return data;
};

export const provinceEditAPIByID = async (value) => {
    const {data} = await axiosClient.put('/province', value);
    return data;
};

export const provinceLiteAPIGetAll = async () => {
    const {data} = await axiosClient.get('/province/lite');
    return data;
};

export const provinceLiteAPIGetById = async (id) => {
    const {data} = await axiosClient.get(`/province/${id}`);
    return data;
};