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
    //console.log(patient)
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

const getPatByName = async(req, res) => {
    let {name} = req.query
    if(name){
       try {
           let dbPatfName = await Patients.findAll({
               where: {
                   
                   name: { [Op.iLike]: name +'%' },                  }
                   
               })
           res.status(200).send(dbPatfName)
       
       } catch (error) {
       console.log(error)        
       }
       if(req.query.filterP){
           try {
               let dbPatfName = await Patients.findAll({
                   where:{
                       province:req.query.filterP
                   },
                   limit: 9,
                   order:[['name', req.query.order]] //ASC DESC
               });
               return res.send(dbPatfName)
           } catch (error) {
               console.log(error)
           }
           if(req.query.filterC){
               try {
                   let dbPatfName = await Patients.findAll({
                       where:{
                           city:req.query.filterC
                       },
                       limit:9,
                       order:[['name', req.query.order]]//ASC DESC
                   }); return res.send(dbPatfName)
               } catch (error) {
                   console.log(error)
               }
           }
       
    }
       else{
           try {
               let dbPatfName =getAllPatients(
                  {
                   limit:9,
                   offset: req.query.page,
                   order:[['name', req.query.order]],
                  }
               )
               //let dbPatfName = await Patients.findAll({
                   
               //})
               return res.send(dbPatfName)
           } catch (error) {
               console.log(error)
           }
       }
   }
   
}

module.exports = {
    getInfoApiPatients,
    getPatById,
    getPatByName,
    getPatByDocument,
   getAllPatients

};
