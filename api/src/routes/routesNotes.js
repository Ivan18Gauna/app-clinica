const axios = require ('axios')
const express = require('express')
const router =express.Router();
const { postNote, getNoteByProf, deleteNoteProf } = require('../Controllers/notes')

router.post('/', postNote)
router.delete('/profnotes/:id', deleteNoteProf)
router.get('/profnotes/:id', getNoteByProf)

module.exports=router;
