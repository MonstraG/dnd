import { allSpells } from "allSpells";
import { Spell, UnparsedSpell, schoolsByid } from "spells.types";

const parseSpell = (spell: UnparsedSpell): Spell => {
  const school = schoolsByid[spell.schoolId];
  return {
    ...spell,
    school,
    item_icon: `spell_school_${school.slug}`,
    filterText: `${spell.title.toLowerCase()} ${spell.title_en.toLowerCase()}`,
    href: `https://dnd.su/spells/${spell.slug}`,
    duration: "Концентрация, " + spell.duration,
  };
};

export const spells: Spell[] = allSpells.map(parseSpell);
