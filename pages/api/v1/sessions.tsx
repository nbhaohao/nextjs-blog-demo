import { NextApiHandler } from "next";
import { SignIn } from "../../../src/model/SignIn";
import { withSession } from "../../../lib/withSession";

const Sessions: NextApiHandler = async (req, res) => {
  const { username, password } = req.body;
  const signInUser = new SignIn();
  signInUser.username = username;
  signInUser.password = password;
  await signInUser.validate();
  res.setHeader("Content-Type", "application/json; charset=utf8");
  if (signInUser.hasErrors()) {
    res.statusCode = 422;
    res.end(JSON.stringify(signInUser.errors));
  } else {
    req.session.set("currentUser", signInUser.user);
    await req.session.save();
    res.statusCode = 200;
    res.end(JSON.stringify(signInUser.user));
  }
};

export default withSession(Sessions);
