const axios = require ('axios')
const {getAllProfessionals, getInfoApi, getProfById}= require ('../Controllers/professionals')
const express = require('express')
const router =express.Router();

const {Professionals, Specialties} = require ('../db')

router.get('/', getInfoApi)

router.get('/:id', getProfById)

module.exports= router;