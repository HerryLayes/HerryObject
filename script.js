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

  let publicGamesHTML = "";

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);

  if (key.startsWith("games_")) {
    const games = JSON.parse(localStorage.getItem(key));

    games.forEach(game => {
      if (game.status === "Public") {
        publicGamesHTML += `
          <div style="
            width:200px;
            cursor:pointer;
          " onclick="playPublicGame('${game.name}', '${key}')">

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

          </div>
        `;
      }
    });
  }
}

document.body.innerHTML = `
  <div id="userBtn" style="
    position: fixed;
    top: 15px;
    right: 25px;
    font-weight: bold;
    cursor: pointer;
  ">
    ${username}
  </div>

  <div style="
    padding:20px;
    display:flex;
    gap:20px;
    flex-wrap:wrap;
  ">
    ${publicGamesHTML}
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

    <input id="newUsername" type="text" value="${username}" class="input-field">
    <input id="newPassword" type="password" placeholder="New password" class="input-field">

    <button id="saveBtn" class="save-btn">
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

  let isProjectChanged = false;

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
          ${game.status === "Public"
  ? `<span style="color:#4caf50;">Public</span>`
  : game.status}
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
    ">

      <!-- MORE -->
<button id="moreBtn" style="
  position:absolute;
  top:15px;
  left:15px;
  padding:10px 16px;
  background:#2b2d31;
  border:none;
  border-radius:10px;
  color:#fff;
  font-weight:600;
  cursor:pointer;
  z-index:10;
">
  More
</button>

<!-- LEAVE -->
<button id="leaveBtn" style="
  position:absolute;
  top:15px;
  left:100px;
  padding:10px 16px;
  background:#2b2d31;
  border:none;
  border-radius:10px;
  color:#fff;
  font-weight:600;
  cursor:pointer;
  z-index:10;
">
  Leave
</button>

<div id="morePanel" style="
  position:absolute;
  top:60px;
  left:15px;
  width:220px;
  background:#2b2d31;
  border-radius:12px;
  padding:10px;
  display:none;
  z-index:10;
">

  <!-- крестик -->
  <div id="closeMore" style="
    position:absolute;
    top:8px;
    right:10px;
    cursor:pointer;
    color:#aaa;
  ">✕</div>

  <div style="margin-top:20px;">
    <div id="saveProjectBtn" style="
  padding:10px;
  border-radius:8px;
  cursor:pointer;
  background:#3a3d42;   /* чуть светлее панели */
  color:#ffffff;        /* белый текст */
  transition:0.2s;
">
  Save project
</div>

<div id="publishBtn" style="
  padding:10px;
  border-radius:8px;
  cursor:pointer;
  background:#3a3d42;
  color:#ffffff;
  margin-top:8px;
  transition:0.2s;
">
  Publish
</div>
</div>

</div>

<div id="topBar" style="
  position:absolute;
  top:15px;
  right:290px; /* ровно слева от explorer (260 + отступ) */
  display:flex;
  gap:10px;
  align-items:center;
  z-index:10;
">

  <!-- PLAY -->
  <button id="playBtn" style="
    padding:10px 16px;
    background:#1e1e1e;
    border:none;
    border-radius:10px;
    color:#fff;
    font-weight:600;
    cursor:pointer;
  ">
    ▶ Play
  </button>

  <!-- TOOLBAR -->
  <div id="toolbar" style="
    display:flex;
    gap:10px;
    background:#2b2d31;
    padding:8px 10px;
    border-radius:10px;
  ">
    <div class="tool-btn">Move</div>
    <div class="tool-btn">Rotate</div>
    <div class="tool-btn">Scale</div>
  </div>

</div>

      <!-- EXPLORER -->
      <div id="explorer" style="
        position:absolute;
        top:15px;
        right:15px;
        width:260px;
        height:400px;
        background:rgba(30,30,30,0.95);
        border-radius:12px;
        color:white;
        font-family:Arial;
        z-index:10;
        display:flex;
        flex-direction:column;
      ">

        <div style="
          padding:10px;
          font-weight:600;
          border-bottom:1px solid #444;
        ">
          Explorer
        </div>

        <div style="padding:10px; font-size:14px;">
          <div id="workspaceBtn" style="cursor:pointer; display:flex; gap:6px;">
            <span id="arrow">▶</span>
            <span>🌎 Workspace</span>
          </div>

          <div id="workspaceChildren" style="
            margin-left:18px;
            margin-top:5px;
            display:none;
          ">
            <div id="partItem" class="explorer-item">Part</div>
            <div id="spawnItem" class="explorer-item">Spawn</div>
          </div>
        </div>

      </div>

    </div>
  `;

  // ===== UI =====
  const leaveBtn = document.getElementById("leaveBtn");
  leaveBtn.onclick = () => {
    openProfilePage(localStorage.getItem("currentUser"));
  };

  const playBtn = document.getElementById("playBtn");

