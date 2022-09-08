var nodemailer = require("nodemailer");
var express = require("express");
const {
  Professionals,
  Patients,
  ObrasSociales,
  Specialties,
  User,
} = require("../db.js");
const router = express.Router();

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "appclinicahenry@gmail.com",
    pass: "ggdwhqrhiyvltvpv",
  },
});

router.post("/send-email/:mail", async (req, res) => {
  const { date, time, professional, patient } = req.body;
  const { mail } = req.params;
  const professionalName = await Professionals.findOne({
    where: { id: Number(professional) },
  });
  const patient2 = await Patients.findByPk(Number(patient));
  var mailOptions = {
    from: "'Confirmación Turno'<appclinicahenry@gmail.com>",
    to: mail,
    subject: "Confirmación de turno",
    html: `
    <h1>Más Salud</h1>
    <p>Su turno con el profesional <b>${professionalName.name} ${professionalName.lastname}</b> para el <b>${date}</b> a las <b>${time}</b> ha sido confirmado.</p>
    </br>
    <p>Saludos</p>
    <h4>Más Salud App</h4>
    `,
  };
  var mailOptionsProfessional = {
    from: "appclinicahenry@gmail.com",
    to: professionalName.mail,
    subject: "Confirmación de turno",
    html: `
    <h1>Más Salud</h1>
    <p>El paciente <b>${patient2.name} ${patient2.lastname}</b> ha raservado un turno para el dia <b>${date}</b> a las <b>${time}</b>.</p>
    </br>
    <p>Saludos</p>
    <h4>Más Salud App</h4>
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send(error.message);
    } else {
      console.log("Email enviado");
      res.status(200).send(info);
    }
  });
  transporter.sendMail(mailOptionsProfessional, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send(error.message);
    } else {
      console.log("Email enviado");
      res.status(200).send(info);
    }
  });
});

module.exports = router;
