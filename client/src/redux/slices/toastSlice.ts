import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: "",
};

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        }
    },
});

export const { setMessage } = toastSlice.actions;
export default toastSlice.reducer;