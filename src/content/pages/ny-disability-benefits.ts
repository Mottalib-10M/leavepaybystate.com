import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('ny-dbl'), F = P.facts!, PF = K.Pg('ny-pfl');
const rate = P.tiers![0][1];
const capPay = (P.max! / rate) * 52;
const small = K.pw('ny-dbl', 15000), mid = K.pw('ny-dbl', 50000);
const lv = K.leave('ny-dbl', 50000, 'medical', 8);
const th = K.th('NY', 50000);
const pfl = K.pw('ny-pfl', 50000);

export default definePage({
  id: 'ny-disability-benefits', group: 'leave', order: 213, slug: 'ny-disability-benefits', prog: 'ny-dbl',
  nav: 'New York disability benefits (DBL)', card: `Half of your weekly wage, capped at ${K.usd(P.max!)} a week, for up to ${P.weeks.medical} weeks after a ${P.waiting.medical}-day wait.`,
  title: `NY Disability Benefits 2026: ${K.usd(P.max!)} Weekly Cap, ${P.weeks.medical} Weeks`,
  description: `New York disability benefits (DBL) in 2026: half of your average weekly wage, no more than ${K.usd(P.max!)} a week, for up to ${P.weeks.medical} weeks after a ${P.waiting.medical}-day wait. Check yours.`,
  h1: 'New York disability benefits in 2026: the statutory DBL check',
  intro: `New York's Disability Benefits Law pays workers who are ill, injured off the job or pregnant. The benefit is half of your wage, held under a weekly cap far below what any other state program pays.`,
  resume: `New York disability benefits, paid under the Disability Benefits Law (DBL), replace ${K.pct(rate)} of the average weekly wage of your last ${F.averagedWeeks} weeks worked, but never more than ${K.usd(P.max!)} a week. The cap binds early: anyone earning more than about ${K.usd(capPay)} a year receives the same ${K.usd(P.max!)}, so a worker on ${K.usd(50000)} gets ${K.usd(mid.weekly)} rather than half of a weekly wage near ${K.usd(50000 / 52)}. Only a very small paycheck, such as ${K.usd(15000)} a year, falls under the cap, at about ${K.usd(small.weekly)} a week. The first ${P.waiting.medical} days are unpaid and benefits begin on the eighth consecutive day. They last up to ${P.weeks.medical} weeks in any ${F.periodWeeks} consecutive weeks. Employees contribute ${K.pct(P.contrib.rate, 1)} of wages, at most ${K.cents(P.contrib.weeklyMax!)} a week. Compared with New York Paid Family Leave, which reaches ${K.cents(PF.max!)}, DBL is the thin part of the state's coverage.`,
  body: (h) => `
<h2>A low cap that does most of the work</h2>
<p>California, New Jersey and Hawaii publish a new disability maximum each year. New York's Workers' Compensation Board states the DBL maximum as ${K.usd(P.max!)} a week, citing section 204 of the Workers' Compensation Law (${h.src('wcb_dbl', 'WCB, disability benefits for employees')}). With half of the weekly wage as the rule, the cap is reached at a weekly wage of ${K.usd(P.max! / rate)}, about ${K.usd(capPay)} a year. Above that, every worker receives the same amount whatever the salary.</p>
<p>For a worker on ${K.usd(50000)}, the gap is wide. Take-home pay is about ${K.usd(th.net)} a week; DBL replaces ${K.pct(mid.weekly / th.net)} of it. The same person bonding with a child under Paid Family Leave would receive ${K.usd(pfl.weekly)}.</p>
${h.mini('leave', { t: 'DBL for your weeks off', p: ['pay', 'wk'], d: { prog: 'ny-dbl', lock: 1, pay: 50000, wk: 8 } })}
<h2>Waiting period and length</h2>
<p>No benefit is paid for the first ${P.waiting.medical} days of a disability; payments start on the eighth consecutive day (section 208). An absence of ${K.num(lv.weeks)} weeks therefore pays ${K.dec(lv.paidWeeks)} weeks, ${K.usd(lv.total)} at the cap. The longest a claim can run is ${P.weeks.medical} weeks within any ${F.periodWeeks} consecutive weeks (section 205).</p>
<h2>Your plan may pay more</h2>
<p>The law sets what disability coverage must pay at least, not the most it may pay. DBL is bought by your employer, and some company plans and union contracts replace a larger share of salary than the statutory half. Ask your HR office whether your coverage is the statutory plan or an enhanced one before you plan your budget around ${K.usd(P.max!)}.</p>
<h2>What employees pay</h2>
<p>The deduction is ${K.pct(P.contrib.rate, 1)} of wages and may not exceed ${K.cents(P.contrib.weeklyMax!)} a week (${h.src('wcb_dbl_employer', 'WCB, employer page')}), about ${K.usd(P.contrib.weeklyMax! * 52)} a year. It appears on pay stubs next to the Paid Family Leave deduction, which is larger.</p>
<h2>Pregnancy and bonding in New York</h2>
<p>For a birth, DBL covers the period your provider certifies as disability, before and after delivery. Bonding weeks are then claimed under ${h.a('ny-paid-family-leave', 'New York Paid Family Leave')}. The ${h.a('maternity-leave-pay', 'maternity leave pay page')} shows the two together, and the ${h.a('state-disability-insurance', 'disability insurance comparison')} shows how far New York sits below the other states.</p>
<h2>Tax</h2>
<p>Under ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}, a medical leave benefit is excluded from income for the part attributable to the worker's own contributions and taxable for the part attributable to employer contributions. With the employee share limited to ${K.cents(P.contrib.weeklyMax!)} a week, part of a DBL check may be taxable; the statement from the carrier is the reference.</p>
`,
  faqs: [
    { q: 'What is the maximum New York disability benefit in 2026?', a: `${K.usd(P.max!)} a week. The rule is ${K.pct(rate)} of your average weekly wage for the last ${F.averagedWeeks} weeks, and the cap applies once that wage passes ${K.usd(P.max! / rate)}. Most full-time workers are above that line, which is why nearly everyone on statutory DBL receives the same amount.` },
    { q: 'When do New York DBL payments start?', a: `On the eighth consecutive day of disability. The first ${P.waiting.medical} days are a waiting period with no benefit. If you are out for a week or less, DBL pays nothing; employers sometimes cover those days with sick leave, which you can use under your own company policy.` },
    { q: 'How long can I receive New York disability benefits?', a: `Up to ${P.weeks.medical} weeks of disability in any period of ${F.periodWeeks} consecutive weeks. Payments end earlier if your provider certifies that you can return to work. A worker who still cannot work at the end may look at federal Social Security disability, which has its own, much stricter rules.` },
    { q: 'Why is New York DBL so much lower than PFL?', a: `They follow different rules. The DBL cap of ${K.usd(P.max!)} is the amount the Workers' Compensation Board cites from section 204 of the law, while the Paid Family Leave cap follows ${K.pct(PF.tiers![0][1])} of the statewide average weekly wage, ${K.cents(PF.max!)} in 2026. Some employers top up DBL through enhanced plans.` },
  ],
  tool: 'leave', toolArg: { prog: 'ny-dbl', lock: 1, pay: 50000, wk: 8 },
  related: ['ny-paid-family-leave', 'state-disability-insurance', 'maternity-leave-pay', 'is-paid-family-leave-taxable', 'new-york-unemployment'],
  sources: ['wcb_dbl', 'wcb_dbl_employer', 'nypfl_2026', 'irs_rr_2025_4'],
});
