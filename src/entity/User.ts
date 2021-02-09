import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";
// import { getDatabaseConnection } from "../../lib/getDatabaseConnection";
import md5 from "md5";

interface Errors {
  username: string[];
  password: string[];
  password_confirmation: string[];
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column("varchar")
  username: string;
  @Column("varchar")
  password_digest: string;
  @OneToMany("Post", "author")
  posts: Post[];
  @OneToMany("Comment", "user")
  comments: Comment[];
  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;
  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  password: string;
  password_confirmation: string;

  errors: Errors = {
    username: [],
    password: [],
    password_confirmation: [],
  };

  toJSON() {
    const { id, username, comments, posts, created_at, updated_at } = this;
    return { id, username, comments, posts, created_at, updated_at };
  }

  async validate() {
    const { username, password, password_confirmation, errors } = this;
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
    // const connection = await getDatabaseConnection();
    // const find = await connection.manager.findOne(User, {
    //   where: { username: username.trim() },
    // });
    // if (find) {
    //   errors.username.push("用户名重复");
    // }
    if (password === "") {
      errors.password.push("不能为空");
    }
    if (password !== password_confirmation) {
      errors.password_confirmation.push("密码不匹配");
    }
  }
  hasErrors() {
    const { errors } = this;
    return Object.values(errors).some((errors) => errors.length > 0);
  }

  @BeforeInsert()
  generatePasswordDigest() {
    this.password_digest = md5(this.password);
  }
}
