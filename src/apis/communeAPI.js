import axiosClient from "./axiosClient";

export const communeCreatedAPI = async (value) => {
    const {data} = await axiosClient.post('/commune', value);
    return data;
};

export const communeAPIGetAll = async () => {
    const {data} = await axiosClient.post('/commune/search/all');
    return data;
};

export const communeAPIGetByPagination = async (value) => {
    const {data} = await axiosClient.post('/commune/search/', value);
    return data;
};

export const communeAPIGetByDistrict = async (id) => {
    const {data} = await axiosClient.get(`commune/district/${id}`);
    return data;
};

export const communeAPIDeleteById = async (id) => {
    const {data} = await axiosClient.delete(`/commune/${id}`);
    return data;
};

export const communeEditAPIByID = async (value) => {
    const {data} = await axiosClient.put('/commune', value);
    return data;
};