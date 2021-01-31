import { NextApiHandler } from "next";
import { SignIn } from "../../../src/model/SignIn";

const Sessions: NextApiHandler = async (req, res) => {
  const { username, password } = req.body;
  const signInUser = new SignIn();
  signInUser.username = username;
  signInUser.password = password;
  await signInUser.validate();
  res.setHeader('Content-Type', 'application/json; charset=utf8');
  if (signInUser.hasErrors()) {
    res.statusCode = 422;
    res.write(JSON.stringify(signInUser.errors))
    res.end();
  } else {
    res.statusCode = 200;
    res.write(JSON.stringify(signInUser.user));
    res.end(JSON.stringify(signInUser.user));
  }
};

export default Sessions;
