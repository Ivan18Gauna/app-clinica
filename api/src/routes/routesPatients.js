const axios = require ('axios')
const { 
    getPatById,
    getPatByName,
   postPatients,
   putPatients,
   deletePatients,
   getAllPatients,
   getPatByOnsearchName,
   getPatByDocument,
   restorePatient
}= require ('../Controllers/patients')
const express = require('express')
const router =express.Router();


router.get('/', getPatByName)
router.post('/', postPatients),
router.get('/onsearch', getPatByOnsearchName)
router.get('/restore/:id', restorePatient)
router.put('/edit/:id', putPatients),
router.get('/detail/:id', getPatById),
router.get('/allpatients', getAllPatients)
router.delete('/delete/:id', deletePatients)
router.get('/document/:document', getPatByDocument),

module.exports=router;