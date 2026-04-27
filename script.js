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
    
    <div id="userBtn" style="
      position: fixed;
      top: 15px;
      right: 25px;
      color: #1f1f1f;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
    ">
      ${username}
    </div>

  `;

  // переход в профиль
  document.getElementById("userBtn").onclick = () => {
    openProfilePage(username);
  };
}

  function openProfilePage(username) {

  document.body.innerHTML = `
    
    <div style="display:flex; height:100vh; font-family: Arial; position: relative;">

      <!-- КРЕСТИК -->
      <div id="closeProfile" style="
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 22px;
        cursor: pointer;
        color: #555;
      ">
        ✕
      </div>

      <!-- ЛЕВОЕ МЕНЮ -->
      <div style="
        width: 220px;
        background: #f3f3f3;
        padding: 20px;
        box-sizing: border-box;
      ">
        <h3>Settings</h3>

        <div id="myProfileBtn" style="
          margin-top: 20px;
          padding: 10px;
          background: #ddd;
          border-radius: 6px;
          cursor: pointer;
        ">My profile</div>

        <div style="
          margin-top: 10px;
          padding: 10px;
          background: #eee;
          border-radius: 6px;
          opacity: 0.6;
        ">Messages</div>

      </div>

      <!-- ПРАВАЯ ЧАСТЬ -->
      <div id="content" style="
        flex: 1;
        padding: 40px;
      ">
      </div>

    </div>
  `;

  loadProfileContent(username);

  // переключение вкладки
  document.getElementById("myProfileBtn").onclick = () => {
    loadProfileContent(username);
  };

  // ❌ ЗАКРЫТИЕ (ВОЗВРАТ НА ГЛАВНУЮ)
  document.getElementById("closeProfile").onclick = () => {
    openMainPage(localStorage.getItem("currentUser"));
  };
}

  function loadProfileContent(username) {

  document.getElementById("content").innerHTML = `
    
    <h2>My profile</h2>

    <label>Username</label>
    <input id="newUsername" type="text" value="${username}" style="
      display:block;
      margin:10px 0 20px;
      padding:10px;
      width:300px;
    ">

    <label>Password</label>
    <input id="newPassword" type="password" placeholder="New password" style="
      display:block;
      margin:10px 0 20px;
      padding:10px;
      width:300px;
    ">

    <button id="saveBtn" style="
      padding:12px 20px;
      background:#3d4ed7;
      color:white;
      border:none;
      border-radius:6px;
      cursor:pointer;
    ">
      Save
    </button>

    <p id="saveMsg" style="margin-top:10px;"></p>

  `;

  document.getElementById("saveBtn").onclick = () => {

    const newUsername = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();

    if (!newUsername || !newPassword) {
      document.getElementById("saveMsg").textContent = "Fill all fields";
      document.getElementById("saveMsg").style.color = "red";
      return;
    }

    // удаляем старый аккаунт
    localStorage.removeItem(username);

    // сохраняем новый
    localStorage.setItem(newUsername, newPassword);
    localStorage.setItem("currentUser", newUsername);

    document.getElementById("saveMsg").textContent = "Saved!";
    document.getElementById("saveMsg").style.color = "green";

    // обновляем имя
    username = newUsername;
  };
}

  // ===== ЭЛЕМЕНТЫ LOGIN =====
const loginModal = document.getElementById("loginModal");
const openLoginBtn = document.querySelector(".outline-btn");
const closeLogin = document.getElementById("closeLogin");

const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");

// ===== ОТКРЫТИЕ =====
openLoginBtn.onclick = () => {
  loginModal.classList.remove("hidden");
};

// ===== ЗАКРЫТИЕ =====
closeLogin.onclick = () => {
  loginModal.classList.add("hidden");
};

window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.classList.add("hidden");
  }
});

// ===== АКТИВАЦИЯ КНОПКИ =====
function checkLoginInputs() {
  if (loginUsername.value.trim() && loginPassword.value.trim()) {
    loginBtn.disabled = false;
    loginBtn.classList.remove("disabled");
  } else {
    loginBtn.disabled = true;
    loginBtn.classList.add("disabled");
  }
}

loginUsername.addEventListener("input", checkLoginInputs);
loginPassword.addEventListener("input", checkLoginInputs);

// ===== ВХОД =====
loginBtn.onclick = () => {
  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();

  const savedPassword = localStorage.getItem(username);

  if (!savedPassword) {
    loginError.textContent = "Account not found";
    loginError.classList.remove("hidden");
    return;
  }

  if (savedPassword !== password) {
    loginError.textContent = "Incorrect password";
    loginError.classList.remove("hidden");
    return;
  }

  // успех
  localStorage.setItem("currentUser", username);
  openMainPage(username);
};
});
