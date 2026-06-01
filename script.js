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

```
localStorage.setItem(
    "profiles",
    JSON.stringify(profiles)
);
```

}

function getProfiles() {

```
return JSON.parse(
    localStorage.getItem("profiles")
) || [];
```

}

function loadProfiles() {

```
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
```

}

function showProfile(profile) {

```
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
    document.getElementById("ownedCards");

if (profile.ownedCards.length === 0) {

    ownedCardsDiv.innerHTML =
        "<p>No cards yet.</p>";

} else {

    profile.ownedCards.forEach(card => {

        const p =
            document.createElement("p");

        p.textContent = card;

        ownedCardsDiv.appendChild(p);

    });

}

document
    .getElementById("completeWorld")
    .addEventListener("click", () => {

        const profiles =
            getProfiles();

        const profileIndex =
            profiles.findIndex(
                p => p.name === profile.name
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
                worlds[currentIndex + 1];

            saveProfiles(profiles);

            showProfile(
                profiles[profileIndex]
            );

        }

    });

document
    .getElementById("backButton")
    .addEventListener("click", () => {

        location.reload();

    });
```

}

createButton.addEventListener("click", () => {

```
const name =
    profileInput.value.trim();

if (name === "") return;

const profiles =
    getProfiles();

profiles.push({

    name: name,

    currentWorld: "Wizard City",

    ownedCards: []

});

saveProfiles(profiles);

profileInput.value = "";

loadProfiles();
```

});

loadProfiles();
