import { Api } from './Api';

type SystemInfoPlan = {
    id_plan: number
}

export type SummaryCart = {
    total_amount: number
}

export type SystemInfo = {
    id: number,
    name: string,
    media: string,
    id_plan: number,
    price: number,
    plans: SystemInfoPlan[]
}

export interface ApiProsCartSystem extends Api{
    cart: {
        summary: SummaryCart,
        systems: SystemInfo[]
    }
} 