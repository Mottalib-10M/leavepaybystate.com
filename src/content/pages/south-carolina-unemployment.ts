import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('SC');
const W = S.weeks[1];
const m = S.alts![0].mult;
const capQ = Math.ceil(S.max / m);
const a = K.ui('SC', 26000);
const b = K.ui('SC', 48000);
const uneven = K.ui('SC', 12000, 6500, 3000);
const ratio = W * m / S.bpwFrac!;

export default definePage({
  id: 'south-carolina-unemployment', group: 'unemployment', order: 133, slug: 'south-carolina-unemployment', st: 'SC',
  nav: 'South Carolina unemployment', card: `Half of your weekly pay in the best quarter, ${K.usd(S.min)} to ${K.usd(S.max)} a week, up to ${W} weeks.`,
  title: `South Carolina Unemployment 2026: ${K.usd(S.max)} a Week, ${W} Weeks Max`,
  description: `South Carolina unemployment in 2026: half of your weekly pay in the best quarter, ${K.usd(S.min)} to ${K.usd(S.max)} a week, for up to ${W} weeks within a third of base wages.`,
  h1: `South Carolina unemployment in 2026: ${W} weeks at most, ${K.usd(S.max)} a week at most`,
  intro: `South Carolina replaces half of the weekly wage of your best quarter, between ${K.usd(S.min)} and ${K.usd(S.max)}, for no more than ${W} weeks.`,
  resume: `South Carolina's Department of Employment and Workforce takes the wages of the best quarter in your base period, turns them into a weekly wage by dividing by 13, and pays half of it, with a 2026 minimum of ${K.usd(S.min)} and a maximum of ${K.usd(S.max)}. The maximum needs about ${K.usd(capQ)} in that quarter, roughly ${K.usd(capQ * 4)} a year of even pay, so a large share of full-time workers receive it: ${K.usd(48000)} gives ${K.usd(b.weekly)} and ${K.usd(26000)} gives ${K.usd(a.weekly)}. The claim lasts at most ${W} weeks, fewer than the 26 of most states, and the total cannot exceed a third of base-period wages. At the maximum, a full claim is worth ${K.usd(S.max * W)}. The wage tests ask for ${K.usd(4455)} over the base period and ${K.usd(1092)} in its strongest quarter, with the year worth at least one and a half times that quarter. Part-time earnings up to a quarter of the weekly benefit are not deducted.`,
  body: (h) => `
<h2>${W} weeks, set in the law</h2>
<p>South Carolina caps claims at ${W} weeks where most states allow 26, and the ${h.src('dol_sigpros', 'DOL summary of state provisions')} shows that figure as a fixed limit, not one that moves with the unemployment rate as in Georgia or North Carolina. The weekly amount is ordinary by regional standards; the length is what limits the total. ${K.usd(S.max)} for ${W} weeks is ${K.usd(S.max * W)}, about ${K.pct(W / 26)} of what the same weekly amount would yield in a 26-week state.</p>
<p>The minimum duration in the table is ${S.weeks[0]} weeks, which is where claims with thin earnings end up once the one-third limit applies.</p>
${h.mini('ui', { t: 'Your South Carolina benefit', p: ['pay', 'hq', 'q2'], d: { st: 'SC', lock: 1, pay: 26000 } })}
<h2>Half of the best quarter's weekly wage</h2>
<p>The formula is short. Divide your best quarter by 13 to get a weekly wage and halve it, which is the same as dividing the quarter by 26. A best quarter of ${K.usd(6500)} gives ${K.usd(uneven.weekly)}. Once that quarter passes ${K.usd(capQ)}, the ceiling applies. A higher-paid worker therefore gets the same check as a modestly paid one, and the replacement rate falls as pay rises.</p>
<h2>When a third of your wages is the limit</h2>
<p>The total is the lesser of ${W} weekly payments and one third of base-period wages. That second limit binds when base-period wages are less than about ${K.dec(ratio, 1)} times the best quarter. Someone who earned ${K.usd(12000)}, with ${K.usd(6500)} in one quarter, gets ${K.usd(uneven.weekly)} a week but only ${K.usd(uneven.total)} in total, which is ${K.dec(uneven.weeks)} weeks of payments. The ${h.a('how-long-unemployment-lasts', 'duration guide')} lists the states with similar caps.</p>
<h2>Qualifying, filing and earning</h2>
<p>The wage tests are ${K.usd(4455)} over the base period, ${K.usd(1092)} in the best quarter, and base-period wages of at least one and a half times that quarter. Claimants request payment weekly through the state's online portal and complete work search contacts each week. Earnings up to a quarter of the weekly benefit are disregarded; above that, they are deducted dollar for dollar. On ${K.usd(a.weekly)}, the first ${K.usd(a.weekly / 4)} you earn costs nothing. The ${h.a('partial-unemployment', 'partial unemployment guide')} compares states.</p>
<p>Payments are taxable on the federal return (${h.src('irs_tc418', 'IRS Topic 418')}), and 10% can be withheld on request. On a short claim the amount due is modest, but spreading it over the weeks of benefits avoids a surprise at filing time.</p>
`,
  faqs: [
    { q: 'How many weeks of unemployment does South Carolina pay?', a: `Up to ${W} weeks, a fixed maximum that does not depend on the unemployment rate. The total is also capped at a third of your base-period wages, so someone whose earnings came mostly in one quarter can receive fewer weeks, down to ${S.weeks[0]} in the Department of Labor table.` },
    { q: 'What is the most South Carolina unemployment pays in a week?', a: `${K.usd(S.max)} in 2026. Because the formula halves the weekly wage of your best quarter, that cap applies as soon as the quarter passes about ${K.usd(capQ)}. The floor is ${K.usd(S.min)}, and children or a spouse do not raise the check. ${W} payments at the top add up to ${K.usd(S.max * W)}.` },
    { q: 'How much must I earn to qualify for South Carolina unemployment?', a: `At least ${K.usd(4455)} in the base period, at least ${K.usd(1092)} in your best quarter, and total base-period wages of at least one and a half times that quarter. The Department of Employment and Workforce also checks why the job ended and whether you are able and available to work.` },
  ],
  tool: 'ui', toolArg: { st: 'SC', lock: 1, pay: 26000 },
  related: ['unemployment-calculator', 'how-long-unemployment-lasts', 'north-carolina-unemployment', 'georgia-unemployment', 'partial-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
