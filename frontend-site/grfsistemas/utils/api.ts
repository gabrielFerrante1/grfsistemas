import axios from "axios";
import { UserAuth } from "../types/User";

const base_url = process.env.NEXT_PUBLIC_BASE_URL+'/api';

export const api = async ( 
        route: string,
        method: 'get' | 'post' | 'put' | 'delete' = 'get',
        data?: object | string,
        token: string | null = null
    ) => {
    
    let header = {};
    let body = null;
    let fullUrl = `${base_url}/${route}`;

    if(token) {
        header = { 
            'Authorization': `Bearer ${token}` 
        };
    }

    switch (method) {
        case 'get':
            if(data != undefined) {
                if(typeof data == 'string') {
                    let queryString = new URLSearchParams(data).toString();
                    fullUrl += `?${queryString}`; 
                } 
            }
            break;
        case 'post':
        case 'put':
        case 'delete':
            body = data;
            break;
    }

    const req = axios(fullUrl, {
        method,
        data: body,
        headers: header
    });

    return (await req).data;
}
 
export const apiAuth = async (): Promise<UserAuth> => {
    const req = axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/user`);
    const ret: UserAuth = (await req).data;

    return ret;
}