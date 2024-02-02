import {createSlice, PayloadAction } from '@reduxjs/toolkit';
 
export const slice = createSlice({
    name: 'theme',
    initialState: {
        theme: 'light'
    },
    reducers: { 
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        }
    }
});

//Exportando ações do reducer
export const {setTheme} = slice.actions;

export default slice.reducer;