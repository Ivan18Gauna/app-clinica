const { Invoice, Professionals } = require("../db")

//const {URL_BACK, URL_FRONT} = process.env;

const server = require('express').Router();

//SDK de MercadoPago,
const mercadopago = require('mercadopago');
const e = require("express");
const { ACCESS_TOKEN } = process.env;
require("dotenv").config();

mercadopago.configure({
    access_token: ACCESS_TOKEN
})
//descomentar para probar el nodemailer
const nodemailer = require('nodemailer');
//Cambio para mergear
//descomentar para probar el nodemailer
//Creamos el tranportador
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "appclinicahenry@gmail.com",
        pass: "ggdwhqrhiyvltvpv"
    },
    port: 465,
    host: 'smpt.gmail.com'
});


//genera la URL a mercado pago
const postMP = async (req, res) => {
    const data = req.body;
    const id = data.id;
    const items = [
        { price: data.price, quantity: 1 },
    ]
    const external_reference = id + "*" + data.mail + "*" + data.price + "*" + data.date;
    const itemsMp = items.map(item => ({
        title: "Susbcripcion App Salud",
        quantity: 1,
        unit_price: item.price,
    }))
    let preference = {
        items: itemsMp,
        back_urls: {
            success: `https://app-salud.vercel.app/mercadopago/factura`,
            failure: `https://app-salud.vercel.app/mercadopago/factura`,
            pending: `https://app-salud.vercel.app/mercadopago/factura`
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
            console.log(global.id);
            res.status(200).json({ id: global.id });
        }).catch(error => {
            //console.log(error);
            res.status(400).send({ error: error });
        })
}

const getPayments = async (req, res) => {
    try {
        let { payment_id } = req.query;
        //const payment_id = req.query.payment_id;
        console.log("soy payment_id", payment_id)
        const payment_status = req.query.status;
        console.log("soy payment_status", payment_status)
  
        const merchant_order_id = req.query.merchant_order_id;
        console.log("soy merchant_order_id", merchant_order_id)
  
        const external_reference = req.query.external_reference;
        console.log("soy external_reference", external_reference)
        
        const [id, mail, price, date] = external_reference.split("*");

        const invoice = await Invoice.create({
            payment_id: payment_id,
            payment_status: payment_status,
            merchant_order_id: merchant_order_id,
            status: "paid",
            date: date,
            price: parseInt(price),
            saldado: true,
        })
  
        const professionals = await Professionals.findByPk(Number(id))
        console.log("PROFESIONAL", professionals);
        await professionals.addInvoices(invoice)
        //descomentar para probar el nodemailer     
        let info = await transporter.sendMail({
            from: "appclinicahenry@gmail.com", // sender address
            to: mail, // list of receivers
            subject: "Pago de subscripcion App-Salud ✔", // Subject line
            text: `Usted ha pagado el día de la fecha: ${date} un total de ${price}`, // plain text body
            html: `Usted ha pagado el día de la fecha: ${date} un total de ${price}`, // html body
        });
        console.log(info);
        console.info("redirect success");
        res.redirect(`http://localhost:3000/home`);
    } catch (error) {
        console.error("error al crear la factura", error);
        return res.redirect(`http://localhost:3000/home`);
    }
  }
  



module.exports = {
  postMP,
  getPayments
}

