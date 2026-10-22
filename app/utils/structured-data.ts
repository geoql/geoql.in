import { PROJECTS } from '../data/projects';
import { SITE } from '../data/site';

/** Organization + WebSite + ItemList of the public projects, as one graph. */
export function structuredData() {
  const org = `${SITE.url}/#organization`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': org,
        name: SITE.name,
        url: `${SITE.url}/`,
        logo: 'https://github.com/geoql.png',
        description: SITE.tagline,
        sameAs: [SITE.github],
        founder: {
          '@type': 'Person',
          name: SITE.maintainer.name,
          url: SITE.maintainer.url,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: `${SITE.url}/`,
        name: SITE.name,
        description: SITE.description,
        inLanguage: 'en',
        publisher: { '@id': org },
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE.url}/#projects`,
        name: 'GeoQL projects',
        numberOfItems: PROJECTS.length,
        itemListElement: PROJECTS.map((project, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: project.url,
          name: project.name,
          description: project.description,
        })),
      },
    ],
  };
}
