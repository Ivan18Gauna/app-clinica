const Sequelize = require("sequelize");
const { default: axios } = require("axios");
const { Op } = require("sequelize");
const { Professionals, Specialties, ObrasSociales } = require("../db");
const { query } = require("express");

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
      const dbProf = {
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
    include: [{ model: Specialties, attributes: ["name"] }],
    where: {
      id: id,
    },
  });
  res.status(200).send(dbProfId);
};

const getAllProfessionals = async (req, res) => {
  try {
    let allProfessional = await Professionals.findAll({
      include: [{ model: Specialties, attributes: ["name"] }],
      limit: 150,
      //offset: req.query.page,
      //order:[['name', req.query.order]],
    });
    res.status(200).send(allProfessional);
  } catch (error) {
    console.log(error);
  }
};

const getProfByName = async (req, res) => {
  const { lastname, filterEsp, filterProfProv, order } = req.query;

  //FILTRO SE RECIBE APELLIDO Y NO SE RECIBE ESPECIALIDAD NI PROVINCIA
  if (lastname && !filterEsp && !filterProfProv && order) {
    try {
      let dbProfName = await Professionals.findAll({
        include: [{ model: Specialties, attributes: ["name"] }],
        where: { lastname: { [Op.iLike]: lastname + "%" } },
        limit: 9,
        //offset: req.query.page,
        //order:[['lastname', req.query.order]]
      });
      dbProfName.length
        ? res.status(200).send(dbProfName)
        : res
            .status(404)
            .send("No encontramos profesionales con estos filtros");
    } catch (error) {
      console.log(error);
    }
  }
  //FILTRO SE RECIBE APELLIDO Y RECIBE ESPECIALIDAD NO RECIBE PROVINCIA
  if (lastname && filterEsp && !filterProfProv && order) {
    try {
      let dbPatfName = await Professionals.findAll({
        where: {
          [Op.and]: [{ lastname: { [Op.iLike]: lastname + "%" } }],
        },
        include: [
          {
            model: ObrasSociales,
            attributes: ["name"],
            through: { attributes: [] },
          },
          {
            model: Specialties,
            attributes: ["name"],
            through: { attributes: [] },
            where: { name: req.query.filterEsp },
          },
        ],
      });
      dbPatfName.length
        ? res.status(200).send(dbPatfName)
        : res
            .status(404)
            .send("No encontramos profesionales con estos filtros");
    } catch (error) {
      console.log(error);
    }
  }
  //FILTRO SE RECIBE APELLIDO Y PROVINCIA NO SE RECIBE ESPECIALIDAD
  if (lastname && !filterEsp && filterProfProv && order) {
    try {
      let dbProfName = await Professionals.findAll({
        include: [{ model: Specialties, attributes: ["name"] }],
        where: {
          [Op.and]: [
            { lastname: { [Op.iLike]: lastname + "%" } },
            { province: req.query.filterProfProv },
          ],
        },
        limit: 9,
        //offset: req.query.page,
        order:[['lastname', order]]
      });
      dbProfName.length
        ? res.status(200).send(dbProfName)
        : res
            .status(404)
            .send("No encontramos profesionales con estos filtros");
    } catch (error) {
      console.log(error);
    }
  }
  //FILTRO SE RECIBE PROVINCIA NO SE RECIBE ESPECIALIDAD NI APELLIDO
  if (!lastname && !filterEsp && filterProfProv && order) {
    try {
      let dbProfName = await Professionals.findAll({
        include: [{ model: Specialties, attributes: ["name"] }],
        where: { province: req.query.filterProfProv },
        limit: 5,
        //offset: req.query.page,
        order:[['lastname', order]]
      });
      dbProfName.length
        ? res.status(200).send(dbProfName)
        : res
            .status(404)
            .send("No encontramos profesionales con estos filtros");
    } catch (error) {
      console.log(error);
    }
  }
  //FILTRO SE RECIBE ESPECIALIDAD NO SE RECIBE PROVINCIA NI APELLIDO
  if (!lastname && filterEsp && !filterProfProv && order) {
    try {
      let dbPatfName = await Professionals.findAll({
        include: [
          {
            model: Specialties,
            attributes: ["name"],
            where: { name: req.query.filterEsp },
          },
        ],
        limit: 5,
        order:[['lastname', order]]
        //offset: req.query.page,
      });
      dbPatfName.length
        ? res.status(200).send(dbPatfName)
        : res
            .status(404)
            .send("No encontramos profesionales con estos filtros");
    } catch (error) {
      console.log(error);
    }
  }
  //FILTRO SE RECIBE ESPECIALIDAD  Y PROVINCIA NO SE RECIBE APELLIDO
  if (!lastname && filterEsp && filterProfProv && order) {
    try {
      let dbPatfName = await Professionals.findAll({
        where: { province: req.query.filterProfProv },
        include: [
          {
            model: Specialties,
            attributes: ["name"],
            where: { name: req.query.filterEsp },
          },
        ],
      });
      dbPatfName.length
        ? res.status(200).send(dbPatfName)
        : res
            .status(404)
            .send("No encontramos profesionales con estos filtros");
    } catch (error) {
      console.log(error);
    }
  }
  //SE RECIBE ESPECIALIDAD, PROVINCIA, APELLIDO
  if (lastname && filterEsp && filterProfProv && order) {
    try {
      let dbPatfName = await Professionals.findAll({
        where: {
          [Op.and]: [
            { lastname: { [Op.iLike]: lastname + "%" } },
            { province: req.query.filterProfProv },
          ],
        },
        include: [
          {
            model: Specialties,
            attributes: ["name"],
            where: { name: req.query.filterEsp },
          },
        ],
      });
      dbPatfName.length
        ? res.status(200).send(dbPatfName)
        : res
            .status(404)
            .send("No encontramos profesionales con estos filtros");
    } catch (error) {
      console.log(error);
    }
  } else if (
    !req.query.lastname &&
    !req.query.filterProfProv &&
    !req.query.filterEsp
  ) {
    try {
      res.status(404).send("Debe seleccionar un valor a consultar");
    } catch (error) {
      res.status(200).send("Debe seleccionar un filtro a consultar");
    }
  }
};

