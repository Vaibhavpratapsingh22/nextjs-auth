"use client";
import react, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
  const router = useRouter();
  const [extractedToken, setExtractedToken] = useState<any>(null);
  const [showText, setShowText] = useState(false);
  useEffect(() => {
    const token = window.location.search.split("?token=")[1];
    if (!token) return router.push("/profile");
    setExtractedToken(token.toString());
  }, []);

  const handleVerifyUser = async () => {
    if (extractedToken) {
      try {
        const response = await axios.post("/api/verifyemail", {
          token: extractedToken,
        });
        router.push("/profile");
        if (response) setShowText(true);
      } catch (err: any) {
        console.error(err.message);
      }
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "30px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "25px", marginBottom: "200px" }}>VerifyEmail</p>
        {showText ? (
          "user verified"
        ) : (
          <button
            onClick={handleVerifyUser}
            style={{
              backgroundColor: "green",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Verify User
          </button>
        )}
      </div>
    </>
  );
};

export default VerifyEmail;
