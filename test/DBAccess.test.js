const DBAccess = require("../lib/DBAccess");

const testJSONFileName = "./test/test.json";

test("Can read the existing notes", () => {
  let dbAccess = new DBAccess();
  dbAccess.setJSONFileName(testJSONFileName); // tell this test to use the test.json file

  // The test JSON file starts with one note data: Test Title, Test text
  let notesJSON = dbAccess.getNotesJSON();
  let isLengthCorrect = (notesJSON.length == 1);
  let isCorrectNote = (notesJSON[0].id == 0);
  expect(isLengthCorrect).toBe(true);
  expect(isCorrectNote).toBe(true);
});

test("Can add a note", () => {
    let dbAccess = new DBAccess();
    dbAccess.setJSONFileName(testJSONFileName); // tell this test to use the test.json file
    dbAccess.addNote("This is a test.", "This is only a test. Do not pass Go. Do not collect $200.");
    let notesJSON = dbAccess.getNotesJSON();
    let isLengthCorrect = (notesJSON.length == 2);
    let isCorrectNote = (notesJSON[1].id == 1);
    expect(isLengthCorrect).toBe(true);
    expect(isCorrectNote).toBe(true);
});

test("Can add another note", () => {
    let dbAccess = new DBAccess();
    dbAccess.setJSONFileName(testJSONFileName); // tell this test to use the test.json file
    dbAccess.addNote("Yet another title test", "Yet another note");
    let notesJSON = dbAccess.getNotesJSON();
    let isLengthCorrect = (notesJSON.length == 3);
    let isCorrectNote = (notesJSON[2].id == 2);
    expect(isLengthCorrect).toBe(true);
    expect(isCorrectNote).toBe(true);
  });

test("Can delete the first new note", () => {
    let dbAccess = new DBAccess();
    dbAccess.setJSONFileName(testJSONFileName); // tell this test to use the test.json file
    dbAccess.deleteNote(1);
    let notesJSON = dbAccess.getNotesJSON();
    let isLengthCorrect = (notesJSON.length == 2);
    let isCorrectNote = (notesJSON[1].id == 2);
    expect(isLengthCorrect).toBe(true);
    expect(isCorrectNote).toBe(true);
});

test("Can delete the second new note (resets the test JSON file back to what it was initially)", () => {
    let dbAccess = new DBAccess();
    dbAccess.setJSONFileName(testJSONFileName); // tell this test to use the test.json file
    dbAccess.deleteNote(2);
    let notesJSON = dbAccess.getNotesJSON();
    let isLengthCorrect = (notesJSON.length == 1);
    let isCorrectNote = (notesJSON[0].id == 0);
    expect(isLengthCorrect).toBe(true);
    expect(isCorrectNote).toBe(true);
});
  



