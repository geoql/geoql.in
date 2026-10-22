import { describe, expect, it } from 'vitest';
import {
  PRIVATE_HOSTS,
  PROJECTS,
  SECTIONS,
  hostOf,
} from '../../app/data/projects';

describe('project index data', () => {
  const all = PROJECTS;

  it('uses unique section ids and unique project URLs', () => {
    const ids = SECTIONS.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
    const urls = all.map((project) => project.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('links only over https, on geoql.in or the-doctor.report', () => {
    for (const project of all) {
      const url = new URL(project.url);
      expect(url.protocol).toBe('https:');
      expect(
        url.host === 'the-doctor.report' || url.host.endsWith('.geoql.in'),
      ).toBe(true);
      if (project.repo)
        expect(project.repo).toMatch(/^https:\/\/github\.com\//);
    }
  });

  it('never lists self-hosted infrastructure', () => {
    const hosts = new Set(all.map((p) => hostOf(p.url)));
    for (const host of PRIVATE_HOSTS) expect(hosts.has(host)).toBe(false);
  });

  it('writes descriptions as one line without a trailing period', () => {
    for (const project of all) {
      expect(project.description).not.toMatch(/\.$|\n/);
    }
  });
});
