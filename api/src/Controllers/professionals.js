const Sequelize = require("sequelize");
const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const { Professionals, Specialties } = require("../db");

const getInfoApi = async(req, res) => {
    const dbProf = await Professionals.findAll()
    if (!dbProf.length) {
        const apiProf = await axios.get(`https://historia-clinica-31f40-default-rtdb.firebaseio.com/results.json`)
        const prof = await apiProf.data
        prof.forEach((e) => {
            Specialties.findOrCreate({
            where: {
                name: e.specialty[0],
            }
        })
        })
        await prof.forEach(async(e) => {
            let idv4 = uuidv4();
            let dbId = idv4.slice(0, 4);
            const dbProf = {
                id: dbId,
                name: e.name,
                license: e.license,
                birth: e.birth,
                phone: e.phone,
                mail: e.mail,
                province: e.domicile.province,
                city: e.domicile.city,
                number: e.domicile.number,
                street: e.domicile.street
            }
            const newProf = await Professionals.create(dbProf)
            e.specialty.map(async(s) => {
                const [postSpecialties, succes] = await Specialties.findOrCreate({
                    where: {
                        name: s,
                    },
                    defaults: {
                        name: s,
                      },
                });
                await newProf.addSpecialties(postSpecialties);
            })
        })
        return res.status(200).send(await Professionals.findAll())
    }
    res.status(200).send(await Professionals.findAll({
        include: [{ model: Specialties }],
    }))
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

const getFilterByCity = async(req,res)=>{
    let {filterCity} = req.params
 
    const dbFilterCity=await Professionals.findAll({
        where:{
            city:req.params.filterCity
        },
        // order:[['name', req.params.order]]
    })


    res.status(200).send(dbFilterCity)
}

const postProfessionals = async (req, res) => {
    let {
        name,
        license,
        birth,
        phone,
        mail,
        province,
        city,
        number,
        street,
        specialty       
    } = req.body;
    let idv4 = uuidv4();
    const dbId = idv4.slice(0, 4);
    try{
        const professional = {
        id: dbId,
        name: name,
        license: license,
        birth: birth,
        phone: phone,
        mail: mail,
        province: province,
        city: city,
        number: number,
        street: street     
        };
        if(isNaN(name) === false)return res.send("El valor ingresado no debe ser numerico.")
        if(!name || !license || !birth || !phone || !mail || !province || !city || !number || !street){
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
    postProfessionals,
    getFilterByCity
};

