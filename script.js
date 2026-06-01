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

        profilesDiv.appendChild(button);

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