let isPlaying = false;
let player, playerVelocity = 0;

playBtn.onclick = () => {
  isPlaying = !isPlaying;

  const explorer = document.getElementById("explorer");
  const toolbar = document.getElementById("toolbar");
  const moreBtn = document.getElementById("moreBtn");
  const leaveBtn = document.getElementById("leaveBtn");

  if (isPlaying) {
    // === PLAY MODE ===
    playBtn.textContent = "⏹ Stop";

    // скрываем UI
    explorer.style.display = "none";
    toolbar.style.display = "none";
    moreBtn.style.display = "none";
    leaveBtn.style.display = "none";

    // перемещаем кнопку вправо
    playBtn.style.right = "15px";

    startPlayer();

  } else {
    // === STOP MODE ===
    playBtn.textContent = "▶ Play";

    explorer.style.display = "flex";
    toolbar.style.display = "flex";
    moreBtn.style.display = "block";
    leaveBtn.style.display = "block";

    playBtn.style.right = "290px";

    stopPlayer();
  }
};

  const saveBtn = document.getElementById("saveProjectBtn");

saveBtn.onclick = () => {

  if (!isProjectChanged) {
    saveBtn.textContent = "Save project ❌";
    return;
  }

  const publishBtn = document.getElementById("publishBtn");

  publishBtn.onclick = () => {

  const currentUser = localStorage.getItem("currentUser");
  let games = JSON.parse(localStorage.getItem("games_" + currentUser) || "[]");

  const index = games.findIndex(g => g.name === gameName);

  if (index !== -1) {

    // сохраняем позиции
    games[index].cubePosition = {
      x: cube.position.x,
      y: cube.position.y,
      z: cube.position.z
    };

    games[index].spawnPosition = {
      x: spawn.position.x,
      y: spawn.position.y,
      z: spawn.position.z
    };

    // делаем публичной
    games[index].status = "Public";
  }

  localStorage.setItem("games_" + currentUser, JSON.stringify(games));

  // 👉 переходим на главную
  openMainPage(currentUser);
};

publishBtn.onmouseenter = () => {
  publishBtn.style.background = "#4a4d52";
};

publishBtn.onmouseleave = () => {
  publishBtn.style.background = "#3a3d42";
};

  const currentUser = localStorage.getItem("currentUser");
  let games = JSON.parse(localStorage.getItem("games_" + currentUser) || "[]");

  const index = games.findIndex(g => g.name === gameName);

  if (index !== -1) {
    games[index].cubePosition = {
      x: cube.position.x,
      y: cube.position.y,
      z: cube.position.z
    };
  }

  localStorage.setItem("games_" + currentUser, JSON.stringify(games));

  saveBtn.textContent = "Save project ✅";
  isProjectChanged = false;

  if (index !== -1) {
  games[index].cubePosition = {
    x: cube.position.x,
    y: cube.position.y,
    z: cube.position.z
  };

  games[index].spawnPosition = {
    x: spawn.position.x,
    y: spawn.position.y,
    z: spawn.position.z
  };
}
};

saveBtn.onmouseenter = () => {
  saveBtn.style.background = "#4a4d52";
};

saveBtn.onmouseleave = () => {
  saveBtn.style.background = "#3a3d42";
};

  const moreBtn = document.getElementById("moreBtn");
const morePanel = document.getElementById("morePanel");
const closeMore = document.getElementById("closeMore");

moreBtn.onclick = () => {
  morePanel.style.display = "block";
};

closeMore.onclick = () => {
  morePanel.style.display = "none";
};

  const toolButtons = document.querySelectorAll(".tool-btn");

toolButtons.forEach(btn => {
  btn.onclick = () => {

    // снять активность со всех
    toolButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const text = btn.textContent;

    if (text === "Move") {
      currentTool = "move";
      controls.setMode("translate");
    }

    if (text === "Rotate") {
      currentTool = "rotate";
      controls.setMode("rotate");
    }

    if (text === "Scale") {
      currentTool = "scale";
      controls.setMode("scale");
    }

    updateControls();
  };
});

  // Explorer toggle
  const workspaceBtn = document.getElementById("workspaceBtn");
  const workspaceChildren = document.getElementById("workspaceChildren");
  const arrow = document.getElementById("arrow");

  let opened = false;

  workspaceBtn.onclick = () => {
    opened = !opened;
    workspaceChildren.style.display = opened ? "block" : "none";
    arrow.textContent = opened ? "▼" : "▶";
  };

  // ===== THREE.JS =====
  const scene = new THREE.Scene();
  const selectableObjects = [];
  scene.background = new THREE.Color(0x87ceeb);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, 2, 5);

  const renderer = new THREE.WebGLRenderer();

  const controls = new THREE.TransformControls(camera, renderer.domElement);
