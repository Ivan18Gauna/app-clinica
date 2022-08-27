const axios = require ('axios')
const express = require('express')
const router =express.Router();
const { postTurno, getTurnoByProf } = require('../Controllers/turnos')

router.post('/', postTurno)
router.get('/profturnos/:id', getTurnoByProf)

module.exports=router;