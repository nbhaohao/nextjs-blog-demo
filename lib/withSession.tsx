import { withIronSession } from "next-iron-session";
import { GetServerSideProps, NextApiHandler } from "next";

function withSession(handler: GetServerSideProps): any;
function withSession(handler: NextApiHandler): any;
function withSession(handler: NextApiHandler | GetServerSideProps) {
  return withIronSession(handler, {
    // password: process.env.SECRET_COOKIE_PASSWORD,
    password: process.env.SECRET,
    cookieName: "blog",
    cookieOptions: {
      secure: false,
    },
  });
}

export { withSession };
