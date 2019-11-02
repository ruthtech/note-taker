let fs = require("fs");

// Convenience class for accessing and storing data to and from the db.json file.


class DBAccess {
    constructor() {
        this.dbJSONFile = "./db/db.json"; // See comment in getNoteJSON for an explanation of this relative path.
        this.counter = null;
    }

    setJSONFileName( fileName ) {
        // This method is available only for the automated test. 
        // Do not call this method anywhere outside of the JEST test.
        this.dbJSONFile = fileName;
    }

    createNoteObject(title, text) {
        // This method is available only for the automated test.
        // Do not call this method anywhere outside of the JEST test. 
        return {
            title: title,
            text: text
        };
    }

    // Looking at the ids in use in the file, return an unused id
    getUniqueId() {
        if(this.counter == null) {
            // The counter hasn't been initalized for this session.
            // 
            // Retrieve the records from the file and find the largest id in use.
            // 
            // No matter whether a note is deleted or not,
            // if we always increase the id number by one 
            // we will not repeat the value (and thus the id).
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
        // Uncomment the two lines below to find out what directory this is in.
        // console.log(process.cwd());
        // return process.cwd();
        let rawData = fs.readFileSync(this.dbJSONFile);
        return JSON.parse(rawData);
    }

    // Take a note object, find it in the db.json file,
    // and delete it from that file.
    deleteNote(id) {
        let jsonData = this.getNotesJSON();
        let newJSONArray = [];
        let success = false;
        for(let i=0; i<jsonData.length; i++) {
            let note = jsonData[i];
            if(note.id == id) {
                const arrayStart = jsonData.slice(0,i);
                const arrayEnd = jsonData.slice(i+1,jsonData.length);
                newJSONArray = arrayStart.concat(arrayEnd);
                success = true;
                break;
            }
        }
        if(success) {
            // If it isn't successful, there's no changes to save.
            this.store(newJSONArray);
        }
        return success; // tells the server if we were able to find the record and delete it. 
    }

    addNote(newNote) {
        newNote.id = this.getUniqueId();
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

