const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const memos = document.querySelectorAll("[id^=memo-]");
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
});
