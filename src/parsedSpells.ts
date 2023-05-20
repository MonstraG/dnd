import { allSpells } from "./allSpells";
import { Spell, schoolsByid, UnparsedSpell } from "spells.types";

const parseSpell = (spell: UnparsedSpell): Spell => {
  const school = schoolsByid[spell.schoolId];
  const slug = getSpellSlug(spell);
  if (spell.concentration) {
    spell.duration = `Концентрация, ${spell.duration}`;
  }
  return {
    ...spell,
    slug,
    school,
    item_icon: `spell_school_${school.slug}`,
    filterText: `${spell.title.toLowerCase()} ${spell.titleEn.toLowerCase()}`,
    href: `https://dnd.su/spells/${slug}`,
  };
};

const getSpellSlug = (spell: UnparsedSpell): string => {
  const slug = spell.titleEn
    .toLowerCase()
    .replace(/[&\/\\#, +()$~%.'":*?<>{}’-]/g, "_")
    .replaceAll("__", "_");
  return `${spell.id}-${slug}`;
};

export const spells: Spell[] = allSpells.map(parseSpell);
