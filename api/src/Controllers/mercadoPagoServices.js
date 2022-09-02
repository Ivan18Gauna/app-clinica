const { Invoice, Professionals } = require("../db")

//const {URL_BACK, URL_FRONT} = process.env;

const server = require('express').Router();

//SDK de MercadoPago
const mercadopago = require('mercadopago');
const e = require("express");
const { ACCESS_TOKEN } = process.env;
require("dotenv").config();

mercadopago.configure({
    access_token: ACCESS_TOKEN
})
// const nodemailer = require('nodemailer');


//Creamos el tranportador
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD_ENV
//     },
//     port: 465,
//     host: 'smpt.gmail.com'
// });


//ruta que genera la URL a mercado pago
const postMP = async (req, res) => {
    const data = req.body;
    const id = data.id;
    const items = [
        { price: data.price, quantity: 1 },
    ]
    const external_reference = id + "*" + data.mail + "*" + data.price + "*" + data.date;
    const items_md = items.map(item => ({
        title: "Susbcripcion App Salud",
        quantity: 1,
        unit_price: item.price,
    }))
    let preference = {
        items: items_md,
        back_urls: {
          // failure: "/failure",
          // pending: "/pending",
          // success: "/success"
          

            success: `http://localhost:3001/mercadopago/factura`,
            failure: `http://localhost:3001/mercadopago/factura`,
            pending: `http://localhost:3001/mercadopago/factura`
        },
        auto_return: "approved",
        payment_methods: {
            excluded_payment_methods: [
                {
                    id: "atm"
                }
            ],
        },
        external_reference: external_reference,
        installments: 3,
        statement_descriptor: "Test",
        shipments: {
            mode: "not_specified",
            cost: 0
        }
    };

    mercadopago.preferences.create(preference)
        .then(function (response) {
            //console.log("respondio");
            global.id = response.body.init_point;
            //console.log(response.body);
            res.json({ id: global.id });
        }).catch(error => {
            //console.log(error);
            res.status(400).send({ error: error });
        })
}

const getPayments = async (req, res) => {
    try {
        // console.log("EN LA RUTA PAGOS", req)
        let { payment_id } = req.query;
        //const payment_id = req.query.payment_id;
        console.log("soy payment_id", payment_id)
        const payment_status = req.query.status;
        console.log("soy payment_status", payment_status)
  
        const merchant_order_id = req.query.merchant_order_id;
        console.log("soy merchant_order_id", merchant_order_id)
  
        const external_reference = req.query.external_reference;
        console.log("soy external_reference", external_reference)
        
        const [id, mail, price,date] = external_reference.split("*");

        const invoice = await Invoice.create({
            payment_id: payment_id,
            payment_status: payment_status,
            merchant_order_id: merchant_order_id,
            status: "paid",
            date: date,
            price: parseInt(price),
            saldado: false,
        })
  
        const professionals = await Professionals.findByPk(Number(id))
        console.log("PROFESIONAL", professionals);
        await professionals.addInvoices(invoice)
        // let info = await transporter.sendMail({
        //     from: `${process.env.EMAIL}`, // sender address
        //     to: email, // list of receivers
        //     subject: "Pago de cuota en PsicoApp ✔", // Subject line
        //     text: `Usted ha pagado el día de la fecha: ${fecha} un total de ${precio}`, // plain text body
        //     html: `Usted ha pagado el día de la fecha: ${fecha} un total de ${precio}`, // html body
        // });
        // console.log(info);
        console.info("redirect success");
        res.redirect(`http://localhost:3000/home`);
    } catch (error) {
        console.error("error al actualizar la factura", error);
        return res.redirect(`http://localhost:3000/home`);
    }
  }
  




// const getPayments = async (req, res) => {
//   try {
//       // console.log("EN LA RUTA PAGOS", req)
//       let { payment_id } = req.query;
//       //const payment_id = req.query.payment_id;
//       console.log("soy payment_id", payment_id)
//       const payment_status = req.query.status;
//       console.log("soy payment_status", payment_status)

//       const merchant_order_id = req.query.merchant_order_id;
//       console.log("soy merchant_order_id", merchant_order_id)

//       const external_reference = req.query.external_reference;
//       console.log("soy external_reference", external_reference)
      
//       const [id, mail, price] = external_reference.split("*");


//       const professionals = await Professionals.findByPk(id, {include:{model:Invoice}})
//       console.log("PROFESIONAL", professionals);
//       professionals.invoices.map(async(f) => await f.update({saldado:true}))
//       // let info = await transporter.sendMail({
//       //     from: `${process.env.EMAIL}`, // sender address
//       //     to: email, // list of receivers
//       //     subject: "Pago de cuota en PsicoApp ✔", // Subject line
//       //     text: `Usted ha pagado el día de la fecha: ${fecha} un total de ${precio}`, // plain text body
//       //     html: `Usted ha pagado el día de la fecha: ${fecha} un total de ${precio}`, // html body
//       // });
//       // console.log(info);
//       console.info("redirect success");
//       res.redirect(`http://localhost:3000/home`);
//   } catch (error) {
//       console.error("error al actualizar la factura", error);
//       return res.redirect(`http://localhost:3000/home`);
//   }
// }

module.exports = {
  postMP,
  getPayments
}

