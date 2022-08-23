const Sequelize = require("sequelize");
const axios = require("axios");
// const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const { Patients, HealthData } = require("../db");

const postHealthData = async (req, res) => {
    let { blood, vaccines, allergies, transfusion, chronicles, oS, patId } = req.body;
    
    try {
      const pat = await Patients.findOne({
        where: {
          id: patId
        }
      })
      const healthData = { blood, vaccines, allergies, transfusion, chronicles, oS };
      if (!blood || !vaccines || !allergies || !transfusion || !chronicles || !oS) {
        res.send("Falta infornacion");
      } else {
         await pat.createHealthData(healthData);
         res.status(200).send(healthData);
      }
    } catch (error) {
      console.log(error);
    }
  };
//-----------------//
  const getHealthData = async (req, res) => {
    let { id } = req.params;
    const dbHealthData = await HealthData.findOne({
      where: {
        id: id,
      },
    })
    //console.log(dbPatId)
    //dbPatId.length? 
    res.status(200).send(dbHealthData)
    //:res.status(404).send('Id de paciente no encontrado');
    
  };

  module.exports = {
    postHealthData,
    getHealthData
  };