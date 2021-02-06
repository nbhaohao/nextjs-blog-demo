import React from "react";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import { withSession } from "../lib/withSession";
import { User } from "../src/entity/User";
import { useForm } from "../hooks/useForm";

interface Props {
  user: User;
}

const SignIn: NextPage<Props> = ({ user }) => {
  const { form } = useForm({
    initFormData: {
      username: "",
      password: "",
    },
    fields: [
      {
        label: "用户名",
        type: "text",
        key: "username",
      },
      {
        label: "密码",
        type: "password",
        key: "password",
      },
    ],
    submit: {
      request: (formData) => axios.post("/api/v1/sessions", formData),
      message: "登录成功",
    },
    buttons: <button type="submit">注册</button>,
  });
  return (
    <>
      {user ? <div>当前登录用户：{user.username}</div> : null}
      <h1>登录</h1>
      {form}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSession(
  async (context) => {
    return {
      props: {
        user: JSON.parse(
          // @ts-ignore
          JSON.stringify(context.req.session.get("currentUser") || {})
        ),
      },
    };
  }
);

export default SignIn;
