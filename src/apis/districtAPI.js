import axiosClient from "./axiosClient";

export const districtCreatedAPI = async (value) => {
    const {data} = await axiosClient.post('/district', value);
    return data;
};

export const districtAPIGetAll = async () => {
    const {data} = await axiosClient.post('/district/search/all');
    return data;
};

export const districtAPIGetById = async (id) => {
    const {data} = await axiosClient.get(`/district/${id}`);
    return data;
};

export const districtAPIDeleteById = async (id) => {
    const {data} = await axiosClient.delete(`/district/${id}`);
    return data;
};

export const districtEditAPIByID = async (value) => {
    const {data} = await axiosClient.put('/district', value);
    return data;
};