#!/usr/bin/env node
/** 核对 asset-manifest.json 里登记的本地文件是否真实存在。 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'asset-manifest.json'), 'utf8'));

let missing = 0;
let checked = 0;

for (const item of manifest.items) {
  if (!item.localPath) continue;
  for (const part of item.localPath.split('｜')) {
    if (part.includes('*')) continue;
    checked += 1;
    const full = resolve(root, part);
    if (!existsSync(full)) {
      console.error(`缺失: ${item.id} -> ${part}`);
      missing += 1;
    } else {
      console.log(`ok: ${item.id} ${part} (${statSync(full).size} bytes)`);
    }
  }
}

console.log(`\n检查 ${checked} 个文件，缺失 ${missing} 个。`);
process.exit(missing === 0 ? 0 : 1);
