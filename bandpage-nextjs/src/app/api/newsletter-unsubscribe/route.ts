import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as Brevo from '@getbrevo/brevo';

const prisma = new PrismaClient();

// Configure Brevo API for contact management
const contactsApi = new Brevo.ContactsApi();
contactsApi.setApiKey(Brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

const NEWSLETTER_LIST_ID = parseInt(process.env.BREVO_NEWSLETTER_LIST_ID || '0', 10);

// Basic interface for Brevo API error responses (can be refined)
interface BrevoErrorResponse {
  body?: Record<string, unknown>; 
  message?: string;
  code?: string;
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token || typeof token !== 'string') {
    // Redirect to a generic error page or home if token is missing
    return NextResponse.redirect(new URL('/', request.url)); // Or a specific error page
  }

  if (isNaN(NEWSLETTER_LIST_ID) || NEWSLETTER_LIST_ID === 0) {
    console.error('BREVO_NEWSLETTER_LIST_ID is not configured or is invalid for unsubscribe operation.');
    // Decide if this is a critical failure or if local unsubscribe is enough
  }

  try {
    const signupEntry = await prisma.newsletterSignup.findUnique({
      where: { token }, // Find by the unique token
    });

    if (!signupEntry) {
      console.warn(`Unsubscribe attempt with invalid token: ${token}`);
      return NextResponse.redirect(new URL('/newsletter-unsubscribed?status=invalid_token', request.url));
    }

    if (signupEntry.unsubscribed) {
      return NextResponse.redirect(new URL('/newsletter-unsubscribed?status=already_unsubscribed', request.url));
    }

    await prisma.newsletterSignup.update({
      where: { id: signupEntry.id },
      data: {
        unsubscribed: true,
        unsubscribedAt: new Date(),
      },
    });
    console.log(`User ${signupEntry.email} unsubscribed locally.`);

    // Unsubscribe from Brevo list
    if (NEWSLETTER_LIST_ID > 0) {
      try {
        const removeContacts = new Brevo.RemoveContactFromList();
        removeContacts.emails = [signupEntry.email];
        
        await contactsApi.removeContactFromList(NEWSLETTER_LIST_ID, removeContacts);
        console.log(`User ${signupEntry.email} removed from Brevo list ID: ${NEWSLETTER_LIST_ID}.`);
      } catch (error) {
        const brevoError = error as BrevoErrorResponse;
        console.error(
          `Brevo: Failed to remove contact ${signupEntry.email} from list ${NEWSLETTER_LIST_ID}:`,
          brevoError.body || brevoError.message
        );
      }
    }

    console.log(`User ${signupEntry.email} unsubscribed successfully.`);

    return NextResponse.redirect(new URL('/newsletter-unsubscribed?status=success', request.url));

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.redirect(new URL('/newsletter-unsubscribed?status=error', request.url));
  }
} 