const fs = require("fs");

const listNotes = () => {
  const notes = loadNotes();
  console.log("Your Notes:");
  notes.forEach((note) => console.log(`${note.title}`));
};

const readNote = (title) => {
  const notes = loadNotes();
  const found = notes.find((note) => note.title === title);
  if (found) {
    console.log(found);
  } else {
    console.log("There was not note by this title");
  }
};

const addNote = function (title, body) {
  const notes = loadNotes();
  const duplicateFiles = notes.filter((notes) => {
    return notes.title === title;
  });

  if (duplicateFiles.length === 0) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log("new Note added");
  } else {
    console.log("note was taken");
  }
};

const removeNote = function (title) {
  const notes = loadNotes();
  const foundIndex = notes.findIndex((note) => {
    return note.title === title;
  });

  if (foundIndex > -1) {
    notes.splice(foundIndex, 1);
    saveNotes(notes);
  } else {
    console.log("there was not title like this");
  }
};

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return;
  }
};

module.exports = { addNote, removeNote, listNotes, readNote };
