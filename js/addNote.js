function addNote(noteId, noteContent) {
  //outer container
  let note = document.createElement("div");
  const noteTable = JSON.parse(localStorage.getItem("notes")) || [];

  if (noteId) {
    note.id = noteId;
  } else if (noteTable.length !== 0) {
    note.id = `note-${parseInt(noteTable[noteTable.length - 1].index) + 1}`;
  } else {
    note.id = "note-1";
  }

  //input
  let myInput = document.createElement("textarea");
  myInput.setAttribute("class", "text-light");
  myInput.style.height = "36px";
  myInput.style.overflow = "hidden";
  myInput.style.resize = "none";
  myInput.placeholder = "開始筆記吧";
  if (noteContent) {
    myInput.value = noteContent;
  }

  myInput.addEventListener("keydown", (e) => {
    const previousInput =
      e.target.parentNode.previousElementSibling?.querySelector("textarea");

    const nextInput =
      e.target.parentNode.nextElementSibling?.querySelector("textarea");

    const currentNote =
      e.target.parentNode.querySelector("textarea").parentNode;

    if (e.key === "Enter") {
      e.preventDefault();
      let newNote = addNote();
      currentNote.parentNode.insertBefore(newNote, currentNote.nextSibling);

      e.target.parentNode.nextElementSibling.querySelector("textarea").focus();

      const noteTable = JSON.parse(localStorage.getItem("notes"));
      const noteChilds = Array.from(noteBox.children);

      noteChilds.forEach((note, newIndex) => {
        const newIndexNote = noteTable.find(
          (noteData) => noteData.id == note.id
        );

        if (newIndexNote) {
          newIndexNote.index = newIndex + 1;
        }
      });

      noteTable.sort((a, b) => a.index - b.index);

      localStorage.setItem("notes", JSON.stringify(noteTable));
    }

    if (e.key === "Backspace") {
      if (e.target.value === "") {
        e.preventDefault();

        const noteTable = JSON.parse(localStorage.getItem("notes"));
        const updatedNotes = noteTable.filter(
          (noteData) => noteData.id !== e.target.closest("[id^='note']").id
        );
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        e.target.closest("[id^='note']").remove();

        previousInput ? previousInput?.focus() : nextInput?.focus();
      }
    }

    if (e.key === "ArrowUp") {
      e.target.parentNode.previousElementSibling
        ?.querySelector("textarea")
        .focus();
    }

    if (e.key === "ArrowDown") {
      e.target.parentNode.nextElementSibling?.querySelector("textarea").focus();
    }
  });

  myInput.addEventListener("input", (e) => {
    const noteTable = JSON.parse(localStorage.getItem("notes"));
    const updatedNotes = noteTable.find(
      (noteData) => noteData.id === e.target.closest("[id^='note']").id
    );
    if (updatedNotes) {
      updatedNotes.content = e.target.value;
    }
    localStorage.setItem("notes", JSON.stringify(noteTable));
  });

  //dragBtn
  let dragIcon = document.createElement("i");
  dragIcon.setAttribute("class", "bi bi-grip-vertical");

  let dragBtn = document.createElement("div");
  dragBtn.id = "dragBtn";
  dragBtn.setAttribute(
    "class",
    "d-flex align-items-center justify-content-center bg-transparent"
  );
  dragBtn.appendChild(dragIcon);

  //container
  note.setAttribute("class", "d-flex py-1");
  note.appendChild(dragBtn);
  note.appendChild(myInput);
  dragBtn.setAttribute("draggable", true);

  //drag and drop
  dragBtn.addEventListener("dragstart", (e) => {
    note.setAttribute("draggable", true);
    let index = Array.prototype.indexOf.call(
      e.target.closest("#noteBox").children,
      e.target.closest("[id^='note']")
    );
    e.dataTransfer.setData("text/plain", index);
  });

  note.addEventListener("drop", (e) => {
    e.preventDefault();
    e.target.closest("[id^='note']").classList.remove("dropZone");
    let oldIndex = e.dataTransfer.getData("text/plain");
    let dropped = e.target.closest("#noteBox").children[oldIndex];
    let target = e.target.closest("[id^='note']");
    let newIndex = Array.prototype.indexOf.call(
      e.target.closest("#noteBox").children,
      e.target.closest("[id^='note']")
    );
    dropped.removeAttribute("draggable");

    if (oldIndex > newIndex) {
      target.parentNode.insertBefore(dropped, target);
    } else {
      target.parentNode.insertBefore(dropped, target.nextSibling);
    }
    const noteTable = JSON.parse(localStorage.getItem("notes"));
    const noteChilds = Array.from(noteBox.children);

    noteChilds.forEach((note, newIndex) => {
      const newIndexNote = noteTable.find((noteData) => noteData.id == note.id);

      if (newIndexNote) {
        newIndexNote.index = newIndex + 1;
      }
    });

    noteTable.sort((a, b) => a.index - b.index);

    localStorage.setItem("notes", JSON.stringify(noteTable));
  });

  note.addEventListener("dragenter", (e) => {
    e.preventDefault();
    e.target.closest("[id^='note']").classList.add("dropZone");
  });

  note.addEventListener("dragleave", (e) => {
    e.preventDefault();
    e.target.closest("[id^='note']").classList.remove("dropZone");
  });

  note.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  let noteBox = document.getElementById("noteBox");
  noteBox.appendChild(note);

  if (!noteId && !noteContent) {
    const newNote = {
      id: note.id,
      content: "",
      index: parseInt(note.id.match(/\d+/g)),
    };
    noteTable.push(newNote);

    localStorage.setItem("notes", JSON.stringify(noteTable));
  }

  return note;
}

document.getElementById("addNoteBtn").addEventListener("click", () => {
  addNote();
});

export { addNote };
