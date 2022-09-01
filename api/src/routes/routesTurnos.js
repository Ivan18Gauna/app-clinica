const axios = require ('axios')
const express = require('express')
const router =express.Router();
const { postTurno, getTurnoByProf, getTurnosByPat } = require('../Controllers/turnos')

router.post('/', postTurno)
router.get('/profturnos/:id', getTurnoByProf)
router.get('/patturnos/:id', getTurnosByPat)

module.exports=router;