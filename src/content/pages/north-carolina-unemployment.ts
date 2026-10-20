import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('NC');
const W = S.weeksCap ?? S.weeks[1];
const m = S.alts![0].mult;
const cap2 = Math.ceil(S.max / m);
const a = K.ui('NC', 30000);
const b = K.ui('NC', 60000);
const cutBack = Math.floor((5000 + 5000) * m);
const early = Math.floor((10000 + 10000) * m);

export default definePage({
  id: 'north-carolina-unemployment', group: 'unemployment', order: 120, slug: 'north-carolina-unemployment', st: 'NC',
  nav: 'North Carolina unemployment', card: `Your last two base-period quarters ÷ 52, ${K.usd(S.min)} to ${K.usd(S.max)} a week, ${W} weeks at current rates.`,
  title: `North Carolina Unemployment 2026: ${K.usd(S.max)} Cap and ${W} Weeks`,
  description: `North Carolina unemployment in 2026: your last two base-period quarters divided by 52, ${K.usd(S.min)} to ${K.usd(S.max)} a week, for ${W} weeks while the jobless rate is low.`,
  h1: `North Carolina unemployment in 2026: up to ${K.usd(S.max)} a week for ${W} weeks`,
  intro: `North Carolina divides the wages of the last two quarters of your base period by 52, with a ceiling of ${K.usd(S.max)}, and pays ${W} weeks at today's unemployment rate.`,
  resume: `North Carolina's Division of Employment Security uses a formula found almost nowhere else: it takes the wages of the last two completed quarters of your base period, not the best two, and divides them by 52, which is half of the average weekly pay of those six months. The 2026 range is ${K.usd(S.min)} to ${K.usd(S.max)} a week. The ceiling arrives with about ${K.usd(cap2)} in those two quarters, so ${K.usd(30000)} of steady yearly pay gives ${K.usd(a.weekly)} a week while ${K.usd(60000)} already gets ${K.usd(b.weekly)}. Duration follows the state unemployment rate on a scale from ${S.weeks[0]} to ${S.weeks[1]} weeks; the Department of Labor table of July 2026 states the maximum benefit as ${W} times the weekly amount, the bottom of the scale. A full claim is therefore worth at most ${K.usd(S.max * W)}, and ${K.usd(a.total)} at ${K.usd(30000)} of pay. To qualify, the last two quarters must hold at least six times the state average weekly wage, with wages in two quarters.`,
  body: (h) => `
<h2>The last two quarters, good or bad</h2>
<p>Most states let your strongest months set the benefit. North Carolina looks at the two quarters closest to the end of the base period. If your hours were cut before the layoff, that hurts: a worker who earned ${K.usd(10000)} a quarter for a year and a half, then ${K.usd(5000)} a quarter for the last two, receives ${K.usd(cutBack)} a week, against ${K.usd(early)} had the earlier level held. A recent raise works the other way and counts in full.</p>
<p>The calculator cannot know which quarters came last. It uses the two best quarters you enter, which is right when your pay was steady or rising and too high when it fell. If your earnings dropped late, enter the last two quarters as the best quarter and the second-best to get the North Carolina figure. The ${h.a('base-period-high-quarter', 'base period guide')} shows which quarters a claim filed today covers.</p>
${h.mini('ui', { t: 'Your North Carolina benefit', p: ['pay', 'hq', 'q2'], d: { st: 'NC', lock: 1, pay: 30000 } })}
<h2>Why only ${W} weeks</h2>
<p>North Carolina ties the duration of every new claim to the state unemployment rate at the time you file. The ${h.src('dol_sigpros', 'July 2026 Department of Labor table')} shows a scale of ${S.weeks[0]} to ${S.weeks[1]} weeks and a current maximum of ${W} weekly payments, which is what the calculator uses. The weekly amount does not change with the scale; only the number of payments does. There is no separate cap based on base-period wages, so anyone who qualifies receives all ${W} weeks if they stay unemployed and eligible.</p>
<p>At ${K.usd(S.max)} for ${W} weeks, the most a claim can pay is ${K.usd(S.max * W)}, among the lowest totals in the country. The ${h.a('how-long-unemployment-lasts', 'duration guide')} compares it with neighboring states.</p>
<h2>Weekly certifications and earnings</h2>
<p>Claimants file a weekly certification with DES and must make work search contacts each week. Earnings up to 20% of the weekly benefit are not deducted; above that, the payment falls dollar for dollar. On ${K.usd(a.weekly)}, you may earn ${K.usd(a.weekly * 0.2)} in a week without losing anything. The ${h.a('partial-unemployment', 'partial unemployment guide')} shows how this compares.</p>
<p>The money counts as federal taxable income (${h.src('irs_tc418', 'IRS Topic 418')}), and voluntary withholding at 10% is available. On a claim this short, the tax due is modest, but it is easier to settle in small pieces than in one payment the following April.</p>
`,
  faqs: [
    { q: 'How many weeks of unemployment does North Carolina give?', a: `${W} weeks under the current unemployment rate, according to the Department of Labor table of July 2026. North Carolina's law scales the duration from ${S.weeks[0]} to ${S.weeks[1]} weeks with the state unemployment rate, so claims would last longer only if joblessness rose. The weekly amount itself does not change.` },
    { q: 'How is the North Carolina weekly benefit calculated?', a: 'DES adds the wages of the last two completed quarters of your base period and divides by 52, which equals half of your average weekly pay over those six months. Unlike most states, it does not pick your best quarters, so a pay cut shortly before the job ended lowers the benefit.' },
    { q: 'What is the maximum unemployment benefit in North Carolina?', a: `${K.usd(S.max)} a week, reached once the last two quarters of your base period total about ${K.usd(cap2)}. The minimum is ${K.usd(S.min)}. North Carolina pays no dependents allowance, so household size makes no difference. With ${W} weeks of benefits, the largest regular claim pays ${K.usd(S.max * W)} before federal income tax.` },
  ],
  tool: 'ui', toolArg: { st: 'NC', lock: 1, pay: 30000 },
  related: ['unemployment-calculator', 'how-long-unemployment-lasts', 'south-carolina-unemployment', 'georgia-unemployment', 'base-period-high-quarter'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
