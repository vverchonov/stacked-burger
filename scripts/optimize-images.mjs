#!/usr/bin/env node
/**
 * Pre-prod: convert raster assets under public/ to WebP and re-encode large WebPs
 * (downscale + quality) to stay under a byte budget.
 *
 * Usage:
 *   node scripts/optimize-images.mjs [--dry-run] [--delete-sources] [--fix-refs]
 *   npm run images:optimize -- --dry-run
 */

import fs from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const RASTER_EXT = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.tif',
  '.tiff',
  '.bmp',
  '.avif',
]);
const SKIP_EXT = new Set(['.svg', '.ico', '.gif']);

const SOURCE_CODE_EXT = new Set(['.ts', '.tsx', '.js', '.jsx']);
const REF_FIX_EXT = new Set([...SOURCE_CODE_EXT, '.webmanifest']);

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseArgs(argv) {
  const opts = {
    root: path.join(process.cwd(), 'public'),
    appRoot: path.join(process.cwd(), 'app'),
    maxBytes: 800 * 1024,
    maxEdge: 2048,
    qualityStart: 82,
    minQuality: 65,
    effort: 6,
    dryRun: false,
    deleteSources: false,
    fixRefs: false,
  };

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--help' || a === '-h') {
      opts.help = true;
      continue;
    }
    if (a === '--dry-run') {
      opts.dryRun = true;
      continue;
    }
    if (a === '--delete-sources') {
      opts.deleteSources = true;
      continue;
    }
    if (a === '--fix-refs') {
      opts.fixRefs = true;
      continue;
    }
    if (a === '--root' && argv[i + 1]) {
      opts.root = path.resolve(process.cwd(), argv[++i]);
      continue;
    }
    if (a === '--max-bytes' && argv[i + 1]) {
      opts.maxBytes = Number(argv[++i]);
      continue;
    }
    if (a === '--max-edge' && argv[i + 1]) {
      opts.maxEdge = Number(argv[++i]);
      continue;
    }
    if (a === '--quality' && argv[i + 1]) {
      opts.qualityStart = Number(argv[++i]);
      continue;
    }
    if (a === '--min-quality' && argv[i + 1]) {
      opts.minQuality = Number(argv[++i]);
      continue;
    }
    if (a === '--effort' && argv[i + 1]) {
      opts.effort = Number(argv[++i]);
      continue;
    }
    console.error(`Unknown argument: ${a}`);
    process.exitCode = 1;
    opts.help = true;
    break;
  }
  return opts;
}

function printHelp() {
  console.log(`
optimize-images — WebP conversion + size cap for assets under public/

  node scripts/optimize-images.mjs [options]

Options:
  --root <dir>       Asset root (default: ./public)
  --max-bytes <n>    Re-encode when file size exceeds this (default: ${800 * 1024})
  --max-edge <px>    Max width/height (long edge) after resize (default: 2048)
  --quality <1-100>  Starting WebP quality when compressing (default: 82)
  --min-quality <n>  Floor quality when compressing (default: 65)
  --effort <0-6>     WebP encoder effort (default: 6)
  --dry-run          Log actions only; do not write files
  --delete-sources   Remove PNG/JPEG/etc. after a successful .webp write
  --fix-refs         Update path strings in ./app, .webmanifest (app + image root)

Examples:
  npm run images:optimize -- --dry-run
  npm run images:optimize -- --delete-sources --fix-refs
`);
}

/** @param {string} dir */
async function walkFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  /** @type {string[]} */
  const out = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walkFiles(full)));
    } else if (e.isFile()) {
      out.push(full);
    }
  }
  return out;
}

/**
 * Encode input to WebP with optional long-edge clamp and quality.
 * @param {string} inputPath
 * @param {{ maxEdge: number, quality: number, effort: number }} o
 */
