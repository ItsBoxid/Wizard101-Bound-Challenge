
// =====================
// DATA
// =====================

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
// STATE (V3 CORE)
// =====================

const STATE = {
    mode: "MENU", // MENU | GAME | DRAFT
    profile: null
};

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
// BOOT
// =====================

window.onload = () => {
    renderMenu();
};

// =====================
// MENU
// =====================

function renderMenu() {

    STATE.mode = "MENU";

    const profiles = getProfiles();

    const app = document.getElementById("app");

    app.innerHTML = `
        <div style="padding:20px">
            <h1>Profiles</h1>
            <button id="create">Create</button>
            <div id="list"></div>
        </div>
    `;

    document.getElementById("create").onclick = () => {

        const name = prompt("Character Name");
        if (!name) return;

        const profiles = getProfiles();

        const newProfile = {
            name,
            currentWorld: "Wizard City",
            ownedCards: []
        };

        profiles.push(newProfile);
        saveProfiles(profiles);

        renderMenu();
    };

    const list = document.getElementById("list");

    profiles.forEach(p => {

        const btn = document.createElement("button");
        btn.textContent = p.name;

        btn.onclick = () => {
            STATE.profile = p;
            renderGame();
        };

        list.appendChild(btn);
    });
}

// =====================
// GAME LAYOUT
// =====================

function renderGame() {

    STATE.mode = "GAME";

    const p = STATE.profile;

    document.getElementById("app").innerHTML = `
        <div id="topbar">
            <div>${p.name}</div>
            <div>
                <button id="cardsBtn">Cards</button>
                <button id="indexBtn">Index</button>
                <button id="menuBtn">Menu</button>
            </div>
        </div>

        <div id="layout">
            <div id="worldPanel">
                <div id="worldList"></div>
                <div id="worldFooter">
                    <button id="completeBtn">Complete World</button>
                </div>
            </div>

            <div id="mainPanel"></div>
        </div>
    `;

    bindGameEvents();
    renderWorlds();
    renderCards();
}

// =====================
// WORLD
// =====================

function renderWorlds() {

    const list = document.getElementById("worldList");
    list.innerHTML = "";

    const index = worlds.indexOf(STATE.profile.currentWorld);

    worlds.forEach((w, i) => {

        const div = document.createElement("div");
        div.className = "worldItem";

        if (i === index) div.classList.add("current");

        div.textContent = w;
        list.appendChild(div);
    });
}

// =====================
// COMPLETE WORLD
// =====================

function completeWorld() {

    const p = STATE.profile;

    const idx = worlds.indexOf(p.currentWorld);

    if (idx < worlds.length - 1) {
        p.currentWorld = worlds[idx + 1];

        saveProfileUpdate(p);

        renderWorlds();
        showDraft();
    }
}

// =====================
// SAVE UPDATE
// =====================

function saveProfileUpdate(profile) {

    const profiles = getProfiles();

    const idx = profiles.findIndex(x => x.name === profile.name);

    profiles[idx] = profile;

    saveProfiles(profiles);
}

// =====================
// CARDS
// =====================

function renderCards() {

    const p = STATE.profile;

    const panel = document.getElementById("mainPanel");

    panel.innerHTML = `<h2>Cards</h2>`;

    const wrap = document.createElement("div");
    wrap.className = "cardContainer";

    (p.ownedCards || []).forEach(name => {

        const c = typeof cards !== "undefined"
            ? cards.find(x => x.name === name)
            : null;

        if (!c) return;

        wrap.appendChild(makeCard(c));
    });

    panel.appendChild(wrap);
}

// =====================
// INDEX
// =====================

function renderIndex() {

    const panel = document.getElementById("mainPanel");

    panel.innerHTML = `<h2>Index</h2>`;

    const wrap = document.createElement("div");
    wrap.className = "cardContainer";

    if (typeof cards !== "undefined") {
        cards.forEach(c => wrap.appendChild(makeCard(c)));
    }

    panel.appendChild(wrap);
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
        <div class="tree">${card.tree}</div>
    `;

    return div;
}

// =====================
// DRAFT SYSTEM
// =====================

function showDraft() {

    const overlay = document.createElement("div");
    overlay.id = "draftOverlay";

    overlay.innerHTML = `
        <div id="draftBox">
            <h2>Choose Reward</h2>
            <div id="draftCards"></div>
        </div>
    `;

    document.body.appendChild(overlay);

    const box = document.getElementById("draftCards");

    const pool = [...cards].sort(() => 0.5 - Math.random()).slice(0, 3);

    pool.forEach(c => {

        const el = makeCard(c);
        el.classList.add("draftCard");

        el.onclick = () => {

            STATE.profile.ownedCards.push(c.name);

            saveProfileUpdate(STATE.profile);

            overlay.remove();

            renderCards();
        };

        box.appendChild(el);
    });
}

// =====================
// EVENTS
// =====================

function bindGameEvents() {

    document.getElementById("menuBtn").onclick = renderMenu;

    document.getElementById("cardsBtn").onclick = renderCards;

    document.getElementById("indexBtn").onclick = renderIndex;

    document.getElementById("completeBtn").onclick = completeWorld;
}
