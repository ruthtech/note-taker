const DBAccess = require("../lib/DBAccess");

const testJSONFileName = "./test/test.json";

test("Can read the existing notes", () => {
  const dbAccess = new DBAccess();
  dbAccess.setJSONFileName(testJSONFileName); // tell this test to use the test.json file

  // The test JSON file starts with one note data: Test Title, Test text
  const notesJSON = dbAccess.getNotesJSON();
  const isLengthCorrect = (notesJSON.length == 1);
  const isCorrectNote = (notesJSON[0].id == 0);
  expect(isLengthCorrect).toBe(true);
  expect(isCorrectNote).toBe(true);
});

test("Can add a note", () => {
    const dbAccess = new DBAccess();
    dbAccess.setJSONFileName(testJSONFileName); // tell this test to use the test.json file
    const newNote = dbAccess.createNoteObject("This is a test.", "This is only a test. Do not pass Go. Do not collect $200.");
    dbAccess.addNote(newNote);
    const notesJSON = dbAccess.getNotesJSON();
    const isLengthCorrect = (notesJSON.length == 2);
    const isCorrectNote = (notesJSON[1].id == 1);
    expect(isLengthCorrect).toBe(true);
    expect(isCorrectNote).toBe(true);
});

test("Can add another note", () => {
    const dbAccess = new DBAccess();
    dbAccess.setJSONFileName(testJSONFileName); // tell this test to use the test.json file
    const newNote = dbAccess.createNoteObject("Yet another title test", "Yet another note");
    dbAccess.addNote(newNote);
    const notesJSON = dbAccess.getNotesJSON();
    const isLengthCorrect = (notesJSON.length == 3);
    const isCorrectNote = (notesJSON[2].id == 2);
    expect(isLengthCorrect).toBe(true);
    expect(isCorrectNote).toBe(true);
  });

test("Can delete the first new note", () => {
    const dbAccess = new DBAccess();
    dbAccess.setJSONFileName(testJSONFileName); // tell this test to use the test.json file
    const success = dbAccess.deleteNote(1);
    const notesJSON = dbAccess.getNotesJSON();
    const isLengthCorrect = (notesJSON.length == 2);
    const isCorrectNote = (notesJSON[1].id == 2);
    expect(success).toBe(true); // was record deleted
    expect(isLengthCorrect).toBe(true);
    expect(isCorrectNote).toBe(true);
});

test("We see an error message when asked to delete a note that doesn't exist", () => {
    const dbAccess = new DBAccess();
    dbAccess.setJSONFileName(testJSONFileName); // tell this test to use the test.json file
    const success = dbAccess.deleteNote(-1);
    const notesJSON = dbAccess.getNotesJSON();
    const isLengthCorrect = (notesJSON.length == 2);
    const isCorrectNote = (notesJSON[1].id == 2);
    expect(isLengthCorrect).toBe(true);
    expect(isCorrectNote).toBe(true);
    expect(success).toBe(false); // Can't delete a record that doesn't exist
});

test("Can delete the second new note (resets the test JSON file back to what it was initially)", () => {
    const dbAccess = new DBAccess();
    dbAccess.setJSONFileName(testJSONFileName); // tell this test to use the test.json file
    dbAccess.deleteNote(2);
    const notesJSON = dbAccess.getNotesJSON();
    const isLengthCorrect = (notesJSON.length == 1);
    const isCorrectNote = (notesJSON[0].id == 0);
    expect(isLengthCorrect).toBe(true);
    expect(isCorrectNote).toBe(true);
});
  



