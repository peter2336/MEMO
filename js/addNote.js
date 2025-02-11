function addNote(noteId, noteContent) {
  //outer container
  const note = document.createElement("div");
  const noteTable = JSON.parse(localStorage.getItem("notes")) || [];

  if (noteId) {
    note.id = noteId; // 如果有提供 noteId，直接使用
  } else {
    const noteTable = JSON.parse(localStorage.getItem("notes")) || [];
    const newId =
      noteTable.length > 0
        ? Math.max(
            ...noteTable.map((note) => parseInt(note.id.split("-")[1]))
          ) + 1
        : 1;
    note.id = `note-${newId}`; // 使用新的唯一 ID
  }

  if (!noteId && !noteContent) {
    const newNote = {
      id: note.id,
      content: "",
      index: parseInt(note.id.match(/\d+/g)),
    };
    noteTable.push(newNote);

    localStorage.setItem("notes", JSON.stringify(noteTable));
  }

  //input
  const myInput = document.createElement("textarea");
  myInput.setAttribute("class", "text-light");
  myInput.style.minHeight = "36px";
  myInput.style.overflow = "hidden";
  myInput.style.resize = "none";
  myInput.style.boxSizing = "border-box";
  myInput.placeholder = "開始筆記吧";
  if (noteContent) {
    myInput.value = noteContent;
  }

  const hiddenDiv = document.createElement("div");
  hiddenDiv.id = "hiddenDiv";
  hiddenDiv.style.visibility = "hidden";
  hiddenDiv.style.position = "absolute";
  hiddenDiv.style.whiteSpace = "pre-wrap";
  hiddenDiv.style.overflowWrap = "anywhere";

  note.appendChild(hiddenDiv);

  const adjustHeight = (element) => {
    hiddenDiv.style.width = `${element.clientWidth}px`;
    hiddenDiv.textContent = element.value || element.placeholder;
    const lineHeight = 24; // 假設每行的高度是24px
    const numberOfLines = (element.value.match(/\n/g) || []).length + 1; // 獲取行數，+1 是為了計算最後一行

    const newHeight = Math.max(
      36,
      12 + numberOfLines * lineHeight,
      hiddenDiv.scrollHeight
    );
    element.style.height = `${newHeight}px`;
  };

  adjustHeight(myInput);

  myInput.addEventListener("keydown", (e) => {
    const cursorPosition = myInput.selectionStart;
    const currentValue = myInput.value;

    const previousInput =
      e.target.parentNode.previousElementSibling?.querySelector("textarea");

    const nextInput =
      e.target.parentNode.nextElementSibling?.querySelector("textarea");

    const currentNote =
      e.target.parentNode.querySelector("textarea").parentNode;

    if (e.key === "Enter") {
      e.preventDefault();

      if (cursorPosition === currentValue.length) {
        const newNote = addNote();

        currentNote.parentNode.insertBefore(newNote, currentNote.nextSibling);

        e.target.parentNode.nextElementSibling
          .querySelector("textarea")
          .focus();

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
      } else {
        e.target.value =
          currentValue.substring(0, cursorPosition) +
          "\n" +
          currentValue.substring(cursorPosition);
        e.target.selectionStart = e.target.selectionEnd = cursorPosition + 1;

        const noteTable = JSON.parse(localStorage.getItem("notes"));
        const updatedNotes = noteTable.find(
          (noteData) => noteData.id === e.target.closest("[id^='note']").id
        );
        if (updatedNotes) {
          updatedNotes.content = e.target.value;
        }
        localStorage.setItem("notes", JSON.stringify(noteTable));
      }
      adjustHeight(e.target);
    }

    if (e.key === "Backspace") {
      adjustHeight(e.target);
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
      if (cursorPosition === 0 && previousInput) {
        e.preventDefault();
        previousInput.focus();
        previousInput.selectionStart = previousInput.selectionEnd =
          previousInput.value.length; // 將光標放在末尾
      }
    }

    if (e.key === "ArrowDown") {
      if (cursorPosition === currentValue.length && nextInput) {
        e.preventDefault();
        nextInput.focus();
        nextInput.selectionStart = nextInput.selectionEnd = 0; // 將光標放在開頭
      }
    }
    adjustHeight(e.target);
  });

  myInput.addEventListener("input", (e) => {
    adjustHeight(e.target);

    const noteTable = JSON.parse(localStorage.getItem("notes"));
    const updatedNotes = noteTable.find(
      (noteData) => noteData.id === e.target.closest("[id^='note']").id
    );
    if (updatedNotes) {
      updatedNotes.content = e.target.value;
    }
    localStorage.setItem("notes", JSON.stringify(noteTable));
  });

  //deleteBtn
  const trashIcon = document.createElement("i");
  trashIcon.setAttribute("class", "bi bi-trash-fill");

  const deleteBtn = document.createElement("div");
  deleteBtn.id = "deleteBtn";
  deleteBtn.setAttribute(
    "class",
    "d-flex align-items-center justify-content-center bg-transparent"
  );
  deleteBtn.addEventListener("click", (e) => {
    const noteTable = JSON.parse(localStorage.getItem("notes"));
    const updatedNotes = noteTable.filter(
      (noteData) => noteData.id !== e.target.closest("[id^='note']").id
    );
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    note.remove();
  });
  deleteBtn.appendChild(trashIcon);

  //dragBtn
  const dragIcon = document.createElement("i");
  dragIcon.setAttribute("class", "bi bi-grip-vertical");

  const dragBtn = document.createElement("div");
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
  note.appendChild(deleteBtn);
  dragBtn.setAttribute("draggable", true);

  //drag and drop
  dragBtn.addEventListener("dragstart", (e) => {
    note.setAttribute("draggable", true);
    const index = Array.prototype.indexOf.call(
      e.target.closest("#noteBox").children,
      e.target.closest("[id^='note']")
    );
    e.dataTransfer.setData("text/plain", index);
  });

  note.addEventListener("drop", (e) => {
    e.preventDefault();
    e.target.closest("[id^='note']").classList.remove("dropZone");
    const oldIndex = e.dataTransfer.getData("text/plain");
    const dropped = e.target.closest("#noteBox").children[oldIndex];
    const target = e.target.closest("[id^='note']");
    const newIndex = Array.prototype.indexOf.call(
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

  const noteBox = document.getElementById("noteBox");
  noteBox.appendChild(note);

  window.addEventListener("load", () => {
    const allTextareas = document.querySelectorAll("textarea.text-light");
    allTextareas.forEach((element) => {
      hiddenDiv.style.width = `${element.clientWidth}px`;
      hiddenDiv.textContent = element.value || element.placeholder;
      const newHeight = hiddenDiv.scrollHeight;
      element.style.height = `${Math.max(36, newHeight)}px`;
    });
  });

  window.addEventListener("resize", () => {
    const allTextareas = document.querySelectorAll("textarea.text-light");
    allTextareas.forEach((element) => {
      hiddenDiv.style.width = `${element.clientWidth}px`;
      hiddenDiv.textContent = element.value || element.placeholder;
      const newHeight = hiddenDiv.scrollHeight;
      element.style.height = `${Math.max(36, newHeight)}px`;
    });
  });

  return note;
}

document.getElementById("addNoteBtn").addEventListener("click", () => {
  addNote();
});

export { addNote };
