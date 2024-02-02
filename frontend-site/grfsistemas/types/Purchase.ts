import { Api } from "./Api";

export interface ApiPropsNewPurchase extends Api {
    noPaymentRequired: boolean;
    token_payment: string;
}

export interface ApiPropsCheckTokenPurchase extends Api{
    token_payment: boolean;
}