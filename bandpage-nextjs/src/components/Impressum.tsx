import React from "react";
import "@/styles/impressum.scss";

const Impressum = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="impressum-container">
      <p>
        <strong>Angaben gemäß § 5 TMG:</strong>
        <br />
        Burnheart Mockery
        <br />
        Laurin Schmidt
        <br />
        Benzstraße 9-11
        <br />
        51381 Leverkusen
      </p>
      <p>
        <strong>Kontakt:</strong>
        <br />
        E-Mail: kontakt@burnheart-mockery.de
      </p>
      <p>
        Diese Website wird von einer Privatperson betrieben und dient
        ausschließlich der nicht-kommerziellen Präsentation der Band Burnheart
        Mockery.
      </p>
      <h3>Haftung für Inhalte</h3>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
        bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen oder
        nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
        hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
        Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
        Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
        entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
        entfernen.
      </p>
      <h3>Haftung für Links</h3>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
        Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
        waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
        inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
        Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden
        von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
      </p>
      <h3>Urheberrecht</h3>
      <p>
        Die durch die Betreiber dieser Seite erstellten Inhalte und Werke auf
        diesen Seiten, insbesondere die angebotenen Musikstücke, unterliegen dem
        deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung
        und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
        bedürfen der schriftlichen Zustimmung der jeweiligen Autoren bzw.
        Ersteller. Downloads und Kopien dieser Seite sind nur für den privaten,
        nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
        Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
        Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
        gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung
        aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
        Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
        umgehend entfernen.
      </p>
      <hr style={{ border: "1px solid #444", marginTop: "2rem" }}></hr>{" "}
      <p className="copyright">
        © {currentYear} Burnheart Mockery. Alle Rechte vorbehalten.
      </p>
    </div>
  );
};

export default Impressum;
