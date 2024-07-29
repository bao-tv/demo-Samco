import axiosClient from "./axiosClient";

export const region_rateCreatedAPI = async (value) => {
    const {data} = await axiosClient.post('/region-rate', value);
    return data;
};

export const region_rateAPIGetAll = async () => {
    const {data} = await axiosClient.post('/region-rate/search/all');
    return data;
};

export const region_rateAPIDeleteById = async (id) => {
    const {data} = await axiosClient.delete(`/region-rate/${id}`);
    return data;
};

export const region_rateEditAPIByID = async (value) => {
    const {data} = await axiosClient.put('/region-rate', value);
    return data;
};