import { getArmorSlot, getJobSlot } from "./GearDecoder.js";

export function parseGear(itemDesc) {
  let item = { ...itemDesc, stats: {}, descTest: itemDesc.desc };
  let testDesc = item.descTest;

  // Test are ran in order, once a test case is found, it will remove that from the test desc. This will prevent stats with the same word from conflicting.
  // ex. Magic Accuracy rule will remove Magic Accuracy from string and leave behind Accuracy if applicable
  const tests = [
    // Base Stats
    { stat: "DEF", test: [/DEF(:-|:\+|:)\d*\%?/gi] },
    { stat: "DMG", test: [/DMG(:-|:\+|:)\d*\%?/gi] },
    { stat: "Delay", test: [/Delay(:-|:\+|:)\d*\%?/gi] },
    { stat: "HP", test: [/HP(\+|-)\d*\%?/gi] },
    { stat: "MP", test: [/MP(\+|-)\d*\%?/gi] },
    { stat: "STR", test: [/STR(\+|-)\d*\%?/gi] },
    { stat: "DEX", test: [/DEX(\+|-)\d*\%?/gi] },
    { stat: "VIT", test: [/VIT(\+|-)\d*\%?/gi] },
    { stat: "AGI", test: [/AGI(\+|-)\d*\%?/gi] },
    { stat: "INT", test: [/INT(\+|-)\d*\%?/gi] },
    { stat: "MND", test: [/MND(\+|-)\d*\%?/gi] },
    { stat: "CHR", test: [/CHR(\+|-)\d*\%?/gi] },
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
      stat: "String instrumentSkill",
      test: [/String instrument skill\s?(\+|-)\d*\%?/gi],
    },
    {
      stat: "Wind instrumentSkill",
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

  // Remove Line Breaks
  testDesc = testDesc.replace(/(\r\n|\n|\r|\s)/gm, " ");

  // Remove Conditions at the end of Descriptions @@TODO: Account for Stats
  testDesc = testDesc.replace(/Automaton:.+/gi, "");
  testDesc = testDesc.replace(/Pet:.+/gi, "");
  testDesc = testDesc.replace(/Avatar:.+/gi, "");
  testDesc = testDesc.replace(/Luopan:.+/gi, "");
  testDesc = testDesc.replace(/Wyvern:.+/gi, "");
  testDesc = testDesc.replace(/Dispense:.+/gi, "");
  testDesc = testDesc.replace(/Reives:.+/gi, "");
  testDesc = testDesc.replace(/Enchantment:.+/gi, "");
  testDesc = testDesc.replace(/Dynamis (D):.+/gi, "");
  testDesc = testDesc.replace(/Experience point bonus:.+/gi, "");
  testDesc = testDesc.replace(/Capacity point bonus:.+/gi, "");
  testDesc = testDesc.replace(/Increases rate.+/gi, "");
  testDesc = testDesc.replace(/Latent effect:.+/gi, "");
  testDesc = testDesc.replace(/Set:.+/gi, "");
  testDesc = testDesc.replace(/"Madrigal":.+/gi, "");
  testDesc = testDesc.replace(/Unity Ranking:.+/gi, "");
  testDesc = testDesc.replace(/All Jumps:.+/gi, "");
  testDesc = testDesc.replace(/While in Adoulin:.+/gi, "");
  testDesc = testDesc.replace(/Eastern Ulbuka:.+/gi, "");
  testDesc = testDesc.replace(/Physical damage:.+/gi, "");
  testDesc = testDesc.replace(/Darksday:.+/gi, "");
  testDesc = testDesc.replace(/Lightsdays:.+/gi, "");
  testDesc = testDesc.replace(/Dusk to dawn:.+/gi, "");
  testDesc = testDesc.replace(/Nighttime:.+/gi, "");
  testDesc = testDesc.replace(/Grimoire:.+/gi, "");
  testDesc = testDesc.replace(/"High Jump":.+/gi, "");
  testDesc = testDesc.replace(/"Third Eye":.+/gi, "");
  testDesc = testDesc.replace(/Carbuncle:.+/gi, "");
  testDesc = testDesc.replace(/"Sekkanoki":.+/gi, "");
  testDesc = testDesc.replace(/Depending on day or weather:.+/gi, "");
  testDesc = testDesc.replace(/Sphere:.+/gi, "");
  testDesc = testDesc.replace(/Striking Flourish:.+/gi, "");
  testDesc = testDesc.replace(/Addendum:.+/gi, "");

  // Remove Stats that don't have Values in Desc @@TODO: Account for stats
  testDesc = testDesc.replace(/Occasionally absorbs ice elemental damage/gi, "");
  testDesc = testDesc.replace(/Occasionally absorbs fire elemental damage/gi, "");
  testDesc = testDesc.replace(/Occasionally absorbs earth elemental damage/gi, "");
  testDesc = testDesc.replace(/Occasionally absorbs wind elemental damage/gi, "");
  testDesc = testDesc.replace(/Occasionally absorbs lightning elemental damage/gi, "");
  testDesc = testDesc.replace(/Occasionally absorbs water elemental damage/gi, "");
  testDesc = testDesc.replace(/Occasionally absorbs magic damage taken/gi, "");
  testDesc = testDesc.replace(/Occasionally boosts TP when damaged/gi, "");
  testDesc = testDesc.replace(/Occasionally absorbs damage taken/gi, "");
  testDesc = testDesc.replace(/Enhances "Fast Cast" effect/gi, "");
  testDesc = testDesc.replace(/Enhances "Refresh" potency/gi, "");
  testDesc = testDesc.replace(/Enhances "Snapshot" effect/gi, "");
  testDesc = testDesc.replace(/Enhances "Berserk" effect/gi, "");
  testDesc = testDesc.replace(/Enhances "Chakra" effect/gi, "");
  testDesc = testDesc.replace(/Enhances "Dual Wield" effect/gi, "");
  testDesc = testDesc.replace(/Enhances "Cover" effect/gi, "");
  testDesc = testDesc.replace(/Enhances "High Jump" effect/gi, "");
  testDesc = testDesc.replace(/Enhances "Ancient Circle" effect/gi, "");
  testDesc = testDesc.replace(/Enhances "Skillchain Bonus" effect/gi, "");
  testDesc = testDesc.replace(/Enhances "Light Arts" effect/gi, "");
  testDesc = testDesc.replace(/Augments "Conspirator"/gi, "");
  testDesc = testDesc.replace(/Increases critical hit damage/gi, "");
  testDesc = testDesc.replace(/Mitigates dmg. taken based on enmity/gi, "");
  testDesc = testDesc.replace(/Adds "Refresh" effect/gi, "");
  testDesc = testDesc.replace(/Adds "Regen" and "Refresh" effect/gi, "");
  testDesc = testDesc.replace(/Cannot Equip Handgear/gi, "");
  testDesc = testDesc.replace(/Cannot Equip Headgear/gi, "");
  testDesc = testDesc.replace(/Cannot equip hand or footgear/gi, "");
  testDesc = testDesc.replace(/Cannot equip leggear/gi, "");
  testDesc = testDesc.replace(/Cannot Equip Footgear/gi, "");
  testDesc = testDesc.replace(/Increases duration of "Refresh" effect received/gi, "");
  testDesc = testDesc.replace(/Enhances "Zanshin" effect/gi, "");

  tests.forEach((test) => {
    const [stat, desc] = getStats(testDesc, test.test);
    if (stat !== 0) item.stats[test.stat] = stat;
    testDesc = desc;
  });

  item.slotName = getArmorSlot(item.slots);
  item.jobSlots = getJobSlot(item.jobs);

  // Remaing Desc
  if (String(testDesc.replace(/(\r\n|\n|\r|\s)/gm, "")).length >= 5)
    console.log(`ID:${item._id} Desc:${testDesc}`);

  delete item["jobs"];
  delete item["slots"];
  delete item["descTest"];

  return item;
}

const getStats = (testDesc, tests) => {
  let desc = testDesc;
  let stat = 0;

  tests.forEach((test) => {
    let match = desc.match(test);
    // console.log(desc)
    // console.log(match)
    if (match) {
      let type = match[0].match(/(:|\+|-|\s)+(?!\S*(:|\+|-|\s))/g)[0];
      let value = match[0].match(/\d+/g)[0];
      if (type === "-") {
        stat = Number(value) * -1;
      } else {
        stat = Number(value) * 1;
      }
      desc = testDesc.replace(test, "");
    }
  });
  return [stat, desc];
};
