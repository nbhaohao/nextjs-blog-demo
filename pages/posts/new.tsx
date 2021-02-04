import { NextPage } from "next";
import React from "react";
import { useForm } from "../../hooks/useForm";
import axios, { AxiosResponse } from "axios";

const PostsNew: NextPage = () => {
  const { form, setErrors } = useForm({
    initFormData: {
      title: "",
      content: "",
    },
    fields: [
      {
        key: "title",
        label: "标题",
        type: "text",
      },
      {
        key: "content",
        label: "内容",
        type: "textarea",
      },
    ],
    onSubmit: (formData) => {
      axios.post("/api/v1/posts", formData).then(
        () => {
          window.alert("提交成功");
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
    buttons: <button type="submit">提交</button>,
  });
  return <div>{form}</div>;
};

export default PostsNew;
