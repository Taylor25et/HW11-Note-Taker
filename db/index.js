const fs = require("fs");
const util = require("util");
// const uuid = require("uuid");

// Hover over promisify for extra notes and review day
const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);
// const deleteAsync = util.promisify(fs.deleteFile);

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
    const { title, text } = data;
    const newNote = {
      title,
      text,
    };

    return this.readNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedArray) => this.write(updatedArray));
  }

  // delete(data) {
  //   return deleteAsync("db/db.json", data);
  // }

  // deleteAsync

}

module.exports = new Notes();

//think about how to read the db.json file.
//think about how to write a new note in the db.json file
//think about making these asyncronous
//think about using a class object
//make sure whatever you build is exported.
//look into promisify from the default package utils
