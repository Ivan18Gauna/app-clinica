var nodemailer = require('nodemailer')
var express = require('express')
const router = express.Router()


router.post("/send-email", (req, res) => {
    var transporter = nodemailer.createTransport({
        host: 'gmail.com',
        auth: {
            user: "appclinicahenry@gmail.com",
            pass: "Clinica123456"
        }
    })
    var mailOptions = {
        from: "appclinicahenry@gmail.com",
        to: "marianettimatiass@gmail.com",
        subjet: "Biemvenido a la app mas salud",
        text: "Hola Julio como estas? no solo hago malos formularios"
    };
    let inform = transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            console.log("Email enviado")
            res.status(200).send(inform)
        }
    });
});

module.exports = router;