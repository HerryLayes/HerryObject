window.onload = () => {

    const createBtn = document.querySelector(".create-btn");
    const loginBtn = document.querySelector(".login-btn");

    const registerModal =
    document.querySelector(".register-modal");

    const loginModal =
    document.querySelector(".login-modal");

    const closeRegister =
    document.querySelector(".close-register");

    const closeLogin =
    document.querySelector(".close-login");

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

    /* АККАУНТЫ */

    let accounts =
    JSON.parse(localStorage.getItem("accounts")) || [];

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
            "Только английские буквы, цифры и _";

            return;
        }

        /* ПРОВЕРКА ПАРОЛЯ */

        if(password.length < 5){

            passwordError.textContent =
            "Минимум 5 символов";

            return;
        }

        /* ЕСТЬ ЛИ АККАУНТ */

        const existing =
        accounts.find(acc => acc.username === username);

        if(existing){

            usernameError.textContent =
            "Аккаунт уже существует";

            return;
        }

        /* СОЗДАНИЕ */

        accounts.push({
            username,
            password
        });

        localStorage.setItem(
            "accounts",
            JSON.stringify(accounts)
        );

        alert("Аккаунт создан!");

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

        alert("Вход выполнен!");

        loginModal.style.display = "none";
    }

}
