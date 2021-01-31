import { withIronSession } from "next-iron-session";
import { GetServerSideProps, NextApiHandler } from "next";

function withSession(handler: GetServerSideProps): any;
function withSession(handler: NextApiHandler): any;
function withSession(handler: NextApiHandler | GetServerSideProps) {
  return withIronSession(handler, {
    // password: process.env.SECRET_COOKIE_PASSWORD,
    password: "4fe8cef7-355a-4a33-aab4-3737797f3d60",
    cookieName: "blog",
    cookieOptions: {
      secure: false,
    },
  });
}

export { withSession };
