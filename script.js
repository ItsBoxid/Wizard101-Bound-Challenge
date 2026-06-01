// =====================
// WORLD DATA
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
// STATE
// =====================

const STATE = {
    mode: "MENU",
    profile: null,
    computed: null
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

// Deep clone to prevent reference bugs
function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// =====================
// BOOT
// =====================

window.onload = () => {
    renderMenu();
};

// =====================
// PROFILE HELPERS
// =====================

function saveProfile(profile) {
    const profiles = getProfiles();
    const idx = profiles.findIndex(p => p.name === profile.name);
    profiles[idx] = profile;
    saveProfiles(profiles);
}

// =====================
// COMPUTED STATS ENGINE
// =====================

function computeProfile(profile) {

    const stats = {
        bladeCapacity: 0,
        shieldCapacity: 0,
        trapCapacity: 0,
        healCapacity: 0,
        weaknessCapacity: 0,
        itemSlots: 0
    };

    const owned = profile.ownedCards || [];

    for (const name of owned) {
        const c = cards.find(x => x.name === name);
        if (!c) continue;

        const text = c.effect.toLowerCase();

        if (text.includes("blade capacity")) stats.bladeCapacity += extractNum(text);
        if (text.includes("shield capacity")) stats.shieldCapacity += extractNum(text);
        if (text.includes("trap capacity")) stats.trapCapacity += extractNum(text);
        if (text.includes("heal per battle")) stats.healCapacity += extractNum(text);
        if (text.includes("weakness capacity")) stats.weaknessCapacity += extractNum(text);
        if (text.includes("item slot")) stats.itemSlots += extractNum(text);
    }

    return stats;
}

function extractNum(text) {
    const match = text.match(/\+(\d+)/);
    return match ? parseInt(match[1]) : 1;
}

// =====================
// REQUIREMENT CHECKER
// =====================

function meetsRequirements(card, profile) {

    const req = card.requirements || {};
    const stats = STATE.computed;

    // world requirement
    if (req.world) {
        const idx = worlds.indexOf(profile.currentWorld);
        const reqIdx = worlds.indexOf(req.world);
        if (idx < reqIdx) return false;
    }

    // card requirements
    if (req.cards) {
        for (const c of req.cards) {
            if (!profile.ownedCards.includes(c)) return false;
        }
    }

    // capacity requirements
    if (req.bladeCapacity && stats.bladeCapacity < req.bladeCapacity) return false;
    if (req.shieldCapacity && stats.shieldCapacity < req.shieldCapacity) return false;
    if (req.trapCapacity && stats.trapCapacity < req.trapCapacity) return false;
    if (req.healCapacity && stats.healCapacity < req.healCapacity) return false;
    if (req.weaknessCapacity && stats.weaknessCapacity < req.weaknessCapacity) return false;

    return true;
}

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

        profiles.push({
            name,
            currentWorld: "Wizard City",
            ownedCards: []
        });

        saveProfiles(profiles);
        renderMenu();
    };

    const list = document.getElementById("list");

    profiles.forEach(p => {

        const btn = document.createElement("button");
        btn.textContent = p.name;

        btn.onclick = () => {
            STATE.profile = clone(p);
            renderGame();
        };

        list.appendChild(btn);
    });
}

// =====================
// GAME
// =====================

function renderGame() {

    STATE.mode = "GAME";

    STATE.computed = computeProfile(STATE.profile);

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
// WORLDS
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
        saveProfile(p);
        renderWorlds();
        showDraft();
    }
}

// =====================
// CARDS VIEW
// =====================

function renderCards() {

    STATE.computed = computeProfile(STATE.profile);

    const p = STATE.profile;
    const panel = document.getElementById("mainPanel");

    panel.innerHTML = `<h2>Cards</h2>`;

    const wrap = document.createElement("div");
    wrap.className = "cardContainer";

    (p.ownedCards || []).forEach(name => {

        const c = cards.find(x => x.name === name);
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

    cards.forEach(c => {
        if (meetsRequirements(c, STATE.profile)) {
            wrap.appendChild(makeCard(c));
        }
    });

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
// DRAFT SYSTEM (FIXED)
// =====================

function showDraft() {

    STATE.computed = computeProfile(STATE.profile);

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

    const pool = cards
        .filter(c => meetsRequirements(c, STATE.profile))
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    pool.forEach(c => {

        const el = makeCard(c);
        el.classList.add("draftCard");

        el.onclick = () => {

            STATE.profile.ownedCards.push(c.name);
            saveProfile(STATE.profile);

            overlay.remove();

            STATE.computed = computeProfile(STATE.profile);
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
