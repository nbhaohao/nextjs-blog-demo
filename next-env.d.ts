/// <reference types="next" />
/// <reference types="next/types/global" />

import { Session } from "next-iron-session";
import * as next from "next";

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "next" {
  interface NextApiRequest {
    session: Session;
  }
}
