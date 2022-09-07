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

        const profTurn = await prof.getTurnos()

        const pat = await Patients.findOne({
            where: {
                id: patient,
            }
        })
        const exist = profTurn.filter((e) => e.date === date && e.time.split(':')[0] === time.split(':')[0])
        
        if (exist[0] === undefined && time.split(':')[0] > 09 && time.split(':')[0] < 18) {
            const newTurno = await Turnos.create({ date, time })
            await prof.addTurnos(newTurno)
            await pat.addTurnos(newTurno)
            return res.status(200).send(newTurno)
        }else {
            res.status(400).send('El turno ya existe o no esta disponible el horario')
        }


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
                  attributes: ['id', 'name', 'lastname'],
                },
                {
                  model: Professionals,
                  attributes: ['id', 'name']
                }
              ],
        })
      console.log(profTurnos)
        res.status(200).send(profTurnos)
    } catch (error) {
      console.log(error.message)
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
