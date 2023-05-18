import { allSpells } from "./allSpells";
import { archtypes } from "./spells.types";

const knownNames = Object.values(archtypes);
const knownIds = Object.keys(archtypes).map((x) => parseInt(x));

const dict: Record<number, string> = {};

// used to be true before
const allSpellsWhileTransforming = allSpells as unknown as (Omit<
  (typeof allSpells)[number],
  "archtypes"
> & { archtype: number[]; archtypes: string })[];

const main = () => {
  for (let spell of allSpellsWhileTransforming) {
    const hasOneButNotOther =
      (spell.archtype == null) !== (spell.archtypes == null);
    if (hasOneButNotOther) {
      console.log(spell.slug + "hasOneButNotOther BAD!!!!!");
      return;
    }

    if (spell.archtype == null || spell.archtypes == null) continue;

    const archtypes = spell.archtype.filter((n) => !knownIds.includes(n));
    const names = spell.archtypes
      .split(",")
      .map((n) => n.trim())
      .filter((n) => !knownNames.includes(n));

    if (names.length !== archtypes.length) {
      console.log(names, archtypes);
      console.log(spell.slug + "DIFFERENT LENGTHS!! BAD!!!!!");
      return;
    }

    for (let index in names) {
      const archtypeId: number = archtypes[index]!;
      const name = names[index]!;

      if (dict[archtypeId] == null) {
        dict[archtypeId] = name;
      } else if (dict[archtypeId] != name) {
        console.log({ archtypeId, name });
        console.log(spell.slug + "DIFFERENT ORDERS!!! BAD!!!!!");
        return;
      }
    }
  }
};

main();

console.log(dict);
