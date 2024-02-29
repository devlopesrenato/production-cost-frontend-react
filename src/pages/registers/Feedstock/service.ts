import api from '../../../services/api';

export const getFeedstocks = async () => {
    const response = await api({
        method: "GET",
        url: 'feedstock',
    });
    return response;
};


export const createFeedstock = async (data: { name: string, customMeasurementId: string, quantity: number, price: number }) => {
    const response = await api({
        method: "POST",
        url: 'feedstock',
        data
    });
    return response;
};

export const updateFeedstock = async (uuid: string, data: { name: string, customMeasurementId: string, quantity: number, price: number }) => {
    const response = await api({
        method: "PUT",
        url: 'feedstock/' + uuid,
        data
    });
    return response;
};

export const deleteFeedstock = async (uuid: string) => {
    const response = await api({
        method: "DELETE",
        url: 'feedstock/' + uuid,
    });
    return response;
};

export const getCustomMeasurements = async () => {
    const response = await api({
        method: "GET",
        url: 'customMeasurement',
    });
    return response;
};