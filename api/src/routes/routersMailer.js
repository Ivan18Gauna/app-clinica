var nodemailer = require('nodemailer')
var express = require('express')
const router = express.Router()


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "appclinicahenry@gmail.com",
        pass: "Clinica123456"
    },
    port: 465,
    host: 'smtp.gmail.com',
    secure: true,
});

router.post("/send-email", (req, res) => {
    var mailOptions = {
        from: "appclinicahenry@gmail.com",
        to: "marianettimatiass@gmail.com",
        subjet: "Bienvenido a la app mas salud",
        text: "Hola Julio como estas? no solo hago malos formularios"
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            console.log("Email enviado")
            res.status(200).send(info)
        }
    });
});

module.exports = router;