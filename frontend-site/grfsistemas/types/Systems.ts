import { Api } from "./Api"

export type OneSystem = {
    id: number,
    name: string, 
    img: string
    new: boolean,
    category_name: string,
    plan: {
        id_plan: number,
        price: number
    }

}

//Api props
export interface ApiPropsSystems extends Api{
    systems: OneSystem[]
}