const Sequelize = require("sequelize");
const { default: axios } = require("axios");
const { Op } = require("sequelize");
const { Professionals, Specialties, ObrasSociales } = require("../db");

const getAllEspecialties = async (req, res) => {
  res.status(200).send(await Specialties.findAll({}));};

  module.exports={getAllEspecialties}
