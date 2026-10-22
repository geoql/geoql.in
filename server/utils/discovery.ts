import { SECTIONS, hostOf } from '../../app/data/projects';
import { SITE } from '../../app/data/site';

export function robotsTxt(): string {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SITE.url}/sitemap.xml`,
    '',
  ].join('\n');
}

export function sitemapXml(lastmod: string): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    `    <loc>${SITE.url}/</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    '  </url>',
    '</urlset>',
    '',
  ].join('\n');
}

/** llms.txt (llmstxt.org): H1, blockquote summary, then link lists. */
export function llmsTxt(): string {
  const lines = [`# ${SITE.name}`, '', `> ${SITE.description}`, ''];
  lines.push(
    `GeoQL (${SITE.tagline}) is an open-source GitHub organisation (${SITE.github}) maintained by ${SITE.maintainer.name} (${SITE.maintainer.url}).`,
    '',
  );
  for (const section of SECTIONS) {
    lines.push(
      `## ${section.title}${section.internal ? ' (sign-in required)' : ''}`,
      '',
    );
    for (const project of section.projects) {
      const source = project.repo ? ` Source: ${project.repo}` : '';
      lines.push(
        `- [${project.name}](${project.url}): ${project.description} (${hostOf(project.url)}).${source}`,
      );
    }
    lines.push('');
  }
  return lines.join('\n');
}
