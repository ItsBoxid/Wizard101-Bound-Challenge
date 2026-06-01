const createButton =
    document.getElementById("createProfile");

const profileInput =
    document.getElementById("profileName");

const profilesDiv =
    document.getElementById("profiles");

function loadProfiles() {

    profilesDiv.innerHTML = "";

    const profiles =
        JSON.parse(
            localStorage.getItem("profiles")
        ) || [];

    profiles.forEach(profile => {

        const button =
            document.createElement("button");

        button.textContent =
            profile.name;

        button.style.display = "block";
        button.style.margin = "10px auto";

        button.addEventListener("click", () => {

            localStorage.setItem(
                "activeProfile",
                profile.name
            );

            showProfile(profile);

        });

        profilesDiv.appendChild(button);

    });

}

function showProfile(profile) {

    document.body.innerHTML = `
        <h1>${profile.name}</h1>

        <h2>
            Current World:
            ${profile.currentWorld}
        </h2>

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
        .getElementById("backButton")
        .addEventListener("click", () => {

            location.reload();

        });

}

createButton.addEventListener("click", () => {

    const name =
        profileInput.value.trim();

    if (name === "") return;

    const profiles =
        JSON.parse(
            localStorage.getItem("profiles")
        ) || [];

    profiles.push({

        name: name,

        currentWorld: "Wizard City",

        ownedCards: []

    });

    localStorage.setItem(
        "profiles",
        JSON.stringify(profiles)
    );

    profileInput.value = "";

    loadProfiles();

});

loadProfiles();
