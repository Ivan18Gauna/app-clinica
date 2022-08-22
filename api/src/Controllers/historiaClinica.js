const Sequelize = require("sequelize");
const axios = require("axios");
// const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
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
    const historiaClinica = { id: dbId, reason, image, description, date, diagnosis, };
    if (!reason || !image || !description || !date || !diagnosis) {
      res.send("Falta infornacion");
    } else {
      let newHistoriaClinica = await HistoriaClinica.create(historiaClinica);
      const [postProfessionals, succes] = await Professionals.findOrCreate({
        where: {
          license: professional,
        },
        defaults: {
          license: professional,
        },
      });
      console.log(postProfessionals)
      console.log(succes)
      await newHistoriaClinica.addProfessionals(postProfessionals);
      /* const [postPatients, succesPat] = await Patients.findOrCreate({
        where: {
          document: patient,
        },
      });

      await newHistoriaClinica.addPatient(postPatients); */
      res.status(200).send(historiaClinica);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postHistoriaClinica,
};
