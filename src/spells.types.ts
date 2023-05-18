// stolen from https://dnd.su/spells/

type CardLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type SchoolSlug = "evocation" | "enchantment" | "abjuration" | "illusion" | "conjuration" | "transmutation" | "divination" | "necromancy";
type SchoolTitle = "Воплощение" | "Очарование" | "Ограждение" | "Иллюзия" | "Вызов" | "Преобразование" | "Прорицание" | "Некромантия";
type SchoolLvl = 1 | 6 | 5 | 3 | 2 | 7 | 8 | 4;

export type School = {
    slug: SchoolSlug,
    title: SchoolTitle,
    id: SchoolLvl
}

export const schools: School[] = [
    {
        slug: "evocation",
        title: "Воплощение",
        id: 1
    },
    {
        slug: "enchantment",
        title: "Очарование",
        id: 6
    },
    {
        slug: "abjuration",
        title: "Ограждение",
        id: 5
    },
    {
      slug: "illusion",
      title: "Иллюзия",
      id: 3,
    },
    {
      slug: "conjuration",
      title: "Вызов",
      id: 2,
    },
    {
      slug: "transmutation",
      title: "Преобразование",
      id: 7,
    },
    {
      slug: "divination",
      title: "Прорицание",
      id: 8,
    },
    {
      slug: "necromancy",
      title: "Некромантия",
      id: 4,
    }
]

export const schoolBySlug: Record<SchoolSlug, School> = Object.fromEntries(schools.map((s) => [s.slug, s])) as Record<SchoolSlug, School>

export const Classes = {
    13: "жрец",
    16: "паладин",
    20: "колдун",
    21: "волшебник",
    22: "друид",
    12: 'бард',
    19: "чародей",
    17: "следопыт",
    23: "изобретатель"
}

const archtypes = [107,135,136,139,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,174,175,179,183,184,185,186,187,188,189,190,191,194,203,204,205,206,207,208,211,212,214,215,286] as const;
export type archtype = typeof archtypes[number];

export enum CastTimeType {
  Action = 1,
  Reaction = 2,
  BonusAction = 3,
  Minute = 4,
  Hour = 5,
}

export const sources = {
  102: "Player's handbook",
  107: "Princes of the Apocalypse",
  109: "Xanathar's Guide to Everything",
  112: "Guildmasters' guide to Ravnica",
  115: "Acquisition Incorporated",
  116: "Explorer's Guide to Wildemount",
  120: "Icewind Dale: Rime of the Frostmaiden",
  117: "Tasha's Cauldron of Everything",
  152: "Fizban's Treasury of Dragons",
  153: "Lost Laboratory of Kwalish",
  155: "Strixhaven: A Curriculum of Chaos",
  160: "Spelljammer: Adventures in Space",
  108: "Sword Coast Adventurer's Guide"
}

export type UnparsedSpell = {
  slug: string;
  title: string;
  title_en: string;
  level: CardLevel | "Заговор";
  schoolSlug: SchoolSlug
  item_suffix: "В.." | "ВС." | "ВСМ" | "В.М" | ".СМ" | ".С.",
  classes: (keyof typeof Classes)[],
  classesTce: (keyof typeof Classes)[],
  archtype?: archtype[],
  source: (keyof typeof sources)[],
  needsConcentration?: boolean,
  isRitual?: boolean,
  castTimeType: CastTimeType,
  castTime: string,
  distance: string,
  duration: string,
  description: string,
  archtypes?: string,
}

export type Spell = UnparsedSpell & {
    school: School,
    item_icon: `spell_school_${SchoolSlug}`,
    filterText: string,
    href: string,
}