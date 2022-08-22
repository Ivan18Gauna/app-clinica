const axios = require ('axios')

const {putProfessionals, deleteProfessionals, getProfById, getProfByName, getFilterByCity, postProfessionals, getAllProfessionals}= require ('../Controllers/professionals')

const express = require('express')
const router =express.Router();

const {Professionals, Specialties} = require ('../db')

router.get('/allProfessional', getAllProfessionals)
router.get('/', getProfByName)
//router.get('/search/:name', getProfByName)
//router.get('/filter/:filterCity', getFilterByCity)
router.post('/', postProfessionals)
router.put('/edit/:id', putProfessionals)
router.delete('/delete/:id', deleteProfessionals)
router.get('/detail/:id', getProfById),

module.exports= router;