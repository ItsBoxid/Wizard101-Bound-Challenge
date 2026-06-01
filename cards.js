const cards = [

    // =========================
    // OFFENSE
    // =========================

    {
        name: "Additional Blade",
        tree: "Offense",
        rarity: "Common",
        type: "Capacity",
        effect: "+1 Blade Capacity",
        maxCopies: 5,
        requirements: {}
    },

    {
        name: "Blade Bundle",
        tree: "Offense",
        rarity: "Rare",
        type: "Capacity",
        effect: "+2 Blade Capacity",
        maxCopies: 2,
        requirements: {}
    },

    {
        name: "Blade Mastery",
        tree: "Offense",
        rarity: "Epic",
        type: "Mastery",
        effect: "Only blades used on the same attack count.",
        maxCopies: 1,
        requirements: {
            bladeCapacity: 5
        }
    },

    {
        name: "Additional Trap",
        tree: "Offense",
        rarity: "Common",
        type: "Capacity",
        effect: "+1 Trap Capacity",
        maxCopies: 5,
        requirements: {}
    },

    {
        name: "Trap Bundle",
        tree: "Offense",
        rarity: "Rare",
        type: "Capacity",
        effect: "+2 Trap Capacity",
        maxCopies: 2,
        requirements: {}
    },

    {
        name: "Trap Mastery",
        tree: "Offense",
        rarity: "Epic",
        type: "Mastery",
        effect: "Only traps used on the same attack count.",
        maxCopies: 1,
        requirements: {
            trapCapacity: 5
        }
    },

    {
        name: "Prism Expert",
        tree: "Offense",
        rarity: "Uncommon",
        type: "Utility",
        effect: "Prisms do not count toward Trap Capacity.",
        maxCopies: 1,
        requirements: {
            cards: ["Additional Trap"]
        }
    },

    {
        name: "Feint Bound",
        tree: "Offense",
        rarity: "Rare",
        type: "Utility",
        effect: "Feints may be used.",
        maxCopies: 1,
        requirements: {
            trapCapacity: 2
        }
    },

    {
        name: "Additional Feint",
        tree: "Offense",
        rarity: "Rare",
        type: "Capacity",
        effect: "+1 Feint Capacity",
        maxCopies: 3,
        requirements: {
            cards: ["Feint Bound"]
        }
    },

    // =========================
    // DEFENSE
    // =========================

    {
        name: "Additional Shield",
        tree: "Defense",
        rarity: "Common",
        type: "Capacity",
        effect: "+1 Shield Capacity",
        maxCopies: 6,
        requirements: {}
    },

    {
        name: "Shield Bundle",
        tree: "Defense",
        rarity: "Rare",
        type: "Capacity",
        effect: "+2 Shield Capacity",
        maxCopies: 2,
        requirements: {}
    },

    {
        name: "Shield Mastery",
        tree: "Defense",
        rarity: "Epic",
        type: "Mastery",
        effect: "Only shields used against the same attack count.",
        maxCopies: 1,
        requirements: {
            shieldCapacity: 6
        }
    },

    {
        name: "Additional Heal",
        tree: "Defense",
        rarity: "Common",
        type: "Capacity",
        effect: "+1 Heal Per Battle",
        maxCopies: 3,
        requirements: {}
    },

    {
        name: "Healthy Healer",
        tree: "Defense",
        rarity: "Epic",
        type: "Capstone",
        effect: "Unlimited healing.",
        maxCopies: 1,
        requirements: {
            healCapacity: 3
        }
    },

    {
        name: "Additional Weakness",
        tree: "Defense",
        rarity: "Common",
        type: "Capacity",
        effect: "+1 Weakness Capacity",
        maxCopies: 3,
        requirements: {}
    },

    {
        name: "Weakness Connoisseur",
        tree: "Defense",
        rarity: "Epic",
        type: "Capstone",
        effect: "Unlimited weaknesses.",
        maxCopies: 1,
        requirements: {
            weaknessCapacity: 3
        }
    },

    {
        name: "Tower Shield",
        tree: "Defense",
        rarity: "Uncommon",
        type: "Utility",
        effect: "Tower Shields may be used.",
        maxCopies: 1,
        requirements: {
            shieldCapacity: 1
        }
    },

    {
        name: "Absorber",
        tree: "Defense",
        rarity: "Uncommon",
        type: "Utility",
        effect: "Absorbs may be used.",
        maxCopies: 1,
        requirements: {
            shieldCapacity: 2
        }
    },

    // =========================
    // CONTROL
    // =========================

    {
        name: "Cross-Trained",
        tree: "Control",
        rarity: "Uncommon",
        type: "Utility",
        effect: "Training Points may be spent in 1 school.",
        maxCopies: 1,
        requirements: {}
    },

    {
        name: "Multi-Trained",
        tree: "Control",
        rarity: "Rare",
        type: "Utility",
        effect: "Training Points may be spent in 2 schools.",
        maxCopies: 1,
        requirements: {
            cards: ["Cross-Trained"]
        }
    },

    {
        name: "Avatar-Trained",
        tree: "Control",
        rarity: "Epic",
        type: "Utility",
        effect: "Training Points may be spent in all schools.",
        maxCopies: 1,
        requirements: {
            cards: ["Multi-Trained"]
        }
    },

    {
        name: "Aura Farm",
        tree: "Control",
        rarity: "Uncommon",
        type: "Utility",
        effect: "Auras may be used.",
        maxCopies: 1,
        requirements: {}
    },

    {
        name: "Spell Shifter",
        tree: "Control",
        rarity: "Rare",
        type: "Utility",
        effect: "Spellments unlocked.",
        maxCopies: 1,
        requirements: {}
    },

    {
        name: "Minion Friend",
        tree: "Control",
        rarity: "Uncommon",
        type: "Utility",
        effect: "1 Minion summon per battle.",
        maxCopies: 1,
        requirements: {}
    },

    {
        name: "Minion Legion",
        tree: "Control",
        rarity: "Epic",
        type: "Utility",
        effect: "Unlimited minion summons.",
        maxCopies: 1,
        requirements: {
            cards: ["Minion Friend"]
        }
    },

    // =========================
    // GEAR
    // =========================

    {
        name: "Spell Caster",
        tree: "Gear",
        rarity: "Common",
        type: "Gear",
        effect: "Equip 1 Wand and Deck.",
        maxCopies: 1,
        requirements: {}
    },

    {
        name: "Additional Clothing Slot",
        tree: "Gear",
        rarity: "Common",
        type: "Gear",
        effect: "+1 Hat/Robe/Boot slot.",
        maxCopies: 3,
        requirements: {}
    },

    {
        name: "Additional Trinket Slot",
        tree: "Gear",
        rarity: "Common",
        type: "Gear",
        effect: "+1 Athame/Amulet/Ring slot.",
        maxCopies: 3,
        requirements: {}
    },

    {
        name: "Friendly Pet",
        tree: "Gear",
        rarity: "Uncommon",
        type: "Gear",
        effect: "Pet may be equipped.",
        maxCopies: 1,
        requirements: {}
    },

    {
        name: "Favored Pet",
        tree: "Gear",
        rarity: "Rare",
        type: "Gear",
        effect: "Beneficial pet talents unlocked.",
        maxCopies: 1,
        requirements: {
            cards: ["Friendly Pet"]
        }
    },

    {
        name: "Friendly Mounts",
        tree: "Gear",
        rarity: "Uncommon",
        type: "Gear",
        effect: "Stat mounts may be used.",
        maxCopies: 1,
        requirements: {}
    },

    // =========================
    // MASTERY
    // =========================

    {
        name: "Archnoob",
        tree: "Mastery",
        rarity: "Rare",
        type: "Mastery",
        effect: "Choose pip type in deck.",
        maxCopies: 1,
        requirements: {}
    },

    {
        name: "Archmaster",
        tree: "Mastery",
        rarity: "Epic",
        type: "Mastery",
        effect: "Choose pip type during combat.",
        maxCopies: 1,
        requirements: {
            cards: ["Archnoob"]
        }
    },

    {
        name: "Shadow Freak",
        tree: "Mastery",
        rarity: "Legendary",
        type: "Mastery",
        effect: "Shadow Magic unlocked.",
        maxCopies: 1,
        requirements: {
            world: "Khrysalis"
        }
    },

    // =========================
    // SPECIALIZATIONS
    // =========================

    {
        name: "Recycler",
        tree: "Specialization",
        rarity: "Legendary",
        type: "Specialization",
        effect: "Recycle treasure cards and item cards.",
        maxCopies: 1,
        requirements: {
            cards: ["Multi-Trained"],
            itemSlots: 1
        }
    },

    {
        name: "Setup Addict",
        tree: "Specialization",
        rarity: "Legendary",
        type: "Specialization",
        effect: "+1 Blade Capacity and +1 Trap Capacity.",
        maxCopies: 1,
        requirements: {
            cards: [
                "Blade Mastery",
                "Trap Mastery"
            ]
        }
    },

    {
        name: "Weakness Farmer",
        tree: "Specialization",
        rarity: "Legendary",
        type: "Specialization",
        effect: "Generate additional weaknesses.",
        maxCopies: 1,
        requirements: {
            cards: [
                "Weakness Connoisseur",
                "Aura Farm"
            ]
        }
    }
];
