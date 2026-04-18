let isLogin = true;
let currentUser = null;

// Переключение режимов
function switchMode() {
  isLogin = !isLogin;

  document.getElementById("authTitle").innerText = isLogin ? "Вход" : "Создание аккаунта";
  document.getElementById("mainBtn").innerText = isLogin ? "Войти" : "Создать";
  document.querySelector(".link").innerText = isLogin ? "Создать аккаунт" : "Уже есть аккаунт?";
  document.getElementById("error").innerText = "";
}

// Вход / регистрация
function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (isLogin) {
    if (!users[username] || users[username] !== password) {
      document.getElementById("error").innerText = "Аккаунт не найден";
      return;
    }
  } else {
    if (users[username]) {
      document.getElementById("error").innerText = "Ник уже занят";
      return;
    }
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
  }

  currentUser = username;
  openMain();
}

// Главная
function openMain() {
  document.getElementById("authPage").classList.add("hidden");
  document.getElementById("mainPage").classList.remove("hidden");
  document.getElementById("userDisplay").innerText = currentUser;
}

// Настройки
function openSettings() {
  document.getElementById("mainPage").classList.add("hidden");
  document.getElementById("settingsPage").classList.remove("hidden");
}

// Сохранение
function saveSettings() {
  let newName = document.getElementById("newUsername").value;
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (!newName) return;

  users[newName] = users[currentUser];
  delete users[currentUser];

  localStorage.setItem("users", JSON.stringify(users));

  currentUser = newName;
  openMain();
}

// Выход
function logout() {
  currentUser = null;

  document.getElementById("settingsPage").classList.add("hidden");
  document.getElementById("authPage").classList.remove("hidden");
}
