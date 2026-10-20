import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('OR');
const m = S.alts![0].mult;
const capYear = Math.ceil(S.max / m);
const repl = m * 52;
const a = K.ui('OR', 30000);
const b = K.ui('OR', 45000);
const c = K.ui('OR', 60000);
const th = K.th('OR', 60000);
const share = m * S.weeks[1];
const prot = Math.max(168, c.weekly / 3);

export default definePage({
  id: 'oregon-unemployment', group: 'unemployment', order: 131, slug: 'oregon-unemployment', st: 'OR',
  nav: 'Oregon unemployment', card: `1.25% of your base-period wages a week, ${K.usd(S.min)} to ${K.usd(S.max)}, up to 26 weeks.`,
  title: 'Oregon Unemployment 2026: 1.25% of Wages, Max and Weeks',
  description: `Oregon unemployment in 2026: 1.25% of your total base-period wages each week, ${K.usd(S.min)} to ${K.usd(S.max)}, for up to 26 weeks; 500 hours of work can also qualify you.`,
  h1: `Oregon unemployment in 2026: 1.25% of your year, up to ${K.usd(S.max)} a week`,
  intro: `Oregon pays 1.25% of everything you earned in the base period, each week, from ${K.usd(S.min)} to ${K.usd(S.max)}. Enter your yearly pay; quarters do not matter here.`,
  resume: `Oregon's weekly unemployment benefit is 1.25% of your total wages in the base period, which works out to ${K.pct(repl)} of your average weekly pay over the year, one of the highest replacement rates in the country. The Oregon Employment Department holds the result between ${K.usd(S.min)} and ${K.usd(S.max)} a week in 2026. The ceiling arrives at about ${K.usd(capYear)} of base-period wages: ${K.usd(30000)} gives ${K.usd(a.weekly)} a week, ${K.usd(45000)} gives ${K.usd(b.weekly)} and ${K.usd(60000)} gives ${K.usd(c.weekly)}. Since only the yearly total counts, the timing of your pay within the year makes no difference. A claim lasts up to ${S.weeks[1]} weeks, within a third of base-period wages, a cap that the 1.25% rate keeps you just under. A full claim at ${K.usd(60000)} is worth ${K.usd(c.total)}. You qualify with more than ${K.usd(1000)} in the base period and total wages above one and a half times the best quarter, or with 500 hours of work.`,
  body: (h) => `
<h2>A high replacement rate, from the whole year</h2>
<p>Most states aim at roughly half of your weekly pay. Oregon's 1.25% of the base period, multiplied across 52 weeks, comes to ${K.pct(repl)}. A worker who earned ${K.usd(60000)} and took home about ${K.usd(th.net)} a week after federal tax, payroll taxes and the Paid Leave Oregon contribution receives ${K.usd(c.weekly)}, close to ${K.pct(c.weekly / th.net)} of that take-home pay before tax. The figures match the ${h.src('dol_sigpros', 'Department of Labor table of July 2026')}.</p>
<p>The trade-off is that a strong quarter earns nothing extra. Seasonal workers who would benefit from a best-quarter formula elsewhere get the same check as someone with the same yearly total spread evenly. Missing months lower the amount directly.</p>
${h.mini('ui', { t: 'Your Oregon weekly benefit', p: ['pay'], d: { st: 'OR', lock: 1, pay: 45000 } })}
<h2>A high floor, and what the estimate leaves out</h2>
<p>The minimum of ${K.usd(S.min)} is unusually high. At 1.25%, it corresponds to base-period wages of about ${K.usd(S.min / m)}. The calculator shows no benefit when the percentage falls below the floor; the department's determination decides how a claimant at that level is treated, so file anyway if you think you qualify. The 500-hour route, in particular, lets people with long hours at low pay qualify.</p>
<h2>Why the one-third cap almost never bites</h2>
<p>On paper, a claim stops at ${S.weeks[1]} payments or at a third of base-period earnings, whichever comes first. ${S.weeks[1]} payments at 1.25% of those wages add up to ${K.pct(share, 1)} of them, a hair under a third. In practice, then, Oregon claimants under the maximum receive all ${S.weeks[1]} weeks. Above it, ${K.usd(S.max)} for ${S.weeks[1]} weeks is a smaller share still.</p>
<h2>Weekly claims and part-time earnings</h2>
<p>Oregon claimants file weekly claims through the Frances Online system and report their work search. Part-time earnings reduce the check only above the greater of a third of the weekly benefit or ${K.usd(168)}: on ${K.usd(c.weekly)}, that is ${K.usd(prot)} of earnings a week before anything is deducted. The ${h.a('partial-unemployment', 'partial unemployment guide')} compares every state.</p>
<p>Benefits are federal taxable income (${h.src('irs_tc418', 'IRS Topic 418')}), and 10% federal withholding is available. For your own serious illness, a new child or a sick relative, the program to use is ${h.a('oregon-paid-leave', 'Paid Leave Oregon')}.</p>
`,
  faqs: [
    { q: 'What is the maximum weekly benefit for Oregon unemployment in 2026?', a: `${K.usd(S.max)} a week. Base-period earnings near ${K.usd(capYear)} get you there, and the floor sits at ${K.usd(S.min)}. Oregon adds nothing for dependents, so a parent and a single worker with equal pay draw the same. A full ${S.weeks[1]}-week claim at the maximum is worth ${K.usd(S.max * S.weeks[1])} ahead of any federal tax.` },
    { q: 'How does Oregon calculate the weekly unemployment amount?', a: `It takes 1.25% of your total base-period wages, which equals ${K.pct(repl)} of your average weekly pay over those four quarters. Which quarter you earned the money in makes no difference. The result is then held between the state minimum and maximum for the year of your claim.` },
    { q: 'Can I qualify for Oregon unemployment with hours instead of wages?', a: 'Yes. Besides the wage test, Oregon accepts 500 hours of employment in the base period. That route helps people who worked long hours at low pay. The separation itself still has to be through no fault of your own, and you must be able, available and looking for work each week.' },
  ],
  tool: 'ui', toolArg: { st: 'OR', lock: 1, pay: 45000 },
  related: ['unemployment-calculator', 'oregon-paid-leave', 'washington-unemployment', 'nevada-unemployment', 'partial-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
