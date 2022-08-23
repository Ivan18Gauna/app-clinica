const axios = require ('axios')
const { 
    getAllEspecialties,
   }= require ('../Controllers/specialties')
const express = require('express')
const router =express.Router();


router.get('/', getAllEspecialties)

module.exports=router;
