# Utilities to build data for FFXI Tools

## Windower lua files to JSON
`npm run buildJson` will take the 4 lua files in the input folder and convert to JSON objects in output folder

## Get Stats from Amor and Weapons
`npm run build` will use previous 4 files to build JSON objects that include meta data and stats

```json
  "23761": {
    "_id": 23761,
    "name": "Nyame Helm",
    "nameFull": "Nyame helm",
    "category": "Armor",
    "level": 99,
    "desc": "DEF:156 HP+91 MP+59 STR+26 DEX+25\nVIT+24 AGI+23 INT+28 MND+26 CHR+24\nAccuracy+40 Attack+30\nRanged Accuracy+40\nRanged Attack+30\nMagic Accuracy+40\n\"Magic Atk. Bonus\"+30\nEvasion+91 Magic Evasion+123\n\"Magic Def. Bonus\"+5 Haste+6%\nMagic burst damage +5\n\"Skillchain Bonus\"+5\nDamage taken -7%\nPet: Accuracy+50\nRanged Accuracy+50\nMagic Accuracy+50",
    "stats": {
      "DEF": 156,
      "HP": 91,
      "MP": 59,
      "STR": 26,
      "DEX": 25,
      "VIT": 24,
      "AGI": 23,
      "INT": 28,
      "MND": 26,
      "CHR": 24,
      "MagicAcc": 40,
      "MagicDefBonus": 5,
      "MagicBurstBonus": 5,
      "MagicAttackBonus": 30,
      "RangedAcc": 40,
      "RangedAttack": 30,
      "MeleeAcc": 40,
      "MeleeAttack": 30,
      "GearHaste": 6,
      "mEva": 123,
      "Eva": 91,
      "DT": 7
    },
    "slotName": "Head",
    "jobSlots": [
      "RUN",
      "GEO",
      "SCH",
      "DNC",
      "PUP",
      "COR",
      "BLU",
      "SMN",
      "DRG",
      "NIN",
      "SAM",
      "RNG",
      "BRD",
      "BST",
      "DRK",
      "PLD",
      "THF",
      "RDM",
      "BLM",
      "WHM",
      "MNK",
      "WAR"
    ]
  },
```