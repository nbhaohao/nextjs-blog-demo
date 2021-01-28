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

interface Errors {
  username: string[];
  password: string[];
  password_confirmation: string[];
}

const Users: NextApiHandler = async (req, res) => {
  const { username, password, password_confirmation } = req.body;

  const errors: Errors = {
    username: [],
    password: [],
    password_confirmation: [],
  };
  if (username.trim() === "") {
    errors.username.push("不能为空");
  }
  if (!/[a-zA-Z0-9]/.test(username.trim())) {
    errors.username.push("格式不合法");
  }
  if (username.trim().length > 42) {
    errors.username.push("太长");
  }
  if (username.trim().length <= 3) {
    errors.username.push("太短");
  }
  if (password === "") {
    errors.password.push("不能为空");
  }
  if (password !== password_confirmation) {
    errors.password_confirmation.push("密码不匹配");
  }
  if (Object.values(errors).some((errors) => errors.length > 0)) {
    createErrors(res, 422, errors);
    return;
  } else {
    const connection = await getDatabaseConnection();
    const user = new User();
    user.username = username.trim();
    user.password_digest = md5(password);
    await connection.manager.save(user);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf8");
    const { password_digest, ...exclude_password_digest_user } = user;
    res.write(JSON.stringify(exclude_password_digest_user));
    res.end();
  }
};

export default Users;
