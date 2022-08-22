const axios = require ('axios')
const { 
    postHistoriaClinica,
   }= require ('../Controllers/historiaClinica')
const express = require('express')
const router =express.Router();


router.post('/', postHistoriaClinica)

module.exports=router;
