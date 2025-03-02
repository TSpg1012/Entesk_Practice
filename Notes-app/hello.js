const fs = require("fs");
const validator = require("validator");

const notes = require("./notes");
// const notes = getNotes();

const yargs = require("yargs");

// console.log(validator.isURL("https://engnovatecom/ielts-reading-tests/"));

// import chalk from "chalk";

// console.log(chalk.green("Success"))

// console.log(process.argv);

// yargs.command({
//   command: "add",
//   describe: "Add new note",
//   handler: function () {
//     console.log("Adding a new note");
//   },
// });

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    body: {
      describe: "Adding a body",
      demandOption: true,
      type: "string",
    },
    title: {
      describe: "Adding a title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: {
      describe: "Removing a title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: "read",
  describe: "read a note",
  builder: {
    title: {
      describe: "Reading a note",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "list notes",
  handler() {
    notes.listNotes();
  },
});

// console.log(yargs.argv);
yargs.parse(); // print all yargs commands at once
