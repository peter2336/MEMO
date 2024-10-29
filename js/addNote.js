let idCounter = 0;

function addNote() {
  idCounter++;

  //outer container
  let memo = document.createElement("div");
  memo.id = `note-${idCounter}`;

  //input
  let myInput = document.createElement("input");
  myInput.setAttribute("class", "text-light");

  myInput.addEventListener("keydown", (e) => {
    console.log(e.target.nextSibling);
    if (e.key === "Enter") {
      addNote();
    }

    if (e.key === "Backspace" && e.target.value === "") {
      e.target.closest("[id^='note']").remove();
    }
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
  memo.setAttribute("class", "d-flex py-1");
  memo.appendChild(dragBtn);
  memo.appendChild(myInput);
  dragBtn.setAttribute("draggable", true);

  //drag and drop
  dragBtn.addEventListener("dragstart", (e) => {
    memo.setAttribute("draggable", true);
    let index = Array.prototype.indexOf.call(
      e.target.closest("#noteBox").children,
      e.target.closest("[id^='note']")
    );
    e.dataTransfer.setData("text/plain", index);
  });

  memo.addEventListener("drop", (e) => {
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
  });

  memo.addEventListener("dragenter", (e) => {
    e.preventDefault();
    e.target.closest("[id^='note']").classList.add("dropZone");
  });

  memo.addEventListener("dragleave", (e) => {
    e.preventDefault();
    e.target.closest("[id^='note']").classList.remove("dropZone");
  });

  memo.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  let noteBox = document.getElementById("noteBox");
  noteBox.appendChild(memo);
}

addNote();
