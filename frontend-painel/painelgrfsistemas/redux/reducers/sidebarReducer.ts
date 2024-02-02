import {createSlice, PayloadAction } from '@reduxjs/toolkit';
 
export const slice = createSlice({
    name: 'sidebar',
    initialState: {
        active: false
    },
    reducers: { 
        setSidebarActive: (state, action: PayloadAction<boolean>) => {
            state.active = action.payload;
        }
    }
});

//Exportando ações do reducer
export const { setSidebarActive } = slice.actions;

export default slice.reducer;