let fs = require("fs");

// Convenience class for accessing and storing data to and from the db.json file.


class DBAccess {
    constructor() {
        this.dbJSONFile = "./Develop/db/db.json"; // See comment in getNoteJSON for an explanation of this relative path.
        this.counter = null;
    }

    setJSONFileName( fileName ) {
        // This method is available only for the automated test. 
        // Do not call this method anywhere outside of the JEST test.
        this.dbJSONFile = fileName;
    }

    createNoteObject(title, text) {
        return {
            title: title,
            text: text,
            id: this.getUniqueId()
        };
    }

    // Looking at the ids in use in the file, return an unused id
    getUniqueId() {
        if(this.counter == null) {
            // counter hasn't been initalized yet this session.
            // Retrieve the records from the file and find the largest id in use.
            // Return that id, maxId, +1.
            // No matter whether a note is deleted or not,
            // if we always increase the id number by one 
            // we will not repeat the value (and thus the id);
            // If the user has more notes than the Number type
            // can hold, they'll likely crash the browser first. 
            let noteJSON = this.getNotesJSON();

            // The last position in the array will have the largest id
            // because we always append new notes to the end of the existing list/file.
            let lastNote = noteJSON[noteJSON.length-1];
            this.counter = ++lastNote.id;
        }
        return this.counter++;
    }

    // Read the db.json file and return all saved notes as JSON
    getNotesJSON() {
        // Not sure why but the current working directory isn't always what I think it is.
        // Uncomment the line below to find out what directory this is in.
        // console.log(process.cwd());
        let rawData = fs.readFileSync(this.dbJSONFile);
        return JSON.parse(rawData);
    }

    // Take a note object, find it in the db.json file,
    // and delete it from that file.
    deleteNote(id) {
        let jsonData = this.getNotesJSON();

        let newJSONArray = [];
        for(let i=0; i<jsonData.length; i++) {
            let note = jsonData[i];
            if(note.id == id) {
                const arrayStart = jsonData.slice(0,i);
                const arrayEnd = jsonData.slice(i+1,jsonData.length);
                newJSONArray = arrayStart.concat(arrayEnd);
                break;
            }
        }

        this.store(newJSONArray);
    }

    addNote(title, text) {
        let newNote = this.createNoteObject(title, text);
        let jsonArray = this.getNotesJSON();
        jsonArray.push(newNote);
        this.store(jsonArray);
        return newNote;
    }

    store(jsonArray) {
        fs.writeFileSync(this.dbJSONFile, JSON.stringify(jsonArray));
    }
}


module.exports = DBAccess;

