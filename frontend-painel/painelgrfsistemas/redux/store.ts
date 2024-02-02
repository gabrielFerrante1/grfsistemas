import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './reducers/sidebarReducer';
import themeReducer from './reducers/themeReducer';  
  
export const store = configureStore({
    reducer: {
       theme: themeReducer,
       sidebar: sidebarReducer
    },
  });
   
export type RootState = ReturnType<typeof store.getState>; 