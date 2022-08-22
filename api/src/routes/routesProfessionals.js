const axios = require ('axios')

const {putProfessionals, getInfoApi, getProfById, getProfByName, getAllProfessionals, postProfessionals}= require ('../Controllers/professionals')

const express = require('express')
const router =express.Router();

const {Professionals, Specialties} = require ('../db')

router.get('/', getProfByName)
router.get('/allProfessional', getAllProfessionals)
//router.get('/search/:name', getProfByName)
//router.get('/filter/:filterCity', getFilterByCity)
router.post('/', postProfessionals)
router.put('/edit/:id', putProfessionals)
router.get('/detail/:id', getProfById),



module.exports= router;