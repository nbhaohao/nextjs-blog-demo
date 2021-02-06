import React from "react";
import axios from "axios";
import { NextPage } from "next";
import { useForm } from "../hooks/useForm";

const SignUp: NextPage = () => {
  const { form } = useForm({
    initFormData: {
      username: "",
      password: "",
      password_confirmation: "",
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
      {
        label: "确认密码",
        type: "password",
        key: "password_confirmation",
      },
    ],
    submit: {
      request: (formData) => axios.post("/api/v1/users", formData),
      message: "注册成功",
    },
    buttons: <button type="submit">注册</button>,
  });
  return (
    <>
      <h1>注册</h1>
      {form}
    </>
  );
};

export default SignUp;
