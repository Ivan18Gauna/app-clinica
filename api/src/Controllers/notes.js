const Sequelize = require("sequelize");
const { default: axios } = require("axios");
const { Op } = require("sequelize");
const { Professionals, Notes } = require("../db");

const postNote = async(req, res) => {
    const { tittle, note, professional } = req.body
    try {
        let prof = await Professionals.findOne({
            where: {
                id: professional,
            }
        })

        const newNote = await Notes.create({ tittle, note })
        await prof.addNotes(newNote)

        res.status(200).send(newNote)

    }catch(error) {
        res.status(400).send('hubo un problema cargando la nota')
    }
}

const getNoteByProf = async(req, res) => {
    let { id } = req.params
    try {
        let prof = await Professionals.findOne({
            where: {
                id: id
            }
        })
        const profNotes = await prof.getNotes({
            include: [
                {
                  model: Professionals,
                  attributes: ['id', 'name']
                }
              ],
        })
        res.status(200).send(profNotes)
    } catch (error) {
        res.status(400).send('hubo un problema cargando las notas')
    }
}

  module.exports = {
    postNote,
    getNoteByProf
  }
