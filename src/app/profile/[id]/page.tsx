"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const UserProfile = ({ params }: any) => {
  const router = useRouter();
  const [userData, setUserData] = React.useState<any>("");

  React.useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    const res = await axios.get("/api/userDetail");
    const { data } = res;
    setUserData(data?.data);
  };

  const handleLogout = async () => {
    try {
      const response: any = await axios.get("/api/logout");
      const { success } = response;
      if (response) {
        router.push("/login");
      }
    } catch (err) {}
  };
  return (
    <>
    
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "space-between",
        }}
      >
           <button
          onClick={()=>router.back()}
          style={{
            backgroundColor: "orange",
            borderRadius: "5px",
            margin: "10px",
            padding: "5px",
          }}
        >Back</button>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "orange",
            borderRadius: "5px",
            margin: "10px",
            padding: "5px",
          }}
        >
          Logout
        </button>
      </div >
      <div style={{display:"flex", justifyContent:"center", width:"100%", flexDirection:"column", alignItems:"center"}}>
      <h1><b>Profile</b></h1>
      <div>{userData?.username}</div>

      <div>{userData?.email}</div>
      <div>Is User Admin - {userData?.isAdmin ? "Yes" : "No"}</div>
      </div>
    </>
  );
};

export default UserProfile;
