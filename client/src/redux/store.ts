import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Import RootState from rootReducer

const store = configureStore({
    reducer: rootReducer,
});

export default store;

// If RootState is not exported from rootReducer, define it explicitly:
export type RootState = ReturnType<typeof store.getState>;
