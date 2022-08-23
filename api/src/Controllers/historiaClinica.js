const Sequelize = require("sequelize");
const axios = require("axios");
// const { v4: uuidv4 } = require("uuid");
const { Op, where } = require("sequelize");
const {
  Professionals,
  Specialties,
  ObrasSociales,
  HistoriaClinica,
  Patients,
} = require("../db");
const { v4: uuidv4 } = require("uuid");

const postHistoriaClinica = async (req, res) => {
  let { reason, image, description, date, diagnosis, professional, patient } =
    req.body;

  let idv4 = uuidv4();
  const dbId = idv4.slice(0, 4);
  try {
    const historiaClinica = {
      id: dbId,
      reason: reason,
      image: image,
      description: description,
      date: date,
      diagnosis: diagnosis,
    };
    if (!reason || !image || !description || !date || !diagnosis) {
      res.send("Falta infornacion");
    } else {
      let newHistoriaClinica = await HistoriaClinica.create(historiaClinica);

      let professionaldb = await Professionals.findAll({
        where: { name: professional },
      });
      let patientdb = await Patients.findAll({
        where: { name: patient },
      });
      await newHistoriaClinica.addProfessionals(professionaldb);
      await newHistoriaClinica.addPatients(patientdb);
      res.status(200).send("Historia Credad con Exito");
    }
  } catch (error) {
    console.log(error);
  }
};

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

module.exports = {
  postHistoriaClinica,
  getHistoriaClinica,
};
