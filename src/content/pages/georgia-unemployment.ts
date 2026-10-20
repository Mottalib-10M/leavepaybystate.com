import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('GA');
const W = S.weeksCap ?? S.weeks[1];
const m = S.alts![0].mult;
const cap2 = Math.ceil(S.max / m);
const full = K.ui('GA', 50000);
const part = K.ui('GA', 24000);
const thin = K.ui('GA', 14000, 7000, 4000);
const fullBpw = Math.ceil(S.max * W / S.bpwFrac!);
const th = K.th('GA', 50000);

export default definePage({
  id: 'georgia-unemployment', group: 'unemployment', order: 119, slug: 'georgia-unemployment', st: 'GA',
  nav: 'Georgia unemployment', card: `1/42 of your two best quarters, ${K.usd(S.min)} to ${K.usd(S.max)} a week, ${W} weeks at current rates.`,
  title: `Georgia Unemployment 2026: ${W} Weeks, Weekly Max and Total`,
  description: `Georgia unemployment in 2026: 1/42 of your two best quarters, ${K.usd(S.min)} to ${K.usd(S.max)} a week, ${W} weeks at most and a total capped at 1/4 of base-period pay. See yours.`,
  h1: `Georgia unemployment in 2026: ${W} weeks and a ${K.usd(S.max)} ceiling`,
  intro: `Georgia pays one forty-second of your two best quarters, between ${K.usd(S.min)} and ${K.usd(S.max)} a week, for at most ${W} weeks while unemployment stays low.`,
  resume: `Georgia's unemployment benefit is one of the shortest in the country. The Georgia Department of Labor adds the wages of the two highest quarters of your base period and divides by 42, which works out to about half of the weekly pay in those six months, with a minimum of ${K.usd(S.min)} and a maximum of ${K.usd(S.max)} a week. The ceiling comes early: about ${K.usd(cap2)} in the two quarters together, or roughly ${K.usd(cap2 * 2)} a year of steady pay. Above that, everyone gets ${K.usd(S.max)}. The number of weeks depends on the state unemployment rate, and the July 2026 Department of Labor table gives a current maximum of ${W} weekly payments, also limited to a quarter of base-period wages. A full claim at the ceiling therefore pays ${K.usd(full.total)}, which takes base-period wages of about ${K.usd(fullBpw)}. On ${K.usd(24000)} of even pay, the claim is ${K.usd(part.weekly)} a week and ${K.usd(part.total)} in total.`,
  body: (h) => `
<h2>Short by design</h2>
<p>Georgia scales the length of a claim to the state's unemployment rate. The law sets a range, and the ${h.src('dol_sigpros', 'Department of Labor table of July 2026')} lists ${S.weeks[0]} to ${S.weeks[1]} weeks across that scale, with the maximum benefit currently stated as the lesser of ${W} times the weekly amount or one quarter of base-period wages. In a strong job market the shorter end applies, which is where the calculator sits: ${W} weeks. If unemployment rose enough to move the state up the scale, claims filed after the change would last longer.</p>
<p>${W} weeks is a little over three months. A worker laid off at ${K.usd(50000)} a year, who took home about ${K.usd(th.net)} a week after federal tax and payroll taxes, receives ${K.usd(full.weekly)} for that time and ${K.usd(full.total)} overall. Planning a job search around that horizon is the practical lesson.</p>
${h.mini('ui', { t: 'Your Georgia weekly benefit', p: ['pay', 'hq', 'q2'], d: { st: 'GA', lock: 1, pay: 24000 } })}
<h2>Dividing by 42</h2>
<p>Using the two best quarters halves the influence of a single good quarter. With ${K.usd(24000)} spread evenly, the two quarters hold ${K.usd(12000)} and the benefit is ${K.usd(part.weekly)}. Georgia also accepts a second route for people who fall short of the usual test: one twenty-first of the single best quarter, with earnings in two quarters totaling at least 40 times the weekly amount. The calculator applies the forty-second rule only. Normally you qualify with wages in two quarters and base-period pay of at least one and a half times the best quarter.</p>
<h2>The quarter-of-wages cap</h2>
<p>Low or uneven earners can lose weeks to the second limit. Someone with ${K.usd(14000)} in the base period and ${K.usd(7000)} plus ${K.usd(4000)} in the two best quarters gets ${K.usd(thin.weekly)} a week, but a quarter of ${K.usd(14000)} is ${K.usd(thin.total)}, so payments stop after about ${K.dec(thin.weeks)} weeks. To draw all ${W} weeks at the ceiling, base-period wages need to reach about ${K.usd(fullBpw)}.</p>
<h2>Weekly requests and part-time pay</h2>
<p>Georgia claimants request payment each week and keep a record of work search contacts. Earnings up to ${K.usd(50)} in a week are disregarded; above that, the check falls dollar for dollar. On a ${K.usd(part.weekly)} benefit, ${K.usd(150)} of earnings leaves ${K.usd(part.weekly - (150 - 50))}. The ${h.a('partial-unemployment', 'partial unemployment guide')} compares this with other states.</p>
<p>Benefits are part of federal taxable income (${h.src('irs_tc418', 'Topic 418')}); asking for 10% withholding keeps a lump-sum tax bill from landing after a claim that was short to begin with. The ${h.a('how-long-unemployment-lasts', 'duration guide')} shows where Georgia ranks.</p>
`,
  faqs: [
    { q: 'How many weeks of unemployment does Georgia pay in 2026?', a: `${W} weeks at most under the July 2026 Department of Labor table, because Georgia ties duration to its unemployment rate and the rate is low. The total is also capped at a quarter of base-period wages, so lower earners can get fewer weeks. The duration would rise only if unemployment climbed.` },
    { q: 'What is the most Georgia unemployment pays per week?', a: `${K.usd(S.max)}, reached once the two best quarters of your base period total about ${K.usd(cap2)}. The minimum is ${K.usd(S.min)}. Georgia pays no dependents allowance, so family size never changes the check. Over ${W} weeks, the largest regular claim comes to ${K.usd(S.max * W)} before federal tax.` },
    { q: 'How does Georgia calculate the unemployment weekly amount?', a: 'It adds the wages of your two highest quarters and divides by 42, which is roughly half of your average weekly pay over those six months. People who do not pass the usual test can sometimes qualify on a second route that uses one twenty-first of the single best quarter instead.' },
  ],
  tool: 'ui', toolArg: { st: 'GA', lock: 1, pay: 24000 },
  related: ['unemployment-calculator', 'how-long-unemployment-lasts', 'florida-unemployment', 'north-carolina-unemployment', 'south-carolina-unemployment', 'tennessee-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
