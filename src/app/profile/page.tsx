"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const Profile = () => {
  const router: any = useRouter();
  const [userData, setUserData] = React.useState<any>("");

  React.useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    const res = await axios.get("/api/userDetail");
    const { data } = res;
    setUserData(data?.data);
  };
  const handleProfileDetail = () => {
    const userId = userData?._id?.toString(); // Convert to string if it's not already
    if (userId) {
      router.push(`/profile/${userId}`, { query: { data: userData } });
    } else {
      // Handle the case where userId is undefined or empty
      console.error("User ID is not available");
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          marginTop: "50%",
          fontSize: "20px",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        Profile
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => handleProfileDetail()}
            style={{
              backgroundColor: "blue",
              borderRadius: "5px",
              margin: "10px",
              padding: "5px",
            }}
          >
            View Profile Details
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
