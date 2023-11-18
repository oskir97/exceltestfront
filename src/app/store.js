import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { excelTestApi } from '../services/excelTestApi';

const rootReducer = combineReducers({
    [excelTestApi.reducerPath]: excelTestApi.reducer,
});

export const setupStore = (preloadedState) =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(excelTestApi.middleware),
        preloadedState,
    });

export const store = setupStore();
export const AppStore = setupStore().getState();
export const AppDispatch = store.dispatch;