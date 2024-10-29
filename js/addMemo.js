function addMemo(memoId, memoContent) {
  //outer container
  const memo = document.createElement("div");
  const memoTable = JSON.parse(localStorage.getItem("memos")) || [];

  if (memoId) {
    memo.id = memoId;
  } else if (memoTable.length !== 0) {
    console.log(memoTable.length);
    memo.id = `memo-${
      parseInt(memoTable[memoTable.length - 1].id.match(/\d+/g)) + 1
    }`;
  } else {
    memo.id = "memo-1";
  }

  //input
  let myInput = document.createElement("input");
  myInput.setAttribute("class", "me-2 text-light");
  myInput.setAttribute("placeholder", "開始memo吧");
  myInput.setAttribute("readonly", true);
  if (memoContent) {
    myInput.value = memoContent;
  }

  //deleteBtn
  let trashIcon = document.createElement("i");
  trashIcon.setAttribute("class", "bi bi-trash-fill");

  let deleteBtn = document.createElement("div");
  deleteBtn.id = "deleteBtn";
  deleteBtn.setAttribute(
    "class",
    "d-flex align-items-center justify-content-center bg-transparent"
  );
  deleteBtn.addEventListener("click", (e) => {
    const memoTable = JSON.parse(localStorage.getItem("memos"));
    const updatedMemos = memoTable.filter(
      (memoData) => memoData.id !== e.target.closest("[id^='memo']").id
    );
    localStorage.setItem("memos", JSON.stringify(updatedMemos));

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
      myInput.removeAttribute("readonly");
      myInput.focus();
      editBtn.removeChild(pencilIcon);
      editBtn.appendChild(saveIcon);
    } else {
      const memoTable = JSON.parse(localStorage.getItem("memos"));
      const updatedMemos = memoTable.find(
        (memoData) => memoData.id === e.target.closest("[id^='memo']").id
      );
      if (updatedMemos) {
        updatedMemos.content = e.target
          .closest("[id^='memo']")
          .querySelector("input").value;
      }
      localStorage.setItem("memos", JSON.stringify(memoTable));

      myInput.setAttribute("readonly", true);
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

  if (!memoId && !memoContent) {
    console.log(memoTable.length);
    const newMemo = {
      id: memo.id,
      content: "",
      index: parseInt(memo.id.match(/\d+/g)),
    };
    memoTable.push(newMemo);

    localStorage.setItem("memos", JSON.stringify(memoTable));
  }
}

document.getElementById("addMemoBtn").addEventListener("click", () => {
  addMemo();
});

export { addMemo };
