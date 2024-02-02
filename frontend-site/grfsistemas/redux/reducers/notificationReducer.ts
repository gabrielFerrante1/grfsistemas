import {createSlice, PayloadAction } from '@reduxjs/toolkit'; 
import {Notification} from '../../types/Notification';

const notifications: Notification[] = []; 
const newNotification: null | Notification  = null;

export const slice = createSlice({
    name: 'notification',
    initialState: {
        notifications,
        newNotification 
    },
    reducers: { 
        setNotifications: (state, action: PayloadAction<Notification[]>) => {
            state.notifications = action.payload;
        },
        setNewNotification: (state, action: PayloadAction<any>) => { 
            state.newNotification = action.payload; 
        } 
    }
});

//Exportando ações do reducer
export const { setNotifications, setNewNotification } = slice.actions;

export default slice.reducer;