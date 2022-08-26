const axios = require ('axios')
const { 
    getAllHistoriaClinica,
    postHistoriaClinica,
    getHistoriaClinica,
    getHistoriaClinicaByPat
   }= require ('../Controllers/historiaClinica')
const express = require('express')
const router =express.Router();

router.get('/', getAllHistoriaClinica)
router.get('/detail/:id', getHistoriaClinica)
router.get('/bypat/:id', getHistoriaClinicaByPat)
router.post('/', postHistoriaClinica)

module.exports=router;
