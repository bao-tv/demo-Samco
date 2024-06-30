import axiosClient from "./axiosClient";

export const distanceCreatedAPI = async (value) => {
    const {data} = await axiosClient.post('/remaining-price', value);
    return data;
};

export const distanceAPIGetAll = async () => {
    const {data} = await axiosClient.post('/remaining-price/search/all');
    return data;
};

export const distanceAPIDeleteById = async (id) => {
    const {data} = await axiosClient.delete(`/remaining-price/${id}`);
    return data;
};

export const distanceEditAPIByID = async (value) => {
    const {data} = await axiosClient.put('/remaining-price', value);
    return data;
};