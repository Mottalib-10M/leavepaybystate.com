import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('TX');
const a = K.ui('TX', 36000, 10000, 9000);
const b = K.ui('TX', 60000, 18000, 16000);
const c = K.ui('TX', 20000, 6000, 5000);
const th = K.th('TX', 60000);

export default definePage({
  id: 'texas-unemployment', group: 'unemployment', order: 110, slug: 'texas-unemployment', st: 'TX',
  nav: 'Texas unemployment', card: `One twenty-fifth of your best quarter, ${K.usd(S.min)} to ${K.usd(S.max)} a week, capped at 27% of base-period pay.`,
  title: 'Texas Unemployment 2026: Weekly Benefit, Weeks and Total',
  description: `Texas unemployment in 2026: 1/25 of your best quarter, ${K.usd(S.min)} to ${K.usd(S.max)} a week, a total capped at 27% of base-period wages. Your weekly amount and weeks here.`,
  h1: 'Texas unemployment benefits in 2026: how much a week, for how long',
  intro: `Texas pays one twenty-fifth of the wages of your best quarter, between ${K.usd(S.min)} and ${K.usd(S.max)} a week. Enter your pay to see the weekly amount, the weeks and the total.`,
  resume: `The Texas Workforce Commission computes your weekly benefit as one twenty-fifth of the wages paid in the best quarter of your base period, rounded down, with a floor of ${K.usd(S.min)} and a ceiling of ${K.usd(S.max)} for claims in 2026; the ceiling is tied to 47.6% of the average weekly wage in Texas and is reset each year. A worker who earned ${K.usd(10000)} in the best quarter gets ${K.usd(a.weekly)} a week, and anyone with ${K.usd(S.max * 25)} or more in that quarter reaches the maximum. The total you can draw is the lesser of 26 weekly payments and 27% of everything you earned in the base period, so ${K.usd(b.weekly)} a week on ${K.usd(60000)} of pay adds up to ${K.usd(b.total)}, while ${K.usd(c.weekly)} a week on ${K.usd(20000)} stops at ${K.usd(c.total)}, after about ${K.num(c.weeks)} weeks. To qualify, base-period wages must reach 37 times the weekly amount, earned in at least two quarters.`,
  body: (h) => `
<h2>The Texas formula, step by step</h2>
<p>Texas looks at a base period of four calendar quarters, normally the first four of the last five completed before you file. It takes the quarter where you earned the most and divides it by 25. That gives ${K.usd(400)} a week for ${K.usd(10000)} in the quarter, ${K.usd(480)} for ${K.usd(12000)}. The result is then held between ${K.usd(S.min)} and ${K.usd(S.max)}: anything above ${K.usd(S.max * 25)} in the best quarter changes nothing, because the ceiling already applies. Overtime, commissions and bonuses count in the quarter they were paid, which is why a seasonal worker with one strong quarter can reach the cap on a modest yearly salary.</p>
<p>The ceiling itself is not a number written once in the law. The Labor Code ties it to 47.6% of the average weekly wage in covered employment in Texas, recomputed each year, which is how it reached ${K.usd(S.max)} for 2026 in the ${h.src('dol_sigpros', 'Department of Labor table of July 2026')}.</p>
${h.mini('ui', { t: 'Your Texas weekly benefit', p: ['pay', 'hq'], d: { st: 'TX', lock: 1, pay: 36000, hq: 10000 } })}
<h2>Why the total can run out before 26 weeks</h2>
<p>Texas caps the whole claim at 27% of base-period wages. At the ceiling, 26 weeks of ${K.usd(S.max)} would be ${K.usd(S.max * 26)}, which only someone with about ${K.usd(Math.ceil(S.max * 26 / 0.27))} of base-period pay can draw in full. Below that, the money runs out first: a claimant who earned most of the year's pay in one quarter gets a high weekly amount but fewer weeks, and one with steady but low pay gets a lower amount for longer. The calculator shows which of the two limits applies to you.</p>
<p>Extended benefits, paid in some recessions on top of the 26 weeks, depend on federal triggers and are not counted here.</p>
<h2>What it replaces, and what it costs in tax</h2>
<p>At ${K.usd(60000)} a year, a single filer in Texas takes home about ${K.usd(th.net)} a week after federal income tax, Social Security and Medicare. The maximum benefit of ${K.usd(S.max)} replaces ${K.pct(S.max / th.net)} of that before tax. Unemployment is federal taxable income (${h.src('irs_tc418', 'IRS Topic 418')}); the commission withholds 10% only if you ask for it, otherwise the bill arrives with the return.</p>
<h2>Working part time while you claim</h2>
<p>You can earn a little during a week of benefits. Texas ignores the greater of ${K.usd(5)} or a quarter of your weekly amount, then subtracts every dollar above that from the check. On a ${K.usd(400)} benefit, the first ${K.usd(100)} of earnings costs nothing and ${K.usd(200)} of earnings brings the check down to ${K.usd(300)}. The ${h.a('partial-unemployment', 'partial unemployment page')} compares this rule with other states.</p>
`,
  faqs: [
    { q: 'What is the maximum unemployment benefit in Texas in 2026?', a: `${K.usd(S.max)} a week, the ceiling set from 47.6% of the average weekly wage in Texas. You reach it with ${K.usd(S.max * 25)} or more in your best quarter. The minimum is ${K.usd(S.min)}. The most a claim can pay is 26 weeks at your amount or 27% of your base-period wages, whichever is lower.` },
    { q: 'How many weeks of unemployment does Texas pay?', a: 'Up to 26 weeks in a benefit year, but often fewer, because the total cannot exceed 27% of the wages in your base period. Someone with steady pay just above the qualifying minimum may get ten weeks or so. Extended benefits beyond 26 weeks exist only when federal triggers are met during a recession.' },
    { q: 'How much do I need to have earned to qualify in Texas?', a: `Wages in at least two quarters of the base period, totaling at least 37 times your weekly benefit amount. With a weekly amount of ${K.usd(300)}, that means ${K.usd(37 * 300)} over the base period. You must also have lost the job through no fault of your own and be able, available and looking for work each week.` },
    { q: 'Does the Texas Workforce Commission withhold tax from benefits?', a: 'Only if you ask. You can choose a flat 10% federal withholding when you apply or later with Form W-4V. Without it, the full benefit is paid and the federal tax is settled on your return, where unemployment is reported from Form 1099-G as ordinary income.' },
  ],
  tool: 'ui', toolArg: { st: 'TX', lock: 1, pay: 36000, hq: 10000, q2: 9000 },
  related: ['unemployment-calculator', 'unemployment-benefits-by-state', 'how-long-unemployment-lasts', 'are-unemployment-benefits-taxable', 'partial-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
