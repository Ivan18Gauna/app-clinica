const Sequelize = require("sequelize");
const { default: axios } = require("axios");
const { Professionals, Patiens, Specialtis } = require("../db");

const getProfInfo = async(req, res) => {
    const dbProf = await Professionals.findAll();
    if (!dbProf.length) {
        const apiProf = await axios.get('https://historia-clinica-31f40-default-rtdb.firebaseio.com/results.json').data;
        await apiProf.map(async(e) => {
            await Professionals.findOrCreate({
                where: {
                    name: e.name
                }
            })
        })
        res.status(200).send(dbProf)
    }else {
        res.status(200).send(dbProf)
    }
    return res.status(400).send('no data')
}

module.exports = {
    getProfInfo
};