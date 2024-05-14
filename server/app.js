const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
const port = 3000;
const nodemailer = require('nodemailer')
// Middleware zum Parsen von Anfragekörpern
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())


const transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: 465,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "vidal79@ethereal.email",
    pass: "nF43GuTVFbkYQVnKth",
  },
});

// POST-Route für die Verarbeitung von Formulardaten
app.post('/submit-form', async (req, res) => {
  // Daten aus dem Anfragekörper abrufen
  const formData = req.body;


  // Hier kannst du die Daten verarbeiten, z.B. in einer Datenbank speichern
  console.log('Received form data:', formData);

  // Antworte dem Client mit einer Bestätigungsnachricht
  res.send('Form submitted successfully!');
});
app.get('/styles', async (req, res) => {
  // Daten aus dem Anfragekörper abrufen

  const data = {
    fontSize: "5rem",
    text: "Hallo wir sind!",
    color: "green"
  }

  // Hier kannst du die Daten verarbeiten, z.B. in einer Datenbank speichern

  // Antworte dem Client mit einer Bestätigungsnachricht
  res.send(data);
});

// Server starten
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
