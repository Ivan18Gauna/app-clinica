const axios = require ('axios')
const {getAllProfessionals, getInfoApi}= require ('../Controllers/professionals')
const express = require('express')
const router =express.Router();

const {Professionals, Specialties} = require ('../db')

router.get('/', async (req, res)=>{
    let allProfessionals = await getInfoApi();
/*     if(name){
        const professionalsName = await allProfessionals.filter((e)=> e.name.toLowerCase().startsWith(name.toLowerCase()));
        professionalsName.length? res.status(200).send(professionalsName): res.status(404).send("Profesional no encontrado");
    }else{
    }     */
    res.status(200).send(allProfessionals);
})

module.exports= router;