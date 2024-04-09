import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    openModal: false,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setOpenModal: (state, action) => {
            state.openModal = action.payload;
        }
    },
});

export const { setOpenModal } = modalSlice.actions;
export default modalSlice.reducer;