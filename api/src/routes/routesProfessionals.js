const axios = require ('axios')
const {getAllProfessionals, getInfoApi, getProfById, getProfByName, getFilterByCity,postProfessionals}= require ('../Controllers/professionals')

const express = require('express')
const router =express.Router();

const {Professionals, Specialties} = require ('../db')

router.get('/', getInfoApi)

router.get('/:id', getProfById)

router.get('/search/:name', getProfByName)

router.get('/filter/:filterCity', getFilterByCity)

router.post('/', postProfessionals)


module.exports= router;