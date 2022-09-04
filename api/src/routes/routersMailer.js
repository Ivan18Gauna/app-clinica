var nodemailer = require('nodemailer')
var express = require('express')
const router = express.Router()


var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: "massaludapp@hotmail.com",
        pass: "Clinica123456"
    },
});

router.post("/send-email", (req, res) => {
    var mailOptions = {
        from: "massaludapp@hotmail.com",
        to: "appclinicahenry@gmail.com",
        subjet: "Hola",
        text: "Hola text",
        html:'Hola html'
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