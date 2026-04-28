document.addEventListener("DOMContentLoaded", () => {

  // ===== ЭЛЕМЕНТЫ =====
  const modal = document.getElementById("modal");
  const openBtn = document.getElementById("openModal");
  const closeBtn = document.getElementById("closeModal");

  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");
  const createBtn = document.getElementById("createBtn");
  const errorText = document.getElementById("errorText");

  // ===== ОТКРЫТИЕ =====
  openBtn.onclick = () => {
    modal.classList.remove("hidden");
  };

  // ===== ЗАКРЫТИЕ =====
  closeBtn.onclick = () => {
    modal.classList.add("hidden");
  };

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  };

  // ===== АКТИВАЦИЯ КНОПКИ =====
  function checkInputs() {
    if (usernameInput.value.trim() && passwordInput.value.trim()) {
      createBtn.disabled = false;
      createBtn.classList.remove("disabled");
    } else {
      createBtn.disabled = true;
      createBtn.classList.add("disabled");
    }
  }

  usernameInput.addEventListener("input", checkInputs);
  passwordInput.addEventListener("input", checkInputs);

  // ===== СОЗДАНИЕ АККАУНТА =====
  createBtn.onclick = () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (localStorage.getItem(username)) {
      errorText.textContent = "Account already exists";
      errorText.classList.remove("hidden");
      return;
    }

    localStorage.setItem(username, password);
    localStorage.setItem("currentUser", username);

    openMainPage(username);
  };

  // ===== ГЛАВНАЯ СТРАНИЦА =====
function openMainPage(username) {

  document.body.style.background = "#e6e6e6";

  document.body.innerHTML = `
    
    <div id="userBtn" style="
      position: fixed;
      top: 15px;
      right: 25px;
      color: #1f1f1f;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
    ">
      ${username}
    </div>

  `;

  // переход в профиль
  document.getElementById("userBtn").onclick = () => {
    openProfilePage(username);
  };
}

  function openProfilePage(username) {

  document.body.innerHTML = `
    
    <div style="display:flex; height:100vh; font-family: Arial; position: relative;">

      <!-- КРЕСТИК -->
      <div id="closeProfile" style="
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 22px;
        cursor: pointer;
        color: #555;
      ">
        ✕
      </div>

      <!-- ЛЕВОЕ МЕНЮ -->
<div style="
  width: 220px;
  background: #f3f3f3;
  padding: 20px;
  box-sizing: border-box;
">
  <h3>Settings</h3>

  <div id="myProfileBtn" class="tab active">My profile</div>
  <div id="myGamesBtn" class="tab">My games</div>
  <div class="tab" style="opacity:0.6;">Messages</div>

</div>

      <!-- ПРАВАЯ ЧАСТЬ -->
      <div id="content" style="
        flex: 1;
        padding: 40px;
      ">
      </div>

    </div>
  `;

  loadProfileContent(username);

  document.getElementById("myProfileBtn").onclick = () => {
  setActiveTab("myProfileBtn");
  loadProfileContent(username);
};

document.getElementById("myGamesBtn").onclick = () => {
  setActiveTab("myGamesBtn");
  loadGamesContent();
};

  // ❌ ЗАКРЫТИЕ (ВОЗВРАТ НА ГЛАВНУЮ)
  document.getElementById("closeProfile").onclick = () => {
    openMainPage(localStorage.getItem("currentUser"));
  };
}

  function loadProfileContent(username) {

  document.getElementById("content").innerHTML = `
    
    <h2>My profile</h2>

    <label>Username</label>
    <input id="newUsername" type="text" value="${username}" style="
      display:block;
      margin:10px 0 20px;
      padding:10px;
      width:300px;
    ">

    <label>Password</label>
    <input id="newPassword" type="password" placeholder="New password" style="
      display:block;
      margin:10px 0 20px;
      padding:10px;
      width:300px;
    ">

    <button id="saveBtn" style="
      padding:12px 20px;
      background:#3d4ed7;
      color:white;
      border:none;
      border-radius:6px;
      cursor:pointer;
    ">
      Save
    </button>

    <p id="saveMsg" style="margin-top:10px;"></p>

  `;

  document.getElementById("saveBtn").onclick = () => {

    const newUsername = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();

    if (!newUsername || !newPassword) {
      document.getElementById("saveMsg").textContent = "Fill all fields";
      document.getElementById("saveMsg").style.color = "red";
      return;
    }

    // удаляем старый аккаунт
    localStorage.removeItem(username);

    // сохраняем новый
    localStorage.setItem(newUsername, newPassword);
    localStorage.setItem("currentUser", newUsername);

    document.getElementById("saveMsg").textContent = "Saved!";
    document.getElementById("saveMsg").style.color = "green";

    // обновляем имя
    username = newUsername;
  };
}

  // ===== ЭЛЕМЕНТЫ LOGIN =====
