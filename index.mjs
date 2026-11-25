import { testRunner } from '@cairul/plugin-kit/runner';
import adapter from './run.mjs';
import { junit, testPlugin } from '@cairul/plugin-kit/reports';

const reports = testPlugin('cypress.passed', { junit });

export default testRunner(reports, 'cypress.run', adapter);
