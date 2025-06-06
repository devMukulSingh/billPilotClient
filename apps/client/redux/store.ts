import { configureStore } from '@reduxjs/toolkit';
import { splitApi } from './api';
import { setupListeners } from '@reduxjs/toolkit/query';
import rootReducer from './reducers/rootReducer';

export const store = configureStore({
  reducer: {
    [splitApi.reducerPath]: splitApi.reducer,
    rootReducer: rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(splitApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
