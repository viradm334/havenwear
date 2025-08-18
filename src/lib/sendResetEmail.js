import { transporter } from "./emailTransporter";

export const sendResetEmail = async (email, token) => {
  const resetUrl = `${process.env.RESET_PASSWORD_URL}/reset-password?token=${token}&email=${email}`;

  const mailOptions = {
    from: `Havenwear Support <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Reset Password",
    html: `
    <div style="font-family: sans-serif; padding: 20px;">
      <h2>Reset Your Password</h2>
      <p>We received a request to reset your password. Click the button below to proceed:</p>
      <a href="${resetUrl}" style="display:inline-block; padding:10px 20px; background-color:#059669; color:white; text-decoration:none; border-radius:5px;">Reset Password</a>
      <p style="margin-top:20px;">If you didn't request this, you can safely ignore this email.</p>
    </div>
  `,
  };

  await transporter.sendMail(mailOptions);
};
