import { describe, expect, it } from 'vitest';
import { PRIVATE_HOSTS, PROJECTS } from '../../app/data/projects';
import { structuredData } from '../../app/utils/structured-data';
import { contourLines } from '../../app/utils/contours';
import { llmsTxt, robotsTxt, sitemapXml } from '../../server/utils/discovery';
import { contentSecurityPolicy } from '../../server/utils/security-headers';

describe('discovery files', () => {
  it('robots.txt allows all and points at the sitemap', () => {
    expect(robotsTxt()).toContain('Allow: /');
    expect(robotsTxt()).toContain('Sitemap: https://geoql.in/sitemap.xml');
  });

  it('sitemap.xml lists the canonical URL', () => {
    const xml = sitemapXml('2026-10-22');
    expect(xml).toContain('<loc>https://geoql.in/</loc>');
    expect(xml).toContain('<lastmod>2026-10-22</lastmod>');
  });

  it('llms.txt names every project and no private host', () => {
    const txt = llmsTxt();
    expect(txt.startsWith('# GeoQL\n')).toBe(true);
    for (const project of PROJECTS) {
      expect(txt).toContain(`](${project.url})`);
    }
    expect(txt).not.toContain('Internal');
    for (const host of PRIVATE_HOSTS) expect(txt).not.toContain(host);
  });
});

describe('structured data', () => {
  it('lists every public project in the ItemList', () => {
    const graph = structuredData()['@graph'];
    const types = graph.map((node) => node['@type']);
    expect(types).toEqual(['Organization', 'WebSite', 'ItemList']);
    const list = graph[2] as { itemListElement: unknown[] };
    expect(list.itemListElement).toHaveLength(PROJECTS.length);
  });
});

describe('content security policy', () => {
  it('allows the three trackers and forbids framing', () => {
    const csp = contentSecurityPolicy('abc');
    expect(csp).toContain("'nonce-abc'");
    expect(csp).toContain('https://analytics.geoql.in');
    expect(csp).toContain('https://events.geoql.in');
    expect(csp).toContain('https://www.googletagmanager.com');
    expect(csp).toContain('https://*.google-analytics.com');
    expect(csp).toContain("frame-ancestors 'none'");
  });
});

describe('contour lines', () => {
  it('is deterministic and closed', () => {
    const a = contourLines({ cx: 0, cy: 0, count: 8, r0: 10, step: 5 });
    const b = contourLines({ cx: 0, cy: 0, count: 8, r0: 10, step: 5 });
    expect(a).toEqual(b);
    expect(a).toHaveLength(8);
    expect(a.every((line) => line.d.endsWith('Z'))).toBe(true);
    expect(a.filter((line) => line.index)).toHaveLength(2);
  });
});
