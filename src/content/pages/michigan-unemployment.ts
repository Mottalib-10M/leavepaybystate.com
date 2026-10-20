import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('MI');
const m = S.alts![0].mult;
const capQ = Math.ceil(S.max / m);
const a = K.ui('MI', 40000);
const thin = K.ui('MI', 15000, 7000, 4000);
const per = 19.33;
/** Michigan partial rule: 50 cents off per dollar earned, and benefit plus earnings capped at 1.5 x the weekly amount. */
const partial = (wba: number, e: number) => Math.max(0, Math.min(wba - 0.5 * e, 1.5 * wba - e));

export default definePage({
  id: 'michigan-unemployment', group: 'unemployment', order: 118, slug: 'michigan-unemployment', st: 'MI',
  nav: 'Michigan unemployment', card: `4.1% of your best quarter, ${K.usd(S.min)} to ${K.usd(S.max)} a week, and a 1.5x rule for part-time work.`,
  title: 'Michigan Unemployment 2026: 4.1% Formula and the 1.5x Rule',
  description: `Michigan unemployment in 2026: 4.1% of your best quarter, ${K.usd(S.min)} to ${K.usd(S.max)} a week, up to 26 weeks, and a 1.5x cap on pay plus benefits. See your own figure.`,
  h1: 'Michigan unemployment in 2026: 4.1% of your best quarter, and what part-time work costs',
  intro: `Michigan's UIA pays 4.1% of the wages of your best quarter, from ${K.usd(S.min)} to ${K.usd(S.max)} a week, plus a set amount per dependent. Enter your pay below.`,
  resume: `Michigan's Unemployment Insurance Agency multiplies the wages of the highest quarter in your base period by 4.1%, then adds ${K.cents(per)} for each dependent, up to five. In 2026 the weekly amount runs from ${K.usd(S.min)} to ${K.usd(S.max)}, a narrow band with an unusually high floor. The maximum takes about ${K.usd(capQ)} in the best quarter, so ${K.usd(40000)} of steady pay, with ${K.usd(10000)} a quarter, gives ${K.usd(a.weekly)} a week and anyone above roughly ${K.usd(capQ * 4)} a year gets ${K.usd(S.max)}. Benefits last up to ${S.weeks[1]} weeks, but the total is capped at ${K.pct(S.bpwFrac!)} of base-period wages, which shortens claims built on one strong quarter. Part-time work follows a rule found almost nowhere else: the check falls by 50 cents for each dollar earned, and earnings plus benefits may not pass one and a half times the weekly amount.`,
  body: (h) => `
<h2>A narrow band between floor and ceiling</h2>
<p>Most states have a minimum benefit too low to matter. Michigan's is ${K.usd(S.min)}, which, at 4.1%, corresponds to a best quarter of about ${K.usd(S.min / m)}. To qualify at all you need at least ${K.usd(5328)} in the best quarter, base-period wages of one and a half times it and earnings in two quarters, or, under the alternative test, base-period wages of at least 20 times the state average weekly wage. So claimants start well above the floor. At the other end, ${K.usd(S.max)} is reached at about ${K.usd(capQ)} in the quarter. Between those points, every extra ${K.usd(1000)} in the best quarter adds ${K.usd(1000 * m)} a week.</p>
<p>The dependents allowance of ${K.cents(per)} a person, for up to five, adds at most ${K.cents(per * 5)}. The ${h.src('dol_sigpros', 'Department of Labor table of July 2026')} gives no higher ceiling for claimants with dependents, so the ${K.usd(S.max)} limit is the figure to plan around.</p>
${h.mini('ui', { t: 'Your Michigan benefit', p: ['pay', 'hq'], d: { st: 'MI', lock: 1, pay: 40000 } })}
<h2>When the 43% cap ends a claim early</h2>
<p>The total is the lesser of ${S.weeks[1]} weekly payments and ${K.pct(S.bpwFrac!)} of base-period wages. For steady earners the weeks run out first. For someone with ${K.usd(15000)} in the base period, ${K.usd(7000)} of it in one quarter, the weekly amount is ${K.usd(thin.weekly)} but the total stops at ${K.usd(thin.total)}, roughly ${K.dec(thin.weeks)} weeks. The ${h.a('how-long-unemployment-lasts', 'duration guide')} lists the states that cap totals this way.</p>
<h2>The 1.5x rule, worked through</h2>
<p>Michigan treats part-time earnings in two steps. First, each dollar you earn reduces the check by 50 cents. Second, your earnings plus the reduced benefit cannot exceed one and a half times your weekly amount; anything above that comes off the check too. Take a weekly benefit of ${K.usd(a.weekly)}. Earning ${K.usd(300)} cuts it to ${K.usd(partial(a.weekly, 300))}, and you end the week with ${K.usd(300 + partial(a.weekly, 300))}. Earning ${K.usd(500)} would leave ${K.usd(partial(a.weekly, 500))}, because the combined total is held at ${K.usd(1.5 * a.weekly)}. Past that point, extra hours add nothing until they replace the benefit entirely.</p>
<p>That makes small amounts of work worthwhile in Michigan, more so than in states that subtract earnings dollar for dollar. The ${h.a('partial-unemployment', 'partial unemployment guide')} puts the rules side by side.</p>
<h2>Certifying with the UIA</h2>
<p>Claimants certify every two weeks through the agency's online system or by phone, reporting gross earnings for each week and meeting the work search requirement. Federal income tax applies to every payment (${h.src('irs_tc418', 'IRS Topic 418')}); withholding of 10% is available if you choose it.</p>
`,
  faqs: [
    { q: 'What is the maximum Michigan unemployment benefit in 2026?', a: `${K.usd(S.max)} a week, reached with about ${K.usd(capQ)} in the best quarter of the base period. The minimum is ${K.usd(S.min)}. Each dependent, up to five, adds ${K.cents(per)}, and the July 2026 Department of Labor table shows no separate higher ceiling for claimants with dependents.` },
    { q: 'Can I work part time and still collect unemployment in Michigan?', a: `Yes. Michigan reduces the weekly check by 50 cents for each dollar earned, and limits earnings plus benefits to one and a half times the weekly amount. With a ${K.usd(a.weekly)} benefit, ${K.usd(300)} of earnings leaves a check of ${K.usd(partial(a.weekly, 300))}. Report gross earnings for the week the work was done.` },
    { q: 'How many weeks of Michigan unemployment can I get?', a: `Up to ${S.weeks[1]} weeks, provided the total stays within ${K.pct(S.bpwFrac!)} of your base-period wages. A claimant whose earnings were concentrated in one quarter can run into that cap first and receive fewer weeks; the monetary determination from the agency states the total available.` },
  ],
  tool: 'ui', toolArg: { st: 'MI', lock: 1, pay: 40000 },
  related: ['unemployment-calculator', 'partial-unemployment', 'how-long-unemployment-lasts', 'ohio-unemployment', 'indiana-unemployment', 'wisconsin-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
