import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface FormData {
  name?: string;
  email?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json();

    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json({ error: 'Missing form data fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
      },
      secure: Number(process.env.SMTP_PORT) === 465,
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'New Contact Form Submission',
      text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Form data processed and email sent:', info.messageId);
    return NextResponse.json({ message: 'Form submitted successfully!' });

  } catch (error) {
    console.error("Error processing form:", error);
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: 'Failed to submit form', details: errorMessage }, { status: 500 });
  }
} 