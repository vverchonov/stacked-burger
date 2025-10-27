import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  // Debug environment variables (safely)
  // console.log('Environment Variables Status:', {
  //   EMAIL_TO: !!process.env.REACT_APP_EMAIL_TO,
  //   EMAIL_FROM: !!process.env.REACT_APP_EMAIL_FROM,
  //   EMAIL_PASSWORD: !!process.env.REACT_APP_EMAIL_PASSWORD,
  // });

  // Check if environment variables are set
  if (!process.env.REACT_APP_EMAIL_TO || !process.env.REACT_APP_EMAIL_FROM || !process.env.REACT_APP_EMAIL_PASSWORD) {
    // console.error('Missing environment variables:', {
    //   EMAIL_TO: !!process.env.REACT_APP_EMAIL_TO,
    //   EMAIL_FROM: !!process.env.REACT_APP_EMAIL_FROM,
    //   EMAIL_PASSWORD: !!process.env.REACT_APP_EMAIL_PASSWORD,
    // });
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const usernameTo = process.env.REACT_APP_EMAIL_TO;
  const username = process.env.REACT_APP_EMAIL_FROM;
  const password = process.env.REACT_APP_EMAIL_PASSWORD;

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

    // Get franchise-specific fields if it's a franchise request
    let franchiseFields = '';
    if (isFranchise) {
      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const isCanadianResident = formData.get("isCanadianResident");
      const country = formData.get("country");
      const city = formData.get("city");
      const investmentCapital = formData.get("investmentCapital");
      
      franchiseFields = `
        <h3>Franchise Details:</h3>
        <p><strong>First Name:</strong> ${firstName || 'Not provided'}</p>
        <p><strong>Last Name:</strong> ${lastName || 'Not provided'}</p>
        <p><strong>Canadian Resident/Citizen:</strong> ${isCanadianResident || 'Not provided'}</p>
        <p><strong>Country of Interest:</strong> ${country || 'Not provided'}</p>
        <p><strong>City of Interest:</strong> ${city || 'Not provided'}</p>
        <p><strong>Investment Capital:</strong> ${investmentCapital || 'Not provided'}</p>
      `;
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
        ${!isFranchise ? `<p><strong>Name:</strong> ${name || 'Not provided'}</p>` : ''}
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${!isFranchise && message ? `<p><strong>Message:</strong></p><p>${message}</p>` : ''}
        ${franchiseFields}
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