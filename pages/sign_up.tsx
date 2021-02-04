import React from "react";
import axios, { AxiosResponse } from "axios";
import { NextPage } from "next";
import { useForm } from "../hooks/useForm";

const SignUp: NextPage = () => {
  const { form, setErrors } = useForm({
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
    onSubmit: (formData) => {
      axios.post("/api/v1/users", formData).then(
        () => {
          window.alert("注册成功");
          window.location.href = "/sign_in";
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
      <h1>注册</h1>
      {form}
    </>
  );
};

export default SignUp;
