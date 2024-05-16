const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
const port = 3000;
const nodemailer = require('nodemailer')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
      user: '74ded2001@smtp-brevo.com',
      pass: 'NyKZgOH9QftsS0P7'
  }
});
// POST-Route für die Verarbeitung von Formulardaten
app.post('/submit-form', async (req, res) => {
  // Daten aus dem Anfragekörper abrufen
  const formData = req.body;
  // Hier kannst du die Daten verarbeiten, z.B. in einer Datenbank speichern
  console.log('Received form data:', formData);
  transporter.sendMail({
    from: 'laurin.schmidt420@gmail.com',
    to: 'laurin.schmidt@yahoo.com',
    subject: 'Message',
    text: formData.name + formData.email + formData.message,
}, (err, info) => {
  console.log(err);
    console.log(info.envelope);
    console.log(info.messageId);
});
  // Antworte dem Client mit einer Bestätigungsnachricht
  res.send('Form submitted successfully!');
});
// Server starten
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
