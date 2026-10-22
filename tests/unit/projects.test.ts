import { describe, expect, it } from 'vitest';
import {
  PUBLIC_PROJECTS,
  PUBLIC_SECTIONS,
  SECTIONS,
  hostOf,
} from '../../app/data/projects';

describe('project index data', () => {
  const all = SECTIONS.flatMap((section) => section.projects);

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

  it('keeps internal tools out of the public lists', () => {
    expect(PUBLIC_SECTIONS.some((section) => section.internal)).toBe(false);
    expect(
      PUBLIC_PROJECTS.some((p) => hostOf(p.url) === 'vault.geoql.in'),
    ).toBe(false);
  });

  it('writes descriptions as one line without a trailing period', () => {
    for (const project of all) {
      expect(project.description).not.toMatch(/\.$|\n/);
    }
  });
});
