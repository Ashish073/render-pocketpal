import { getTokenCookie } from '../../services/cookieService';
import { createSlice } from '@reduxjs/toolkit';
import { setUserInfo, getUserInfo } from '../../services/cookieService';

const initialState = {
    user: getUserInfo() || {},
    isLoggedIn: getTokenCookie() ? true : false,
    token: getTokenCookie() || "",
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setUserData: (state, action) => {
            state.user = action.payload;
            setUserInfo(action.payload);
        },
    },
});

export const { setIsLoggedIn, setUserData } = authSlice.actions;
export default authSlice.reducer;