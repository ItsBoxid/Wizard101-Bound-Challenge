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

// =====================
// STATE
// =====================

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
// INIT (ENTRY POINT)
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
// PROFILE MENU SCREEN
// =====================

function showProfileSelect(profiles) {

    document.body.innerHTML = `
        <div style="padding:20px; color:white; font-family:Arial;">
            <h1>Select Profile</h1>
            <button id="createBtn">Create New Profile</button>
            <div id="list"></div>
        </div>
    `;

    const list = document.getElementById("list");

    profiles.forEach((p, index) => {

        const btn = document.createElement("button");
        btn.textContent = p.name;
        btn.style.display = "block";
        btn.style.margin = "10px 0";

        btn.onclick = () => {
            startGame(p);
        };

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
            <div id="charName"></div>

            <div>
                <button id="cardIndexBtn">Cards</button>
                <button id="settingsBtn">Settings</button>
            </div>
        </div>

        <div id="layout">
            <div id="worldPanel"></div>
            <div id="mainPanel"></div>
        </div>

    </div>
    `;

    document.getElementById("charName").textContent = profile.name;

    renderWorlds();
    renderCards();
    setupButtons();
}

// =====================
// WORLD PANEL
// =====================

function renderWorlds() {

    const panel = document.getElementById("worldPanel");
    panel.innerHTML = "";

    const currentIndex =
        worlds.indexOf(currentProfile.currentWorld);

    worlds.forEach((w, i) => {

        const div = document.createElement("div");
        div.className = "worldItem";

        if (i === currentIndex) {
            div.classList.add("current");
        }

        div.textContent = w;
        panel.appendChild(div);
    });

    setTimeout(() => {

        const items =
            document.querySelectorAll(".worldItem");

        const target = items[currentIndex];
        if (!target) return;

        target.scrollIntoView({
            block:
                currentIndex > worlds.length - 3
                    ? "end"
                    : "center"
        });

    }, 50);
}

// =====================
// SAFE CARD LOOKUP
// =====================

function findCard(name) {

    if (typeof cards === "undefined") return null;

    return cards.find(c => c.name === name) || null;
}

// =====================
// CAPACITY
// =====================

function getCapacity(profile) {

    let blades = 0;
    let shields = 0;
    let traps = 0;
    let heals = 0;
    let weaknesses = 0;
    let feints = 0;

    profile.ownedCards.forEach(name => {

        const c = findCard(name);
        if (!c) return;

        if (c.name.includes("Blade")) blades++;
        if (c.name.includes("Shield")) shields++;
        if (c.name.includes("Trap")) traps++;
        if (c.name.includes("Heal")) heals++;
        if (c.name.includes("Weakness")) weaknesses++;
        if (c.name.includes("Feint")) feints++;
    });

    return { blades, shields, traps, heals, weaknesses, feints };
}

// =====================
// CARDS
// =====================

function makeCard(card) {

    const div = document.createElement("div");
    div.className = "card";

    if (card.rarity === "Rare") div.classList.add("rare");
    if (card.rarity === "Legendary") div.classList.add("legendary");

    div.innerHTML = `
        <h3>${card.name}</h3>
        <p>${card.effect}</p>
        <div class="tree">${card.tree}</div>
    `;

    return div;
}

// =====================
// MAIN VIEW
// =====================

function renderCards() {

    const panel = document.getElementById("mainPanel");
    panel.innerHTML = "";

    const cap = getCapacity(currentProfile);

    const header = document.createElement("div");
    header.innerHTML = `
        <h2>Capacity</h2>
        <p>Blades: ${cap.blades}</p>
        <p>Shields: ${cap.shields}</p>
        <p>Traps: ${cap.traps}</p>
        <p>Heals: ${cap.heals}</p>
        <p>Weaknesses: ${cap.weaknesses}</p>
        <p>Feints: ${cap.feints}</p>
        <hr>
        <h2>Owned Cards</h2>
    `;

    panel.appendChild(header);

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
// BUTTONS
// =====================

function setupButtons() {

    document.getElementById("cardIndexBtn").onclick = () => {

        const panel = document.getElementById("mainPanel");

        if (typeof cards === "undefined") {
            panel.innerHTML = "<p>Cards not loaded</p>";
            return;
        }

        panel.innerHTML = "<h2>Card Index</h2>";

        const container = document.createElement("div");
        container.className = "cardContainer";

        cards.forEach(c => {
            container.appendChild(makeCard(c));
        });

        panel.appendChild(container);
    };

    document.getElementById("settingsBtn").onclick = () => {
        alert("Settings coming soon");
    };
}
