const axios = require ('axios')
const { 
    registerNewAdmin,
    getCountProfessionals,
    getCountPatients,
    getProParanoid,
    getCountHistoriaClinica,
    getCountTurnos
   }= require ('../Controllers/admin')
const express = require('express')
const router =express.Router();

router.post('/', registerNewAdmin)
router.get('/professionals', getCountProfessionals)
router.get('/patients', getCountPatients)
router.get('/deletedprofessionals', getProParanoid)
router.get('/historiaclinica', getCountHistoriaClinica)
router.get('/turnos', getCountTurnos)


//router.get('/detail/:id', getFacturaByProfessionalID)


module.exports=router;
