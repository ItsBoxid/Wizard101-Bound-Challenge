const cards = [
    {
        name: "Blades I",
        tree: "Offense",
        color: "#d94a4a"
    },

    {
        name: "Healer I",
        tree: "Defense",
        color: "#4a7fd9"
    },

    {
        name: "Cross-Trained",
        tree: "Control",
        color: "#d9c54a"
    },

    {
        name: "Spell Caster",
        tree: "Gear",
        color: "#4ad96f"
    },

    {
        name: "Traps I",
        tree: "Offense",
        color: "#d94a4a"
    },

    {
        name: "Shields I",
        tree: "Defense",
        color: "#4a7fd9"
    },

    {
        name: "Card Collector",
        tree: "Control",
        color: "#d9c54a"
    },

    {
        name: "Minion Friend",
        tree: "Control",
        color: "#d9c54a"
    }
];

const generateBtn = document.getElementById("generateBtn");
const cardsContainer = document.getElementById("cards");

generateBtn.addEventListener("click", () => {

    cardsContainer.innerHTML = "";

    const shuffled = [...cards].sort(() => Math.random() - 0.5);

    const selected = shuffled.slice(0, 3);

    selected.forEach(cardData => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.style.border = `4px solid ${cardData.color}`;

        card.innerHTML = `
            <h2>${cardData.name}</h2>
            <p>${cardData.tree}</p>
        `;

        cardsContainer.appendChild(card);

    });

});
