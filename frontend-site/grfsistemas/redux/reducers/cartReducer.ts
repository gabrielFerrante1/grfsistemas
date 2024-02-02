import {createSlice, PayloadAction } from '@reduxjs/toolkit';  
import {
    ApiProsCartSystem 
} from '../../types/Cart';

const infoCart: ApiProsCartSystem = {
    error: '',
    cart: {
        summary: {
            total_amount: 0
        },
        systems: []
    }
};

export const slice = createSlice({
    name: 'cart',
    initialState: {
        step: 1,
        loadingCart: false,
        renderSystemsCart: false,
        infoCart,
        cartDrawerActive: false,
        cartAuthentication: false,
        cartLoadingRedirectPayment: '',
    },
    reducers: { 
        setStepCart: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
        setLoadingCart: (state, action: PayloadAction<boolean>) => {
            state.loadingCart = action.payload;
        },
        setInfoCart: (state, action: PayloadAction<ApiProsCartSystem>) => { 
            state.infoCart = action.payload; 
        },
        setRenderSystemsCart: (state, action: PayloadAction<boolean>) => { 
            state.renderSystemsCart = action.payload; 
        },
        setCartDrawerActive: (state, action: PayloadAction<boolean>) => { 
            state.cartDrawerActive = action.payload; 
        },
        setCartAuthentication: (state, action: PayloadAction<boolean>) => { 
            state.cartAuthentication = action.payload; 
        },
        setCartLoadingRedirectPayment: (state, action: PayloadAction<string>) => { 
            state.cartLoadingRedirectPayment = action.payload; 
        }
    }
});

//Exportando ações do reducer
export const { 
    setStepCart,
    setLoadingCart,
    setInfoCart,
    setRenderSystemsCart,
    setCartDrawerActive,
    setCartAuthentication,
    setCartLoadingRedirectPayment
} = slice.actions;

export default slice.reducer;