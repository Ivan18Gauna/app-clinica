const { Router } = require('express');
const routesProfessionals = require('./routesProfessionals')
const routesPatients = require('./routesPatients')
const routesEspecialties = require('./routesEspecialties')
const routersHistoriaClinica = require('./routersHistoriaClinica')
const routerInvoice = require ('./routesInvoice')
const routesTurnos = require('./routesTurnos')
const routesNotes = require('./routesNotes')
const routersMailer = require('./routersMailer')
const routesMercadoPago = require('./routesMercadoPago.js')
const { actualUser } = require('../Controllers/actualUser');
const { registerNewAdmin } = require('../Controllers/admin');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/professionals', routesProfessionals);
router.use('/patients', routesPatients);
router.use('/especialties', routesEspecialties);
router.use('/historiaclinica', routersHistoriaClinica);
router.use('/invoice', routerInvoice);
router.use('/turnos', routesTurnos);
router.use('/notes', routesNotes)
router.get('/user/:mail', actualUser)
router.post('/admin', registerNewAdmin)
router.use("/mercadopago",routesMercadoPago )
router.use("/mailer",routersMailer)

module.exports = router;
