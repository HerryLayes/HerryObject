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

  document.body.style.background = "#e6e6e6";

  document.body.innerHTML = `
    
    <!-- ВЕРХНЯЯ ПАНЕЛЬ -->
    <div style="
      width: 100%;
      height: 60px;
      background: #1f1f1f;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 20px;
      box-sizing: border-box;
      position: fixed;
      top: 0;
      left: 0;
    ">
      
      <div style="
        background: #2b2b2b;
        padding: 10px 15px;
        border-radius: 6px;
        color: white;
        font-size: 14px;
      ">
        ${username}
      </div>

    </div>

    <!-- ПУСТАЯ ОБЛАСТЬ -->
    <div style="margin-top: 60px;"></div>

  `;
}
});
