const axios = require ('axios')
const {getInfoApiPatients, 
    getPatById,
    getPatByName,
   getAllPatients,
   postPatients,
   putPatients,
   getPatByDocument}= require ('../Controllers/patients')
const express = require('express')
const router =express.Router();

// const {Professionals, Specialties} = require ('../db')

//router.get('/', getAllPatients),
router.get('/search/', getPatByName)
router.get('/:id', getPatById),
router.get('/document/:document', getPatByDocument),
router.post('/', postPatients),
router.put('/edit/:id', putPatients)

module.exports=router;