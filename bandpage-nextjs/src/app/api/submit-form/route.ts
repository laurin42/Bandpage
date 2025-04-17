import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface FormData {
  name?: string;
  email?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json(); // Use request.json() for app router

    // Input validation (basic example)
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json({ error: 'Missing form data fields' }, { status: 400 });
    }

    // Configure Nodemailer transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT), // Ensure port is a number
      auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
      },
      // Add secure: true for port 465, false for others like 587
      secure: Number(process.env.SMTP_PORT) === 465,
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'New Contact Form Submission',
      text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
      // Consider using html for better formatting if needed
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Form data processed and email sent:', info.messageId);
    return NextResponse.json({ message: 'Form submitted successfully!' });

  } catch (error) {
    console.error('Error processing form:', error);
    // Provide a more specific error message if possible
    let errorMessage = 'Internal Server Error';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: 'Failed to submit form', details: errorMessage }, { status: 500 });
  }
} 