import { allSpells } from "./allSpells";
import fs from "fs/promises";
import { parse } from "node-html-parser";

(async () => {
  const readDir = "./pages/";
  const targetDir = "./spells/";

  await (async function createFolder() {
    await fs.mkdir(targetDir, { recursive: true });
  })();

  const infoToParse = {
    castTime: "<strong>Время накладывания:</strong> ",
    distance: "<strong>Дистанция:</strong> ",
    duration: "<strong>Длительность:</strong> ",
    archtypes: "<strong>Архетипы:</strong> ",
    source: "<strong>Источник:</strong> ",
  };
  const knownLines = [
    ...Object.values(infoToParse),
    "<strong>Компоненты:</strong> ",
    "<strong>Классы:</strong> ",
    "<strong>Источники:</strong> ",
  ];

  for (let spell of allSpells) {
    const readFilePath = `${readDir}/${spell.slug}.html`;
    const writeFilePath = `${targetDir}/${spell.slug}.json`;

    const buffer = await fs.readFile(readFilePath);
    const document = parse(buffer.toString());
    const lines = [...document?.querySelectorAll(".params > li")!];

    const infoLines = lines.map((x) => x.innerHTML);

    const data: Record<string, string | undefined> = {
      ...Object.fromEntries(
        Object.entries(infoToParse).map(([key, searchStr]) => {
          const foundLine = infoLines.find((l) => l.startsWith(searchStr));
          if (foundLine) {
            return [key, foundLine.replaceAll(searchStr, "")];
          }
          // not found
          if (searchStr === "<strong>Источник:</strong> ") {
            const alternativeSpelling = "<strong>Источники:</strong> ";
            const secondAttempt = infoLines.find((l) =>
              l.startsWith(alternativeSpelling)
            );
            if (secondAttempt) {
              return [key, secondAttempt.replaceAll(alternativeSpelling, "")];
            }
          }
          if (searchStr === "<strong>Архетипы:</strong> ") {
            // they seem to often omit these
            return [key, undefined];
          }

          console.log(`FAILED TO FIND ${searchStr} in ${spell.slug}`);
          return [key, ""];
        })
      ),
      description: document.querySelector(".desc div")?.innerHTML.trim(),
    };

    if (data.source) {
      data.source = data.source
        .replaceAll("<span>", "")
        .replaceAll("</span>", "");
    }

    (function reportOnStrangeLines() {
      const unknownLines = infoLines
        .splice(1)
        .filter((l) => !knownLines.some((kl) => l.startsWith(kl)))
        .filter((x) => !x.includes('<div itemprop="description">'));
      if (unknownLines.length > 0) {
        console.log(`Unknown lines found in ${spell.slug}: ${unknownLines}`);
      }
    })();

    await fs.writeFile(
      writeFilePath,
      JSON.stringify({ ...spell, ...data }, null, 2)
    );
  }
})();
