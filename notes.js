const fs = require('fs')
const chalk = require('chalk')

const log = console.log;
const success = chalk.bold.green;
const error = chalk.bold.red;

const addNote = (title, body) => {
    const notes = loadNotes();
    if(checkDupes(notes, title)){
        notes.push({title: title, body: body})
        saveNotes(notes)
        log(success(`Added note -Title: ${title}-`))
    }else {
        log(error('Duplicate note found...'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const noteRemoved = notes.filter((note) =>  note.title !== title)
    if(noteRemoved.length !== notes.length){
        saveNotes(noteRemoved)
        log(success(`-Title: ${title}- removed...`))
    }else{
        log(error(`Could not find -Title: ${title}-`))
    }
}

const listNotes = () => {
    try {
        const notes = loadNotes()
        const titles = notes.map(note => note.title)
        log(titles)
    } catch(e){
        log([])
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find(note => note.title === title) || undefined
    if(noteToRead !== undefined)log(success(`-Title: ${noteToRead.title}-\n`+noteToRead.body))
    else{
        log(error('Could not find note to read...'))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        log(error('Could not find json file'))
        return []
    }
}

const checkDupes = (notes, title) => {
    const dupes = notes.find((note) => note.title === title) || []
    return dupes.length === 0;
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    add: addNote,
    remove: removeNote,
    list: listNotes,
    read: readNote
}