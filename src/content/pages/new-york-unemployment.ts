import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('NY');
const capQ = S.max * 26;
const even = K.ui('NY', 60000);
const peak = K.ui('NY', 60000, 21000, 15000);
const low = K.ui('NY', 28000);
const top = K.ui('NY', 110000);
const th = K.th('NY', 60000);

export default definePage({
  id: 'new-york-unemployment', group: 'unemployment', order: 112, slug: 'new-york-unemployment', st: 'NY',
  nav: 'New York unemployment', card: `About 1/26 of your best quarter, ${K.usd(S.min)} to ${K.usd(S.max)} a week, 26 weeks for every claimant.`,
  title: 'New York Unemployment 2026: Weekly Benefit and 26 Weeks',
  description: `New York unemployment in 2026: 1/25 to 1/26 of your best quarter, from ${K.usd(S.min)} up to ${K.usd(S.max)} a week, 26 weeks for all claimants. Estimate your own check here.`,
  h1: 'New York unemployment benefits in 2026: your best quarter decides the check',
  intro: `New York pays about one twenty-sixth of the wages of your best quarter, between ${K.usd(S.min)} and ${K.usd(S.max)} a week, for 26 weeks. Add your best quarter if your pay was uneven.`,
  resume: `The New York State Department of Labor bases your weekly unemployment benefit on the best of the four quarters in your base period, paying one twenty-fifth or one twenty-sixth of it depending on your wages. In 2026 the amount runs from ${K.usd(S.min)} to ${K.usd(S.max)} a week, and the maximum is reached with about ${K.usd(capQ)} in that quarter. Steady pay of ${K.usd(60000)} a year gives about ${K.usd(even.weekly)} a week; the same ${K.usd(60000)} with ${K.usd(21000)} earned in one quarter gives ${K.usd(peak.weekly)}, because only the peak counts. ${K.usd(28000)} spread evenly gives ${K.usd(low.weekly)}. Unlike most states, New York pays the same duration to everyone who qualifies: ${S.weeks[1]} weeks, with no cap tied to base-period wages, so the most a regular claim can pay is ${K.usd(S.max * S.weeks[1])}. To qualify, the best quarter must hold at least ${K.usd(3500)} and the whole base period one and a half times that quarter.`,
  body: (h) => `
<h2>One quarter, not the year</h2>
<p>Two New Yorkers with the same salary can get different checks. The Department of Labor ignores the other three quarters once you qualify and works only from the strongest. That favors anyone whose pay bunched up: a retail worker with a heavy holiday season, a contractor paid on a project's completion, a salesperson whose commissions landed in one quarter. With ${K.usd(60000)} over the year, even pay gives ${K.usd(even.weekly)} a week while a ${K.usd(21000)} peak quarter gives ${K.usd(peak.weekly)}, a difference of ${K.usd((peak.weekly - even.weekly) * S.weeks[1])} over the full claim.</p>
<p>Bonuses count in the quarter they were paid, not the quarter they were earned. If a large bonus came in a quarter that sits outside your base period, it does not help, and filing a little later can sometimes move it in. The ${h.a('base-period-high-quarter', 'guide to base periods')} shows which quarters a claim filed now would use.</p>
${h.mini('ui', { t: 'Your New York weekly benefit', p: ['pay', 'hq'], d: { st: 'NY', lock: 1, pay: 60000, hq: 21000 } })}
<h2>Twenty-five or twenty-six</h2>
<p>The statute divides the best quarter by 25 or by 26 according to the level of wages, and the calculator applies 1/26 to everyone. That is the conservative choice: where the agency uses 1/25, the real amount is about ${K.pct(26 / 25 - 1)} higher than shown, until the ${K.usd(S.max)} ceiling stops both. Above roughly ${K.usd(capQ)} in the best quarter, the result is the same either way; at ${K.usd(110000)} of steady pay the check is ${K.usd(top.weekly)}.</p>
<p>The ceiling compares poorly with what higher earners take home. At ${K.usd(60000)} a single filer keeps about ${K.usd(th.net)} a week after federal tax, Social Security, Medicare and the Paid Family Leave premium, before state and city income tax; ${K.usd(even.weekly)} replaces ${K.pct(even.weekly / th.net)} of it.</p>
<h2>A full 26 weeks for everyone</h2>
<p>Many states shorten a claim for people with thin earnings or cut the weeks when unemployment is low. New York does neither: the ${h.src('dol_sigpros', 'DOL table')} lists a uniform duration of ${S.weeks[1]} weeks. Someone who barely qualified and someone at the maximum both have ${S.weeks[1]} weeks of benefits in their benefit year, paid as they certify each week.</p>
<h2>Part-time work and the hours rule</h2>
<p>New York's partial rule is unusual. The July 2026 table describes it by hours: you can work up to 10 hours in a week while gross earnings stay at or below the maximum weekly benefit of ${K.usd(S.max)}. The state publishes how partial benefits are reduced; the ${h.a('partial-unemployment', 'partial unemployment guide')} puts it beside the rules of other states.</p>
<p>Leave for a new child or a sick relative is not unemployment. New York has its own ${h.a('ny-paid-family-leave', 'Paid Family Leave')} and ${h.a('ny-disability-benefits', 'disability benefits')} programs for that, run through employers' insurance.</p>
`,
  faqs: [
    { q: 'What is the maximum weekly unemployment benefit in New York in 2026?', a: `${K.usd(S.max)} a week, according to the Department of Labor table of July 2026. The best quarter of your base period needs to be about ${K.usd(capQ)} or more to reach it. The minimum is ${K.usd(S.min)}. New York pays no dependents allowance, so family size does not change the amount.` },
    { q: 'How many weeks of unemployment does New York pay?', a: `${S.weeks[1]} weeks for every eligible claimant. New York does not scale the duration to your earnings and does not cap the total at a share of base-period wages, unlike most states. Extra weeks beyond ${S.weeks[1]} come only from federal extended benefits during periods of high unemployment.` },
    { q: 'How much must I have earned to get unemployment in New York?', a: `At least ${K.usd(3500)} in the best quarter of your base period, and total base-period wages of at least one and a half times that quarter. Someone with ${K.usd(10000)} in the best quarter therefore needs ${K.usd(15000)} over the four quarters. You must also have lost work through no fault of your own.` },
    { q: 'Does an uneven year raise New York unemployment benefits?', a: `It can. Only the best quarter sets the weekly amount, so ${K.usd(60000)} with ${K.usd(21000)} in one quarter gives ${K.usd(peak.weekly)} a week, against ${K.usd(even.weekly)} for the same pay spread evenly. Enter your best quarter under More options in the calculator to see your own figure.` },
  ],
  tool: 'ui', toolArg: { st: 'NY', lock: 1, pay: 60000, hq: 21000, q2: 15000 },
  related: ['unemployment-calculator', 'base-period-high-quarter', 'ny-paid-family-leave', 'ny-disability-benefits', 'partial-unemployment', 'new-jersey-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
