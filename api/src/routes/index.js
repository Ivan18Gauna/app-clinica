const { Router } = require('express');
const routesProfessionals = require('./routesProfessionals')
const routesPatients = require('./routesPatients')
const routesEspecialties = require('./routesEspecialties')
const routersHistoriaClinica = require('./routersHistoriaClinica')

const {Professionals, Specialties} = require ('../db')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/professionals', routesProfessionals);
router.use('/patients', routesPatients);
router.use('/especialties', routesEspecialties);
router.use('/historiaClinica', routersHistoriaClinica)


module.exports = router;
