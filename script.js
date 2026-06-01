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

// =========================
// DOM
// =========================

const createButton =
    document.getElementById("createProfile");

const profileInput =
    document.getElementById("profileName");

const profilesDiv =
    document.getElementById("profiles");

// =========================
// SAVE / LOAD
// =========================

function saveProfiles(profiles) {
    localStorage.setItem(
        "profiles",
        JSON.stringify(profiles)
    );
}

function getProfiles() {
    return JSON.parse(
        localStorage.getItem("profiles")
    ) || [];
}

// =========================
// UTIL
// =========================

function countOwned(profile, cardName) {
    return profile.ownedCards.filter(
        c => c === cardName
    ).length;
}

function getCard(name) {
    return cards.find(c => c.name === name);
}

// =========================
// CAPACITY CALCULATION
// =========================

function getCapacity(profile) {

    const cap = {
        blades: 0,
        traps: 0,
        shields: 0,
        heals: 0,
        weaknesses: 0,
        feints: 0
    };

    profile.ownedCards.forEach(name => {

        const c = getCard(name);
        if (!c) return;

        if (c.name === "Additional Blade") cap.blades += 1;
        if (c.name === "Blade Bundle") cap.blades += 2;

        if (c.name === "Additional Trap") cap.traps += 1;
        if (c.name === "Trap Bundle") cap.traps += 2;

        if (c.name === "Additional Shield") cap.shields += 1;
        if (c.name === "Shield Bundle") cap.shields += 2;

        if (c.name === "Additional Heal") cap.heals += 1;

        if (c.name === "Additional Weakness") cap.weaknesses += 1;

        if (c.name === "Additional Feint") cap.feints += 1;
    });

    return cap;
}

// =========================
// ELIGIBILITY CHECK
// =========================

function isEligible(profile, card) {

    const cap = getCapacity(profile);

    const ownedCount = countOwned(profile, card.name);

    if (ownedCount >= card.maxCopies) return false;

    const req = card.requirements || {};

    // card dependencies
    if (req.cards) {
        for (let r of req.cards) {
            if (!profile.ownedCards.includes(r)) {
                return false;
            }
        }
    }

    // world requirement
    if (req.world) {
        const worldIndex =
            worlds.indexOf(profile.currentWorld);

        const reqIndex =
            worlds.indexOf(req.world);

        if (worldIndex < reqIndex) return false;
    }

    // capacity requirements
    if (req.bladeCapacity && cap.blades < req.bladeCapacity) return false;
    if (req.trapCapacity && cap.traps < req.trapCapacity) return false;
    if (req.shieldCapacity && cap.shields < req.shieldCapacity) return false;
    if (req.healCapacity && cap.heals < req.healCapacity) return false;
    if (req.weaknessCapacity && cap.weaknesses < req.weaknessCapacity) return false;

    return true;
}

// =========================
// RARITY WEIGHTS
// =========================

function rarityWeight(rarity) {

    switch (rarity) {

        case "Common": return 60;
        case "Uncommon": return 25;
        case "Rare": return 10;
        case "Epic": return 4;
        case "Legendary": return 1;

        default: return 10;

    }
}

// =========================
// RANDOM PICK (WEIGHTED)
// =========================

function weightedPick(pool) {

    let total = pool.reduce(
        (sum, c) =>
            sum + rarityWeight(c.rarity),
        0
    );

    let r = Math.random() * total;

    for (let c of pool) {

        r -= rarityWeight(c.rarity);

        if (r <= 0) return c;

    }

    return pool[0];
}

// =========================
// DRAFT GENERATION
// =========================

function generateDraft(profile) {

    const eligible =
        cards.filter(c =>
            isEligible(profile, c)
        );

    const draft = [];

    const used = new Set();

    while (draft.length < 3 && eligible.length) {

        const pick =
            weightedPick(eligible);

        if (used.has(pick.name)) continue;

        used.add(pick.name);
        draft.push(pick);
    }

    return draft;
}

// =========================
// LOAD PROFILES
// =========================

function loadProfiles() {

    profilesDiv.innerHTML = "";

    const profiles = getProfiles();

    profiles.forEach(profile => {

        const button =
            document.createElement("button");

        button.textContent =
            profile.name;

        button.addEventListener("click", () => {
            showProfile(profile);
        });

        profilesDiv.appendChild(button);

    });

}

// =========================
// DRAFT SCREEN
// =========================

function showDraft(profile) {

    const draft =
        generateDraft(profile);

    document.body.innerHTML = `
        <h1>Choose A Card</h1>
        <div id="draftCards" class="cardContainer"></div>
    `;

    const draftDiv =
        document.getElementById("draftCards");

    draft.forEach(card => {

        const div =
            document.createElement("div");

        div.className = "card";
        div.dataset.tree = card.tree;

        div.innerHTML = `
            <h3>${card.name}</h3>
            <p>${card.rarity}</p>
            <p>${card.tree}</p>
            <p>${card.effect}</p>
        `;

        div.addEventListener("click", () => {

            const profiles = getProfiles();

            const i = profiles.findIndex(
                p => p.name === profile.name
            );

            profiles[i].ownedCards.push(card.name);

            saveProfiles(profiles);

            showProfile(profiles[i]);

        });

        draftDiv.appendChild(div);

    });

}

// =========================
// PROFILE SCREEN
// =========================

function showProfile(profile) {

    const cap = getCapacity(profile);

    document.body.innerHTML = `
        <h1>${profile.name}</h1>

        <h2>World: ${profile.currentWorld}</h2>

        <button id="completeWorld">Complete World</button>

        <h2>Capacity</h2>

        <p>Blades: ${cap.blades} / 5</p>
        <p>Traps: ${cap.traps} / 5</p>
        <p>Shields: ${cap.shields} / 6</p>
        <p>Heals: ${cap.heals} / 3</p>
        <p>Weaknesses: ${cap.weaknesses} / 3</p>
        <p>Feints: ${cap.feints} / 3</p>

        <h2>Owned Cards</h2>
        <div id="ownedCards" class="cardContainer"></div>

        <button id="backButton">Back</button>
    `;

    const owned = document.getElementById("ownedCards");

    profile.ownedCards.forEach(name => {

        const card = getCard(name);
        if (!card) return;

        const div =
            document.createElement("div");

        div.className = "card";
        div.dataset.tree = card.tree;

        div.innerHTML = `
            <h3>${card.name}</h3>
            <p>${card.rarity}</p>
            <p>${card.tree}</p>
        `;

        owned.appendChild(div);

    });

    document.getElementById("completeWorld")
        .addEventListener("click", () => {

            const profiles = getProfiles();

            const i = profiles.findIndex(
                p => p.name === profile.name
            );

            const idx =
                worlds.indexOf(profile.currentWorld);

            if (idx < worlds.length - 1) {

                profiles[i].currentWorld =
                    worlds[idx + 1];

                saveProfiles(profiles);

                showDraft(profiles[i]);
            }
        });

    document.getElementById("backButton")
        .addEventListener("click", () => {
            location.reload();
        });

}

// =========================
// CREATE PROFILE
// =========================

createButton.addEventListener("click", () => {

    const name = profileInput.value.trim();
    if (!name) return;

    const profiles = getProfiles();

    const newProfile = {
        name,
        currentWorld: "Wizard City",
        ownedCards: [],
        redraws: 0,
        wish: null
    };

    profiles.push(newProfile);

    saveProfiles(profiles);

    profileInput.value = "";

    showDraft(newProfile);
});

loadProfiles();
