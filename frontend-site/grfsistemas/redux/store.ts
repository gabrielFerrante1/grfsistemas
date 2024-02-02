import { configureStore } from '@reduxjs/toolkit';  
import cartReducer from './reducers/cartReducer';
import notificationReducer from './reducers/notificationReducer';
import themeReducer from './reducers/themeReducer';  
  
export const store = configureStore({
    reducer: {
       theme: themeReducer, 
       notification: notificationReducer,
       cart: cartReducer
    },
  });
   
export type RootState = ReturnType<typeof store.getState>; 