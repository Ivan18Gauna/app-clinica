const axios = require ('axios')
const { 
    getAllInvoices,
   }= require ('../Controllers/invoice')
const express = require('express')
const router =express.Router();


router.get('/', getAllInvoices)

module.exports=router;
