const axios = require ('axios')
const {getProfessionals}= require ('../Controllers/profesionalsControllers')
const express = require('express')
const router =express.Router();

const {Professionals} = require ('../db')

router.get('/', async (req, res)=>{

    const {name} = req.query;
    let allProfessionals = await getProfessionals();
    
    if(name){
        const professionalsName = await allProfessionals.filter((e)=> e.name.toLowerCase().startsWith(name.toLowerCase()));
        professionalsName.length? res.status(200).send(professionalsName): res.status(404).send("Profesional no encontrada");
    }else{
        res.status(200).send(allProfessionals);
    }    
})

module.exports= router;