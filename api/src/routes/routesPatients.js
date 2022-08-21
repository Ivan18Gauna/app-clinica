const axios = require ('axios')
const { 
    getPatById,
    getPatByName,
   postPatients,
   putPatients,
   getPatByDocument}= require ('../Controllers/patients')
const express = require('express')
const router =express.Router();


router.get('/', getPatByName)
router.get('/document/:document', getPatByDocument),
router.post('/', postPatients),
router.put('/edit/:id', putPatients)
router.get('/detail/:id', getPatById),

module.exports  = router;