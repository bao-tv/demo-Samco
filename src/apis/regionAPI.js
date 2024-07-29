import axiosClient from "./axiosClient";

export const regionCreatedAPI = async (value) => {
    const {data} = await axiosClient.post('/region', value);
    return data;
};

export const regionAPIGetAll = async () => {
    const {data} = await axiosClient.post('/region/search/all');
    return data;
};

export const regionAPIDeleteById = async (id) => {
    const {data} = await axiosClient.delete(`/region/${id}`);
    return data;
};

export const regionEditAPIByID = async (value) => {
    const {data} = await axiosClient.put('/region', value);
    return data;
};