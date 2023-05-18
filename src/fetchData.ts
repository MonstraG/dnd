import { spells } from "./parsedSpells";
import fs from "fs/promises";
import { parse } from 'node-html-parser';
import { setTimeout } from 'timers/promises';


(async () => {
    const safeguard = true;
    // don't accidentally call it!
    if (safeguard) return;

    const targetDir = "./pages/";

    await (async function createFolder() {
        await fs.mkdir(targetDir, { recursive: true });
    })();

    async function main() {
        for (let spell of spells) {
            console.log(`Querying ${spell.slug}`)
            const response = await fetch(spell.href);
            const text = await response.text();
            const document = parse(text);
            const article = document.querySelector(".card-body.new-article");
            if (article == null) {
                fs.writeFile("log.txt", "Failed to get article for " + spell.slug, {mode: "a"})
            }
            const filePath = `${targetDir}/${spell.slug}.html`;
            await fs.writeFile(filePath, article!.outerHTML)
            console.log(`Written ${spell.slug}`)
            await setTimeout(1000);
        }
    }

    await main();
})();
