import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('CO');
const [q, y] = S.alts!;
const capQ = q.cap!, capY = y.cap!;
const crossY = Math.ceil(capQ / y.mult);
const topY = Math.ceil(capY / y.mult);
const a = K.ui('CO', 60000);
const b = K.ui('CO', 80000);
const c = K.ui('CO', 100000);
const lumpy = K.ui('CO', 40000, 15000, 12000);
const th = K.th('CO', 100000);

export default definePage({
  id: 'colorado-unemployment', group: 'unemployment', order: 128, slug: 'colorado-unemployment', st: 'CO',
  nav: 'Colorado unemployment', card: `Two formulas, the higher wins: up to ${K.usd(capQ)} from your best quarters or ${K.usd(capY)} from the whole year.`,
  title: 'Colorado Unemployment 2026: Two Formulas, Two Weekly Caps',
  description: `Colorado unemployment in 2026: the higher of two formulas, one capped at ${K.usd(capQ)} and one at ${K.usd(capY)} a week, for up to 26 weeks within a third of your base pay.`,
  h1: 'Colorado unemployment in 2026: two ways to compute, and the higher one is paid',
  intro: `Colorado computes your benefit twice, from your two best quarters and from your whole base period, and pays the higher amount, up to ${K.usd(capY)} a week in 2026.`,
  resume: `Colorado's Department of Labor and Employment runs two formulas and pays whichever gives more. The first takes 60% of a twenty-sixth of your two highest consecutive quarters, which is 60% of your average weekly wage in those six months, capped at ${K.usd(capQ)} a week. The second takes 50% of a fifty-second of the whole base period, capped at ${K.usd(capY)}. The minimum is ${K.usd(S.min)}. For most people the first formula wins: ${K.usd(60000)} of steady pay gives ${K.usd(a.weekly)} a week and ${K.usd(80000)} gives ${K.usd(b.weekly)}. Only with base-period wages above about ${K.usd(crossY)} does the yearly formula pull ahead, reaching its ceiling of ${K.usd(capY)} at around ${K.usd(topY)}; ${K.usd(100000)} gets ${K.usd(c.weekly)}. A claim lasts up to ${S.weeks[1]} weeks, with a total capped at a third of base-period wages. To qualify, base-period wages must be at least 40 times the weekly amount or ${K.usd(2500)}, whichever is greater.`,
  body: (h) => `
<h2>Formula one: your best six months</h2>
<p>The first method looks at two consecutive quarters, those with the highest combined wages, and replaces 60% of the weekly average. ${K.usd(30000)} across those quarters means ${K.usd(30000 / 26)} a week and a benefit of ${K.usd(30000 * q.mult)}. The ceiling for this route is ${K.usd(capQ)}, half of the state's average weekly earnings, according to the ${h.src('dol_sigpros', 'Department of Labor table of July 2026')}. The calculator uses your two highest quarters whether or not they were back to back; if your two best quarters were separated, the figure Colorado uses will be lower.</p>
<h2>Formula two: the whole base period</h2>
<p>The second method takes all four quarters, divides by 52 and pays half. Its rate is lower, but its ceiling, ${K.usd(capY)} or 55% of average weekly earnings, is higher. That makes it the better route only for higher earners whose pay was steady: once base-period wages exceed about ${K.usd(crossY)}, the yearly formula beats the capped quarterly one. A single filer on ${K.usd(100000)} takes home roughly ${K.usd(th.net)} a week after federal tax, payroll taxes and the FAMLI premium; the ${K.usd(c.weekly)} benefit replaces ${K.pct(c.weekly / th.net)} of it.</p>
${h.mini('ui', { t: 'Colorado, both formulas at once', p: ['pay', 'hq', 'q2'], d: { st: 'CO', lock: 1, pay: 80000 } })}
<h2>Which one applies to you</h2>
<p>Below about ${K.usd(crossY)} a year, the quarterly formula always gives more, because 60% of a six-month average beats 50% of a full-year average. Above that level, both formulas hit or approach their caps, and the yearly one, with the higher cap, wins. A claimant with uneven pay, say ${K.usd(40000)} with ${K.usd(15000)} and ${K.usd(12000)} in the two best quarters, does best under the quarterly route: ${K.usd(lumpy.weekly)} a week. You do not choose; the agency computes both and pays the larger.</p>
<h2>A third of your wages, at most</h2>
<p>The total of a Colorado claim is the lesser of ${S.weeks[1]} payments and one third of base-period wages. Uneven earners feel it: in the example above, a third of ${K.usd(40000)} is ${K.usd(lumpy.total)}, about ${K.dec(lumpy.weeks)} weeks of payments. The ${h.a('how-long-unemployment-lasts', 'duration guide')} compares this with other states.</p>
<h2>Requests for payment and side earnings</h2>
<p>Colorado claimants request payment every two weeks through MyUI+ and log work search activities. Earnings up to half of the weekly benefit are disregarded; above that, they reduce the payment. On ${K.usd(a.weekly)}, you can earn ${K.usd(a.weekly / 2)} in a week without losing anything. The ${h.a('partial-unemployment', 'partial unemployment guide')} sets out the other states' rules. Federal tax applies to the benefits (${h.src('irs_tc418', 'IRS Topic 418')}).</p>
`,
  faqs: [
    { q: 'What is the maximum unemployment benefit in Colorado for 2026?', a: `${K.usd(capY)} a week, available only through the base-period formula, which needs about ${K.usd(topY)} of wages over the four quarters. The quarterly formula stops at ${K.usd(capQ)}. Colorado pays whichever is higher, so many claimants at the top of the scale receive ${K.usd(capQ)} rather than the overall maximum.` },
    { q: 'Why does Colorado have two maximum unemployment amounts?', a: 'Because the law gives two formulas, each with its own ceiling. The two-quarter method is capped at half of the state average weekly earnings, the base-period method at 55% of them. The second rewards long, steady employment, and the agency pays whichever result is higher.' },
    { q: 'How long does Colorado unemployment last?', a: `Up to ${S.weeks[1]} weeks, as long as the total stays within a third of your base-period wages. Someone with steady pay over the year usually gets all ${S.weeks[1]} weeks; someone whose earnings were concentrated in a few months may reach the one-third limit earlier.` },
  ],
  tool: 'ui', toolArg: { st: 'CO', lock: 1, pay: 80000 },
  related: ['unemployment-calculator', 'minnesota-unemployment', 'colorado-famli', 'how-long-unemployment-lasts', 'partial-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
