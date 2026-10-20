/** llms.txt (RECETTE §21), generated from the page registry. */
import { PAGES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`, '',
    `> What each US state pays a week in unemployment, temporary disability (SDI, TDI) and paid family and medical leave in 2026, for the pay the reader enters: weekly amount, weeks, total, federal tax and the share of take-home pay replaced. Unemployment formulas of the 50 states and DC come from the U.S. Department of Labor table of state laws effective July 2026; paid leave and disability programs from the agencies and statutes. Independent site published by Radif Partners; no claim filed, no lawyer referred, no form. Last updated ${LAST_UPDATED}.`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label}`, ...PAGES.filter((p) => p.group === g.id).map((p) => `- [${p.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.card}`), '']),
    '## About', `- [How the estimates are built](${SITE_URL}${route('method', 'en')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
