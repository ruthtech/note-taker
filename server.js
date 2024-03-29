// Dependencies
// =============================================================
let express = require("express");
let path = require("path");
let DBAccess = require("./lib/dbaccess");

// Sets up the Express App
// =============================================================
let app = express();
let PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let dbAccess = new DBAccess();

// View the home page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Show the notes
app.get("/notes", function(req, res) {
   res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Read the db.json file and return all saved notes as JSON
app.get("/api/notes", function(req, res) {
    try {
        res.status(200);
        res.json(dbAccess.getNotesJSON());
    }
    catch(err) {
        // Internal error on the server side.
        res.status(500);
        res.json(err);
    }
    return res;
});

// Should recieve a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique `id` 
// when it's saved. In order to delete a note, you'll need to read all 
// notes from the `db.json` file, remove the note with the given `id` 
// property, and then rewrite the notes to the `db.json` file.
app.delete("/api/notes/:id", function(req, res) {
    try {
        const success = dbAccess.deleteNote(req.params.id);

        if(success) {
            res.status(204); // HTML 204 request succeeded
        } else {
            res.status(404); // HTML status 404 not found
        }
        res.json(dbAccess.getNotesJSON());
    }
    catch(err) {
        // Internal error on the server side.
        res.status(500);
        res.json(err);
    }
    return res;
});

// Receive a new note to save on the request body, add it to
// the db.json file, and then return the new note to the client.
app.post("/api/notes", function(req, res) {
    try {
        res.status(201); // HTML status 201 creation successful
        res.json(dbAccess.addNote(req.body));
    }
    catch(err) {
        // Internal error on the server side.
        res.status(500);
        res.json(err);
    }
    return res; 
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});


