import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value|| "";
    const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET!); 
    return decodeToken;
  } catch (err:any) {
    throw new Error(err.message)
  }
};
