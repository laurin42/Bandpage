import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import * as Brevo from '@getbrevo/brevo';
import prisma from '@/server/db';

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

const senderEmail = "noreply@burnheart-mockery.de";
const senderName = "Burnheart Mockery";

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://burnheart-mockery.de' : 'http://localhost:3000';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ message: 'Valid email is required' }, { status: 400 });
    }

    const existingSignup = await prisma.newsletterSignup.findUnique({
      where: { email },
    });

    const newToken = randomUUID();

    if (existingSignup) {
      // Case 1: User exists, is confirmed, and is NOT unsubscribed - already an active subscriber
      if (existingSignup.confirmed && !existingSignup.unsubscribed) {
        return NextResponse.json({ message: 'Email is already subscribed and confirmed.' }, { status: 200 });
      }

      // Case 2: User exists but is unsubscribed, OR was never confirmed.
      // We treat both as a re-subscription/new confirmation attempt.
      // Update their record to reflect a new signup attempt, requiring re-confirmation.
      await prisma.newsletterSignup.update({
        where: { email },
        data: {
          token: newToken,
          confirmed: false,
          confirmedAt: null,
          unsubscribed: false,
          unsubscribedAt: null,
          createdAt: new Date(),
        },
      });
    } else {
      await prisma.newsletterSignup.create({
        data: {
          email,
          token: newToken,
        },
      });
    }

    const confirmationLink = `${BASE_URL}/api/newsletter-confirm?token=${newToken}`;
    const unsubscribeLink = `${BASE_URL}/api/newsletter-unsubscribe?token=${newToken}`;

    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "Bestätige deine Newsletter-Anmeldung | Burnheart Mockery";
    sendSmtpEmail.htmlContent = `
      <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px 20px;
              margin: 0;
              background-color: #f4f4f4; /* Added a light background for better contrast */
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 30px;
              border-radius: 8px;
              border: 1px solid #333;
              background-color: #ffffff; /* Explicit white background for the container */
            }
            h1 {
              font-size: 24px;
              margin-bottom: 20px;
              color: #333333; /* Changed from white to a dark color for readability */
            }
            p {
              font-size: 16px;
              line-height: 1.5;
              margin-bottom: 20px;
              color: #555555; /* Slightly lighter than black for body text */
            }
            .btn {
              display: inline-block;
              background-color: #f02525;
              color: #fff !important; /* Important to override potential mail client styles */
              padding: 14px 28px;
              text-decoration: none;
              font-weight: bold;
              border-radius: 6px;
              transition: background-color 0.3s ease;
            }
            .btn:hover {
              background-color: #c01f1f;
            }
            .footer {
              font-size: 13px;
              color: #888;
              margin-top: 30px;
              text-align: center; /* Centered footer text */
            }
            .footer a {
              color: #f02525; /* Style for footer links */
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Hey!</h1>
            <p>
              Danke für deine Anmeldung zum Burnheart Mockery Newsletter.
              Bitte bestätige deine Adresse mit einem Klick:
            </p>
            <p style="text-align: center;"> <!-- Centering the button -->
              <a href="${confirmationLink}" class="btn">Anmeldung bestätigen</a>
            </p>
            <p>
              Falls du dich nicht selbst angemeldet hast, kannst du diese Nachricht
              einfach ignorieren.
            </p>
            <p>Rock on,<br />Burnheart Mockery 🔥</p>
            <div class="footer">
              <p style="font-size: 14px; color: #999; margin-top: 40px;">
                Du möchtest dich abmelden? Kein Problem –
                <a href="${unsubscribeLink}">hier abmelden</a>.
              </p>
              Diese E-Mail wurde automatisch versendet. Bitte nicht antworten.
            </div>
          </div>
        </body>
      </html>
    `;
    sendSmtpEmail.sender = { name: senderName, email: senderEmail };
    sendSmtpEmail.to = [{ email }];

    try {
      await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log(`Confirmation email sent to ${email} with new token ${newToken}`);
      return NextResponse.json({ message: 'Vielen Dank für deine Anmeldung! Bitte überprüfe dein E-Mail-Postfach und bestätige deine Anmeldung über den Link in der E-Mail.' }, { status: 201 });
    } catch (emailError) {
      console.error('Brevo email sending error:', emailError);
      return NextResponse.json({ message: 'Deine Anmeldung war erfolgreich, aber beim Versand der Bestätigungsmail ist ein Fehler aufgetreten. Bitte kontaktiere uns unter kontakt@burnheart-mockery.de.' }, { status: 500 });
    }

  } catch (error) {
    console.error('Signup error:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = error.meta?.target as string[] | undefined;
        if (target?.includes('email') || target?.includes('token')) {
          return NextResponse.json({ message: 'Ein Problem ist beim Anmelden mit dieser E-Mail oder beim Generieren einer Bestätigung aufgetreten. Bitte versuche es erneut.' }, { status: 409 });
        }
      }
    }
    return NextResponse.json({ message: 'Ein interner Serverfehler ist aufgetreten. Bitte versuche es später erneut.' }, { status: 500 });
  }
} 