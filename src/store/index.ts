import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './slices/popupSlice';
import treeReducer from './slices/treeSlice';

const store = configureStore({
  reducer: {
    popup: popupReducer,
    tree: treeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
