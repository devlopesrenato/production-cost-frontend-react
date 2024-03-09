import api from '../../services/api';

type ProductionDto = {
    name: string,
    categoryId: string,
    price: number,
    quantity: number
}

export const getProductions = async () => {
    const response = await api({
        method: "GET",
        url: 'production',
    });
    return response;
};

export const getCategories = async () => {
    const response = await api({
        method: "GET",
        url: 'category',
    });
    return response;
};

export const createProduction = async (data: ProductionDto) => {
    const response = await api({
        method: "POST",
        url: 'production',
        data
    });
    return response;
};

export const updateProduction = async (uuid: string, data: ProductionDto) => {
    const response = await api({
        method: "PUT",
        url: 'production/' + uuid,
        data
    });
    return response;
};

export const deleteProduction = async (uuid: string) => {
    const response = await api({
        method: "DELETE",
        url: 'production/' + uuid,
    });
    return response;
};
