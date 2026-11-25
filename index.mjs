import { testRunner } from '@cairul/pdk/runner';
import adapter from './run.mjs';
import { junit, testPlugin } from '@cairul/pdk/reports';

const reports = testPlugin('cypress.passed', { junit });

export default testRunner(reports, 'cypress.run', adapter);
