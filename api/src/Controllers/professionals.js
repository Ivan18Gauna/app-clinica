const Sequelize = require("sequelize");
const { default: axios } = require("axios");
const { Op } = require("sequelize");
const { Professionals, Specialties } = require("../db");

const getInfoApi = async(req, res) => {
    const dbProf = await Professionals.findAll()
    if (!dbProf.length) {
        const apiProf = await axios.get(`https://historia-clinica-31f40-default-rtdb.firebaseio.com/results.json`)
        const prof = await apiProf.data
        prof.forEach((e) => {
            Professionals.findOrCreate({
                where: {
                    id: e.id,
                    name: e.name,
                    license: e.license,
                    birth: e.birth,
                    phone: e.phone,
                    mail: e.mail,
                    country: e.domicile.country,
                    city: e.domicile.city,
                    number: e.domicile.number,
                    street: e.domicile.street
                }
            })
            
        })
        prof.forEach((e) => {
            Specialties.findOrCreate({
                where: {
                    name: e.specialty,
                }
            })
        })
        return res.status(200).send(await Professionals.findAll())
    }
    res.status(200).send(await Professionals.findAll())
};

const getProfById = async(req, res) => {
    let { id } = req.params
    const dbProfId = await Professionals.findOne({
        where: {
            id: id
        }
    })
    res.status(200).send(dbProfId)
}

const getProfByName = async(req, res) => {
    let {name} = req.params
    const dbProfName = await Professionals.findAll({
        where: {
            name: { [Op.iLike]: `%${name}%` },
        }
    })
    res.status(200).send(dbProfName)
}


module.exports = {
    getInfoApi,
    getProfByName,
    getProfById
};