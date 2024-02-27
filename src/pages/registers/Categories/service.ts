import api from '../../../services/api';

export const getCategories = async () => {
    const response = await api({
        method: "GET",
        url: 'category',
    });
    return response;
};


export const createCategory = async (data: { name: string }) => {
    const response = await api({
        method: "POST",
        url: 'category',
        data
    });
    return response;
};

export const updateCategory = async (uuid: string, data: { name: string }) => {
    const response = await api({
        method: "PUT",
        url: 'category/' + uuid,
        data
    });
    return response;
};

export const deleteCategory = async (uuid: string) => {
    const response = await api({
        method: "DELETE",
        url: 'category/' + uuid,
    });
    return response;
};
