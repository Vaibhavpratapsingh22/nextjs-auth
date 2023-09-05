import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiration: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiration: Date.now() + 3600000,
      });
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "25bdd83bb5b78c",
        pass: "7439436bbed2a5",
      },
    });
    const mailOptions = {
      from: "vaibhav@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Please verify your email"
          : "Please reset your password",
      html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">Click here</a> to ${emailType} === "VERIFY"
      ? "verify your email"
      : "reset your password"</p>`,
    };
    const info = await transport.sendMail(mailOptions);
    return info;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
