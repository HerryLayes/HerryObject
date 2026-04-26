const modal = document.getElementById("modal");
const openBtn = document.querySelector(".main-btn");
const closeBtn = document.getElementById("closeBtn");

// открыть
openBtn.onclick = () => {
  modal.classList.remove("hidden");
};

// закрыть
closeBtn.onclick = () => {
  modal.classList.add("hidden");
};

// закрытие по клику вне окна
window.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
};
