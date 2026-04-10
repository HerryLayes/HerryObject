let username = localStorage.getItem(username);

if (username) {
    document.getElementById(userName).textContent = username;
} else {
     если нет аккаунта — назад
    window.location.href = index.html;
}