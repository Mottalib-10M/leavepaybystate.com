import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('MN');
const [hq, yr] = S.alts!;
const capH = hq.cap!, capB = yr.cap!;
const splitYear = Math.ceil(capH / yr.mult);
const topYear = Math.ceil(capB / yr.mult);
const a = K.ui('MN', 60000);
const b = K.ui('MN', 80000);
const c = K.ui('MN', 100000);
const peak = K.ui('MN', 40000, 15000, 10000);
const earn = 300;

export default definePage({
  id: 'minnesota-unemployment', group: 'unemployment', order: 129, slug: 'minnesota-unemployment', st: 'MN',
  nav: 'Minnesota unemployment', card: `Half your weekly wage by the better of two methods, up to ${K.usd(capH)} or ${K.usd(capB)} a week.`,
  title: `Minnesota Unemployment 2026: Weekly Amount and ${K.usd(capB)} Maximum`,
  description: `Minnesota unemployment in 2026: half your weekly wage by the better of two methods, up to ${K.usd(capH)} or ${K.usd(capB)} a week, for 26 weeks within a third of base wages.`,
  h1: `Minnesota unemployment in 2026: half your wage, up to ${K.usd(capB)} a week`,
  intro: `Minnesota's DEED pays half of your weekly wage, measured two ways, and keeps the better result, between ${K.usd(S.min)} and ${K.usd(S.max)} a week in 2026.`,
  resume: `Minnesota pays unemployment at 50% of your weekly wage, and the Department of Employment and Economic Development measures that wage two ways. One uses the best quarter of your base period divided by 13, with the benefit capped at ${K.usd(capH)}; the other uses the whole base period divided by 52, capped at ${K.usd(capB)}, the state maximum. You receive the higher of the two. With steady pay the two methods agree until the quarterly cap: ${K.usd(60000)} gives ${K.usd(a.weekly)} a week either way. Past about ${K.usd(splitYear)} a year, only the whole-year method keeps rising, so ${K.usd(80000)} gives ${K.usd(b.weekly)} and ${K.usd(100000)} reaches ${K.usd(c.weekly)}. With uneven pay the best-quarter method usually wins, up to its cap. Benefits run for up to ${S.weeks[1]} weeks, but the total cannot pass a third of base-period wages. Part-time earnings cut the check by 50 cents per dollar. The minimum is ${K.usd(S.min)}.`,
  body: (h) => `
<h2>Steady pay: the two methods give the same answer</h2>
<p>Half of a best quarter divided by 13 and half of a year divided by 52 are the same number when every quarter is equal. That is why a Minnesotan with steady wages does not need to think about the two methods until pay gets high. The difference is in the caps. The best-quarter route stops at ${K.usd(capH)}, 43% of the state average weekly wage; the whole-year route stops at ${K.usd(capB)}, two thirds of it, as reported in the ${h.src('dol_sigpros', 'Department of Labor table of July 2026')}. So above roughly ${K.usd(splitYear)} of base-period wages, the whole-year method takes over and climbs until about ${K.usd(topYear)}.</p>
${h.mini('ui', { t: 'Your Minnesota benefit', p: ['pay', 'hq', 'q2'], d: { st: 'MN', lock: 1, pay: 80000 } })}
<h2>Uneven pay: the best quarter usually helps</h2>
<p>When one quarter stands out, the quarterly method gives more, at least up to its own cap. A claimant who earned ${K.usd(40000)}, with ${K.usd(15000)} in the best quarter, gets ${K.usd(peak.weekly)} through that route, against ${K.usd(40000 * yr.mult)} from the yearly route. The price is duration: the total is capped at a third of base-period wages, ${K.usd(peak.total)} here, which pays about ${K.dec(peak.weeks)} weeks rather than ${S.weeks[1]}. The DOL table puts Minnesota's range at ${S.weeks[0]} to ${S.weeks[1]} weeks for that reason.</p>
<p>Eligibility is a single wage test, total base-period wages of at least 5.3% of the state's average annual wage, plus the usual conditions on why the job ended. The ${h.a('base-period-high-quarter', 'base period guide')} shows which quarters are used.</p>
<h2>Part-time work at half the cost</h2>
<p>Minnesota does not have a flat disregard. Every dollar you earn in a week reduces the benefit by 50 cents. On a ${K.usd(a.weekly)} benefit, ${K.usd(earn)} of earnings leaves a payment of ${K.usd(a.weekly - earn * 0.5)}, so the week brings in ${K.usd(a.weekly - earn * 0.5 + earn)} in all. Payments stop for the week once earnings reach twice the benefit. The ${h.a('partial-unemployment', 'partial unemployment guide')} compares this with other states.</p>
<h2>Requests and taxes</h2>
<p>Claimants request benefits every week, online or by phone, and must be available for and looking for suitable work. Payments are federal taxable income (${h.src('irs_tc418', 'IRS Topic 418')}); asking for withholding of 10% avoids a single bill at filing time. A leave for your own health or a new child falls under ${h.a('minnesota-paid-leave', 'Minnesota Paid Leave')} instead.</p>
`,
  faqs: [
    { q: 'What is the highest weekly unemployment payment in Minnesota in 2026?', a: `${K.usd(capB)}, two thirds of the state average weekly wage, available through the whole-base-period method once wages reach about ${K.usd(topYear)}. The best-quarter method stops at ${K.usd(capH)}. The minimum payment is ${K.usd(S.min)}, and Minnesota pays no dependents allowance in 2026, so household size does not move it.` },
    { q: 'Which formula does Minnesota use for my unemployment?', a: 'Both. DEED computes half of your best quarter divided by 13 and half of your base-period wages divided by 52, applies each method\'s cap, and pays the higher result. Steady earners get the same figure either way until the quarterly cap; uneven earners usually do better with the quarterly method.' },
    { q: 'Does working part time reduce Minnesota unemployment?', a: `Yes, by 50 cents for each dollar earned in the week. With a ${K.usd(a.weekly)} benefit and ${K.usd(earn)} of earnings, you receive ${K.usd(a.weekly - earn * 0.5)} in benefits. Once earnings reach twice the weekly amount, no benefit is paid for that week. Report gross pay for the week worked.` },
  ],
  tool: 'ui', toolArg: { st: 'MN', lock: 1, pay: 80000 },
  related: ['unemployment-calculator', 'colorado-unemployment', 'wisconsin-unemployment', 'minnesota-paid-leave', 'partial-unemployment', 'base-period-high-quarter'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
