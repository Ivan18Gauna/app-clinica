const Sequelize = require("sequelize");
const { default: axios } = require("axios");
const { Op } = require("sequelize");
const { Professionals, Patients } = require("../db");

const actualUser = async(req, res) => {
    const { mail } = req.params
    console.log(mail)
    try {
        const prof = await Professionals.findOne({
            where: {
                mail: mail
            }
        })
        const pat = await Patients.findOne({
            where: {
                mail: mail
            }
        })
        if (prof) {
            res.status(200).send(prof)
        }else {
            res.status(200).send(pat)
        }
    } catch (error) {
        res.status(400).send('usuarion no encontrado')
    }
}

module.exports = {
    actualUser
}