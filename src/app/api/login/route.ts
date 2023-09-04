import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;

    const findUser = await User.findOne({ email });
    const oldPassword = findUser.password;
    const comapre = await bcryptjs.compare(password, oldPassword);
    if (!comapre) {
      return NextResponse.json({ error: "User not verified" }, { status: 404 });
    }
    const tokenData = {
      id: findUser._id,
      username: findUser.username,
      email: findUser.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1hr",
    });
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
