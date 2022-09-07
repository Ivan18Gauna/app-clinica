const axios = require ('axios')


const {
    putProfessionals,
    deleteProfessionals,
    getProfById,
    getProfByName,
    getAllProfessionals,
    postProfessionals,
    restoreProfessional
} = require ('../Controllers/professionals')

const express = require('express')
const router =express.Router();

const {Professionals, Specialties} = require ('../db')

router.get('/', getProfByName)
router.post('/', postProfessionals)
router.put('/edit/:id', putProfessionals)
router.get('/detail/:id', getProfById),
router.delete('/delete/:id', deleteProfessionals)
router.get('/restore/:id', restoreProfessional)
router.get('/allProfessional', getAllProfessionals)

module.exports= router;