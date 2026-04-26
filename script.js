// ===== КНОПКИ =====
document.getElementById("registerBtn").onclick = register;
document.getElementById("loginBtn").onclick = login;

// ===== АВТОРИЗАЦИЯ =====
function register() {
  const user = username.value.trim();
  const pass = password.value.trim();

  if (!user || !pass) {
    alert("Заполни все поля");
    return;
  }

  if (localStorage.getItem(user)) {
    alert("Пользователь уже существует");
    return;
  }

  localStorage.setItem(user, pass);
  alert("Регистрация успешна!");
}

function login() {
  const user = username.value.trim();
  const pass = password.value.trim();

  if (localStorage.getItem(user) === pass) {
    localStorage.setItem("currentUser", user);
    showPlatform();
  } else {
    alert("Неверный логин или пароль");
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

function showPlatform() {
  auth.classList.add("hidden");
  platform.classList.remove("hidden");

  userDisplay.innerText = "Привет, " + localStorage.getItem("currentUser");
}

// ===== ИГРА =====
function startGame() {
  platform.classList.add("hidden");
  game.classList.remove("hidden");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  game.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
}

// ===== АВТО ВХОД =====
window.onload = () => {
  if (localStorage.getItem("currentUser")) {
    showPlatform();
  }
};
