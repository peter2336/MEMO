let idCounter = 0;

function addMemo() {
  idCounter++;

  //outer container
  let memo = document.createElement("div");
  memo.id = `memo-${idCounter}`;

  //input
  let myInput = document.createElement("input");
  myInput.setAttribute("class", "me-2 text-light");
  myInput.setAttribute("placeholder", "開始memo吧");
  myInput.setAttribute("readonly", true);

  //deleteBtn
  let trashIcon = document.createElement("i");
  trashIcon.setAttribute("class", "bi bi-trash-fill");

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
  let pencilIcon = document.createElement("i");
  pencilIcon.setAttribute("class", "bi bi-pencil-fill");

  let saveIcon = document.createElement("i");
  saveIcon.setAttribute("class", "bi bi-floppy-fill");

  let editBtn = document.createElement("div");
  editBtn.id = "editBtn";
  editBtn.setAttribute(
    "class",
    "d-flex align-items-center justify-content-center bg-transparent"
  );
  editBtn.appendChild(pencilIcon);
  editBtn.addEventListener("click", (e) => {
    if (myInput.hasAttribute("readonly")) {
      //e.target.closest("[id^='memo']").removeAttribute("draggable");
      myInput.removeAttribute("readonly");
      myInput.focus();
      editBtn.removeChild(pencilIcon);
      editBtn.appendChild(saveIcon);
    } else {
      myInput.setAttribute("readonly", true);
      //e.target.closest("[id^='memo']").setAttribute("draggable", "true");
      editBtn.removeChild(saveIcon);
      editBtn.appendChild(pencilIcon);
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
  memo.appendChild(editBtn);
  memo.appendChild(deleteBtn);
  memo.style.color = "white";
  dragBtn.setAttribute("draggable", true);

  //drag and drop
  dragBtn.addEventListener("dragstart", (e) => {
    memo.setAttribute("draggable", true);
    let index = Array.prototype.indexOf.call(
      e.target.closest("#memoBox").children,
      e.target.closest("[id^='memo']")
    );
    e.dataTransfer.setData("text/plain", index);
  });

  memo.addEventListener("drop", (e) => {
    e.preventDefault();
    e.target.closest("[id^='memo']").classList.remove("dropZone");
    let oldIndex = e.dataTransfer.getData("text/plain");
    let dropped = e.target.closest("#memoBox").children[oldIndex];
    let target = e.target.closest("[id^='memo']");
    let newIndex = Array.prototype.indexOf.call(
      e.target.closest("#memoBox").children,
      e.target.closest("[id^='memo']")
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
    e.target.closest("[id^='memo']").classList.add("dropZone");
  });

  memo.addEventListener("dragleave", (e) => {
    e.preventDefault();
    e.target.closest("[id^='memo']").classList.remove("dropZone");
  });

  memo.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  let memoBox = document.getElementById("memoBox");
  memoBox.appendChild(memo);
}

//search filter
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const memos = document.querySelectorAll("[id^=memo-]");
  memos.forEach((memo) => {
    const memoValue = memo.querySelector("input").value;
    if (!memoValue.includes(searchTerm)) {
      memo.classList.remove("d-flex");
      memo.classList.add("d-none");
    } else {
      memo.classList.remove("d-none");
      memo.classList.add("d-flex");
    }
  });
});
