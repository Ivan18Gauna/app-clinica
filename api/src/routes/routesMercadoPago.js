
const Router = require("express");
const { postMP, getPayments } = require("../Controllers/mercadoPagoServices");

const router = Router()

router.post('/', postMP);
router.get('/factura', getPayments);

module.exports = router;