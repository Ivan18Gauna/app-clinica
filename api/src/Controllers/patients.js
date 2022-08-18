const Sequelize = require("sequelize");
const axios = require("axios");
// const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const { Patients } = require("../db");
const {v4: uuidv4} = require("uuid");

const getInfoApiPatients= async(req, res) => 
{
    
    const apiPatients = await axios.get('https://patients-4a60b-default-rtdb.firebaseio.com/.json')
    const patient = await apiPatients.data
    console.log(patient)
    let idv4 = uuidv4();
    let dbId = idv4.slice(0,4)
    patient.forEach((e) => {Patients.findOrCreate({
                
        where:{
                    id: dbId,
                    name: e.name,
                    birth: e.birth,
                    phone: e.phone,
                    mail: e.mail,
                    province: e.province,
                    city: e.city,
                    number: e.number,
                    street: e.street,
                    document:e.document
                }
        })});
 
        console.log('Se ha cargado la base de pacientes');
        }
    //}
    
    const getPatById = async(req, res) => {
        let { id } = req.params
        const dbPatId = await Patients.findOne({
            where: {
                id: id
            }
        })
        res.status(200).send(dbPatId)
    }
    const getPatByName = async(req, res) => {
        let {name} = req.params
        const dbPatfName = await Patients.findAll({
            where: {
    
                name: { [Op.iLike]: name +'%' },                  }
        })
        res.status(200).send(dbPatfName)
    }
    const getPatByDocument = async(req, res) => {
        let { document } = req.params
        const dbPatDocuent = await Patients.findOne({
            where: {
                document: document
            }
        })
        res.status(200).send(dbPatDocuent)
    }
//.funcion

const AllPatients = async (req,res)=>{
   return await Patients.findAll()
}
const getAllPatients =async(req,res)=>{
    let allPatient = await AllPatients()
    res.status(200).send(allPatient)
}

module.exports = {
    getInfoApiPatients,
    getPatById,
    getPatByName,
    getPatByDocument,
   getAllPatients

};
