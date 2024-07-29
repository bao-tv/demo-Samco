import axiosClient from "./axiosClient";

export const cbm_rateCreatedAPI = async (value) => {
    const {data} = await axiosClient.post('/cbm-rate', value);
    return data;
};

export const cbm_rateAPIGetAll = async () => {
    const {data} = await axiosClient.post('/cbm-rate/search/all');
    return data;
};

export const cbm_rateAPIDeleteById = async (id) => {
    const {data} = await axiosClient.delete(`/cbm-rate/${id}`);
    return data;
};

export const cbm_rateEditAPIByID = async (value) => {
    const {data} = await axiosClient.put('/cbm-rate', value);
    return data;
};