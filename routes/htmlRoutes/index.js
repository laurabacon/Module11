const path = require('path');
const router = require('express').Router();
const fs = require('fs');

router.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get notes' });
      } else {
        const notes = JSON.parse(data);
        res.json(notes);
      }
    });
  });

  router.post('/api/notes', (req, res) => {
    // Read the db.json file
    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create note' });
      } else {
        // Parse the JSON data
        const notes = JSON.parse(data);
  
        // Generate a unique id for the new note
        const newNoteId = notes.length.toString();
  
        // Create a new note object with the provided data and the generated id
        const newNote = {
          id: newNoteId,
          title: req.body.title,
          text: req.body.text,
        };
  
        // Add the new note to the notes array
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(notes), (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create note' });
          } else {
            res.json(newNote);
          }
        });
      }
    });
  });
  
  router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
  });
  
  router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });
  
  module.exports = router;
  