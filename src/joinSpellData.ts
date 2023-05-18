import { allSpells } from "./allSpells";
import fs from "fs/promises";

(async () => {
    const readDir = "./spells/";
    const writeFilePath = `allSpells.json`;

    const data: unknown[] = []
    for (let spell of allSpells) {
        const readFilePath = `${readDir}/${spell.slug}.json`;

        const buffer = await fs.readFile(readFilePath);
        const content = buffer.toString();
        const parsed = JSON.parse(content);
        data.push(parsed);
    }
    await fs.writeFile(writeFilePath, JSON.stringify(data, null, 2));
})();
