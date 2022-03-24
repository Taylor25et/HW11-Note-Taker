const fs = require("fs");
const util = require("util");
const uuid = require("uuid");


const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);
const 


class Notes {
  read() {
    return readAsync("db/db.json", "utf-8");
  }

  readNotes() {
    return this.read().then((notes) => {
      let allNotes;
      try {
        allNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        allNotes = [];
      }
      return allNotes;
    });
  }

  write(data) {
    return writeAsync("db/db.json", data);
  }

  writeNotes(data) {
    const { title, text, id } = data;
    const newNote = {
      title,
      text,
      id: uuid.v4,
    };

    return this.readNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedArray) => this.write(updatedArray));
  }

  deleteNote(id) {
    return this.readNotes().then(notes => notes.filter(note=> note.id !== id))
    .then(notes => this.write(notes))
    .then(() => this.read())
  }

}

module.exports = new Notes();


