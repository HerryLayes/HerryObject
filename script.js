document.addEventListener("DOMContentLoaded", () => {

  // ===== ЭЛЕМЕНТЫ =====
  const modal = document.getElementById("modal");
  const openBtn = document.getElementById("openModal");
  const closeBtn = document.getElementById("closeModal");

  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");
  const createBtn = document.getElementById("createBtn");
  const errorText = document.getElementById("errorText");

  // ===== ОТКРЫТИЕ =====
  openBtn.onclick = () => {
    modal.classList.remove("hidden");
  };

  // ===== ЗАКРЫТИЕ =====
  closeBtn.onclick = () => {
    modal.classList.add("hidden");
  };

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  };

  // ===== АКТИВАЦИЯ КНОПКИ =====
  function checkInputs() {
    if (usernameInput.value.trim() && passwordInput.value.trim()) {
      createBtn.disabled = false;
      createBtn.classList.remove("disabled");
    } else {
      createBtn.disabled = true;
      createBtn.classList.add("disabled");
    }
  }

  usernameInput.addEventListener("input", checkInputs);
  passwordInput.addEventListener("input", checkInputs);

  // ===== СОЗДАНИЕ АККАУНТА =====
  createBtn.onclick = () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (localStorage.getItem(username)) {
      errorText.textContent = "Account already exists";
      errorText.classList.remove("hidden");
      return;
    }

    localStorage.setItem(username, password);
    localStorage.setItem("currentUser", username);

    openMainPage(username);
  };

  // ===== ГЛАВНАЯ СТРАНИЦА =====
function openMainPage(username) {

  document.body.style.background = "white";

  document.body.innerHTML = `
    <div style="
      height: 100vh;
      font-family: Arial;
      position: relative;
      background: white;
    ">
      <div style="
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 18px;
      ">
        ${username}
      </div>

      <h1 style="text-align:center; margin-top: 200px;">
        Welcome to HerryObject
      </h1>
    </div>
  `;
}
});
