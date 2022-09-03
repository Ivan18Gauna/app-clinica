const Sequelize = require("sequelize");
const { default: axios } = require("axios");
const { Op } = require("sequelize");
const { Professionals, Patients, ObrasSociales, Specialties, User } = require("../db");

const actualUser = async(req, res) => {
    const { mail } = req.params
    try {
        const prof = await Professionals.findOne({
            where: {
                mail: mail
            },
            include: [
                {
                    model: ObrasSociales,
                    attributes: ['name'],
                    through: { attributes: [] },
                },
                {
                    model: Specialties,
                    attributes: ['name'],
                    through: { attributes: [] },
                },
            ]
        })
        const pat = await Patients.findOne({
            where: {
                mail: mail
            },
        })
        const admin = await User.findOne({
            where: {
                email: mail
            },
        })
        if (prof) {
            res.status(200).send(prof)
        }else if (pat) {
            res.status(200).send(pat)
        }else {
            res.status(200).send(admin)
        }
    } catch (error) {
        res.status(400).send('usuarion no encontrado')
    }
}

// const getProfById = async (req, res) => {
//     let { id } = req.params;
//     let dbProfId = await Professionals.findOne({
//       where: { id },
//       include: [
//         {
//           model: ObrasSociales,
//           attributes: ["name"],
//           through: { attributes: [] },
//         },
//         {
//           model: Specialties,
//           attributes: ["name"],
//           through: { attributes: [] },
//         },
//       ],
//     });
//     res.status(200).send(dbProfId);
//   };
  



module.exports = {
    actualUser
}