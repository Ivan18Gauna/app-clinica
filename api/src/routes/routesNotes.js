const axios = require ('axios')
const express = require('express')
const router =express.Router();
const { postNote, getNoteByProf } = require('../Controllers/notes')

router.post('/', postNote)
router.get('/profnotes/:id', getNoteByProf)

module.exports=router;