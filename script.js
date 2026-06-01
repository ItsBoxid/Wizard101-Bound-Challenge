const worlds = [
    "Wizard City",
    "Krokotopia",
    "Marleybone",
    "Mooshu",
    "Dragonspyre",
    "Celestia",
    "Zafaria",
    "Avalon",
    "Azteca",
    "Khrysalis"
];

let currentProfile = null;

// =====================
// STORAGE
// =====================

function getProfiles() {
    return JSON.parse(localStorage.getItem("profiles")) || [];
}

function saveProfiles(p) {
    localStorage.setItem("profiles", JSON.stringify(p));
}

// =====================
// INIT
// =====================

function init() {

    const profiles = getProfiles();

    if (profiles.length === 0) {
        showCreateScreen();
        return;
    }

    showProfileSelect(profiles);
}

window.onload = init;

// =====================
// PROFILE MENU
// =====================

function showProfileSelect(profiles) {

    document.body.innerHTML = `
        <div style="padding:20px">
            <h1>Select Profile</h1>
            <button id="createBtn">Create Profile</button>
            <div id="list"></div>
        </div>
    `;

    const list = document.getElementById("list");

    profiles.forEach(p => {

        const btn = document.createElement("button");
        btn.textContent = p.name;
        btn.style.display = "block";
        btn.style.margin = "10px 0";

        btn.onclick = () => startGame(p);

        list.appendChild(btn);
    });

    document.getElementById("createBtn").onclick = () => {

        const name = prompt("Character Name:");
        if (!name) return;

        const profiles = getProfiles();

        const newProfile = {
            name,
            currentWorld: "Wizard City",
            ownedCards: []
        };

        profiles.push(newProfile);
        saveProfiles(profiles);

        startGame(newProfile);
    };
}

// =====================
// START GAME
// =====================

function startGame(profile) {

    currentProfile = profile;

    document.body.innerHTML = `
    <div id="app">

        <div id="topbar">
            <div>
                <div id="charName"></div>
            </div>

            <div>
                <button id="cardsBtn">Cards</button>
                <button id="indexBtn">Index</button>
                <button id="menuBtn">Menu</button>
            </div>
        </div>

        <div id="layout">

            <div id="worldPanel">
                <div class="worldList"></div>
                <button id="completeWorldBtn">Complete World</button>
            </div>

            <div id="mainPanel"></div>

        </div>

    </div>
    `;

    document.getElementById("charName").textContent = profile.name;

    setupButtons();
    renderWorlds();
    renderCards();
}

// =====================
// WORLDS
// =====================

function renderWorlds() {

    const list = document.querySelector(".worldList");
    list.innerHTML = "";

    const idx = worlds.indexOf(currentProfile.currentWorld);

    worlds.forEach((w, i) => {

        const div = document.createElement("div");
        div.className = "worldItem";

        if (i === idx) div.classList.add("current");

        div.textContent = w;
        list.appendChild(div);
    });

    setTimeout(() => {

        const items = document.querySelectorAll(".worldItem");
        const target = items[idx];

        if (!target) return;

        target.scrollIntoView({
            block: "center"
        });

    }, 50);
}

// =====================
// WORLD COMPLETE
// =====================

function completeWorld() {

    const profiles = getProfiles();
    const idx = profiles.findIndex(p => p.name === currentProfile.name);

    const worldIndex = worlds.indexOf(currentProfile.currentWorld);

    if (worldIndex < worlds.length - 1) {
        profiles[idx].currentWorld = worlds[worldIndex + 1];
        saveProfiles(profiles);
        currentProfile = profiles[idx];
        renderWorlds();
    }
}

// =====================
// CARDS SAFE LOOKUP
// =====================

function findCard(name) {
    if (typeof cards === "undefined") return null;
    return cards.find(c => c.name === name) || null;
}

// =====================
// TREE COLOR
// =====================

function getTreeColor(tree) {

    switch(tree) {
        case "Offense": return "#ff4d4d";
        case "Defense": return "#4da6ff";
        case "Control": return "#4dff88";
        case "Gear": return "#ffd24d";
        case "Mastery": return "#c266ff";
        default: return "white";
    }
}

// =====================
// CARD UI
// =====================

function makeCard(card) {

    const div = document.createElement("div");
    div.className = "card";

    if (card.rarity === "Rare") div.classList.add("rare");
    if (card.rarity === "Legendary") div.classList.add("legendary");

    div.innerHTML = `
        <h3>${card.name}</h3>
        <p>${card.effect}</p>
        <div class="tree" style="color:${getTreeColor(card.tree)}">
            ${card.tree}
        </div>
    `;

    return div;
}

// =====================
// CARDS
// =====================

function renderCards() {

    const panel = document.getElementById("mainPanel");
    panel.innerHTML = "";

    const container = document.createElement("div");
    container.className = "cardContainer";

    currentProfile.ownedCards.forEach(name => {

        const card = findCard(name);
        if (!card) return;

        container.appendChild(makeCard(card));
    });

    panel.appendChild(container);
}

// =====================
// INDEX
// =====================

function renderIndex() {

    const panel = document.getElementById("mainPanel");
    panel.innerHTML = "";

    const container = document.createElement("div");
    container.className = "cardContainer";

    cards.forEach(c => container.appendChild(makeCard(c)));

    panel.appendChild(container);
}

// =====================
// BUTTONS
// =====================

function setupButtons() {

    document.getElementById("cardsBtn").onclick = () => renderCards();

    document.getElementById("indexBtn").onclick = () => renderIndex();

    document.getElementById("menuBtn").onclick = () => location.reload();

    document.getElementById("completeWorldBtn").onclick = () => completeWorld();
}
