const axios = require ('axios')
const { 
    getPatById,
    getPatByName,
   postPatients,
   putPatients,
   deletePatients,
   getAllPatients,
   getPatByOnsearchName,
   getPatByDocument}= require ('../Controllers/patients')
const express = require('express')
const router =express.Router();


router.get('/', getPatByName)
router.get('/allpatients', getAllPatients)
router.get('/onsearch', getPatByOnsearchName)

router.get('/detail/:id', getPatById),
router.get('/document/:document', getPatByDocument),
router.post('/', postPatients),
router.put('/edit/:id', putPatients),
router.delete('/delete/:id', deletePatients)

module.exports=router;