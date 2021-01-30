import { NextApiHandler, NextApiResponse } from "next";
import { getDatabaseConnection } from "../../../lib/getDatabaseConnection";
import { User } from "../../../src/entity/User";
import md5 from "md5";

const createErrors = (
  res: NextApiResponse,
  statusCode: number,
  errors: any
) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf8");
  res.write(JSON.stringify(errors));
  res.end();
};

const Users: NextApiHandler = async (req, res) => {
  const { username, password, password_confirmation } = req.body;
  const user = new User();
  user.username = username;
  user.password = password;
  user.password_confirmation = password_confirmation;
  await user.validate();
  if (user.hasErrors()) {
    createErrors(res, 422, user.errors);
    return;
  } else {
    const connection = await getDatabaseConnection();
    await connection.manager.save(user);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf8");
    res.write(JSON.stringify(user));
    res.end();
  }
};

export default Users;
