const Sequelize = require("sequelize");
const axios = require("axios");
const { Op } = require("sequelize");
const { User, Professionals, Patients, HistoriaClinica, Turnos } = require("../db");

const registerNewAdmin = async(req, res) => {
    let { name, lastname, email, password, phone } = req.body;
    try {
        const newAdmin = await User.create({
            name,
            lastname,
            email,
            password,
            phone
        })
        res.status(200).send(newAdmin)
    } catch (error) {
        res.status(400).send('Hubo un error creando el nuevo admin')
    }
}
const getCountProfessionals = async (req, res) => {
    try {
        let allProfesionals = await Professionals.findAll();
        let countProfesional = allProfesionals.length
        //console.log(countPatients)
        res.status(200).send([countProfesional]);
      } catch (error) {
        console.log(error);
      }
}

const getCountPatients = async (req, res) => {
    try {
      let allPatients = await Patients.findAll();
      let countPatients = allPatients.length
      //console.log(countPatients)
      res.status(200).send([countPatients]);
    } catch (error) {
      console.log(error);
    }
  };
  
  const getCountHistoriaClinica = async (req, res) => {
    try {
      let historiaClinica = await HistoriaClinica.findAll();
      let countHistoria = historiaClinica.length
      res.status(200).send([countHistoria]);
    } catch (error) {
      console.log(error);
    }
  };

  const getCountTurnos = async (req, res) => {
    try {
      let turnos = await Turnos.findAll();
      let countTurnos = turnos.length
      res.status(200).send([countTurnos]);
    } catch (error) {
      console.log(error);
    }
  }

const getProParanoid = async (req, res) => {
    const profParanoid = await Professionals.findAll({
        where:{
            deletedAt:{
              [Op.ne]:null
            }
        },
        paranoid:false
    });
    
    res.status(200).send(profParanoid);
  };



module.exports = {
    registerNewAdmin,
    getCountProfessionals,
    getCountPatients,
    getProParanoid,
    getCountHistoriaClinica,
    getCountTurnos
}