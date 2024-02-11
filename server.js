const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const dbFilePath = path.join(__dirname, 'db', 'db.json');

app.use(express.static('public'));
app.use(express.json());

app.get('/api/notes', (req, res) => {
  try {
    const dbData = JSON.parse(fs.readFileSync(dbFilePath));
    res.json(dbData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get notes' });
  }
});

app.post('/api/notes', (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync(dbFilePath));
    const newNote = { id: uuidv4(), ...req.body };
    db.push(newNote);
    fs.writeFileSync(dbFilePath, JSON.stringify(db));
    res.json(db);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create note' });
  }
});


app.delete('/api/notes/:id', (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync(dbFilePath));
    const newDb = db.filter((note) => note.id !== req.params.id);
    fs.writeFileSync(dbFilePath, JSON.stringify(newDb));
    res.json(newDb);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
