import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { GetServerSideProps, NextPage } from "next";

interface FormData {
  username: string;
  password: string;
  password_confirmation: string;
}

interface Errors {
  username: string[];
  password: string[];
  password_confirmation: string[];
}

const SignUp: NextPage = () => {
  const [signUpData, setSignUpData] = useState<FormData>({
    username: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({
    username: [],
    password: [],
    password_confirmation: [],
  });
  const onUpdateSignUpData = (payload: Partial<FormData>) => {
    setSignUpData({
      ...signUpData,
      ...payload,
    });
  };
  const onSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    console.log(signUpData);
    axios.post("/api/v1/users", signUpData).then(
      () => {},
      (error) => {
        const response: AxiosResponse = error.response;
        if (response) {
          if (response.status === 422) {
            setErrors({ ...errors, ...response.data });
          }
        }
      }
    );
  };
  const renderError = (key: keyof FormData) => {
    if (errors[key] && errors[key].length > 0) {
      return <div>{errors[key].join(",")}</div>;
    }
    return null;
  };
  return (
    <>
      <h1>注册</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            用户名
            <input
              type="text"
              value={signUpData.username}
              onChange={(event) => {
                onUpdateSignUpData({ username: event.target.value });
              }}
            />
          </label>
          {renderError("username")}
        </div>
        <div>
          <label>
            密码
            <input
              type="password"
              value={signUpData.password}
              onChange={(event) => {
                onUpdateSignUpData({ password: event.target.value });
              }}
            />
          </label>
          {renderError("password")}
        </div>
        <div>
          <label>
            确认密码
            <input
              type="password"
              value={signUpData.password_confirmation}
              onChange={(event) => {
                onUpdateSignUpData({
                  password_confirmation: event.target.value,
                });
              }}
            />
          </label>
          {renderError("password_confirmation")}
        </div>
        <div>
          <button type="submit">注册</button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
