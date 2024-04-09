import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expenses: [],
    dates: []
};

export const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setExpenses: (state, action) => {
            state.expenses = action.payload;
        },
        setExpenseDates: (state, action) => {
            state.dates = action.payload;
        }
    },
});

export const { setExpenses, setExpenseDates } = expenseSlice.actions;
export default expenseSlice.reducer;