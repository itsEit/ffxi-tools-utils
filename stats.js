const tests = [
  // Base Stats
  { stat: "Def", test: [/DEF(:-|:\+|:)\d*\%?/gi] },
  { stat: "Dmg", test: [/DMG(:-|:\+|:)\d*\%?/gi] },
  { stat: "Delay", test: [/Delay(:-|:\+|:)\d*\%?/gi] },
  { stat: "Hp", test: [/HP(\+|-)\d*\%?/gi] },
  { stat: "Mp", test: [/MP(\+|-)\d*\%?/gi] },
  { stat: "Str", test: [/STR(\+|-)\d*\%?/gi] },
  { stat: "Dex", test: [/DEX(\+|-)\d*\%?/gi] },
  { stat: "Vit", test: [/VIT(\+|-)\d*\%?/gi] },
  { stat: "Agi", test: [/AGI(\+|-)\d*\%?/gi] },
  { stat: "Int", test: [/INT(\+|-)\d*\%?/gi] },
  { stat: "Mnd", test: [/MND(\+|-)\d*\%?/gi] },
  { stat: "Chr", test: [/CHR(\+|-)\d*\%?/gi] },
  { stat: "WSAccuracy", test: [/Weapon Skill Accuracy\s?(\+|-)\d*\%?/gi] },

  // Magic
  { stat: "MagicAccuracy", test: [/Magic Accuracy(\+|-)\d*\%?/gi] },
  { stat: "MagicAccuracy", test: [/Magic Accracy(\+|-)\d*\%?/gi] }, // Typo on some Gear
  { stat: "MagicDefBonus", test: [/"Magic Def. Bonus"\s?(\+|-)\d*\%?/gi] },
  { stat: "MagicBurstBonus", test: [/Magic burst damage\s?(\+|-)\d*\%?/gi] },
  { stat: "MagicAttackBonus", test: [/"Magic Atk. Bonus"\s?(\+|-)\d*\%?/gi] },
  { stat: "MagicDamage", test: [/Magic Damage\s?(\+|-)\d*\%?/gi] },
  { stat: "SpellInterruptionRate", test: [/Spell interruption rate down\s?(\+|-)\d*\%?/gi] },
  { stat: "Refresh", test: [/"Refresh"\s?(\+|-)\d*\%?/gi] },

  // Ranged
  { stat: "RangedAccuracy", test: [/Ranged Accuracy\s?(\+|-)\d*\%?/gi] },
  { stat: "RangedAttack", test: [/Ranged Attack\s?(\+|-)\d*\%?/gi] },

  // Physical
  { stat: "PhysicalAccuracy", test: [/Accuracy(\+|-)\d*\%?/gi] },
  { stat: "PhysicalAttack", test: [/Attack\s?(\+|-)\d*\%?/gi] },

  // Multi Attack
  { stat: "DoubleAttack", test: [/"Double Attack"\s?(\+|-)\d*\%?/gi] },
  { stat: "TripleAttack", test: [/"Triple Attack"\s?(\+|-)\d*\%?/gi] },
  { stat: "QuadripleAttack", test: [/"Quadriple Attack"\s?(\+|-)\d*\%?/gi] },

  // Other
  { stat: "GearHaste", test: [/Haste(\+|-)\d*\%?/gi] },
  { stat: "CurePot", test: [/"Cure" Potency\s?(\+|-)\d*\%?/gi] },
  { stat: "CounterRate", test: [/"Counter"\s?(\+|-)\d*\%?/gi] },
  { stat: "DualWield", test: [/"Dual Wield"\s?(\+|-)\d*\%?/gi] },
  { stat: "Regen", test: [/"Regen"\s?(\+|-)\d*\%?/gi] },
  { stat: "Zanshin", test: [/"Zanshin"\s?(\+|-)\d*\%?/gi] },
  {
    stat: "CureCasting",
    test: [/"Cure" spellcasting time\s?(\+|-)\d*\%?/gi],
  },
  {
    stat: "CureCasting",
    test: [/"Cure" casting time\s?(\+|-)\d*\%?/gi],
  },
  { stat: "ConserveMP", test: [/"Conserve MP"\s?(\+|-)\d*\%?/gi] },
  {
    stat: "BloodPactDelay",
    test: [/"Blood Pact" ability delay \s?(\+|-)\d*\%?/gi],
  },
  { stat: "Cursna", test: [/"Cursna"\s?(\+|-)\d*\%?/gi] },
  { stat: "SubtleBlow", test: [/"Subtle Blow"\s?(\+|-)\d*\%?/gi] },
  { stat: "StoreTP", test: [/"Store TP"\s?(\+|-)\d*\%?/gi] },
  { stat: "Enmity", test: [/Enmity(\+|-)\d*\%?/gi] },
  { stat: "MAB", test: [/"Magic Atk. Bonus\\"(\+|-)\d*\%?/gi] },
  { stat: "MagicEvasion", test: [/Magic Eva.(\+|-)\d*\%?/gi] },
  { stat: "MagicEvasion", test: [/Magic Evasion(\+|-)\d*\%?/gi] },
  { stat: "PhysicalEvasion", test: [/Eva.(\+|-)\d*\%?/gi] },
  { stat: "PhysicalEvasion", test: [/Evasion(\+|-)\d*\%?/gi] },
  { stat: "MDT", test: [/Magic Damage taken (\+|-)\d*\%?/gi] },
  { stat: "PDT", test: [/Physical Damage taken (\+|-)\d*\%?/gi] },
  { stat: "DT", test: [/Damage taken (\+|-)\d*\%?/gi] },
  { stat: "SubtleBlow", test: [/"Fast Cast"\s?(\+|-)\d*\%?/gi] },

  // Skill
  { stat: "ShieldSkill", test: [/Shield skill\s?(\+|-)\d*\%?/gi] },
  { stat: "GeomancySkill", test: [/Geomancy skill\s?(\+|-)\d*\%?/gi] },
  { stat: "HandbellSkill", test: [/Handbell skill\s?(\+|-)\d*\%?/gi] },
  {
    stat: "SummoningSkill",
    test: [/Summoning magic skill\s?(\+|-)\d*\%?/gi],
  },
  { stat: "BlueSkill", test: [/Blue magic skill\s?(\+|-)\d*\%?/gi] },
  { stat: "DivineSkill", test: [/Divine magic skill\s?(\+|-)\d*\%?/gi] },
  { stat: "HealingSkill", test: [/Healing magic skill\s?(\+|-)\d*\%?/gi] },
  { stat: "DarkSkill", test: [/Dark magic skill\s?(\+|-)\d*\%?/gi] },
  {
    stat: "EnfeeblingSkill",
    test: [/Enfeebling magic skill\s?(\+|-)\d*\%?/gi],
  },
  {
    stat: "ElementalSkill",
    test: [/Elemental magic skill\s?(\+|-)\d*\%?/gi],
  },
  {
    stat: "EnhancingSkill",
    test: [/Enhancing magic skill\s?(\+|-)\d*\%?/gi],
  },
  { stat: "SingingSkill", test: [/Singing skill\s?(\+|-)\d*\%?/gi] },
  {
    stat: "StringInstrumentSkill",
    test: [/String instrument skill\s?(\+|-)\d*\%?/gi],
  },
  {
    stat: "WindInstrumentSkill",
    test: [/Wind instrument skill\s?(\+|-)\d*\%?/gi],
  },
  { stat: "ClubSkill", test: [/Club skill\s?(\+|-)\d*\%?/gi] },
  { stat: "StaffSkill", test: [/Staff skill\s?(\+|-)\d*\%?/gi] },
  { stat: "DaggerSkill", test: [/Dagger skill\s?(\+|-)\d*\%?/gi] },
  { stat: "PolearmSkill", test: [/Polearm skill\s?(\+|-)\d*\%?/gi] },
  {
    stat: "MarksmanshipSkill",
    test: [/Marksmanship skill\s?(\+|-)\d*\%?/gi],
  },
  { stat: "EnhacingSkill", test: [/Enhancing magic skill\s?(\+|-)\d*\%?/gi] },
  { stat: "ParryingSkill", test: [/Parrying skill\s?(\+|-)\d*\%?/gi] },
];

tests.forEach(test => {
  console.log(`${test.stat} int \`json:"${lowerCaseFirstLetter(test.stat)},omitempty"\``)
});

function lowerCaseFirstLetter(string) {
  const str = String(string)
  return str.charAt(0).toLocaleLowerCase() + str.slice(1);
}