import { join } from 'node:path';
import { z } from '@cairul/plugin-kit';
import { list, option, reportsIn, selectors, value } from '@cairul/plugin-kit/runner';
import { junit } from '@cairul/plugin-kit/reports';

export default {
  command: ['cypress'],
  settings: { grepPlugin: z.boolean().default(false) },
  select: selectors(
    { specs: list, title: value, tags: value, browser: value, mode: z.enum(['e2e', 'component']).optional() },
    ['specs', 'title', 'tags']
  ),
  build({ specs, title, tags, browser, mode }, temp, config) {
    if ((title || tags) && !config.grepPlugin)
      throw new Error('Title and tag filters require the configured Cypress grep plugin.');
    const filters = [title && 'grep=' + title, tags && 'grepTags=' + tags].filter(Boolean).join(',');
    if ([title, tags].some((filter) => filter?.includes(',')))
      throw new Error('Cypress title and tag selectors cannot contain a comma.');
    return {
      args: [
        'run',
        ...(mode ? ['--' + mode] : []),
        ...option('--browser', browser),
        ...option('--spec', specs?.join(',')),
        ...option('--env', filters || undefined),
        '--reporter',
        'junit',
        '--reporter-options',
        'mochaFile=' + join(temp, 'result-[hash].xml'),
      ],
      read: reportsIn('.xml', junit),
    };
  },
};
