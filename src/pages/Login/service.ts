import api from '../../services/api';

export const login = async (data: { user: string, password: string }) => {
    const response = await api({
        method: "POST",
        url: 'users/login',
        data
    });
    return response;
};
