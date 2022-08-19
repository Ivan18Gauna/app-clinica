const Sequelize = require("sequelize");
const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const { Professionals, Specialties, ObrasSociales } = require("../db");

const getInfoApi = async (req, res) => {
  res.status(200).send(
    await Professionals.findAll({
      include: [{ model: Specialties }],
    })
  );
};

const addProfDb = async () => {
  const dbProf = await Professionals.findAll();
  if (!dbProf.length) {
    const apiProf = await axios.get(
      `https://historia-clinica-31f40-default-rtdb.firebaseio.com/results.json`
    );
    const prof = await apiProf.data;
    prof.forEach((e) => {
      Specialties.findOrCreate({
        where: {
          name: e.specialty[0],
        },
      });
    });
    await prof.forEach(async (e) => {
      let idv4 = uuidv4();
      let dbId = idv4.slice(0, 4);
      const dbProf = {
        id: dbId,
        name: e.name.split(" ")[0],
        username: e.username,
        password: e.password,
        lastname: e.name.split(" ")[1],
        license: e.license,
        birth: e.birth,
        phone: e.phone,
        mail: e.mail,
        province: e.domicile.province,
        city: e.domicile.city,
        number: e.domicile.number,
        street: e.domicile.street,
      };
      const newProf = await Professionals.create(dbProf);
      e.specialty.map(async (s) => {
        const [postSpecialties, succes] = await Specialties.findOrCreate({
          where: {
            name: s,
          },
          defaults: {
            name: s,
          },
        });
        await newProf.addSpecialties(postSpecialties);
      });
      const [postObrasSociales, succes] = await ObrasSociales.findOrCreate({
        where: {
          name: e.obra,
        },
        defaults: {
          name: e.obra,
        },
      });
      await newProf.addObrasSociales(postObrasSociales);
    });
    console.log("profesionales cargados correctamente");
  }
};

const getObrasSociales = async () => {
  const apiObras = await axios.get(
    "https://obras-sociales-be310-default-rtdb.firebaseio.com/results.json"
  );
  const obras = await apiObras.data;
  obras.forEach(async (e) => {
    await ObrasSociales.findOrCreate({
      where: {
        name: e,
      },
    });
  });
  console.log("obras cargadas con exito");
};

const getProfById = async (req, res) => {
  let { id } = req.params;
  const dbProfId = await Professionals.findOne({
    where: {
      id: id,
    },
  });
  res.status(200).send(dbProfId);
};

const getProfByName = async (req, res) => {
  let { name } = req.params;
  const dbProfName = await Professionals.findAll({
    where: {
      name: { [Op.iLike]: name + "%" },
    },
  });
  res.status(200).send(dbProfName);
};

const getFilterByCity = async (req, res) => {
  let { filterCity } = req.params;

  const dbFilterCity = await Professionals.findAll({
    where: {
      city: req.params.filterCity,
    },
    // order:[['name', req.params.order]]
  });

  res.status(200).send(dbFilterCity);
};
const postProfessionals = async (req, res) => {
  let { name, username, password, license, birth, phone, mail, province, city, number, street, specialty, } = req.body;
  let idv4 = uuidv4();
  const dbId = idv4.slice(0, 4);
  try {
    const professional = {
      id: dbId,
      name: name,
      username: username,
      password: password,
      license: license,
      birth: birth,
      phone: phone,
      mail: mail,
      province: province,
      city: city,
      number: number,
      street: street,
    };
    if (isNaN(name) === false)
      return res.send("El valor ingresado no debe ser numerico.");
    if (
      !name ||
      !username ||
      !password ||
      !license ||
      !birth ||
      !phone ||
      !mail ||
      !province ||
      !city ||
      !number ||
      !street
    ) {
      res.send("Falta infornacion");
    }
    const validate = await Professionals.findOne({
      where: { name },
    });
    if (!validate) {
      let newProfessional = await Professionals.create(professional);
      specialty.map(async (s) => {
        const [postSpecialties, succes] = await Specialties.findOrCreate({
          where: {
            name: s,
          },
          defaults: {
            name: s,
          },
        });
        await newProfessional.addSpecialties(postSpecialties);
      });
      res.status(200).send(professional);
    } else {
      res.status(400).send("Professional ya existente");
    }
  } catch (error) {
    console.log(error);
  }
};

const putProfessionals = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, license, birth, phone, mail, province, city, number, street, } = req.body;
    const editProfessionals = await Professionals.update(
      { username, license, birth, phone, mail, province, city, number, street, },
      { where: { id: id } }
    );
    res.send(editProfessionals);
  } catch (error) {
    return error;
  }
};

module.exports = {
  getInfoApi,
  getProfByName,
  getProfById,
  postProfessionals,
  getFilterByCity,
  putProfessionals,
  getObrasSociales,
  addProfDb,
};
