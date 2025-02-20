import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const usernameTo = process.env.EMAIL_TO; // Email to receive messages
  const username = process.env.EMAIL_FROM; // Email to send messages from
  const password = process.env.EMAIL_PASSWORD; // App password for Gmail

  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const message = formData.get("message");
    const isFranchise = formData.get("isFranchise") === "true";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: username,
        pass: password,
      },
    });

    const mailOptions = {
      from: username,
      to: usernameTo,
      replyTo: email as string,
      subject: isFranchise 
        ? `Franchise Request - Stacked Burger` 
        : `Contact Form Submission - Stacked Burger`,
      html: `
        <h2>${isFranchise ? 'New Franchise Request' : 'New Contact Form Submission'}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        ${isFranchise ? '<p><em>This is a franchise inquiry submitted through the franchise form.</em></p>' : ''}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
} 