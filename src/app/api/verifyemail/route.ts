import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody: any = await request.json();
    const { token } = reqBody;
    console.log(token, Date.now());
    const updateUser = await User.findOne({
      verifyToken: token,
      // verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!updateUser) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    updateUser.isVerified = true;
    updateUser.verifyToken = undefined;
    updateUser.verifyTokenExpiration = undefined;
    await updateUser.save();

    return NextResponse.json({
        message: "Email verified successfully",
        success: true,

    });

  } catch (err: any) {
    throw new Error(err.message);
  }
}
