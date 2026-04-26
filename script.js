// ===== АВТОРИЗАЦИЯ =====
function register() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (!user || !pass) return alert("Заполни поля");

  localStorage.setItem(user, pass);
  alert("Аккаунт создан!");
}

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (localStorage.getItem(user) === pass) {
    localStorage.setItem("currentUser", user);
    showPlatform();
  } else {
    alert("Неверные данные");
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

function showPlatform() {
  document.getElementById("auth").classList.add("hidden");
  document.getElementById("platform").classList.remove("hidden");

  const user = localStorage.getItem("currentUser");
  document.getElementById("userDisplay").innerText = "Привет, " + user;
}

// ===== 3D ИГРА =====
function startGame() {
  document.getElementById("platform").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("game").appendChild(renderer.domElement);

  // Куб (персонаж)
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
