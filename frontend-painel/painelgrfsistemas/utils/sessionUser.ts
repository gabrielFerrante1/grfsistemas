// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from "iron-session"; 
import { UserAuth } from "../types/User";

export const sessionOptions: IronSessionOptions = {
    password: 'grfsistemas_92333_secretCookie@rifo$hjii313C#',
    cookieName: "user",
    cookieOptions: {
        secure: process.env.APP_ENV === "production",
    },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
    interface IronSessionData {
        user: UserAuth;
    }
}