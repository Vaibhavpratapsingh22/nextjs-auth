"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    password: "",
    email: "",
  });
  const onLogin = async () => {
    try {
      const response = await axios.post("/api/login", user);
      router.push("/profile");
    } catch (err: any) {
      console.log(err.message);
    }
  };
  const handleChange = (e: any) => {
    const { name, value }: any = e.target;
    if (name === "email") setUser({ ...user, email: value });
    if (name === "password") setUser({ ...user, password: value });
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
        <h1 style={{ marginBottom: "20px" }}>Login</h1>
        <input
          onChange={(e: any) => handleChange(e)}
          name="email"
          type="text"
          placeholder="Email"
          style={{
            color: "black",
            borderRadius: "20px",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          onChange={(e: any) => handleChange(e)}
          name="password"
          type="text"
          placeholder="Password"
          style={{ borderRadius: "20px", color: "black", padding: "10px" }}
        />
        <button
          onClick={onLogin}
          style={{
            backgroundColor: "red",
            padding: "10px",
            margin: "10px",
            borderRadius: "5px",
          }}
        >
          Login
        </button>
        <Link href="/signup">Visit Signup Page</Link>
      </div>
    </>
  );
};

export default Login;
