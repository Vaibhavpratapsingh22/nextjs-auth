import { NextRequest, NextResponse } from "next/server";
import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

connect()

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { username, email, password } = requestBody;

    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser)
    await sendEmail({
      email, emailType:"VERIFY",userId: savedUser._id, 
    })


    return NextResponse.json({ message:"User Created Successfully", success:true, savedUser }, { status: 201 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
