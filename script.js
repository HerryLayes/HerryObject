const createBtn = document.querySelector(".create-btn");
const loginBtn = document.querySelector(".login-btn");

const registerModal = document.querySelector(".register-modal");
const loginModal = document.querySelector(".login-modal");

const closeRegister = document.querySelector(".close-register");
const closeLogin = document.querySelector(".close-login");

/* ОТКРЫТЬ */

createBtn.onclick = () => {
    registerModal.style.display = "flex";
}

loginBtn.onclick = () => {
    loginModal.style.display = "flex";
}

/* ЗАКРЫТЬ */

closeRegister.onclick = () => {
    registerModal.style.display = "none";
}

closeLogin.onclick = () => {
    loginModal.style.display = "none";
}

/* БАЗА АККАУНТОВ */

let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

/* РЕГИСТРАЦИЯ */

document.getElementById("register-submit").onclick = () => {

    const username =
    document.getElementById("register-username").value;

    const password =
    document.getElementById("register-password").value;

    const usernameError =
    document.getElementById("username-error");

    const passwordError =
    document.getElementById("password-error");

    usernameError.textContent = "";
    passwordError.textContent = "";

    /* ПРОВЕРКА НИКА */

    const usernameRegex = /^[A-Za-z0-9_]+$/;

    if(!usernameRegex.test(username)){

        usernameError.textContent =
        "Ошибка!";

        return;
    }

    /* ПРОВЕРКА ПАРОЛЯ */

    if(password.length < 5){

        passwordError.textContent =
        "Пароль должен содержать минимум 5 символов";

        return;
    }

    /* ПРОВЕРКА АККАУНТА */

    const existing =
    accounts.find(acc => acc.username === username);

    if(existing){

        usernameError.textContent =
        "Такой аккаунт уже существует";

        return;
    }

    /* СОЗДАНИЕ */

    accounts.push({
        username: username,
        password: password
    });

    localStorage.setItem(
        "accounts",
        JSON.stringify(accounts)
    );

    registerModal.style.display = "none";
}

/* ВХОД */

document.getElementById("login-submit").onclick = () => {

    const username =
    document.getElementById("login-username").value;

    const password =
    document.getElementById("login-password").value;

    const loginError =
    document.getElementById("login-error");

    loginError.textContent = "";

    const account =
    accounts.find(acc =>
        acc.username === username &&
        acc.password === password
    );

    if(!account){

        loginError.textContent =
        "Аккаунт не найден";

        return;
    }

    loginModal.style.display = "none";
}
