import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { structuredData } from '../../app/utils/structured-data';
import { llmsTxt, sitemapXml } from '../../server/utils/discovery';

/**
 * Private repositories and unreleased products never appear on this public
 * site or in this public repo. The names are stored only as SHA-256 digests
 * of the lowercase word, hostname or owner/repo slug, so this file does not
 * leak them either.
 */
const FORBIDDEN_DIGESTS = new Set([
  '72165796b67119a7b57759b350a2663346c1cefbf4a17c88d9bbb2fe7f35d478',
  '7559a9a1a2623c9ec9bb334230a1005eaa7f4aebbf8fb9266313e49d57f84fea',
  '45df6e6712bdafb88a8b133ffbcf435d5bc458b5e90de18daf6f2245f540613f',
  'f1a3ec0ea4f47cd20634df7acee8a0583eaffc3772dfefa33989d0971f1549c0',
  'e4f743a670ac2a340e23542b6a72869b339e418de43406685bcd2705d1b694a5',
  'e2d14981b3895a8ece7be2206724c752ef1205882e4dc1ed6f745add079b9634',
  '85d808232e01037fa6a8055cd090c1173854d72f6513f23ebcee6a3260d31660',
  '43daf55a26ade264c25dfcd151281ce46940f5508a573b17b2ba18d4fe41f6f5',
  'e2520c990efb01e3dd6542f071a56d7b1c8eb66dad3da1e89db544c56ddee0cf',
  'dc50f77b1cd9db35fd7b734401cee296869fe08612ae07904b6309f938d884a2',
  '0b9a5d20aa9c44fac80f4b7ae6ba685b59d71caf16301f1354eb4b148d623cc0',
  '15a489db9e9f88a9aed5059b9c3bdd12db4dad837cb14b06ea09cbc31f279430',
  '0c918cc13d6af28552094e90198f77c9072783088938c69c946e2c99fa95419f',
  '7dc93e700df37018813392832eaf7efd4ebbd84a820c54068764b21a9fa7d505',
  '04df4cb3209399bf080f2293a807631fcf2cf8936f9c33b8974899dd0d838854',
  '1f0b6766369afb431c7b84d5173694a128d887cc7f27c37254a5d2bfae411d22',
]);

const ROOT = join(import.meta.dirname, '..', '..');
const SCANNED = ['app', 'server', 'public', 'README.md', 'nuxt.config.ts'];
const TEXT_FILE = /\.(ts|vue|css|md|json|txt|svg|html)$/;

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

/** Every word, hostname suffix and owner/repo pair in the text. */
function candidates(text: string): Set<string> {
  const out = new Set<string>();
  for (const token of text.toLowerCase().match(/[a-z0-9][a-z0-9./-]*/g) ?? []) {
    const segments = token.split('/').filter(Boolean);
    segments.forEach((segment, i) => {
      const labels = segment.split('.').filter(Boolean);
      for (let j = 0; j < labels.length; j++)
        out.add(labels.slice(j).join('.'));
      for (const word of segment.split(/[^a-z0-9]+/)) if (word) out.add(word);
      const next = segments[i + 1];
      if (next) out.add(`${segment}/${next}`);
    });
  }
  return out;
}

function leaks(text: string): string[] {
  return [...candidates(text)]
    .map(sha256)
    .filter((digest) => FORBIDDEN_DIGESTS.has(digest));
}

function files(path: string): string[] {
  const full = join(ROOT, path);
  if (statSync(full).isFile()) return [path];
  return readdirSync(full).flatMap((entry) => files(join(path, entry)));
}

describe('private repository names', () => {
  it('never appear in the site source', () => {
    const hits: Record<string, string[]> = {};
    for (const file of SCANNED.flatMap(files)) {
      if (!TEXT_FILE.test(file)) continue;
      const found = leaks(readFileSync(join(ROOT, file), 'utf8'));
      if (found.length) hits[file] = found;
    }
    expect(hits).toEqual({});
  });

  it('never appear in llms.txt, the sitemap or the structured data', () => {
    expect(leaks(llmsTxt())).toEqual([]);
    expect(leaks(sitemapXml('2026-10-27'))).toEqual([]);
    expect(leaks(JSON.stringify(structuredData()))).toEqual([]);
  });
});
