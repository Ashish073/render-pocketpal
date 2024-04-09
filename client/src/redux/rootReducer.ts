import { combineReducers } from '@reduxjs/toolkit';
import toastSlice from './slices/toastSlice';
import authSlice from './slices/authSlice';
import categoriesSlice from './slices/categoriesSlice';
import expenseSlice from './slices/expenseSlice';
import modalSlice from './slices/modalSlice';

const rootReducer = combineReducers({
    toastSlice,
    authSlice,
    categoriesSlice,
    expenseSlice,
    modalSlice
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
