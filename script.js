const cards = [
    "Blades I",
    "Healer I",
    "Cross-Trained",
    "Spell Caster",
    "Traps I",
    "Shields I",
    "Card Collector",
    "Minion Friend"
];

const generateBtn =
    document.getElementById("generateBtn");

const cardsContainer =
    document.getElementById("cards");

generateBtn.addEventListener("click", () => {

    cardsContainer.innerHTML = "";

    const shuffled =
        [...cards].sort(() => Math.random() - 0.5);

    const selected =
        shuffled.slice(0, 3);

    selected.forEach(cardName => {

        const card =
            document.createElement("div");

        card.classList.add("card");

        card.textContent =
            cardName;

        cardsContainer.appendChild(card);

    });

});
