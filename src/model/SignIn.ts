import { getDatabaseConnection } from "../../lib/getDatabaseConnection";
import { User } from "../entity/User";
import md5 from "md5";

export class SignIn {
  username: string;
  password: string;
  user: User;

  errors = {
    username: [] as string[],
    password: [] as string[],
  };
  async validate() {
    const { username, password, errors } = this;
    if (!username.trim()) {
      errors.username.push("请填写用户名");
    }
    const connection = await getDatabaseConnection();
    const user = await connection.manager.findOne(User, {
      where: { username },
    });
    this.user = user;
    if (user) {
      const password_digest = md5(password);
      if (password_digest !== user.password_digest) {
        errors.password.push("密码错误");
      }
    } else {
      errors.username.push("用户名不存在");
    }
  }
  hasErrors() {
    const { errors } = this;
    return Object.values(errors).some((errors) => errors.length > 0);
  }
}
