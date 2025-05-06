import React from "react";
import "@/styles/privacy-policy.scss";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <p>
        Die Nutzung unserer Webseite ist in der Regel ohne Angabe
        personenbezogener Daten möglich. Soweit auf unseren Seiten
        personenbezogene Daten (beispielsweise Name, Anschrift oder
        E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf
        freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
        Zustimmung nicht an Dritte weitergegeben.
      </p>
      <p>
        Wir verwenden den E-Mail-Marketing-Dienst Brevo (Sendinblue SAS) für die
        Verwaltung unseres Newsletters sowie zur Abwicklung von Buchungs- und
        Kontaktanfragen. Ihre Daten (z. B. E-Mail-Adresse und Name) werden dabei
        auf Servern von Brevo in der EU gespeichert. Mit Ihrer Anmeldung zum
        Newsletter oder der Kontaktaufnahme über unser Buchungsformular erklären
        Sie sich mit dieser Verarbeitung einverstanden.
      </p>
      <p>
        Wir verlinken auf unserer Website zu externen Plattformen wie TikTok,
        Apple Music, Amazon Music, YouTube und Instagram. Beim Klicken dieser
        Links verlassen Sie unsere Seite und es gelten die
        Datenschutzrichtlinien der jeweiligen Anbieter. Bitte informieren Sie
        sich dort über Art, Umfang und Zweck der Datenerhebung.
      </p>
      <p>
        Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei
        der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein
        lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
        möglich.
      </p>
      <p>
        Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
        Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich
        angeforderter Werbung und Informationsmaterialien wird hiermit
        ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich
        ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von
        Werbeinformationen, etwa durch Spam-Mails, vor.
      </p>
      <hr style={{ border: "1px solid #444", marginTop: "2rem" }}></hr>
    </div>
  );
};

export default PrivacyPolicy;
