import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('FL');
const W = S.weeksCap ?? S.weeks[1];
const capQ = S.max * 26;
const low = K.ui('FL', 20000);
const mid = K.ui('FL', 50000);
const lumpy = K.ui('FL', 12000, 7000, 2500);
const th = K.th('FL', 50000);

export default definePage({
  id: 'florida-unemployment', group: 'unemployment', order: 113, slug: 'florida-unemployment', st: 'FL',
  nav: 'Florida unemployment', card: `1/26 of your best quarter, ${K.usd(S.min)} to ${K.usd(S.max)} a week, ${W} weeks at most.`,
  title: `Florida Unemployment 2026: Weekly Pay, ${W} Weeks, Total Cap`,
  description: `Florida unemployment in 2026: 1/26 of your best quarter, ${K.usd(S.min)} to ${K.usd(S.max)} a week, ${W} weeks at most and a total capped at 25% of base pay. See your own amount.`,
  h1: `Florida unemployment in 2026: ${K.usd(S.max)} a week at most, for ${W} weeks`,
  intro: `Florida's Reemployment Assistance pays one twenty-sixth of your best quarter, from ${K.usd(S.min)} to ${K.usd(S.max)} a week, and stops after ${W} weeks or a quarter of your base-period wages.`,
  resume: `Florida pays the least of any large state, for the shortest time. Reemployment Assistance divides the wages of the best quarter of your base period by 26, with a minimum of ${K.usd(S.min)} and a maximum of ${K.usd(S.max)} a week. The maximum is reached with only ${K.usd(capQ)} in that quarter, so nearly every full-time worker gets ${K.usd(S.max)}: on ${K.usd(50000)} of steady pay the check is ${K.usd(mid.weekly)}, and on ${K.usd(20000)} it is ${K.usd(low.weekly)}. The duration is tied to the state unemployment rate, and the July 2026 Department of Labor table gives ${W} weeks as the current limit. A second cap holds the total to ${K.pct(S.bpwFrac!)} of base-period wages. The most a regular Florida claim can pay is therefore ${K.usd(S.max * W)}. To qualify you need at least ${K.usd(3400)} in the base period, wages in two quarters, and a base-period total of one and a half times the best quarter.`,
  body: (h) => `
<h2>Why the maximum is easy to reach</h2>
<p>At one twenty-sixth of the best quarter, ${K.usd(S.max)} a week corresponds to ${K.usd(capQ)} earned in three months, or about ${K.usd(capQ * 4)} a year of even pay. A full-time job at a modest hourly rate gets there. Above that line the formula stops mattering: a nurse, an electrician and a regional manager laid off the same week all receive ${K.usd(S.max)}. The figures come from the ${h.src('dol_sigpros', 'Department of Labor table of July 2026')}, which reports Florida's law as it stands.</p>
<p>Compared with pay, that is a thin cushion. At ${K.usd(50000)} a year, a single filer takes home about ${K.usd(th.net)} a week after federal income tax, Social Security and Medicare, and the benefit covers ${K.pct(mid.weekly / th.net)} of it.</p>
${h.mini('ui', { t: 'Your Florida weekly benefit', p: ['pay', 'hq'], d: { st: 'FL', lock: 1, pay: 20000 } })}
<h2>Twelve weeks, and sometimes fewer</h2>
<p>Florida links the length of a claim to its unemployment rate: the worse the job market, the more weeks. The DOL table lists a range from ${S.weeks[0]} to ${S.weeks[1]} weeks and states the maximum benefit as the lesser of ${K.pct(S.bpwFrac!)} of base-period wages or ${W} times the weekly amount. The calculator uses ${W} weeks. If the rate rises and the state lengthens claims, the estimate will understate the weeks.</p>
<p>The quarter-of-wages cap trims claims for people whose pay was concentrated. Take ${K.usd(12000)} in the base period with ${K.usd(7000)} of it in one quarter: the weekly amount is ${K.usd(lumpy.weekly)}, but the total stops at ${K.usd(lumpy.total)}, about ${K.dec(lumpy.weeks)} weeks of payments. With ${K.usd(20000)} spread evenly, ${K.usd(low.weekly)} a week runs the full ${W} weeks for ${K.usd(low.total)}.</p>
<h2>Claiming and staying eligible</h2>
<p>Florida runs claims online through the Reconnect system of FloridaCommerce. Each claim week has to be requested, and the state expects documented work search contacts for those weeks, along with being able and available for work. A job you left voluntarily or lost for misconduct generally disqualifies you, and the reason for separation is checked with the employer.</p>
<h2>Earning while on a claim</h2>
<p>Part-time pay does not end benefits right away. Florida disregards earnings up to eight times the federal hourly minimum wage in a week, then reduces the check dollar for dollar. Report gross pay for the week you earned it, not the week you were paid. The ${h.a('partial-unemployment', 'partial unemployment guide')} sets this rule beside those of other states.</p>
<p>Benefits count as federal income (${h.src('irs_tc418', 'IRS Topic 418')}). You can ask for 10% withholding with ${h.src('irs_w4v', 'Form W-4V')}; over a full Florida claim of ${K.usd(S.max * W)} that is ${K.usd(S.max * W * 0.1)}.</p>
`,
  faqs: [
    { q: 'What is the most Florida unemployment pays a week in 2026?', a: `${K.usd(S.max)}, reached with ${K.usd(capQ)} or more in the best quarter of your base period. The floor is ${K.usd(S.min)}. Florida pays no dependents allowance, so the amount does not change with family size, and the ceiling has not been indexed to wages the way it is in many other states.` },
    { q: 'How many weeks does Florida Reemployment Assistance last?', a: `${W} weeks at current unemployment rates, according to the Department of Labor table of July 2026. Florida ties the number of weeks to the state unemployment rate, so it rises only if the job market weakens. The total can also stop earlier, at ${K.pct(S.bpwFrac!)} of your base-period wages.` },
    { q: 'What is the minimum income to qualify for Florida unemployment?', a: `At least ${K.usd(3400)} in the base period, with wages in at least two quarters, and a base-period total of at least one and a half times your best quarter. Someone with ${K.usd(5000)} in the best quarter needs ${K.usd(7500)} over the four quarters to meet the second test.` },
  ],
  tool: 'ui', toolArg: { st: 'FL', lock: 1, pay: 20000 },
  related: ['unemployment-calculator', 'how-long-unemployment-lasts', 'unemployment-benefits-by-state', 'georgia-unemployment', 'partial-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
