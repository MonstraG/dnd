import { allSpells } from "./allSpells";
import { archtype } from "./spells.types";

// 147: 'домен войны (жрец)',

const known: Record<archtype, string> = {
    143: 'круг дикого огня (друид)',
    145: 'круг спор (друид)',
    146: 'домен бури (жрец)',
    147: 'домен войны (жрец)',
    149: 'домен знаний (жрец)',
    150: 'домен обмана (жрец)',
    151: 'домен природы (жрец)',
    154: 'домен магии (жрец)',
    155: 'домен кузни (жрец)',
    156: 'домен упокоения (жрец)',
    158: 'домен порядка (жрец)',
    160: 'алхимик (изобретатель)',
    162: 'боевой кузнец (изобретатель)',
    163: 'бронник (изобретатель)',
    165: 'исчадие (колдун)',
    166: 'Великий Древний (колдун)',
    168: 'ведьмовской клинок (колдун)',
    170: 'бездонный (колдун)',
    171: 'гений (колдун)',
    174: 'путь тени (монах)',
    175: 'путь четырёх стихий (монах)',
    184: 'клятва древних (паладин)',
    186: 'клятвопреступник (паладин)',
    187: 'клятва короны (паладин)',
    189: 'клятва покорения (паладин)',
    190: 'клятва славы (паладин)',
    191: 'клятва смотрителей (паладин)',
    204: 'сумрачный охотник (следопыт)',
    207: 'хранитель роя (следопыт)',
    208: 'наездник на дрейке (следопыт)',
    211: "божественная душа (чародей)",
    214: 'аберрантный разум (чародей)',
    215: 'заводная душа (чародей)',
    286: 'лунное чародейство (чародей)',
    148: 'домен жизни (жрец)',
    152: 'домен света (жрец)',
    153: 'домен смерти (жрец)',
    157: 'домен мира (жрец)',
    159: 'домен сумерек (жрец)',
    161: 'артиллерист (изобретатель)',
    167: 'бессмертный (колдун)',
    169: 'небожитель (колдун)',
    172: 'нежить (колдун)',
    185: 'клятва мести (паладин)',
    188: 'клятва искупления (паладин)',
    194: 'мистический ловкач (плут)',
    203: 'странник горизонта (следопыт)',
    205: 'убийца монстров (следопыт)',
    206: 'странник фей (следопыт)',
    107: 'коллегия духов (бард)',
    135: 'магия хронургии (волшебник)',
    136: 'магия гравитургии (волшебник)',
    139: 'круг земли (друид)',
    144: 'круг звёзд (друид)',
    164: 'архифея (колдун)',
    183: 'клятва преданности (паладин)',
    212: 'теневая магия (чародей)',
    179: 'путь солнечной души (монах)'
}

const knownNames = Object.values(known);
const knownIds = Object.keys(known).map(x => parseInt(x));


const dict: Record<number, string> = {
}

const main = () => {
    for(let spell of allSpells) {
        const hasOneButNotOther = (spell.archtype == null) !== (spell.archtypes == null);
        if (hasOneButNotOther) {
            console.log(spell.slug + "hasOneButNotOther BAD!!!!!");
            return;
        }

        if (spell.archtype == null || spell.archtypes == null) continue;

        const archtypes = spell.archtype.filter(n => !knownIds.includes(n));
        const names = spell.archtypes.split(",").map(n => n.trim()).filter(n => !knownNames.includes(n))

        if (names.length !== archtypes.length) {
            console.log(names, archtypes)
            console.log(spell.slug + "DIFFERENT LENGTHS!! BAD!!!!!");
            return;
        }


        for (let index in names) {

            const archtypeId: number = archtypes[index]!;
            const name = names[index]!

            if (dict[archtypeId] == null) {
                dict[archtypeId] = name;
            } else if (dict[archtypeId] != name) {
                console.log({archtypeId, name})
                console.log(spell.slug + "DIFFERENT ORDERS!!! BAD!!!!!");
                return;
            }
        }
    }
}

main();

console.log(dict);