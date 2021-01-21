import React from "react";
import Head from "next/head";
import Avatar from "../../asserts/avatar.jpeg";
export default function FirstPage() {
  return (
    <div>
      <style jsx>
        {`
          .firstPage {
            color: red;
          }
        `}
      </style>
      <Head>
        <title>First Page</title>
      </Head>
      <img src={Avatar} />
      <div className="firstPage">hello world</div>
    </div>
  );
}