const loginModal = document.getElementById("loginModal");
const openLoginBtn = document.querySelector(".outline-btn");
const closeLogin = document.getElementById("closeLogin");

const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");

// ===== ОТКРЫТИЕ =====
openLoginBtn.onclick = () => {
  loginModal.classList.remove("hidden");
};

// ===== ЗАКРЫТИЕ =====
closeLogin.onclick = () => {
  loginModal.classList.add("hidden");
};

window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.classList.add("hidden");
  }
});

// ===== АКТИВАЦИЯ КНОПКИ =====
function checkLoginInputs() {
  if (loginUsername.value.trim() && loginPassword.value.trim()) {
    loginBtn.disabled = false;
    loginBtn.classList.remove("disabled");
  } else {
    loginBtn.disabled = true;
    loginBtn.classList.add("disabled");
  }
}

  function loadGamesContent() {
  const currentUser = localStorage.getItem("currentUser");
  const games = JSON.parse(localStorage.getItem("games_" + currentUser) || "[]");

  let gamesHTML = `
    <h2 style="margin-bottom:20px;">My games</h2>

    <div style="
      display:flex;
      gap:20px;
      flex-wrap:wrap;
    ">
  `;

  // КНОПКА СОЗДАНИЯ
  gamesHTML += `
    <div id="createGameCard" style="
      width: 200px;
      height: 240px;
      background: #f0f0f0;
      border-radius: 16px;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      cursor:pointer;
      transition:0.2s;
    ">
      <div style="font-size:50px; color:#7b4cff;">+</div>
      <div style="margin-top:10px; color:#7b4cff; font-weight:500;">
        Create your game
      </div>
    </div>
  `;

  // ВСЕ ИГРЫ
  games.forEach(game => {
    gamesHTML += `
      <div style="
  width:200px;
  cursor:pointer;
" onclick="openEditor('${game.name}')">
        
        <div style="
          width:200px;
          height:200px;
          background:url('${game.image}') center/cover;
          border-radius:16px;
        "></div>

        <div style="
          margin-top:8px;
          font-weight:600;
          color:#1f1f1f;
        ">
          ${game.name}
        </div>

        <div style="
          color:#888;
          font-size:13px;
        ">
          ${game.status}
        </div>

      </div>
    `;
  });

  gamesHTML += `</div>`;

  document.getElementById("content").innerHTML = gamesHTML;

  // обработчик
  document.getElementById("createGameCard").onclick = openCreateGameModal;
}

  function openCreateGameModal() {

  const gameModal = document.createElement("div");
  gameModal.className = "modal";

  gameModal.innerHTML = `
    <div style="
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background:rgba(0,0,0,0.7);
      display:flex;
      justify-content:center;
      align-items:center;
    " id="gameModal">

      <div style="
        width:400px;
        background:linear-gradient(180deg,#2a2d3a,#1c1f2b);
        border-radius:16px;
        padding:20px;
        color:white;
        position:relative;
      ">

        <div id="closeGameModal" style="
          position:absolute;
          top:10px;
          right:15px;
          cursor:pointer;
          font-size:20px;
        ">✕</div>

        <h2 style="text-align:center;">Game settings</h2>

        <label>Name *</label>
        <input id="gameName" type="text" style="
          width:100%;
          padding:12px;
          margin:10px 0;
          border-radius:8px;
          border:none;
          background:#0f1117;
          color:white;
        ">

        <label>Description</label>
        <textarea id="gameDesc" style="
          width:100%;
          padding:12px;
          margin:10px 0;
          border-radius:8px;
          border:none;
          background:#0f1117;
          color:white;
          resize:none;
          height:80px;
        "></textarea>

        <button id="createGameBtn" style="
          width:100%;
          padding:12px;
          background:#3d4ed7;
          border:none;
          border-radius:8px;
          color:white;
          cursor:pointer;
        ">
          Create
        </button>

        <p id="gameError" style="color:#ff4d4d; margin-top:10px;"></p>

      </div>
    </div>
  `;

  document.body.appendChild(gameModal);

  // закрытие
  document.getElementById("closeGameModal").onclick = () => {
    gameModal.remove();
  };

  // клик вне окна
  document.getElementById("gameModal").onclick = (e) => {
    if (e.target.id === "gameModal") gameModal.remove();
  };

  // создание игры
  document.getElementById("createGameBtn").onclick = () => {

    const name = document.getElementById("gameName").value.trim();
    const desc = document.getElementById("gameDesc").value.trim();

    if (!name) {
      document.getElementById("gameError").textContent = "Game name is required";
      return;
    }

    const currentUser = localStorage.getItem("currentUser");
const games = JSON.parse(localStorage.getItem("games_" + currentUser) || "[]");

games.push({
  name,
  desc,
  image: "gamepicture.jpg",
  status: "Private"
});

localStorage.setItem("games_" + currentUser, JSON.stringify(games));

    gameModal.remove();
    loadGamesContent();
  };
}

  function setActiveTab(activeId) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });

  document.getElementById(activeId).classList.add("active");
}

