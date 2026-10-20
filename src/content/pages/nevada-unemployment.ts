import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('NV');
const m = S.alts![0].mult;
const capQ = Math.ceil(S.max / m);
const ratio = S.weeks[1] * m / S.bpwFrac!;
const steady = K.ui('NV', 45000);
const swing = K.ui('NV', 40000, 15000, 12000);
const top = K.ui('NV', 80000);
const earn = 240;
const afterWork = steady.weekly - earn * (1 - 1 / 3);

export default definePage({
  id: 'nevada-unemployment', group: 'unemployment', order: 134, slug: 'nevada-unemployment', st: 'NV',
  nav: 'Nevada unemployment', card: `1/25 of your best quarter, up to ${K.usd(S.max)} a week, total capped at a third of base-period wages.`,
  title: 'Nevada Unemployment 2026: 1/25 of Best Quarter, Max, Weeks',
  description: `Nevada unemployment in 2026: 1/25 of your best quarter, up to ${K.usd(S.max)} a week for up to 26 weeks, with the total capped at a third of base-period pay. See yours.`,
  h1: `Nevada unemployment in 2026: up to ${K.usd(S.max)} a week, and the one-third rule`,
  intro: `Nevada's DETR pays one twenty-fifth of your best quarter, from ${K.usd(S.min)} to ${K.usd(S.max)} a week, until you reach 26 weeks or a third of your base-period wages.`,
  resume: `Nevada's Employment Security Division, part of DETR, divides the wages of the best quarter in your base period by 25, which comes to just over half of the weekly pay in that quarter. The 2026 range is ${K.usd(S.min)} to ${K.usd(S.max)} a week, and the ceiling needs about ${K.usd(capQ)} in the best quarter. With ${K.usd(45000)} spread evenly, the check is ${K.usd(steady.weekly)} and runs the full ${S.weeks[1]} weeks, for ${K.usd(steady.total)}. Nevada's total cap, a third of base-period wages, is tight enough that moderately uneven pay shortens the claim: ${K.usd(40000)} with ${K.usd(15000)} in the best quarter gives ${K.usd(swing.weekly)} a week but stops at ${K.usd(swing.total)}, about ${K.dec(swing.weeks)} weeks. At ${K.usd(80000)} the weekly amount is ${K.usd(top.weekly)}. To qualify you need ${K.usd(400)} in the best quarter and either base-period wages of one and a half times it or wages in three of the four quarters.`,
  body: (h) => `
<h2>Swing seasons and the one-third rule</h2>
<p>Much of Nevada's workforce is paid by the season: conventions, tourism, construction. That makes the state's total cap more relevant than in most places. A claim pays the lesser of ${S.weeks[1]} weekly amounts and one third of base-period wages, and with a divisor of 25, the cap binds whenever base-period wages are below about ${K.dec(ratio, 2)} times the best quarter. Perfectly even pay gives four times the best quarter and is safe; a year with one strong quarter and a weak one is not. The example in the summary loses about ${K.dec(S.weeks[1] - swing.weeks)} weeks this way.</p>
<p>The weekly amount, by contrast, rewards the strong quarter. If your earnings swung, enter your best quarter under More options in the calculator to see both effects.</p>
${h.mini('ui', { t: 'Your Nevada benefit', p: ['pay', 'hq', 'q2'], d: { st: 'NV', lock: 1, pay: 40000, hq: 15000, q2: 12000 } })}
<h2>Where the ceiling sits</h2>
<p>At ${K.usd(S.max)}, the Nevada maximum is about twice Arizona's ${K.usd(K.S('AZ').max)} and well above California's ${K.usd(K.S('CA').max)}, though Utah's ${K.usd(K.S('UT').max)} is higher, according to the ${h.src('dol_sigpros', 'July 2026 DOL comparison')}. It takes ${K.usd(capQ)} in a quarter, about ${K.usd(capQ * 4)} a year of steady pay, to reach it, so the formula still governs most claims.</p>
<h2>Two ways to qualify</h2>
<p>Every claimant needs at least ${K.usd(400)} in the best quarter. Beyond that, Nevada accepts either base-period wages of at least one and a half times the best quarter, or wages in at least three of the four base-period quarters. The second route helps someone with one big quarter whose other earnings were small but regular. The ${h.a('base-period-high-quarter', 'base period guide')} explains which quarters count.</p>
<h2>What the estimate does not cover</h2>
<p>The figures here are the regular state program only. Federal extended benefits, paid in periods of high unemployment, would add weeks on top and are not modeled. A claimant who also worked in another state during the base period may be able to combine wages, which changes the quarters used. And the weekly amount is set once, at the start of the benefit year: a raise or a pay cut after you file does not move it.</p>
<h2>Weekly claims and part-time pay</h2>
<p>Claimants file weekly through the state's online system and record work search. One third of gross earnings is disregarded and two thirds come off the check: with a benefit of ${K.usd(steady.weekly)} and ${K.usd(earn)} of earnings, the payment drops to ${K.usd(afterWork)}. See the ${h.a('partial-unemployment', 'partial unemployment guide')} for other states.</p>
<p>Benefits are taxable federally (${h.src('irs_tc418', 'IRS Topic 418')}); DETR withholds 10% if you ask.</p>
`,
  faqs: [
    { q: 'What is the maximum Nevada unemployment benefit in 2026?', a: `The ceiling is ${K.usd(S.max)} a week. Dividing by 25, Nevada gets there when a single quarter of the base period brings in around ${K.usd(capQ)}. Smaller claims can go as low as ${K.usd(S.min)}. Nothing is added for dependents. A full ${S.weeks[1]} weeks at the top would come to ${K.usd(S.max * S.weeks[1])}, provided the one-third cap allows it.` },
    { q: 'Why did Nevada give me fewer than 26 weeks of benefits?', a: `Because the total of a Nevada claim is limited to a third of your base-period wages. If your best quarter was large compared with the rest of the year, your weekly amount is high and the money runs out sooner. Wages below about ${K.dec(ratio, 2)} times the best quarter trigger the cap.` },
    { q: 'How does Nevada reduce benefits for part-time work?', a: `It disregards one third of your gross earnings in the week and deducts the other two thirds from the benefit. On ${K.usd(steady.weekly)} a week, ${K.usd(earn)} of earnings leaves ${K.usd(afterWork)}. Report all earnings in the week you did the work, including tips.` },
  ],
  tool: 'ui', toolArg: { st: 'NV', lock: 1, pay: 40000, hq: 15000, q2: 12000 },
  related: ['unemployment-calculator', 'arizona-unemployment', 'california-unemployment', 'how-long-unemployment-lasts', 'partial-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
