"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignUp = () => {
  const router = useRouter();
  const [disableBtn, setDisableBtn] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const onSignUp = async () => {
    try {
      const response = await axios.post("/api/signup", user);
      router.push("/login");
    } catch (err: any) {
      console.log(err.message);
    }
  };
  const handleChange = (e: any) => {
    const { name, value }: any = e.target;
    if (name === "email") setUser({ ...user, email: value });
    if (name === "password") setUser({ ...user, password: value });
    if (name === "username") setUser({ ...user, username: value });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30%",
          flexDirection: "column",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>SignUp</h1>
        <input
          onChange={(e: any) => handleChange(e)}
          type="text"
          name="username"
          placeholder="Username"
          style={{
            borderRadius: "20px",
            padding: "10px",
            color: "black",
            marginBottom: "10px",
          }}
        />
        <input
          type="text"
          onChange={(e: any) => handleChange(e)}
          name="email"
          placeholder="Email"
          style={{
            borderRadius: "20px",
            color: "black",

            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="password"
          onChange={(e: any) => handleChange(e)}
          name="password"
          placeholder="Password"
          style={{ borderRadius: "20px", color: "black", padding: "10px" }}
        />
        <button
          disabled={disableBtn}
          onClick={onSignUp}
          style={{
            backgroundColor: "red",
            padding: "10px",
            margin: "10px",
            borderRadius: "5px",
          }}
        >
          {!disableBtn ? "Signup Here" : "Singup done"}
        </button>
        <Link href="/login">Visit Login Page</Link>
      </div>
    </>
  );
};

export default SignUp;
