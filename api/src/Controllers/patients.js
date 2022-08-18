const Sequelize = require("sequelize");
const axios = require("axios");
// const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const { Patients } = require("../db");
const { v4: uuidv4 } = require("uuid");

const getInfoApiPatients = async (req, res) => {
  const apiPatients = await axios.get(
    "https://patients-4a60b-default-rtdb.firebaseio.com/.json"
  );
  const patient = await apiPatients.data;
  //console.log(patient)
  let idv4 = uuidv4();
  let dbId = idv4.slice(0, 4);
  patient.forEach((e) => {
    Patients.findOrCreate({
      where: {
        id: dbId,
        name: e.name.split(' ')[0],
        lastname: e.name.split(' ')[0],
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
//}

const getPatById = async (req, res) => {
  let { id } = req.params;
  const dbPatId = await Patients.findOne({
    where: {
      id: id,
    },
  });
  res.status(200).send(dbPatId);
};

const getPatByName = async (req, res) => {
  let { name } = req.params;
  const dbPatfName = await Patients.findAll({
    where: {
      name: { [Op.iLike]: name + "%" },
    },
  });
  res.status(200).send(dbPatfName);
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
//.funcion

const AllPatients = async (req, res) => {
  return await Patients.findAll();
};

const getAllPatients = async (req, res) => {
  let allPatient = await AllPatients();
  res.status(200).send(allPatient);
};
//console.log(getAllPatients)

const postPatients = async (req, res) => {
    let {
        name,
        birth,
        phone,
        mail,
        province,
        city,
        number,
        street,
        document       
    } = req.body;
    let idv4 = uuidv4();
    const dbId = idv4.slice(0, 4);
    try{
        const patients = {
        id: dbId,
        name: name,
        birth: birth,
        phone: phone,
        mail: mail,
        province: province,
        city: city,
        number: number,
        street: street,
        document: document     
        };
        if(isNaN(name) === false)return res.send("El valor ingresado no debe ser numerico.")
        if(!name || !birth || !phone || !mail || !province || !city || !number || !street || !document){
            res.send("Falta infornacion")
        }
        const validate = await Patients.findOne({
            where:{name}
          })
        if(!validate){
            let newPatients = await Patients.create(patients);   
            res.status(200).send(patients);
        }else{
            res.status(400).send('Pacientes ya existente')
        }
    }catch (error){
        console.log(error)
    };
};

const putPatients = async (req, res) => {
    try {
      const id = req.params.id;
      const {
        name,
        document,
        birth,
        phone,
        mail,
        province,
        city,
        number,
        street
      } = req.body;
      const editPatients = await Patients.update(
        {
            name,
            document,
            birth,
            phone,
            mail,
            province,
            city,
            number,
            street
        },
        { where: { id:id } }
      );
      res.send(editPatients);
    } catch (error) {
      return error;
    }
  };


module.exports = {
    getInfoApiPatients,
    getPatById,
    getPatByName,
    getPatByDocument,
    getAllPatients,
    postPatients,
    putPatients
};
