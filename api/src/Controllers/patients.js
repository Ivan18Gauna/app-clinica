const Sequelize = require("sequelize");
const axios = require("axios");
const { Op } = require("sequelize");
const { Patients } = require("../db");

const getInfoApiPatients = async (req, res) => {
  const apiPatients = await axios.get(
    "https://patients-4a60b-default-rtdb.firebaseio.com/.json"
  );
  const patient = await apiPatients.data;
  patient.forEach((e) => {
    Patients.findOrCreate({
      where: {
        name: e.name.split(" ")[0],
        lastname: e.name.split(" ")[0],
        birth: e.birth,
        phone: e.phone,
        mail: e.mail,
        province: e.province,
        city: e.city,
        number: e.number,
        street: e.street,
        document: e.document,
      },
    });
  });
  console.log("Se ha cargado la base de pacientes");
};

const getPatById = async (req, res) => {
  let { id } = req.params;
  const dbPatId = await Patients.findOne({
    where: {
      id: id,
    },
  });
  //console.log(dbPatId)
  //dbPatId.length?
  res.status(200).send(dbPatId);
  //:res.status(404).send('Id de paciente no encontrado');
};

const getPatByDocument = async (req, res) => {
  let { document } = req.params;
  const dbPatDocuent = await Patients.findOne({
    where: {
      document: document,
    },
  });
  res.status(200).send(dbPatDocuent);
};

const getAllPatients = async (req, res) => {
  try {
    let allPatients = await Patients.findAll({
      //include: [{ model: Specialties,
      //attributes:['name'] }],
      limit: 150,
      //offset: req.query.page,
      //order:[['name', req.query.order]],
    });
    res.status(200).send(allPatients);
  } catch (error) {
    console.log(error);
  }
};

const getPatByName = async(req, res) => {
    let {lastname} = req.query
    console.log({lastname})
    if(lastname){
        try {
            let dbPatfName = await Patients.findAll({
                where: {
                    name: { [Op.iLike]: lastname +'%' },                  }
                })
                dbPatfName.length?
                res.status(200).send(dbPatfName):res.status(404).send('No existe registro del paciente a buscar')
        } catch (error) {
        console.log(error)        
        }
    }else {
    try {
      let allPatien = await Patients.findAll({
        limit: 20,
        offset: req.query.page,
        filterP: [["province", req.query.filterP]],
        filterC: [["city", req.query.filterC]],
        order: [["name", req.query.order]],
      });
      res.status(200).send(allPatien);
    } catch (error) {
      console.log(error);
    }
  }
  }

const getPatByOnsearchName = async(req, res) => {
    let {lastname} = req.query
    console.log({lastname})
    if(lastname){
        try {
            let dbPatfName = await Patients.findAll({
                where: {
                    name: { [Op.iLike]: lastname +'%' },                  }
                })
                dbPatfName.length?
                res.status(200).send(dbPatfName):res.status(404).send('No existe registro del paciente a buscar')
        } catch (error) {
        console.log(error)        
        }
    }
  }


const postPatients = async (req, res) => {
  let {
    name,
    lastname,
    birth,
    phone,
    mail,
    province,
    city,
    number,
    street,
    document,
  } = req.body;
  try {
    const patients = {
      name,
      lastname,
      birth,
      phone,
      mail,
      province,
      city,
      number,
      street,
      document,
    };
    if (isNaN(name) === false)
      return res.send("El valor ingresado no debe ser numerico.");
    if (
      !name ||
      !lastname ||
      !birth ||
      !phone ||
      !mail ||
      !province ||
      !city ||
      !number ||
      !street ||
      !document
    ) {
      res.send("Falta infornacion");
    }
    const validate = await Patients.findOne({
      where: { document },
    });
    if (!validate) {
      let newPatients = await Patients.create(patients);
      res.status(200).send(patients);
    } else {
      res.status(400).send("Pacientes ya existente");
    }
  } catch (error) {
    console.log(error);
  }
};

const putPatients = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      lastname,
      document,
      birth,
      phone,
      mail,
      province,
      city,
      number,
      street,
      blood,
      vaccines,
      allergies,
      transfusion,
      chronicles,
      oS
    } = req.body;
    const editPatients = await Patients.update(
      {
        name,
        lastname,
        document,
        birth,
        phone,
        mail,
        province,
        city,
        number,
        street,
        blood,
        vaccines,
        allergies,
        transfusion,
        chronicles,
        oS
      },
      { where: { id: id } }
    );
    res.send(editPatients);
  } catch (error) {
    return error;
  }
};

const deletePatients = async (req, res) => {
  try {
    const id = req.params.id;
    await Patients.destroy({
      where: { id: id },
    });
    return res.send(" Patient deleted!");
  } catch (error) {
    return error;
  }
};

module.exports = {
  getInfoApiPatients,
  getAllPatients,
  getPatById,
  getPatByName,
  getPatByDocument,
  postPatients,
  putPatients,
  getPatByOnsearchName,
  deletePatients,
};
