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

const createButton =
    document.getElementById("createProfile");

const profileInput =
    document.getElementById("profileName");

const profilesDiv =
    document.getElementById("profiles");

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

function getRandomCards(count) {

    const shuffled =
        [...cards].sort(
            () => Math.random() - 0.5
        );

    return shuffled.slice(0, count);

}

function loadProfiles() {

    profilesDiv.innerHTML = "";

    const profiles = getProfiles();

    profiles.forEach(profile => {

        const button =
            document.createElement("button");

        button.textContent =
            profile.name;

        button.style.display = "block";
        button.style.margin = "10px auto";

        button.addEventListener("click", () => {

            showProfile(profile);

        });

        profilesDiv.appendChild(button);

    });

}

function showDraft(profile) {

    const draft =
        getRandomCards(3);

    document.body.innerHTML = `
        <h1>Choose A Card</h1>

        <div id="draftCards"></div>
    `;

    const draftDiv =
        document.getElementById(
            "draftCards"
        );

    draft.forEach(card => {

        const button =
            document.createElement("button");

        button.textContent =
            card.name;

        button.style.display =
            "block";

        button.style.margin =
            "15px auto";

        button.style.padding =
            "15px";

        button.addEventListener(
            "click",
            () => {

                const profiles =
                    getProfiles();

                const profileIndex =
                    profiles.findIndex(
                        p =>
                            p.name ===
                            profile.name
                    );

                profiles[
                    profileIndex
                ].ownedCards.push(
                    card.name
                );

                saveProfiles(
                    profiles
                );

                showProfile(
                    profiles[
                        profileIndex
                    ]
                );

            }
        );

        draftDiv.appendChild(
            button
        );

    });

}

function showProfile(profile) {

    document.body.innerHTML = `
        <h1>${profile.name}</h1>

        <h2>
            Current World:
            ${profile.currentWorld}
        </h2>

        <button id="completeWorld">
            Complete World
        </button>

        <h2>Owned Cards</h2>

        <div id="ownedCards"></div>

        <button id="backButton">
            Back
        </button>
    `;

    const ownedCardsDiv =
        document.getElementById(
            "ownedCards"
        );

    if (
        profile.ownedCards.length === 0
    ) {

        ownedCardsDiv.innerHTML =
            "<p>No cards yet.</p>";

    } else {

        profile.ownedCards.forEach(
            card => {

                const p =
                    document.createElement(
                        "p"
                    );

                p.textContent = card;

                ownedCardsDiv.appendChild(
                    p
                );

            }
        );

    }

    document
        .getElementById(
            "completeWorld"
        )
        .addEventListener(
            "click",
            () => {

                const profiles =
                    getProfiles();

                const profileIndex =
                    profiles.findIndex(
                        p =>
                            p.name ===
                            profile.name
                    );

                const currentIndex =
                    worlds.indexOf(
                        profile.currentWorld
                    );

                if (
                    currentIndex <
                    worlds.length - 1
                ) {

                    profiles[
                        profileIndex
                    ].currentWorld =
                        worlds[
                            currentIndex + 1
                        ];

                    saveProfiles(
                        profiles
                    );

                    showDraft(
                        profiles[
                            profileIndex
                        ]
                    );

                }

            }
        );

    document
        .getElementById(
            "backButton"
        )
        .addEventListener(
            "click",
            () => {

                location.reload();

            }
        );

}

createButton.addEventListener(
    "click",
    () => {

        const name =
            profileInput.value.trim();

        if (name === "") return;

        const profiles =
            getProfiles();

        const newProfile = {

            name: name,

            currentWorld:
                "Wizard City",

            ownedCards: []

        };

        profiles.push(
            newProfile
        );

        saveProfiles(
            profiles
        );

        profileInput.value = "";

        showDraft(
            newProfile
        );

    }
);

loadProfiles();
