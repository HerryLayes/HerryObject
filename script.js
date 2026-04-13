const app = document.getElementById("app");

// Проверка первого входа
if (!localStorage.getItem("accountCreated")) {
  showLogin();
} else {
  showHome();
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

  if (user && pass) {
    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);
    localStorage.setItem("accountCreated", "true");

    showHome();
  } else {
    alert("Fill all fields");
  }
}

// ВХОД
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  const savedUser = localStorage.getItem("username");
  const savedPass = localStorage.getItem("password");

  if (user === savedUser && pass === savedPass) {
    showHome();
  } else {
    alert("Wrong login");
  }
}

// HOME (пустая страница)
function showHome() {
  document.body.style.background = "white";
  app.innerHTML = "";
}
