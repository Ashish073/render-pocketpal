import Cookies from 'js-cookie';

export const setTokenCookie = (token: string): void => {
    Cookies.set('token', token, { expires: 7, httpOnly: false, secure: true });
};

export const getTokenCookie = (): string | undefined => {
    return Cookies.get('token');
};

export const deleteTokenCookie = (): void => {
    Cookies.remove('token');
};

export const setOauthTokenCookie = (oauthToken: string): void => {
    Cookies.set('oauth', oauthToken, { expires: 7, httpOnly: false, secure: true });
};

export const getOauthTokenCookie = (): string | undefined => {
    return Cookies.get('oauth');
};

export const deleteOauthTokenCookie = (): void => {
    Cookies.remove('oauth');
};

export const setUserInfo = (userInfo: Record<string, any>): void => {
    Cookies.set('userData', JSON.stringify(userInfo), { expires: 7 });
};

export const deleteUserInfo = (): void => {
    Cookies.remove('userData');
};

export const getUserInfo = (): Record<string, any> => {
    const userDataJSON = Cookies.get('userData');
    return userDataJSON ? JSON.parse(userDataJSON) : {};
};
