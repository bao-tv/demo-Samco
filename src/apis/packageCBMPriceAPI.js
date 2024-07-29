import axiosClient from "./axiosClient";

export const packageCBMPriceCreatedAPI = async (value) => {
    const {data} = await axiosClient.post('/packaging-cbm-price', value);
    return data;
};

export const packageCBMPriceAPIGetAll = async () => {
    const {data} = await axiosClient.post('/packaging-cbm-price/search/all');
    return data;
};

export const packageCBMPriceAPIDeleteById = async (id) => {
    const {data} = await axiosClient.delete(`/packaging-cbm-price/${id}`);
    return data;
};

export const packageCBMPriceEditAPIByID = async (value) => {
    const {data} = await axiosClient.put('/packaging-cbm-price', value);
    return data;
};