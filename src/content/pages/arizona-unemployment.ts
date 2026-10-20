import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('AZ');
const W = S.weeks[1];
const m = S.alts![0].mult;
const capQ = Math.ceil(S.max / m);
const floorQ = Math.ceil(S.min / m);
const a = K.ui('AZ', 30000);
const b = K.ui('AZ', 55000);
const keep = 160.49;
const earn = 300;
const th = K.th('AZ', 55000);

export default definePage({
  id: 'arizona-unemployment', group: 'unemployment', order: 123, slug: 'arizona-unemployment', st: 'AZ',
  nav: 'Arizona unemployment', card: `4% of your best quarter, ${K.usd(S.min)} to ${K.usd(S.max)} a week, ${W} weeks while unemployment stays under 5%.`,
  title: 'Arizona Unemployment 2026: Weekly Amount, Floor and Weeks',
  description: `Arizona unemployment in 2026: 1/25 of your best quarter, from ${K.usd(S.min)} to ${K.usd(S.max)} a week, for ${W} weeks while state unemployment stays under 5%. Your own figure.`,
  h1: `Arizona unemployment in 2026: a high floor, a low ceiling, ${W} weeks`,
  intro: `Arizona's Department of Economic Security pays one twenty-fifth of your best quarter, between ${K.usd(S.min)} and ${K.usd(S.max)} a week. Enter your pay to see where you fall.`,
  resume: `Arizona's unemployment benefit is one twenty-fifth, or 4%, of the wages of the best quarter in your base period, with a floor of ${K.usd(S.min)} and a ceiling of ${K.usd(S.max)} a week in 2026. The gap between the two is only ${K.usd(S.max - S.min)}. The floor corresponds to a best quarter of about ${K.usd(floorQ)} and the ceiling to ${K.usd(capQ)}, so most full-time workers land on the ceiling: ${K.usd(55000)} of steady pay gets ${K.usd(b.weekly)}, and ${K.usd(30000)} gets ${K.usd(a.weekly)}. Duration depends on the economy. The law pays 26 weeks, or ${W} when the state unemployment rate in the prior calendar quarter was below 5%, and the Department of Labor table of July 2026 gives ${W}. At the ceiling a full claim is ${K.usd(S.max * W)}. Arizona has no cap tied to base-period wages, so every eligible claimant can draw the full ${W} weeks. Part-time earnings up to ${K.cents(keep)} a week do not reduce the check.`,
  body: (h) => `
<h2>A ${K.usd(S.max - S.min)} band</h2>
<p>Arizona's benefit range is the tightest in the country. Everyone who receives a check gets between ${K.usd(S.min)} and ${K.usd(S.max)}. The one twenty-fifth rule only matters for best quarters between about ${K.usd(floorQ)} and ${K.usd(capQ)}; above that the amount is fixed. A worker who earned ${K.usd(55000)} and took home about ${K.usd(th.net)} a week after federal and payroll taxes receives ${K.usd(b.weekly)}, which replaces ${K.pct(b.weekly / th.net)} of that pay. These amounts are those of the ${h.src('dol_sigpros', 'Department of Labor table of July 2026')}.</p>
<p>When the formula falls under the floor, the calculator shows no benefit. Arizona's eligibility test ties the best quarter to the state minimum wage, at 390 times that hourly rate, and also requires base-period wages of one and a half times the best quarter. Your determination letter will say whether you qualify at that level.</p>
${h.mini('ui', { t: 'Your Arizona weekly benefit', p: ['pay', 'hq'], d: { st: 'AZ', lock: 1, pay: 30000 } })}
<h2>${W} or 26 weeks, depending on the jobless rate</h2>
<p>The length of an Arizona claim is set when you file. If the state's unemployment rate in the previous calendar quarter was under 5%, the maximum is ${W} weeks; at 5% or more, it is 26. The July 2026 table reports the ${W}-week figure, which the calculator uses. Unlike Texas or Florida, Arizona does not trim the total to a share of your base-period wages, so the weekly amount times the weeks is the whole story: ${K.usd(a.weekly)} for ${W} weeks is ${K.usd(a.total)}.</p>
<p>The ${h.a('how-long-unemployment-lasts', 'duration guide')} lists the other states that move their weeks with the unemployment rate.</p>
<h2>Earning on the side: a fixed allowance</h2>
<p>Many states protect a share of the benefit from part-time earnings. Arizona instead allows a fixed ${K.cents(keep)} a week. Earn that much or less and the check is untouched; beyond it, each dollar comes off. On a ${K.usd(S.max)} benefit, ${K.usd(earn)} of earnings leaves ${K.cents(S.max - (earn - keep))}. Weekly claims are filed online with DES, along with work search contacts. The ${h.a('partial-unemployment', 'partial unemployment guide')} compares states.</p>
<h2>Tax on benefits</h2>
<p>Unemployment is taxable on the federal return (${h.src('irs_tc418', 'IRS Topic 418')}). DES can withhold 10% for the IRS through ${h.src('irs_w4v', 'Form W-4V')}; on a full claim at the ceiling that would set aside ${K.usd(S.max * W * 0.1)}.</p>
`,
  faqs: [
    { q: 'What is the maximum Arizona unemployment benefit in 2026?', a: `${K.usd(S.max)} a week, reached with about ${K.usd(capQ)} in the best quarter of your base period. The minimum is ${K.usd(S.min)}, so all Arizona claimants fall within a band of ${K.usd(S.max - S.min)}. There is no dependents allowance, and the weekly amount stays the same for the whole claim.` },
    { q: 'Why does Arizona pay 24 weeks instead of 26?', a: `Arizona's law cuts the maximum duration from 26 weeks to ${W} when the state unemployment rate in the prior calendar quarter was below 5%. The Department of Labor table of July 2026 gives ${W} weeks. If unemployment rose above that line, new claims would again run for 26 weeks.` },
    { q: 'How much can I earn part time on Arizona unemployment?', a: `Up to ${K.cents(keep)} a week without any reduction. Every dollar earned above that amount is deducted from the weekly benefit. Report your gross earnings for the week in which you did the work, even if you are paid later, and keep pay stubs in case DES asks.` },
  ],
  tool: 'ui', toolArg: { st: 'AZ', lock: 1, pay: 30000 },
  related: ['unemployment-calculator', 'how-long-unemployment-lasts', 'nevada-unemployment', 'partial-unemployment', 'unemployment-benefits-by-state'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
