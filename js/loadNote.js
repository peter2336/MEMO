import { addNote } from "./addNote.js";

function loadNote() {
  const noteTable = JSON.parse(localStorage.getItem("notes"));
  noteTable?.forEach((noteData) => {
    addNote(noteData.id, noteData.content);
  });
}

loadNote();
