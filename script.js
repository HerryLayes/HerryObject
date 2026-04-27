const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");

// открыть окно
openBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// закрыть по крестику
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// закрыть по клику вне окна
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
