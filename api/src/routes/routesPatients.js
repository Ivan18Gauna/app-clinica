const axios = require ('axios')
const {getInfoApiPatients, 
    getPatById,
    getPatByName,
   //getAllPatients,
    getPatByDocument}= require ('../Controllers/patients')
const express = require('express')
const router =express.Router();

// const {Professionals, Specialties} = require ('../db')

//router.get('/', getAllPatients),
router.get('/search/', getPatByName)
router.get('/:id', getPatById),
router.get('/document/:document', getPatByDocument),

module.exports=router;