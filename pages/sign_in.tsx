import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { GetServerSideProps, NextPage } from "next";
import { withSession } from "../lib/withSession";
import { User } from "../src/entity/User";

interface FormData {
  username: string;
  password: string;
}

interface Props {
  user: User;
}

const SignIn: NextPage<Props> = ({ user }) => {
  const [signUpData, setSignUpData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: [],
    password: [],
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
    axios.post("/api/v1/sessions", signUpData).then(
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
  };
  const renderError = (key: keyof FormData) => {
    if (errors[key] && errors[key].length > 0) {
      return <div>{errors[key].join(",")}</div>;
    }
    return null;
  };
  return (
    <>
      {user ? <div>当前登录用户：{user.username}</div> : null}
      <h1>登录</h1>
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
          <button type="submit">注册</button>
        </div>
      </form>
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
