import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('MA');
const W = S.weeksCap ?? S.weeks[1];
const m = S.alts![0].mult;
const cap2 = Math.ceil(S.max / m);
const a = K.ui('MA', 60000);
const b = K.ui('MA', 100000);
const lumpy = K.ui('MA', 40000, 15000, 12000);
const th = K.th('MA', 100000);
const oldMax = 1105;
const from = K.day('2026-10-04');

export default definePage({
  id: 'massachusetts-unemployment', group: 'unemployment', order: 122, slug: 'massachusetts-unemployment', st: 'MA',
  nav: 'Massachusetts unemployment', card: `Half your average weekly wage, up to ${K.usd(S.max)} from October 2026, for as long as ${W} weeks.`,
  title: `Massachusetts Unemployment 2026: ${W} Weeks, New Maximum`,
  description: `Massachusetts unemployment in 2026: half your average weekly wage plus $25 a dependent, up to ${K.usd(S.max)} a week from October 4, for as long as ${W} weeks. See yours.`,
  h1: `Massachusetts unemployment in 2026: ${W} weeks and a ${K.usd(S.max)} ceiling`,
  intro: `The Department of Unemployment Assistance pays half of your average weekly wage, from ${K.usd(S.min)} up to ${K.usd(S.max)} for claims starting from ${from}, for up to ${W} weeks.`,
  resume: `Massachusetts combines a high ceiling with the longest regular duration in the country. The Department of Unemployment Assistance adds the two highest quarters of your base period, divides by 26 to find an average weekly wage and pays half of it, plus ${K.usd(25)} for each dependent child. For benefit years starting on or after ${from}, the range is ${K.usd(S.min)} to ${K.usd(S.max)} a week; the Department of Labor table of July 2026 still showed the previous ceiling of ${K.usd(oldMax)}. The maximum needs about ${K.usd(cap2)} in the two best quarters, so ${K.usd(60000)} of steady pay gives ${K.usd(a.weekly)} and ${K.usd(100000)} gives ${K.usd(b.weekly)}. A claim can last ${W} weeks, but the total is limited to ${K.pct(S.bpwFrac!)} of base-period wages, so uneven earners may get fewer. At ${K.usd(60000)}, the full claim is worth ${K.usd(a.total)}. To qualify you need at least ${K.usd(6300)} in the base period and 30 times your weekly amount.`,
  body: (h) => `
<h2>The October reset</h2>
<p>Massachusetts resets its maximum in October, not in January. The ${h.src('ma_ui', 'DUA page on how benefits are determined')} gives ${K.usd(S.max)} for benefit years beginning on or after ${from}. A claim opened in September 2026 keeps the old ceiling of ${K.usd(oldMax)} for its whole benefit year, so two people laid off a few weeks apart can face different caps. This page and the calculator use the new figure. The ${h.src('dol_sigpros', 'federal table of July 2026')} still lists the earlier number, which is why older summaries quote it.</p>
${h.mini('ui', { t: 'Your Massachusetts benefit', p: ['pay', 'hq', 'q2'], d: { st: 'MA', lock: 1, pay: 60000 } })}
<h2>Half of your wage, from two quarters</h2>
<p>The two best quarters are added and divided by 26, the number of weeks in half a year, and the result is halved. ${K.usd(30000)} over those two quarters means an average of ${K.usd(30000 / 26)} a week and a benefit of ${K.usd(a.weekly)}. Because the ceiling sits high, the formula keeps working well into six-figure salaries: at ${K.usd(100000)} a single filer takes home about ${K.usd(th.net)} a week after federal tax, payroll taxes and the paid leave contribution, and the ${K.usd(b.weekly)} benefit replaces ${K.pct(b.weekly / th.net)} of it before tax.</p>
<p>Each dependent child adds ${K.usd(25)} a week. The DOL table describes the Massachusetts allowance as having no cap, and it is paid on top of the formula amount, so a parent at the ceiling can receive more than ${K.usd(S.max)}. The calculator leaves the allowance out.</p>
<h2>Thirty weeks, or the 36% limit</h2>
<p>The law caps the total at the lesser of ${W} times the weekly amount and ${K.pct(S.bpwFrac!)} of base-period wages. With pay spread evenly over the year the weeks are the limit. With pay packed into a few months, the percentage is: ${K.usd(40000)} with ${K.usd(15000)} and ${K.usd(12000)} in the best quarters gives ${K.usd(lumpy.weekly)} a week but stops at ${K.usd(lumpy.total)}, about ${K.dec(lumpy.weeks)} weeks. The DOL table also flags the Massachusetts duration as linked to the state unemployment rate, within a range of ${S.weeks[0]} to ${S.weeks[1]} weeks; ${W} weeks is the current maximum. The ${h.a('how-long-unemployment-lasts', 'duration guide')} compares states.</p>
<h2>Requesting payments, and working part time</h2>
<p>Claimants request benefits each week through the DUA's online system and keep a log of their work search activities. You may earn up to a third of your weekly benefit without any reduction; above that, earnings come off dollar for dollar. On ${K.usd(a.weekly)}, that is ${K.usd(a.weekly / 3)} of earnings before anything is deducted. See the ${h.a('partial-unemployment', 'partial unemployment guide')} for other states.</p>
<p>Federal income tax applies to all of it (${h.src('irs_tc418', 'IRS Topic 418')}). For a leave linked to your health or a new child, the right program is ${h.a('massachusetts-pfml', 'Paid Family and Medical Leave')}.</p>
`,
  faqs: [
    { q: 'What is the Massachusetts unemployment maximum after October 2026?', a: `${K.usd(S.max)} a week for benefit years beginning on or after ${from}, according to the Department of Unemployment Assistance. Claims opened before that date keep the earlier ceiling of ${K.usd(oldMax)} through their benefit year. The dependents allowance of ${K.usd(25)} per child is paid on top.` },
    { q: 'How many weeks of unemployment does Massachusetts pay?', a: `Up to ${W} weeks, the longest regular duration of any state, provided the total stays within ${K.pct(S.bpwFrac!)} of your base-period wages. Steady earners usually get all ${W} weeks; someone whose pay was concentrated in a few months may reach the percentage cap earlier and get fewer.` },
    { q: 'How much do I need to earn to qualify for Massachusetts unemployment?', a: `At least ${K.usd(6300)} in the base period, and base-period wages of at least 30 times your weekly benefit amount. A claimant whose weekly amount would be ${K.usd(500)} needs ${K.usd(500 * 30)} over the base period. The DUA also checks why the job ended.` },
  ],
  tool: 'ui', toolArg: { st: 'MA', lock: 1, pay: 60000 },
  related: ['unemployment-calculator', 'how-long-unemployment-lasts', 'massachusetts-pfml', 'connecticut-unemployment', 'partial-unemployment', 'unemployment-benefits-by-state'],
  sources: ['ma_ui', 'dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
