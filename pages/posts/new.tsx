import { NextPage } from "next";
import React from "react";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { useRouter } from "next/router";

const PostsNew: NextPage = () => {
  const router = useRouter();
  const { form } = useForm({
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
    submit: {
      request: (formData) => axios.post("/api/v1/posts", formData),
      success: () => {
        alert("提交成功");
        router.push("/posts");
      },
    },
    buttons: <button type="submit">提交</button>,
  });
  return <div>{form}</div>;
};

export default PostsNew;
