import { Api } from "./Api"

export type SystemRecentPurchase = {
    buyBack: boolean,
    date: string
}

export type SystemRating = {
    count: number,
    average: number
}

export type SystemPlan = { 
    id_plan: number,
    price: number
}

export type SystemMedia = {
    source: string
}

export type SystemCompanie = {
    id: number,
    avatar: string,
    name: string,
    verified: boolean,
    description: string,
    countLastSales: number,
    countSystems: number,
    rating: number,
    countRatings: number
}

export type System = {
    id: number,
    name: string,
    description: string,
    new: boolean,
    plans: SystemPlan[],
    rating: SystemRating
    planFree: boolean,
    category_name: string,
    companie: SystemCompanie,
    medias: SystemMedia[]
}

export interface ApiPropsSystem extends Api {
    system: System,
    planFree: boolean,
    recentPurchase: SystemRecentPurchase
}

export type ApiPropsMySystem = {
    id_system: number,
    status_id: number,
    system: {
        id: number,
        name: string,
        link: string
    }
}

export interface ApiPropsGetMySystems extends Api {
    systems: ApiPropsMySystem[]
}