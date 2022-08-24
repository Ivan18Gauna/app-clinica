const axios = require ('axios')
const { 
    getAllHistoriaClinica,
    postHistoriaClinica,
    getHistoriaClinica
   }= require ('../Controllers/historiaClinica')
const express = require('express')
const router =express.Router();

router.get('/', getAllHistoriaClinica)
router.get('/detail/:id', getHistoriaClinica)
router.post('/', postHistoriaClinica)

module.exports=router;
