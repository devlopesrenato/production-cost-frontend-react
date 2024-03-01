import api from '../../../services/api';

export const getOtherCosts = async () => {
    const response = await api({
        method: "GET",
        url: 'otherCost',
    });
    return response;
};


export const createOtherCost = async (data: { name: string, type: "manual" | "distributed", quantity: number, price: number }) => {
    const response = await api({
        method: "POST",
        url: 'otherCost',
        data
    });
    return response;
};

export const updateOtherCost = async (uuid: string, data: { name: string, quantity: number, price: number, active: boolean }) => {
    const response = await api({
        method: "PUT",
        url: 'otherCost/' + uuid,
        data
    });
    return response;
};

export const deleteOtherCost = async (uuid: string) => {
    const response = await api({
        method: "DELETE",
        url: 'otherCost/' + uuid,
    });
    return response;
};