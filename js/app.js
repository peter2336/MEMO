let idCounter = 0;

function addMemo() {
  idCounter++;

  let memo = document.createElement("div");
  memo.id = `memo-${idCounter}`;

  let myInput = document.createElement("input");
  myInput.setAttribute("class", "me-2 text-light");
  myInput.setAttribute("placeholder", "開始memo吧");
  myInput.setAttribute("readonly", true);

  let trashIcon = document.createElement("i");
  trashIcon.setAttribute("class", "bi bi-trash-fill");

  let pencilIcon = document.createElement("i");
  pencilIcon.setAttribute("class", "bi bi-pencil-fill");

  let saveIcon = document.createElement("i");
  saveIcon.setAttribute("class", "bi bi-floppy-fill");

  let dragIcon = document.createElement("i");
  dragIcon.setAttribute("class", "bi bi-grip-vertical");

  //deleteBtn
  let deleteBtn = document.createElement("div");
  deleteBtn.id = "deleteBtn";
  deleteBtn.setAttribute(
    "class",
    "d-flex align-items-center justify-content-center bg-transparent"
  );
  deleteBtn.addEventListener("click", () => {
    memo.remove();
  });
  deleteBtn.appendChild(trashIcon);

  //editBtn
  let editBtn = document.createElement("div");
  editBtn.id = "editBtn";
  editBtn.setAttribute(
    "class",
    "d-flex align-items-center justify-content-center bg-transparent"
  );
  editBtn.appendChild(pencilIcon);
  editBtn.addEventListener("click", () => {
    if (myInput.hasAttribute("readonly")) {
      myInput.removeAttribute("readonly");
      myInput.focus();
      editBtn.removeChild(pencilIcon);
      editBtn.appendChild(saveIcon);
    } else {
      myInput.setAttribute("readonly", true);
      editBtn.removeChild(saveIcon);
      editBtn.appendChild(pencilIcon);
    }
  });

  //dragBtn
  let dragBtn = document.createElement("div");
  dragBtn.id = "dragBtn";
  dragBtn.setAttribute(
    "class",
    "d-flex align-items-center justify-content-center bg-transparent"
  );
  dragBtn.appendChild(dragIcon);

  //container
  memo.setAttribute("class", "d-flex mb-2");
  memo.appendChild(dragBtn);
  memo.appendChild(myInput);
  memo.appendChild(editBtn);
  memo.appendChild(deleteBtn);
  memo.style.color = "white";
  memo.setAttribute("draggable", true);
  dragBtn.addEventListener("dragstart", (ev) => {
    console.log("dragstart");
  });
  dragBtn.addEventListener("dragover", (ev) => {
    console.log(ev.dataTransfer.getData("text"));
  });
  dragBtn.addEventListener("drop", (ev) => {
    console.log("drop");
  });
  dragBtn.addEventListener("dragend", (ev) => {
    console.log("dragend");
  });

  let memoBox = document.getElementById("memoBox");
  memoBox.appendChild(memo);
}