async function encodeWebpFromFile(inputPath, o) {
  let img = sharp(inputPath);
  const meta = await img.metadata();
  const w = meta.width;
  const h = meta.height;
  if (w && h && Math.max(w, h) > o.maxEdge) {
    img = img.resize({
      width: o.maxEdge,
      height: o.maxEdge,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }
  return img.webp({
    quality: o.quality,
    effort: o.effort,
    smartSubsample: true,
  }).toBuffer();
}

/**
 * Shrink until buffer is <= maxBytes or limits hit.
 * @param {string} inputPath
 * @param {{ maxBytes: number, maxEdge: number, qualityStart: number, minQuality: number, effort: number }} opts
 */
async function compressToBudget(inputPath, opts) {
  const { maxBytes, maxEdge, qualityStart, minQuality, effort } = opts;
  let edge = maxEdge;

  for (let round = 0; round < 10; round++) {
    for (let q = qualityStart; q >= minQuality; q -= 3) {
      const buf = await encodeWebpFromFile(inputPath, {
        maxEdge: edge,
        quality: q,
        effort,
      });
      if (buf.length <= maxBytes) {
        return { buffer: buf, edge, quality: q };
      }
    }
    edge = Math.floor(edge * 0.8);
    if (edge < 320) {
      break;
    }
  }

  const buf = await encodeWebpFromFile(inputPath, {
    maxEdge: Math.max(320, Math.floor(edge)),
    quality: minQuality,
    effort,
  });
  return { buffer: buf, edge: Math.max(320, Math.floor(edge)), quality: minQuality };
}

/**
 * First pass for “normal” assets: high quality; only run budget pipeline if still too big.
 * @param {string} inputPath
 * @param {Parameters<typeof compressToBudget>[1]} opts
 */
async function convertOrReencodeToWebp(inputPath, opts) {
  const buf = await encodeWebpFromFile(inputPath, {
    maxEdge: opts.maxEdge,
    quality: Math.min(90, opts.qualityStart + 6),
    effort: opts.effort,
  });
  if (buf.length <= opts.maxBytes) {
    return { buffer: buf, edge: opts.maxEdge, quality: Math.min(90, opts.qualityStart + 6) };
  }
  return compressToBudget(inputPath, opts);
}

/** @param {string} publicRoot @param {string} filePath */
function publicUrlForFile(publicRoot, filePath) {
  const rel = path.relative(publicRoot, filePath).split(path.sep).join('/');
  return '/' + rel;
}

/** @param {string} dir */
async function walkRefFixFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  /** @type {string[]} */
  const out = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walkRefFixFiles(full)));
    } else if (e.isFile()) {
      const ext = path.extname(e.name).toLowerCase();
      if (REF_FIX_EXT.has(ext)) {
        out.push(full);
      }
    }
  }
  return out;
}

/**
 * @param {{ oldUrl: string, newUrl: string }[]} pairs
 * @param {string} appRoot
 * @param {string} publicRoot
 */
