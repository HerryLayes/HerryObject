const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const createBtn = document.getElementById("createBtn");
const errorText = document.getElementById("errorText");

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
createBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // если уже есть
  if (localStorage.getItem(username)) {
    errorText.textContent = "Account already exists";
    errorText.classList.remove("hidden");
    return;
  }

  // сохраняем
  localStorage.setItem(username, password);
  localStorage.setItem("currentUser", username);

  // переход на "главную"
  openMainPage(username);
});

// ===== ГЛАВНАЯ СТРАНИЦА =====
function openMainPage(username) {
  document.body.innerHTML = `
    <div style="
      background: white;
      height: 100vh;
      font-family: Arial;
      position: relative;
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
