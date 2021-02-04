import React from "react";
import axios, { AxiosResponse } from "axios";
import { GetServerSideProps, NextPage } from "next";
import { withSession } from "../lib/withSession";
import { User } from "../src/entity/User";
import { useForm } from "../hooks/useForm";

interface Props {
  user: User;
}

const SignIn: NextPage<Props> = ({ user }) => {
  const { form, setErrors } = useForm({
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
    onSubmit: (formData) => {
      axios.post("/api/v1/sessions", formData).then(
        () => {
          window.alert("登录成功");
          // window.location.href = "/sign_in";
        },
        (error) => {
          const response: AxiosResponse = error.response;
          if (response) {
            if (response.status === 422) {
              setErrors(response.data);
            }
          }
        }
      );
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
