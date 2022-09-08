const Sequelize = require("sequelize");
const { default: axios } = require("axios");
const { Op } = require("sequelize");
const { Professionals, Notes } = require("../db");

const postNote = async (req, res) => {
  const { title, note, professional, day } = req.body;
  try {
    let prof = await Professionals.findOne({
      where: {
        id: professional,
      },
    });
    const newNote = await Notes.create({ tittle: title, note, day });
    console.log(newNote);
    await prof.addNotes(newNote);
    res.status(200).send(newNote);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteNoteProf = async (req, res) => {
  const { id } = req.params;
  try {
    await Notes.destroy({ where: { id: Number(id) } });
    res.status(200).send('Nota eliminada correctamente')
  } catch (error) {
    console.log(error.message)
  }
};

const getNoteByProf = async (req, res) => {
  let { id } = req.params;
  try {
    let prof = await Professionals.findOne({
      where: {
        id,
      },
    });
    const profNotes = await prof.getNotes({
      include: [
        {
          model: Professionals,
          attributes: ["id", "name"],
        },
      ],
    });
    console.log(profNotes);
    res.status(200).send(profNotes);
  } catch (error) {
    res.status(400).send("hubo un problema cargando las notas");
  }
};

module.exports = {
  postNote,
  getNoteByProf,
  deleteNoteProf
};
