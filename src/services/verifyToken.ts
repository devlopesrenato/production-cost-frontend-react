import api from './api'
import { getToken, setToken, setUserData } from "./cookies";

export default async function verifyToken() {

    const response = await api({
        method: "POST",
        url: 'users/validtoken',
    });

    if (response.status === 200) {
        const token = getToken();
        const user: User = {
            id: response.data.id,
            name: response.data.name,
            token,
        }
        setUserData(user);
    } else if (response.status === 401) {
        setUserData();
        setToken();
        return false;
    }
    return true;
}