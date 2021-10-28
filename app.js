const val = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');

const notes = require('./notes.js')

const log = console.log;
const success = chalk.bold.green;
const error = chalk.bold.red;

// console.log(val.isEmail("Justin.mirfield@gmail.com") ? success(true) : error(false));

// Yargs version
yargs.version('1.1.0');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.add(argv.title, argv.body)
    }
});

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove existing note',
    builder: {
        title: {
            describe: "Remove note by title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.remove(argv.title)
    }
});

// Create list command
yargs.command({
    command: 'list',
    describe: 'Lists all notes',
    handler() {
        notes.list()
    }
});

// Create read command
yargs.command({
    command: 'read',
    describe: 'Reads existing note',
    builder: {
        title: {
            describe: "Read note by title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.read(argv.title)
    }
});


// console.log(yargs.argv);
yargs.parse();