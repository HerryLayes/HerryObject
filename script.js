function register() {
    let username = document.getElementById("regUsername").value;
    let password = document.getElementById("regPassword").value;

    if (username === "" || password === "") {
        alert("Заполни все поля!");
        return;
    }

    // Сохраняем данные
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    // Переход на страницу home
    window.location.href = "home.html";
}
