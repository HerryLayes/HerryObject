const app = document.getElementById("app");

// список пользователей
let users = JSON.parse(localStorage.getItem("users")) || [];

// авто вход
if (localStorage.getItem("loggedIn")) {
  showHome();
} else {
  showLogin();
}

// LOGIN
function showLogin() {
  app.innerHTML = `
    <div class="center-box">
      <h2>Login to HerryObject</h2>
      <input type="text" placeholder="Username" autocomplete="off" id="username">
      <input type="password" placeholder="Password" autocomplete="off" id="password">
      <button onclick="login()">Login</button>
      <span class="link" onclick="showSignup()">Don't have an account? Sign Up</span>
    </div>
  `;
}

// SIGN UP
function showSignup() {
  app.innerHTML = `
    <div class="center-box">
      <h2>Sign Up to HerryObject</h2>
      <input type="text" placeholder="Username" autocomplete="off" id="newUser">
      <input type="password" placeholder="Password" autocomplete="off" id="newPass">
      <button onclick="signup()">Sign Up</button>
      <span class="link" onclick="showLogin()">Log In</span>
    </div>
  `;
}

// РЕГИСТРАЦИЯ
function signup() {
  const user = document.getElementById("newUser").value;
  const pass = document.getElementById("newPass").value;

  if (!user || !pass) {
    alert("Fill all fields");
    return;
  }

  // проверка на существующий ник
  if (users.find(u => u.username === user)) {
    alert("Username already exists");
    return;
  }

  users.push({ username: user, password: pass });
  localStorage.setItem("users", JSON.stringify(users));

  localStorage.setItem("currentUser", user);
  localStorage.setItem("loggedIn", "true");

  showHome();
}

// ВХОД
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  const found = users.find(u => u.username === user && u.password === pass);

  if (found) {
    localStorage.setItem("currentUser", user);
    localStorage.setItem("loggedIn", "true");
    showHome();
  } else {
    alert("Wrong login");
  }
}

// HOME
function showHome() {
  document.body.style.background = "white";

  const user = localStorage.getItem("currentUser");

  app.innerHTML = `
    <div class="top-bar" onclick="showProfile()">${user}</div>
  `;
}

// ПРОФИЛЬ
function showProfile() {
  document.body.style.background = "white";

  const user = localStorage.getItem("currentUser");

  app.innerHTML = `
    <div class="profile-header">My profile</div>
    <img src="settings.jpg" class="settings-btn" onclick="toggleSettings()">

    <div id="settingsPanel" class="settings-panel">
      <h3>Settings</h3>

      <div style="height:100px;"></div> <!-- место под скин -->

      <input type="text" id="newName" placeholder="New username">

      <button onclick="changeName()">Change Name</button>

      <button class="logout-btn" onclick="logout()">Log out</button>
    </div>
  `;
}

// открыть настройки
function toggleSettings() {
  const panel = document.getElementById("settingsPanel");
  panel.classList.toggle("active");
}

// смена ника
function changeName() {
  const newName = document.getElementById("newName").value;
  const current = localStorage.getItem("currentUser");

  if (!newName) return;

  if (users.find(u => u.username === newName)) {
    alert("Name already taken");
    return;
  }

  const userObj = users.find(u => u.username === current);
  userObj.username = newName;

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", newName);

  showHome();
}

// выход
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");
  showLogin();
}
