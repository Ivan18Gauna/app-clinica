const Sequelize = require("sequelize");
const { default: axios } = require("axios");
//const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const { Professionals, Specialties, ObrasSociales } = require("../db");

const getAllEspecialties = async (req, res) => {
  res.status(200).send(await Specialties.findAll({}));};

  module.exports={getAllEspecialties}
