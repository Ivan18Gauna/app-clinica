const Sequelize = require("sequelize");
const { default: axios } = require("axios");
const { Op } = require("sequelize");
const { Professionals, Patients, Turnos } = require("../db");

const postTurno = async(req, res) => {
    const { date, time, professional, patient } = req.body
    try {
        let prof = await Professionals.findOne({
            where: {
                id: professional,
            }
        })
        const pat = await Patients.findOne({
            where: {
                id: patient,
            }
        })
        const newTurno = await Turnos.create({ date, time })
        await prof.addTurnos(newTurno)
        await pat.addTurnos(newTurno)

        res.status(200).send(newTurno)

    }catch(error) {
        res.status(400).send('hubo un problema cargando la fecha')
    }
}

const getTurnoByProf = async(req, res) => {
    let { id } = req.params
    try {
        let prof = await Professionals.findOne({
            where: {
                id: id
            }
        })
        const profTurnos = await prof.getTurnos({
            include: [
                {
                  model: Patients,
                  attributes: ['id', 'name'],
                },
                {
                  model: Professionals,
                  attributes: ['id', 'name']
                }
              ],
        })
        res.status(200).send(profTurnos)
    } catch (error) {
        res.status(400).send('hubo un problema cargando los turnos')
    }
}

const getTurnosByPat = async(req, res) => {
    let { id } = req.params
    try {
        let pat = await Patients.findOne({
            where: {
                id: id
            }
        })
        const patTurnos = await pat.getTurnos({
            include: [
                {
                  model: Patients,
                  attributes: ['id', 'name'],
                },
                {
                  model: Professionals,
                  attributes: ['id', 'name']
                }
              ],
        })
        res.status(200).send(patTurnos)
    } catch (error) {
        res.status(400).send('hubo un problema cargando los turnos')
    }
}

  module.exports = {
    postTurno,
    getTurnoByProf,
    getTurnosByPat
  }
