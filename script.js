function showLogin() {
    document.getElementById("mainScreen").style.display = "none";
    document.getElementById("loginForm").style.display = "flex";
}

function showRegister() {
    document.getElementById("mainScreen").style.display = "none";
    document.getElementById("registerForm").style.display = "flex";
}

function register() {
    let username = document.getElementById("regUsername").value;
    let password = document.getElementById("regPassword").value;

    if (username === "" || password === "") {
        alert("Заполни все поля!");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    window.location.href = "home.html";
}
