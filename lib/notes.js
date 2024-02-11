const fs = require("fs");
const path = require("path");

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);

  const data = JSON.stringify({ notes: notesArray }, null, 2);

  try {
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), data);
  } catch (error) {
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), data, {
      flag: "wx",
    });
  }

  return note;
}

function deleteNote(notesArray, id) {
  const deleteID = parseInt(id);
  notesArray.splice(deleteID, 1);

  for (let i = deleteID; i < notesArray.length; i++) {
    notesArray[i].id = i.toString();
  }

  const data = JSON.stringify({ notes: notesArray }, null, 2);

  try {
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), data);
  } catch (error) {
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), data, {
      flag: "wx",
    });
  }
}

module.exports = {
  createNewNote,
  deleteNote,
};
