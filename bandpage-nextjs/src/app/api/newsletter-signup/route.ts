import { NextResponse } from 'next/server';

// Platzhalter für die Brevo Listen-ID
const BREVO_LIST_ID = parseInt(process.env.BREVO_CONCERT_LIST_ID || '', 10);

export async function POST(request: Request) {
  // Prüfung, ob die Listen-ID konfiguriert ist (wird später relevant)
  if (isNaN(BREVO_LIST_ID) || BREVO_LIST_ID <= 0) {
    console.error('BREVO_CONCERT_LIST_ID ist nicht korrekt konfiguriert.');
    return NextResponse.json({ error: 'Server-Konfigurationsfehler.' }, { status: 500 });
  }

  try {
    const { email } = await request.json();

    // Einfache E-Mail-Validierung
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Ungültige E-Mail Adresse.' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error('BREVO_API_KEY ist nicht konfiguriert.');
      return NextResponse.json({ error: 'Server-Konfigurationsfehler.' }, { status: 500 });
    }

    // --- Brevo API Aufruf aktivieren ---
    // Siehe: https://developers.brevo.com/reference/createcontact
    // console.log(`TODO: Füge Kontakt ${email} zur Brevo Liste ${BREVO_LIST_ID} hinzu.`);

    // Entferne die Simulation und aktiviere den echten API-Aufruf
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        listIds: [BREVO_LIST_ID], 
        updateEnabled: true // Kontakt aktualisieren, falls er existiert
      })
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json();
      console.error('Brevo API Fehler:', errorData);
      // Versuche, eine spezifischere Fehlermeldung von Brevo zu verwenden, falls vorhanden
      const brevoErrorMessage = errorData?.message || 'Fehler bei der Anmeldung beim Newsletter-Dienst.';
      throw new Error(brevoErrorMessage);
    }
    
    // Erfolgreiche Antwort von Brevo
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Newsletter Signup Fehler:', error);
    const message = error instanceof Error ? error.message : 'Interner Serverfehler.';
    // Gib die Fehlermeldung im Entwicklungsmodus weiter, aber nicht in Produktion
    const errorMessageForClient = process.env.NODE_ENV === 'development' ? message : 'Anmeldung fehlgeschlagen.';
    return NextResponse.json({ error: errorMessageForClient }, { status: 500 });
  }
} 