scene.add(controls);

  controls.setSpace("world");
  controls.setSize(1.2);
  controls.translationSnap = 0.5; // как grid snapping

  controls.addEventListener("objectChange", () => {
  isProjectChanged = true;
  saveBtn.textContent = "Save project";
});

// по умолчанию выключены
controls.visible = false;

  let currentTool = null; // "move" | "rotate" | "scale"
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("editorUI").appendChild(renderer.domElement);

  let isMouseDown = false;
  let yaw = 0;
  let pitch = 0;

  // ===== СВЕТ =====
  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  scene.add(light);

  // ===== ОБЪЕКТЫ =====

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0x4a6cff })
  );
  cube.position.y = 0.5;
scene.add(cube);
selectableObjects.push(cube);

cube.name = "Part";

const partItem = document.getElementById("partItem");

partItem.onclick = () => selectObject(cube);

const spawnItem = document.getElementById("spawnItem");

spawnItem.onclick = () => selectObject(spawn);

const currentUser = localStorage.getItem("currentUser");
const games = JSON.parse(localStorage.getItem("games_" + currentUser) || "[]");

const gameData = games.find(g => g.name === gameName);

if (gameData && gameData.cubePosition) {
  cube.position.set(
    gameData.cubePosition.x,
    gameData.cubePosition.y,
    gameData.cubePosition.z
  );
}

  if (gameData && gameData.spawnPosition) {
  spawn.position.set(
    gameData.spawnPosition.x,
    gameData.spawnPosition.y,
    gameData.spawnPosition.z
  );
}

  const textureLoader = new THREE.TextureLoader();
const spawnTexture = textureLoader.load("Spawn.jpg");

// обычный материал (бока)
const sideMaterial = new THREE.MeshStandardMaterial({
  color: 0xdddddd
});

// верхний материал (с картинкой)
const topMaterial = new THREE.MeshStandardMaterial({
  map: spawnTexture
});

// порядок: right, left, top, bottom, front, back
const materials = [
  sideMaterial,
  sideMaterial,
  topMaterial,    // 👈 ВЕРХ
  sideMaterial,
  sideMaterial,
  sideMaterial
];

const spawn = new THREE.Mesh(
  new THREE.BoxGeometry(3, 0.5, 3),
  materials
);

spawn.position.set(0, 0.5, -5);
spawn.name = "Spawn";

scene.add(spawn);
selectableObjects.push(spawn);
  
  // ===== ВЫДЕЛЕНИЕ =====
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

let outline = null;
let selectedObject = null;

    function updateControls() {
  if (selectedObject && currentTool === "move") {
    controls.attach(selectedObject);
    controls.visible = true;
  } else {
    controls.detach();
    controls.visible = false;
  }
}

function selectObject(object) {
  selectedObject = object;

  if (outline) scene.remove(outline);

  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  box.getSize(size);
  box.getCenter(center);

  const geometry = new THREE.BoxGeometry(
    size.x * 1.05,
    size.y * 1.05,
    size.z * 1.05
  );

  const material = new THREE.MeshBasicMaterial({
    color: 0x00aaff,
    wireframe: true
  });

  const outlineMesh = new THREE.Mesh(geometry, material);
  outlineMesh.position.copy(center);

  scene.add(outlineMesh);
  outline = outlineMesh;

  updateControls();
}

document.addEventListener("click", (event) => {
  const explorer = document.getElementById("explorer");

  if (!explorer.contains(event.target)) {
    if (outline) {
      scene.remove(outline);
      outline = null;
    }

    selectedObject = null;
    updateControls();
  }
});

  // ===== КАМЕРА =====
  let isRightMouseDown = false;

document.addEventListener("mousedown", (e) => {
  if (e.button === 2) { // ПКМ
    isRightMouseDown = true;
  }
});

document.addEventListener("mouseup", (e) => {
  if (e.button === 2) {
    isRightMouseDown = false;
  }
});

  document.addEventListener("mousemove", (e) => {

  // В редакторе — только ПКМ
  if (!isPlaying && !isRightMouseDown) return;

  // В игре — только если захвачен курсор (добавим ниже)
  if (isPlaying && !isPointerLocked) return;

  const sensitivity = 0.002;

  yaw -= e.movementX * sensitivity;
  pitch -= e.movementY * sensitivity;

  pitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, pitch));
});

  document.addEventListener("contextmenu", (e) => e.preventDefault());

  let isDragging = false;

controls.addEventListener("dragging-changed", (event) => {
  isDragging = event.value;
});

  let isPointerLocked = false;

  renderer.domElement.addEventListener("click", () => {
  if (isPlaying) {
    renderer.domElement.requestPointerLock();
  }
});

