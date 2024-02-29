import api from '../../../services/api';

export const getCustomMeasurements = async () => {
    const response = await api({
        method: "GET",
        url: 'customMeasurement',
    });
    return response;
};


export const createCustomMeasurement = async (data: { name: string, unitsOfMeasurementId: string, quantity: number }) => {
    const response = await api({
        method: "POST",
        url: 'customMeasurement',
        data
    });
    return response;
};

export const updateCustomMeasurement = async (uuid: string, data: { name: string, unitsOfMeasurementId: string, quantity: number }) => {
    const response = await api({
        method: "PUT",
        url: 'customMeasurement/' + uuid,
        data
    });
    return response;
};

export const deleteCustomMeasurement = async (uuid: string) => {
    const response = await api({
        method: "DELETE",
        url: 'customMeasurement/' + uuid,
    });
    return response;
};

export const getUnitOfMeasurements = async () => {
    const response = await api({
        method: "GET",
        url: 'unitsOfMeasurement',
    });
    return response;
};