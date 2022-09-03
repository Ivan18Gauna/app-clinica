const axios = require ('axios')
const { 
    getAllInvoices,
    getFacturaByProfessionalID
   }= require ('../Controllers/invoice')
const express = require('express')
const router =express.Router();


router.get('/', getAllInvoices)
router.get('/detail/:id', getFacturaByProfessionalID)


module.exports=router;
