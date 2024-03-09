import Cookies from 'universal-cookie';
const cookies = new Cookies();

export function getToken() {
    const token = cookies.get('@costprd:token');
    return token;
}

export function setToken(token?: string) {
    cookies.set(
        '@costprd:token',
        token,
        { maxAge: token ? 999990 : 0, path: '/' }
    );
}

export function getUserData() {
    const userData = cookies.get('@costprd:userData');
    return userData;
}

export function setUserData(user?: User) {
    cookies.set(
        "@costprd:userData",
        user ? JSON.stringify(user) : null,
        { maxAge: user ? 999990 : 0, path: '/' }
    );
}

