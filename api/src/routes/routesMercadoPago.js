// const express = require("express");
// const router = express.Router();

// const PaymentController = require("../controllers/mercadoPago");
// const PaymentService = require("../Controllers/mercadoPagoServices");

// const PaymentInstance = new PaymentController(new PaymentService());

// router.get("/", function (req, res, next) {
//   return res.json({
//     "/payment": "generates a payment link",
//     "/subscription": "generates a subscription link"
//   });
// });

// router.get("/payment", function (req, res, next) {
//   PaymentInstance.getPaymentLink(req, res);
// });

// router.get("/subscription", function (req, res, next) {
//   PaymentInstance.getSubscriptionLink(req, res);
// });

// module.exports = router;


const Router = require("express");
const { postMP, getPayments } = require("../Controllers/mercadoPagoServices");

const router = Router()

router.post('/', postMP);
router.get('/factura', getPayments);

module.exports = router;