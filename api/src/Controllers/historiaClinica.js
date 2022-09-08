const Sequelize = require("sequelize");
const axios = require("axios");
const { Op, where } = require("sequelize");

const {
  Professionals,
  Specialties,
  ObrasSociales,
  HistoriaClinica,
  Patients,
} = require("../db");

const postHistoriaClinica = async (req, res) => {
  let { reason, image, description, date, diagnosis, professional, patient } =
    req.body;

  try {
    const historiaClinica = { reason: reason[0], image, description: description[0], date: date[0], diagnosis: diagnosis[0] };
    if (!reason || !description || !date || !diagnosis) {
      res.send("Falta infornacion");
    } else {
       let newHistoriaClinica = await HistoriaClinica.create(historiaClinica);
       

      let professionaldb = await Professionals.findOne({
         where: {id: professional}
        })
       let patientdb = await Patients.findOne({

        where: {document: patient}

       })
       console.log('pat', patientdb, 'prof', professionaldb)
      await professionaldb.addHistoriaClinica(newHistoriaClinica);
      await patientdb.addHistoriaClinica(newHistoriaClinica);
       res.status(200).send("Historia Credad con Exito");
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllHistoriaClinica=async(req,res)=>{
  try{  
    let allHistoriaClinica = await HistoriaClinica.findAll({
      include: [
        { model: Professionals, attributes: ["name"] },
        { model: Patients, attributes: ["name"] },
      ],  
    //limit:150,
    //offset: req.query.page,
    //order:[['name', req.query.order]],
    })
    res.status(200).send(allHistoriaClinica)
    } catch (error) {console.log(error)}
}



const getHistoriaClinica = async (req, res) => {
  let { id } = req.params;
  const dbHistoriaClinica = await HistoriaClinica.findOne({
    include: [
      { model: Professionals, attributes: ["name"] },
      { model: Patients, attributes: ["name"] },
    ],
    where: {
      id: id,
    },
  });
  //console.log(dbPatId)
  //dbPatId.length?
  res.status(200).send(dbHistoriaClinica);
  //:res.status(404).send('Id de paciente no encontrado');
};

const getHistoriaClinicaByPat = async (req, res) => {
  let { id } = req.params;
  try {
    const pat = await Patients.findOne({
      where: {
        id: id
      } 
    })
    const hist = await pat.getHistoriaClinicas({
      include: [
        {
          model: Patients,
          attributes: ['id', 'name', 'lastname'],
        },
        {
          model: Professionals,
          attributes: ['id', 'name', 'lastname']
        }
      ],
    })
    //console.log(dbPatId)
    //dbPatId.length?
    res.status(200).send(hist);
    //:res.status(404).send('Id de paciente no encontrado');
  } catch (error) {
    res.status(400).send('deja de joder')
  }
  
};



module.exports = {
  postHistoriaClinica,
  getHistoriaClinica,
  getAllHistoriaClinica,
  getHistoriaClinicaByPat
};