const postProfessionals = async (req, res) => {
  let {
    name,
    lastname,
    password,
    avatar,
    license,
    birth,
    phone,
    mail,
    province,
    city,
    number,
    street,
    specialty,
  } = req.body;
  try {
    const professional = {
      name: name,
      lastname: lastname,
      password: password,
      avatar: avatar,
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
      !lastname ||
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
      where: { license },
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
    const {
      name,
      lastname,
      avatar,
      license,
      birth,
      phone,
      mail,
      password,
      province,
      city,
      number,
      street,
    } = req.body;
    const editProfessionals = await Professionals.update(
      {
        name,
        lastname,
        avatar,
        license,
        birth,
        phone,
        mail,
        password,
        province,
        city,
        number,
        street,
      },
      { where: { id: id } }
    );
    res.send(editProfessionals);
  } catch (error) {
    return error;
  }
};

const deleteProfessionals = async (req, res) => {
  try {
    const id = req.params.id;
    await Professionals.destroy({
      where: { id: id },
    });
    return res.send("deleted!");
  } catch (error) {
    return error;
  }
};

const restoreProfessional = async (req, res) => {
  let { id } = req.params;
  try {
    await Professionals.restore({
      where: {
        id: id,
      },
    });
    const restoredProf = await Professionals.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).send(restoredProf);
  } catch (error) {
    res.status(400).send("Hubo un problema recuperando el usuario");
  }
};

module.exports = {
  getInfoApi,
  //getProfByName,
  getProfByName,
  getAllProfessionals,
  getProfById,
  postProfessionals,
  //getFilterByCity,
  putProfessionals,
  getObrasSociales,
  addProfDb,
  deleteProfessionals,
  restoreProfessional,
};
