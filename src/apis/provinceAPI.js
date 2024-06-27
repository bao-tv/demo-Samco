import axiosClient from "./axiosClient";

export const provinceCreatedAPI = async (value) => {
    const {data} = await axiosClient.post('/province', value);
    return data;
};

export const provinceAPIGetAll = async () => {
    const {data} = await axiosClient.post('/province/search/all');
    return data;
};

export const provinceAPIDeleteById = async (id) => {
    const {data} = await axiosClient.delete(`/province/${id}`);
    return data;
};