async function fixRefsInApp(pairs, appRoot, publicRoot) {
  if (pairs.length === 0) {
    return;
  }
  /** @type {string[]} */
  const roots = [appRoot, publicRoot];
  /** @type {Set<string>} */
  const seen = new Set();
  /** @type {string[]} */
  const files = [];
  for (const r of roots) {
    try {
      await fs.stat(r);
    } catch {
      continue;
    }
    for (const f of await walkRefFixFiles(r)) {
      if (!seen.has(f)) {
        seen.add(f);
        files.push(f);
      }
    }
  }
  for (const file of files) {
    let content = await fs.readFile(file, 'utf8');
    let changed = false;
    for (const { oldUrl, newUrl } of pairs) {
      if (content.includes(oldUrl)) {
        content = content.split(oldUrl).join(newUrl);
        changed = true;
      }
      const absRe = new RegExp(`https://[^\\s"']+${escapeRegex(oldUrl)}`, 'g');
      const next = content.replace(absRe, (m) => m.replace(oldUrl, newUrl));
      if (next !== content) {
        content = next;
        changed = true;
      }
    }
    if (!changed) {
      continue;
    }
    if (!file.endsWith('.webmanifest')) {
      content = content.replace(
        /(\{ href: '[^']+\.webp',\s*)type: 'image\/png'/g,
        "$1type: 'image/webp'"
      );
      content = content.replace(
        /(\{ href: "[^"]+\.webp",\s*)type: "image\/png"/g,
        '$1type: "image/webp"'
      );
    }
    if (file.endsWith('.webmanifest')) {
      if (!/\.png/.test(content)) {
        content = content.replace(/image\/png/g, 'image/webp');
      }
    }
    await fs.writeFile(file, content, 'utf8');
    console.log(`  refs updated: ${path.relative(process.cwd(), file)}`);
  }
}

async function main() {
  const opts = parseArgs(process.argv);
  if (opts.help) {
    printHelp();
    process.exit(process.exitCode ?? 0);
    return;
  }

  const root = opts.root;
  try {
    await fs.stat(root);
  } catch {
    console.error(`Root not found: ${root}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Image root: ${root}`);
  console.log(
    `Budget: ≤ ${opts.maxBytes} bytes · long edge ≤ ${opts.maxEdge}px · quality ${opts.qualityStart}→${opts.minQuality} · effort ${opts.effort}`
  );
  if (opts.dryRun) {
    console.log('(dry-run: no files will be written)\n');
  }

  const files = await walkFiles(root).then((xs) => xs.sort());
  /** @type {Map<string, string>} */
  const refMap = new Map();

  for (const filePath of files) {
    const ext = path.extname(filePath).toLowerCase();

    if (SKIP_EXT.has(ext)) {
      console.log(`skip ${publicUrlForFile(root, filePath)} (${ext} not processed)`);
      continue;
    }

    if (ext === '.webp') {
      const st = await fs.stat(filePath);
      if (st.size <= opts.maxBytes) {
        continue;
      }
      const rel = publicUrlForFile(root, filePath);
      console.log(
        `compress ${rel} (${(st.size / 1024).toFixed(0)} KB → target ≤ ${(opts.maxBytes / 1024).toFixed(0)} KB)`
      );
      if (opts.dryRun) {
        continue;
      }
      const { buffer, edge, quality } = await compressToBudget(filePath, opts);
      await fs.writeFile(filePath, buffer);
      console.log(
        `  wrote ${rel} (${(buffer.length / 1024).toFixed(0)} KB, edge≤${edge}, q=${quality})`
      );
      continue;
    }

    if (!RASTER_EXT.has(ext)) {
      continue;
    }

    const dir = path.dirname(filePath);
    const webpPath = path.join(dir, `${path.basename(filePath, ext)}.webp`);
    const oldUrl = publicUrlForFile(root, filePath);
    const newUrl = publicUrlForFile(root, webpPath);

    const st = await fs.stat(filePath);
    console.log(
      `convert ${oldUrl} (${(st.size / 1024).toFixed(0)} KB) → ${path.basename(webpPath)}`
    );

    if (opts.dryRun) {
      refMap.set(oldUrl, newUrl);
      continue;
    }

    const { buffer, edge, quality } = await convertOrReencodeToWebp(filePath, opts);
    await fs.writeFile(webpPath, buffer);
    console.log(
      `  wrote ${newUrl} (${(buffer.length / 1024).toFixed(0)} KB, edge≤${edge}, q=${quality})`
    );

    refMap.set(oldUrl, newUrl);

    if (opts.deleteSources) {
      await fs.unlink(filePath);
      console.log(`  deleted source ${oldUrl}`);
    }
  }

  const refPairs = [...refMap.entries()].map(([oldUrl, newUrl]) => ({
    oldUrl,
    newUrl,
  }));

  if (opts.fixRefs && refPairs.length > 0 && !opts.dryRun) {
    console.log('\nUpdating path strings in ./app …');
    await fixRefsInApp(refPairs, opts.appRoot, opts.root);
  } else if (opts.fixRefs && opts.dryRun) {
    console.log('\n(--fix-refs skipped in dry-run)');
  }

  console.log(opts.dryRun ? '\nDry-run complete.' : '\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
