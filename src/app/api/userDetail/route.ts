import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helper/dataFromToken";
connect();

export async function GET(request: NextRequest) {
  try {
    const { id }: any = await getDataFromToken(request);
    const user = await User.findOne({
      _id: id,
    }).select("-password");
    return NextResponse.json({ message: "User Found", data: user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
