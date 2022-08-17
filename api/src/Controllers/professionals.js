const Sequelize = require("sequelize");
const { default: axios } = require("axios");
const { Op } = require("sequelize");
const { Professionals, Specialties } = require("../db");
const professionals = require("../models/professionals");

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
        prof.forEach((e) => {
            Specialties.findOrCreate({
                where: {
                    name: e.specialty
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
            name: { [Op.iLike]: `${name}%` },
        }
    })
    res.status(200).send(dbProfName)
};

const postProfessionals = async (req, res) => {
    let {
        id,
        name,
        license,
        birth,
        phone,
        mail,
        country,
        city,
        number,
        street,
        specialty       
    } = req.body;
    try{
        const professional = {
        id: id,
        name: name,
        license: license,
        birth: birth,
        phone: phone,
        mail: mail,
        country: country,
        city: city,
        number: number,
        street: street     
        };
        if(isNaN(name) === false)return res.send("El valor ingresado no debe ser numerico.")
        if(!name || !license || !birth || !phone || !mail || !country || !city || !number || !street){
            res.send("Falta infornacion")
        }
        const validate = await Professionals.findOne({
            where:{name}
          })
        if(!validate){
            let newProfessional = await Professionals.create(professional);
            specialty.map(async(s) => {
                const [postSpecialties, succes] = await Specialties.findOrCreate({
                    where: {
                        name: s,
                    },
                    defaults: {
                        name: s,
                      },
                });
                await newProfessional.addSpecialties(postSpecialties);
            })
            res.status(200).send(professional);
        }else{
            res.status(400).send('Professional ya existente')
        }
    }catch (error){
        console.log(error)
    };
};


module.exports = {
    getInfoApi,
    getProfByName,
    getProfById,
    postProfessionals
};

