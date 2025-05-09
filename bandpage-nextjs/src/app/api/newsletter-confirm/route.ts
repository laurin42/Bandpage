import { NextResponse, NextRequest } from 'next/server';
// import { PrismaClient } from '@prisma/client'; // REMOVE THIS LINE if it's only for PrismaClient instance
import * as Brevo from '@getbrevo/brevo'; // Import Brevo SDK
import prisma from '@/server/db'; // Import the centralized Prisma client

// const prisma = new PrismaClient(); // REMOVE THIS LINE

const contactsApi = new Brevo.ContactsApi();
contactsApi.setApiKey(Brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

const NEWSLETTER_LIST_ID = parseInt(process.env.BREVO_NEWSLETTER_LIST_ID || '0', 10);

interface BrevoErrorResponse {
  body?: Record<string, unknown>;
  message?: string;
  code?: string;
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token || typeof token !== 'string') {
    return NextResponse.json({ message: 'Confirmation token is required.' }, { status: 400 });
  }

  if (isNaN(NEWSLETTER_LIST_ID) || NEWSLETTER_LIST_ID === 0) {
    console.error('BREVO_NEWSLETTER_LIST_ID is not configured or is invalid.');
  }

  try {
    const signupEntry = await prisma.newsletterSignup.findUnique({
      where: { token },
    });

    if (!signupEntry) {
      return NextResponse.json({ message: 'Ungültiger oder abgelaufener Token.' }, { status: 404 });
    }

    if (signupEntry.confirmed && !signupEntry.unsubscribed) {
      if (NEWSLETTER_LIST_ID > 0) {
        try {
          const createContact = new Brevo.CreateContact();
          createContact.email = signupEntry.email;
          createContact.listIds = [NEWSLETTER_LIST_ID];
          createContact.updateEnabled = true;

          await contactsApi.createContact(createContact);
          console.log(`Contact ${signupEntry.email} synced to Brevo list ${NEWSLETTER_LIST_ID} (on already confirmed path).`);
        } catch (error) {
          const brevoError = error as BrevoErrorResponse;
          console.error(`Brevo: Failed to sync already confirmed contact ${signupEntry.email} to list ${NEWSLETTER_LIST_ID}:`, brevoError.body || brevoError.message);
        }
      }
      return NextResponse.redirect(new URL('/newsletter-confirmed', request.url));
    }
    
    if (signupEntry.unsubscribed) {
        console.log(`Attempt to confirm an unsubscribed email: ${signupEntry.email}`);
        return NextResponse.redirect(new URL('/newsletter-unsubscribed?status=cannot_confirm_unsubscribed', request.url));
    }

    await prisma.newsletterSignup.update({
      where: { token },
      data: {
        confirmed: true,
        confirmedAt: new Date(),
        unsubscribed: false, 
        unsubscribedAt: null,
      },
    });

    if (NEWSLETTER_LIST_ID > 0) {
      try {
        const createContact = new Brevo.CreateContact();
        createContact.email = signupEntry.email;
        createContact.listIds = [NEWSLETTER_LIST_ID];
        createContact.updateEnabled = true;

        await contactsApi.createContact(createContact);
        console.log(`Contact ${signupEntry.email} confirmed and synced to Brevo list ${NEWSLETTER_LIST_ID}.`);
      } catch (error) {
        const brevoError = error as BrevoErrorResponse;
        console.error(`Brevo: Failed to sync contact ${signupEntry.email} to list ${NEWSLETTER_LIST_ID} after confirmation:`, brevoError.body || brevoError.message);
      }
    }

    return NextResponse.redirect(new URL('/newsletter-confirmed', request.url));

  } catch (error) {
    console.error('Confirmation error:', error);
    return NextResponse.json({ message: 'Ein interner Serverfehler ist aufgetreten. Bitte versuche es später erneut.' }, { status: 500 });
  }
} 