var  nodemailer = require ('nodemailer')
var express = require ('express')
const router = express.Router()


router.post("/send-email",(req, res)  =>{
    var transporter = nodemailer.createTransport({
        host:'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth:{
            user:"bella.hartmann@ethereal.email",
            pass:"A5KUBgceJKCjy5pwKk"
        }
    })
var mailOptions = {
    from: "bella.hartmann@ethereal.email",
    to: "martinfigueroa2103@hotmail.com",
    subjet: "Biemvenido a la app mas salud",
    text: "Usted logró registrarse correctamente"
};
let inform = transporter.sendMail(mailOptions, (error, info)=>{
    if (error){
        res.status(500).send(error.message);
    }else{
        console.log("Email enviado")
        res.status(200).send(inform)
    }
});
});

module.exports=router;