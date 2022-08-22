const axios = require ('axios')
const { 
    postHistoriaClinica,
    getHistoriaClinica
   }= require ('../Controllers/historiaClinica')
const express = require('express')
const router =express.Router();

router.get('/detail/:id', getHistoriaClinica)
router.post('/', postHistoriaClinica)

module.exports=router;
