import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  // Check if environment variables are set
  if (!process.env.EMAIL_TO || !process.env.EMAIL_FROM || !process.env.EMAIL_PASSWORD) {
    console.error('Missing environment variables');
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const usernameTo = process.env.EMAIL_TO;
  const username = process.env.EMAIL_FROM;
  const password = process.env.EMAIL_PASSWORD;

  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const message = formData.get("message");
    const isFranchise = formData.get("isFranchise") === "true";

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: username,
        pass: password,
      },
    });

    // Verify SMTP connection configuration
    try {
      await transporter.verify();
    } catch (error) {
      console.error('SMTP Verification Error:', error);
      return NextResponse.json(
        { error: "Email service configuration error" },
        { status: 500 }
      );
    }

    const mailOptions = {
      from: username,
      to: usernameTo,
      replyTo: email as string,
      subject: isFranchise 
        ? `Franchise Request - Stacked Burger` 
        : `Contact Form Submission - Stacked Burger`,
      html: `
        <h2>${isFranchise ? 'New Franchise Request' : 'New Contact Form Submission'}</h2>
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message || 'Not provided'}</p>
        ${isFranchise ? '<p><em>This is a franchise inquiry submitted through the franchise form.</em></p>' : ''}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json(
        { message: "Email sent successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error('Send Mail Error:', error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('General Error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 