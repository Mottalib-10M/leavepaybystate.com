import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('WI');
const m = S.alts![0].mult;
const capQ = Math.ceil(S.max / m);
const a = K.ui('WI', 28000);
const b = K.ui('WI', 52000);
const seasonal = K.ui('WI', 18000, 8000, 5000);
const earn = 200;
const kept = 30 + 0.33 * (earn - 30);
const afterWork = S.max - (earn - kept);

export default definePage({
  id: 'wisconsin-unemployment', group: 'unemployment', order: 127, slug: 'wisconsin-unemployment', st: 'WI',
  nav: 'Wisconsin unemployment', card: `4% of your best quarter, ${K.usd(S.min)} to ${K.usd(S.max)} a week, total capped at 40% of base-period wages.`,
  title: 'Wisconsin Unemployment 2026: Weekly Rate, 40% Cap, Weeks',
  description: `Wisconsin unemployment in 2026: 4% of your best quarter, ${K.usd(S.min)} to ${K.usd(S.max)} a week, for up to 26 weeks within 40% of base-period wages. Estimate your own claim.`,
  h1: 'Wisconsin unemployment in 2026: 4% of your best quarter, and when the 40% cap applies',
  intro: `Wisconsin pays 4% of the wages of your best quarter, between ${K.usd(S.min)} and ${K.usd(S.max)} a week in 2026, for up to ${S.weeks[1]} weeks.`,
  resume: `Wisconsin's Department of Workforce Development sets the weekly unemployment rate at 4% of the wages paid in the highest quarter of your base period, about half of the weekly pay in that quarter. For 2026 the range is ${K.usd(S.min)} to ${K.usd(S.max)}, and the maximum takes about ${K.usd(capQ)} in the best quarter, or ${K.usd(capQ * 4)} a year of even pay. ${K.usd(28000)} spread evenly gives ${K.usd(a.weekly)} a week; ${K.usd(52000)} gives ${K.usd(b.weekly)}. A claim can run ${S.weeks[1]} weeks, but the total cannot exceed ${K.pct(S.bpwFrac!)} of base-period wages, which shortens claims for seasonal workers: ${K.usd(18000)} with ${K.usd(8000)} in one quarter gives ${K.usd(seasonal.weekly)} a week for about ${K.dec(seasonal.weeks)} weeks. To qualify, base-period wages must be at least 35 times the weekly rate, with more than ${K.usd(1350)} in the best quarter and four times the weekly rate outside it. Part-time earnings are only partly deducted.`,
  body: (h) => `
<h2>When the 40% cap cuts the claim</h2>
<p>For steady earners in Wisconsin the duration is simple: ${S.weeks[1]} weeks. The cap of ${K.pct(S.bpwFrac!)} of base-period wages comes into play when one quarter towers over the rest, which describes construction, landscaping, tourism and other seasonal work in the state. Take a crew member with ${K.usd(18000)} in the base period, ${K.usd(8000)} of it in the summer quarter. The weekly rate is ${K.usd(seasonal.weekly)}, but ${K.pct(S.bpwFrac!)} of ${K.usd(18000)} is ${K.usd(seasonal.total)}, so the claim stops after about ${K.dec(seasonal.weeks)} weeks instead of ${S.weeks[1]}. As a rule of thumb, the cap binds when base-period wages are less than ${K.dec(S.weeks[1] * m / S.bpwFrac!, 1)} times the best quarter.</p>
<p>The ${h.src('dol_sigpros', 'Department of Labor table of July 2026')} lists the maximum benefit as the lesser of these two limits. The ${h.a('how-long-unemployment-lasts', 'duration guide')} shows how other states handle the same question.</p>
${h.mini('ui', { t: 'Your Wisconsin benefit', p: ['pay', 'hq'], d: { st: 'WI', lock: 1, pay: 28000 } })}
<h2>The weekly rate itself</h2>
<p>At 4%, every ${K.usd(1000)} in the best quarter is worth ${K.usd(1000 * m)} a week. The ceiling of ${K.usd(S.max)} arrives at ${K.usd(capQ)}, which is modest, so most full-time workers receive the maximum and the formula matters chiefly for part-time and seasonal claimants. There is no allowance for dependents, and the rate stays fixed for the whole benefit year, even if you find a lower-paid job and lose it again later in that year.</p>
<p>The eligibility test has three conditions. Base-period wages must be at least 35 times your weekly rate; the best quarter must hold more than ${K.usd(1350)}; and outside it you must have earned at least four times the weekly rate. A claimant at the maximum therefore needs ${K.usd(S.max * 35)} in the base period, with ${K.usd(S.max * 4)} or more outside the best quarter.</p>
<h2>Partial benefits: you keep about a third</h2>
<p>Wisconsin's formula for part-time earnings is gentler than a dollar-for-dollar cut. The first ${K.usd(30)} of weekly earnings is disregarded, as is 33% of everything above it; the rest reduces the check. Earning ${K.usd(earn)} in a week with a benefit of ${K.usd(S.max)}, you have ${K.cents(kept)} disregarded and receive ${K.cents(afterWork)}. Claimants file a weekly claim online and report gross wages and work search actions. The ${h.a('partial-unemployment', 'partial unemployment guide')} lists every state's rule.</p>
<p>Benefits are taxable on the federal return (${h.src('irs_tc418', 'IRS Topic 418')}); the department withholds 10% only on request.</p>
`,
  faqs: [
    { q: 'What is the maximum weekly unemployment rate in Wisconsin in 2026?', a: `${K.usd(S.max)}, reached with about ${K.usd(capQ)} in the best quarter of your base period. The minimum is ${K.usd(S.min)}. Wisconsin pays no dependents allowance. Over a full claim of ${S.weeks[1]} weeks the maximum comes to ${K.usd(S.max * S.weeks[1])}, provided your base-period wages are high enough for the ${K.pct(S.bpwFrac!)} cap not to bite.` },
    { q: 'Why did Wisconsin give me fewer than 26 weeks?', a: `Because the total of a claim cannot exceed ${K.pct(S.bpwFrac!)} of your base-period wages. If most of your earnings came in one quarter, your weekly rate is high relative to the year's total and the money runs out early. The monetary determination shows the maximum benefit amount available.` },
    { q: 'How much can I earn and still get Wisconsin unemployment?', a: `Wisconsin disregards the first ${K.usd(30)} of weekly earnings plus 33% of the rest, and deducts what remains. With a ${K.usd(S.max)} benefit and ${K.usd(earn)} of earnings, the payment is ${K.cents(afterWork)}. Earnings high enough to cancel the benefit end payment for that week.` },
  ],
  tool: 'ui', toolArg: { st: 'WI', lock: 1, pay: 28000 },
  related: ['unemployment-calculator', 'how-long-unemployment-lasts', 'minnesota-unemployment', 'michigan-unemployment', 'illinois-unemployment', 'partial-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
