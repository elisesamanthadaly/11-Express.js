const fs = require('fs');

var notesData = fs.readFileSync('./db/db.json');
var parsedNotesData = JSON.parse(notesData);

var newNoteId = 1; //index.js will not display note in first position upon click if note.id = 0

module.exports = (app) => {
  app.get('/api/notes', (req, res) => res.json(parsedNotesData));

  app.post('/api/notes', (req, res) => {
    var newNote = {
      id: newNoteId++,
      title: req.body.title,
      text: req.body.text,
    };
    parsedNotesData.push(newNote);
    res.json('Posting data...');
  });

  app.delete('/api/notes/:id', (req, res) => {
    var toDelete = parsedNotesData.find(note => note.id == req.params.id);
    toDeleteIndex = parsedNotesData.indexOf(toDelete);
    parsedNotesData.splice(toDeleteIndex, 1);
    res.json('Deleting data...');

    if (parsedNotesData.length === 0) {
      newNoteId = 1;
    }
  });
};