document.addEventListener("pointerlockchange", () => {
  isPointerLocked = document.pointerLockElement === renderer.domElement;
});

  // ===== ДВИЖЕНИЕ =====
  const keys = {};

  document.addEventListener("keydown", (e) => keys[e.code] = true);
  document.addEventListener("keyup", (e) => keys[e.code] = false);

  let velocityY = 0;
let isGrounded = true;

function move() {
  const speed = 0.1;

  if (isPlaying && player) {

    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(new THREE.Vector3(0,1,0), direction).normalize();

    if (keys["KeyW"]) player.position.addScaledVector(direction, speed);
    if (keys["KeyS"]) player.position.addScaledVector(direction, -speed);
    if (keys["KeyA"]) player.position.addScaledVector(right, speed);
    if (keys["KeyD"]) player.position.addScaledVector(right, -speed);

    // прыжок
    if (keys["Space"] && isGrounded) {
      velocityY = 0.2;
      isGrounded = false;
    }

    // гравитация
    velocityY -= 0.01;
    player.position.y += velocityY;

    if (player.position.y <= 1) {
      player.position.y = 1;
      velocityY = 0;
      isGrounded = true;
    }

    // камера за спиной
    const offset = new THREE.Vector3(0, 2, 4);
    offset.applyAxisAngle(new THREE.Vector3(0,1,0), yaw);

    camera.position.copy(player.position).add(offset);
    camera.lookAt(player.position);

  } else {
    // старое движение камеры
    const speed = 0.15;

    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    const right = new THREE.Vector3();
    right.crossVectors(camera.up, direction).normalize();

    if (keys["KeyW"]) camera.position.addScaledVector(direction, speed);
    if (keys["KeyS"]) camera.position.addScaledVector(direction, -speed);
    if (keys["KeyA"]) camera.position.addScaledVector(right, speed);
    if (keys["KeyD"]) camera.position.addScaledVector(right, -speed);
  }
}

  function startPlayer() {

  // тело
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 1.2),
    new THREE.MeshStandardMaterial({ color: 0x3366ff })
  );

  // голова
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.35),
    new THREE.MeshStandardMaterial({ color: 0x3366ff })
  );

  head.position.y = 0.9;

  player = new THREE.Group();
  player.add(body);
  player.add(head);

  // спавн (или по дефолту)
  if (spawn) {
  player.position.set(
    spawn.position.x,
    spawn.position.y + 1, // чуть выше, чтобы не провалился
    spawn.position.z
  );
} else {
  player.position.set(0, 1, 0);
}

  scene.add(player);
}

  function stopPlayer() {
  if (player) {
    scene.remove(player);
    player = null;
    document.exitPointerLock();
  }
}

  function playPublicGame(gameName, storageKey) {

  document.body.innerHTML = `
    <button id="leaveBtn" style="
      position:absolute;
      top:15px;
      right:15px;
      padding:10px 16px;
      background:#2b2d31;
      border:none;
      border-radius:10px;
      color:#fff;
      cursor:pointer;
      z-index:10;
    ">
      Leave
    </button>
  `;

  document.getElementById("leaveBtn").onclick = () => {
    openMainPage(localStorage.getItem("currentUser"));
  };

  // === THREE ===
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  scene.add(light);

  // загрузка данных
  const games = JSON.parse(localStorage.getItem(storageKey));
  const game = games.find(g => g.name === gameName);

  // куб
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0x4a6cff })
  );
  cube.position.set(
    game.cubePosition?.x || 0,
    game.cubePosition?.y || 0.5,
    game.cubePosition?.z || 0
  );
  scene.add(cube);

  // spawn
  const spawn = new THREE.Mesh(
    new THREE.BoxGeometry(3,0.5,3),
    new THREE.MeshStandardMaterial({ color: 0xdddddd })
  );
  spawn.position.set(
    game.spawnPosition?.x || 0,
    game.spawnPosition?.y || 0.5,
    game.spawnPosition?.z || -5
  );
  scene.add(spawn);

  // игрок
  let player = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.3,1),
    new THREE.MeshStandardMaterial({ color: 0x3366ff })
  );
  player.position.set(spawn.position.x, spawn.position.y+1, spawn.position.z);
  scene.add(player);

  const keys = {};
  document.addEventListener("keydown", e => keys[e.code]=true);
  document.addEventListener("keyup", e => keys[e.code]=false);

  let yaw = 0, pitch = 0;

  document.addEventListener("click", () => {
    renderer.domElement.requestPointerLock();
  });

  document.addEventListener("mousemove", (e) => {
    if (document.pointerLockElement !== renderer.domElement) return;

    yaw -= e.movementX * 0.002;
    pitch -= e.movementY * 0.002;
  });

  // ===== LOOP =====
  function animate() {
    requestAnimationFrame(animate);

    move();

    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;

    renderer.render(scene, camera);
  }

  animate();

  // ===== RESIZE =====
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

  }

window.openEditor = openEditor;

});
