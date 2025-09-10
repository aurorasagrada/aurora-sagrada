import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../data/vsop87');
await fs.promises.mkdir(OUT_DIR, { recursive: true });

const CDS_BASE = 'https://cdsarc.cds.unistra.fr/ftp/cats/VI/81/';
const GH_BASE  = 'https://raw.githubusercontent.com/ctdk/vsop87/master/';

const PLANET_MAP = {
  MERCURIO: 'mer', VENUS: 'ven', EARTH: 'ear', MARS: 'mar',
  JUPITER: 'jup', SATURN: 'sat', URANUS: 'ura', NEPTUNE: 'nep', PLUTO: 'plu'
};

async function fetchText(urls) {
  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return await res.text();
    } catch (e) {
      if (url === urls.at(-1)) throw e;
    }
  }
}

function splitBlocks(txt) {
  const lines = txt.split(/\r?\n/);
  const blocks = {};
  let current = null;

  const headerRe = /VSOP87\s+VERSION\s+A\s+-\s+([LBR])(\d)/i;
  for (const line of lines) {
    const m = line.match(headerRe);
    if (m) {
      current = `${m[1].toUpperCase()}${m[2]}`;
      blocks[current] = [];
      continue;
    }
    if (!current) continue;
    const t = line.trim().split(/\s+/);
    if (t.length >= 4 && /^\d+$/.test(t[0])) {
      const A = Number(t[1]);
      const B = Number(t[2]);
      const C = Number(t[3]);
      if (Number.isFinite(A) && Number.isFinite(B) && Number.isFinite(C)) {
        blocks[current].push([A, B, C]);
      }
    }
  }
  return blocks;
}

function packJSON(blocks) {
  function arr(prefix) {
    const out = [];
    for (let k = 0; k <= 5; k++) out.push(blocks[`${prefix}${k}`] || []);
    return out;
  }
  return { L: arr('L'), B: arr('B'), R: arr('R') };
}

async function buildPlanet(planetKey) {
  const code = PLANET_MAP[planetKey];
  const filename = `VSOP87A.${code}`;
  const urls = [
    CDS_BASE + filename,
    GH_BASE + filename
  ];
  const raw = await fs.promises.readFile(path.join(OUT_DIR, `VSOP87A.${code}`), 'utf-8');
  const blocks = splitBlocks(raw);
  const json = packJSON(blocks);
  const outPath = path.join(OUT_DIR, `${planetKey}.json`);
  await fs.promises.writeFile(outPath, JSON.stringify(json));
  console.log('✔', planetKey, '→', outPath);
}

(async () => {
  const planets = Object.keys(PLANET_MAP).filter(p => p !== 'PLUTO');
  for (const p of planets) {
    await buildPlanet(p);
  }
  console.log('Todos os JSONs VSOP87A gerados em', OUT_DIR);
})();

