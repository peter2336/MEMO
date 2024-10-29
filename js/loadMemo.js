import { addMemo } from "./addMemo.js";

function loadMemo() {
  const memoTable = JSON.parse(localStorage.getItem("memos"));
  memoTable?.forEach((memoData) => {
    addMemo(memoData.id, memoData.content);
  });
}

loadMemo();
