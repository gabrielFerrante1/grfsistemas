import { NextApiRequest, NextApiResponse } from "next";
import { Session, withIronSession } from "next-iron-session";

type NextIronRequest = NextApiRequest & { session: Session };

function handler(req: NextIronRequest, res: NextApiResponse, session: Session) {
  const user = req.session.get("user");

  if(!user) {
    res.json({error: true, user: false});
  } else {
    res.json(user) 
  }
  
}

export default withIronSession(handler, {
  password: 'grfsistemas_92333_secretCookie@rifo$hjii313C#',
  cookieName: "user",
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.APP_ENV === "production",
  },
});