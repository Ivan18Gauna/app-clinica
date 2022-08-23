const axios = require ('axios')
const { postHealthData, getHealthData }= require ('../Controllers/healthData')
const express = require('express')
const router =express.Router();

router.post('/', postHealthData);
router.get('/detail/:id', getHealthData);

module.exports=router;