import { addMemo } from "./addMemo.js";

function loadMemo() {
  const memos = JSON.parse(localStorage.getItem("memos"));
  const memoBox = document.getElementById("memoBox");
  memos?.forEach((memoData) => {
    addMemo(memoData.id, memoData.content);
  });
}

loadMemo();
