import { describe, expect, it, vi } from 'vitest';
import { createAnalytics } from '../../app/composables/use-analytics';

describe('createAnalytics', () => {
  it('sends one track() call to GA4, Plausible and OpenPanel', () => {
    const gtag = vi.fn();
    const plausible = vi.fn();
    const openpanel = vi.fn();
    const { track } = createAnalytics({
      ga: { gtag },
      plausible: { plausible },
      openpanel: { track: openpanel },
    });

    const props = {
      target: 'https://v-maplibre.geoql.in',
      section: 'maps',
    } as const;
    track('outbound_click', props);

    expect(gtag).toHaveBeenCalledOnce();
    expect(gtag).toHaveBeenCalledWith('event', 'outbound_click', props);
    expect(plausible).toHaveBeenCalledOnce();
    expect(plausible).toHaveBeenCalledWith('outbound_click', { props });
    expect(openpanel).toHaveBeenCalledOnce();
    expect(openpanel).toHaveBeenCalledWith('outbound_click', props);
  });

  it('skips trackers that did not boot', () => {
    const openpanel = vi.fn();
    const { track } = createAnalytics({ openpanel: { track: openpanel } });

    expect(() => track('theme_changed', { preference: 'dark' })).not.toThrow();
    expect(openpanel).toHaveBeenCalledWith('theme_changed', {
      preference: 'dark',
    });
  });
});
