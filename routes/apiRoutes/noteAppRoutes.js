const express = require("express");
const router = express.Router();
const { notes } = require('../../db/db');
const { createNewNote } = require('../../lib/notes');


router.get('/notes', (req, res) => {
    try {
      let saved = notes;
      res.json(saved);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get notes' });
    }
  });
  

  router.post('/notes', async (req, res) => {
    try {
      req.body.id = notes.length.toString();
      let note = await createNewNote(req.body, notes);
      res.json(note);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create note' });
    }
  });



module.exports = router;