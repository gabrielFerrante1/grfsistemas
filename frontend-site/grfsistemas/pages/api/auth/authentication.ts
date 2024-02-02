import { NextApiRequest, NextApiResponse } from "next";
import { Session, withIronSession } from "next-iron-session"; 
import { ApiPropsVerifyToken } from "../../../types/User";
import { api } from "../../../utils/api"; 

type NextIronRequest = NextApiRequest & { session: Session };

async function handler(req: NextIronRequest, res: NextApiResponse) {
  let logged = false;
 
  if(req.query.token) {
    const checkToken: ApiPropsVerifyToken = await api('auth/verify-token', 'get', '', req.query.token.toString());
  
    if(checkToken.authorize) {
      req.session.set("user", {
        error: false,
        user: {
          id: checkToken.user.id,
          name: checkToken.user.name,
          email: checkToken.user.email,
          token: req.query.token
        }
      });

      await req.session.save();
    
      logged = true;
    } else {
      req.session.destroy()
    } 
  }

  if(req.query.type && req.query.type == 'login_social') {
    const error = req.query.error ?  req.query.error : '';

    res.redirect(`/auth/login?error=${error}`);
  }

  res.json({logged});
}

export default withIronSession(handler, {
  password: 'grfsistemas_92333_secretCookie@rifo$hjii313C#',
  cookieName: "user",
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.APP_ENV === "production",
    maxAge: 90900000
  }
});