#!/usr/bin/env node
/**
 * 发布闸门。只在 `npm run build:release` 时运行。
 * 本地预览与普通 build 不受影响（npm run dev / npm run build）。
 *
 * 任何一项未定稿就退出非 0，避免把草案条款或未授权字体当正式发布。
 */
import { readFileSync, existsSync } from 'node:fs';

const blockers = [];
const warnings = [];

// 1) 条款定稿状态
const siteConfig = readFileSync(new URL('../src/config/site.ts', import.meta.url), 'utf8');
if (/export const LEGAL_FINALIZED = false/.test(siteConfig)) {
  blockers.push(
    '用户协议仍标为未定稿（LEGAL_FINALIZED = false）。现有 terms.html 含草案与占位项，需团队定稿后再发布。',
  );
}

// 2) 正式域名
if (!process.env.VITE_SITE_ORIGIN) {
  blockers.push('未设置 VITE_SITE_ORIGIN，canonical 与 hreflang 无法输出真实地址。');
}

// 3) 品牌字体授权
if (process.env.VITE_BRAND_FONT_LICENSED !== '1') {
  blockers.push(
    'PP Editorial New 商业发布授权未确认（VITE_BRAND_FONT_LICENSED != 1）。取得授权或替换为有明确许可的字体后再发布。',
  );
}

// 4) 素材权利状态
if (existsSync(new URL('../asset-manifest.json', import.meta.url))) {
  const manifest = JSON.parse(readFileSync(new URL('../asset-manifest.json', import.meta.url), 'utf8'));
  const conflicts = manifest.items.filter((item) => item.rightsStatus === 'conflict');
  for (const item of conflicts) {
    blockers.push(`素材 ${item.id} 权利状态为 conflict：${item.note}`);
  }
  const unverifiedInUse = manifest.items.filter(
    (item) => item.rightsStatus !== 'approved' && item.productStatus === 'in-use',
  );
  for (const item of unverifiedInUse) {
    blockers.push(`素材 ${item.id} 未核对授权但标为 in-use。`);
  }
  const previewOnly = manifest.items.filter((item) => item.productStatus === 'preview-only');
  for (const item of previewOnly) {
    warnings.push(`素材 ${item.id} 仅供预览：${item.allowedUse}`);
  }
}

for (const warning of warnings) console.warn(`  [warn] ${warning}`);

if (blockers.length > 0) {
  console.error('\n发布闸门未通过。以下项需要团队确认后才能对外发布：\n');
  blockers.forEach((item, index) => console.error(`  ${index + 1}. ${item}`));
  console.error('\n本地预览不受影响：npm run dev / npm run build / npm run preview。');
  console.error('详见 docs/OPEN_ITEMS.md。\n');
  process.exit(1);
}

console.log('发布闸门通过。');
