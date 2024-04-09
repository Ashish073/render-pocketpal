import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    categoriesOptions: [],
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setCategoriesOptions: (state, action) => {
            state.categoriesOptions = action.payload;
        }
    },
});

export const { setCategories, setCategoriesOptions } = categoriesSlice.actions;
export default categoriesSlice.reducer;