loginUsername.addEventListener("input", checkLoginInputs);
loginPassword.addEventListener("input", checkLoginInputs);

// ===== ВХОД =====
loginBtn.onclick = () => {
  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();

  const savedPassword = localStorage.getItem(username);

  if (!savedPassword) {
    loginError.textContent = "Account not found";
    loginError.classList.remove("hidden");
    return;
  }

  if (savedPassword !== password) {
    loginError.textContent = "Incorrect password";
    loginError.classList.remove("hidden");
    return;
  }

  // успех
  localStorage.setItem("currentUser", username);
  openMainPage(username);
};

  function openEditor(gameName) {

  document.body.innerHTML = `
    <div id="editorUI" style="
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      overflow:hidden;
    "></div>
  `;

  // ===== THREE.JS =====
  const scene = new THREE.Scene();

  // НЕБО
  scene.background = new THREE.Color(0x87ceeb);

// КАМЕРА
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

  // ПРАВИЛЬНАЯ ПОЗИЦИЯ
camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);

  // РЕНДЕР
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("editorUI").appendChild(renderer.domElement);

  // СВЕТ
  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  scene.add(light);

  // ЗЕМЛЯ
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x228B22 })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // КУБ (для теста)
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0x4a6cff })
  );
  cube.position.y = 0.5;
  scene.add(cube);

let isMouseDown = false;
let yaw = 0;
let pitch = 0;

document.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

document.addEventListener("mousemove", (e) => {
  if (!isMouseDown) return;

  const sensitivity = 0.002;

  yaw -= e.movementX * sensitivity;
  pitch -= e.movementY * sensitivity;

  // ограничение вверх/вниз
  pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

  camera.rotation.set(pitch, yaw, 0);
});

  // ДВИЖЕНИЕ
  const keys = {};

  document.addEventListener("keydown", (e) => keys[e.code] = true);
  document.addEventListener("keyup", (e) => keys[e.code] = false);

  function move() {
  const speed = 0.1;

  const direction = new THREE.Vector3();

  if (keys["KeyW"]) direction.z -= 1;
  if (keys["KeyS"]) direction.z += 1;
  if (keys["KeyA"]) direction.x -= 1;
  if (keys["KeyD"]) direction.x += 1;

  direction.normalize();

  // движение относительно камеры
  const moveVector = direction.applyEuler(camera.rotation);

  camera.position.addScaledVector(moveVector, speed);
}

  // ===== LOOP =====
  function animate() {
    requestAnimationFrame(animate);

    move();
    renderer.render(scene, camera);
  }

  animate();

  // РЕСАЙЗ
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
  window.openEditor = openEditor;
});
