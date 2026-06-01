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
let viewMode = "cards"; // cards | index

// =====================
// LOAD/SAVE
// =====================

function getProfiles() {
    return JSON.parse(localStorage.getItem("profiles")) || [];
}

function saveProfiles(p) {
    localStorage.setItem("profiles", JSON.stringify(p));
}

// =====================
// INIT (TEMP PROFILE SELECT)
// =====================

function init() {

    const profiles = getProfiles();

    if (profiles.length === 0) {
        document.body.innerHTML = "<h1>No Profiles Found</h1>";
        return;
    }

    currentProfile = profiles[0];

    document.getElementById("charName").textContent =
        currentProfile.name;

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

    // auto-scroll positioning
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
// CAPACITY (simple placeholder)
// =====================

function getCapacity(profile) {

    let blades = 0;
    let shields = 0;
    let traps = 0;
    let heals = 0;
    let weaknesses = 0;
    let feints = 0;

    profile.ownedCards.forEach(name => {

        const c = cards.find(x => x.name === name);
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
// CARD RENDER
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
// CARDS VIEW
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

        const card = cards.find(c => c.name === name);
        if (!card) return;

        container.appendChild(makeCard(card));
    });

    panel.appendChild(container);
}

// =====================
// CARD INDEX VIEW
// =====================

function renderIndex() {

    const panel = document.getElementById("mainPanel");
    panel.innerHTML = "<h2>Card Index</h2>";

    const container = document.createElement("div");
    container.className = "cardContainer";

    cards.forEach(c => {
        container.appendChild(makeCard(c));
    });

    panel.appendChild(container);
}

// =====================
// BUTTONS
// =====================

function setupButtons() {

    document.getElementById("cardIndexBtn")
        .onclick = () => {

            viewMode = "index";
            renderIndex();

        };

    document.getElementById("settingsBtn")
        .onclick = () => {

            alert("Settings placeholder (export/delete coming next)");

        };
}

// =====================
// START
// =====================

init();
