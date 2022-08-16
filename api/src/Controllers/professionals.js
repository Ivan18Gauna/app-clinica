const Sequelize = require("sequelize");
const { default: axios } = require("axios");
const { Professionals, Specialties } = require("../db");

// const getProfInfo = async() => {
//     const dbProf = await Professionals.findAll();
//     if (!dbProf.length) {
//         const apiProf = await axios.get('https://historia-clinica-31f40-default-rtdb.firebaseio.com/results.json').data;
//         await apiProf.map(async(e) => {
//             await Professionals.findOrCreate({
//                 where: {
//                     name: e.name
//                 }
//             })
//         })
//         res.status(200).send(dbProf)
//     }else {
//         res.status(200).send(dbProf)
//     }
//     return res.status(400).send('no data')
// }
// console.log(getProfInfo)

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


/* const getDbInfo= async ()=>{
    const profesionalsDb= await Professionals.findAll({include:[{model:Specialties}]});
    const res =  profesionalsDb.map(e=>{
        return {
            id: e.id,
            name:e.name, 
            license: e.license,
            birth: e.birth, 
            phone: e.phone,
            mail: e.mail, 
            domicile: e.domicile          
        }
    })
    return res
};

const getAllProfessionals = async ()=>{
    const infoApi = await getInfoApi();
    const dbInfo = await getDbInfo();
    const allInfoApiDb = await infoApi.concat(dbInfo);
    // console.log(allInfoApiDb)
    return allInfoApiDb;
}; */





module.exports = {
    getInfoApi,
    getProfById
};