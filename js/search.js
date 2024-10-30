const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const memos = document.querySelectorAll("[id^=memo-]");
  const notes = document.querySelectorAll("[id^=note-]");

  memos.forEach((memo) => {
    const memoValue = memo.querySelector("input").value.toLowerCase();
    if (!memoValue.includes(searchTerm)) {
      memo.classList.remove("d-flex");
      memo.classList.add("d-none");
    } else {
      memo.classList.remove("d-none");
      memo.classList.add("d-flex");
    }
  });

  notes.forEach((note) => {
    const noteValue = note.querySelector("textarea").value.toLowerCase();
    if (!noteValue.includes(searchTerm)) {
      note.classList.remove("d-flex");
      note.classList.add("d-none");
    } else {
      note.classList.remove("d-none");
      note.classList.add("d-flex");
    }
  });
});
