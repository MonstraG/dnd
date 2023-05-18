import { allSpells } from "allSpells";
import { Spell, UnparsedSpell, schoolBySlug } from "spells.types";

const parseSpell = (spell: UnparsedSpell): Spell => ({
  ...spell,
  school: schoolBySlug[spell.schoolSlug],
  item_icon: `spell_school_${spell.schoolSlug}`,
  filterText: `${spell.title.toLowerCase()} ${spell.title_en.toLowerCase()}`,
  href: `https://dnd.su/spells/${spell.slug}`,
});

export const spells: Spell[] = allSpells.map(parseSpell);
