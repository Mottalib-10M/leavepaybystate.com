import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('CT');
const da = S.da!;
const dep = 15;
const m = S.alts![0].mult;
const capAvg = Math.ceil(S.max / m);
const a = K.ui('CT', 45000);
const b = K.ui('CT', 60000);
const uneven = K.ui('CT', 40000, 15000, 12000);
const earn = 270;
const afterWork = b.weekly - earn * (1 - 1 / 3);
const th = K.th('CT', 60000);

export default definePage({
  id: 'connecticut-unemployment', group: 'unemployment', order: 135, slug: 'connecticut-unemployment', st: 'CT',
  nav: 'Connecticut unemployment', card: `1/26 of the average of your two best quarters plus $15 a dependent, up to ${K.usd(S.max)} a week, 26 weeks.`,
  title: 'Connecticut Unemployment 2026: Weekly Benefit and Dependents',
  description: `Connecticut unemployment in 2026: 1/26 of your two best quarters' average, ${K.usd(S.min)} to ${K.usd(S.max)} a week, plus $15 per dependent, for 26 weeks. See your own amount.`,
  h1: `Connecticut unemployment in 2026: up to ${K.usd(S.max)} a week, plus ${K.usd(dep)} per dependent`,
  intro: `Connecticut pays one twenty-sixth of the average of your two best quarters, between ${K.usd(S.min)} and ${K.usd(S.max)} a week, and adds an allowance for dependents.`,
  resume: `The Connecticut Department of Labor averages the wages of the two highest quarters in your base period and pays one twenty-sixth of that average, roughly half of your weekly pay in those quarters. For 2026 the base range is ${K.usd(S.min)} to ${K.usd(S.max)}, and the ceiling takes an average of about ${K.usd(capAvg)} a quarter, around ${K.usd(capAvg * 4)} a year of steady pay. So ${K.usd(45000)} gives ${K.usd(a.weekly)} a week and ${K.usd(60000)} gives ${K.usd(b.weekly)}. A dependents allowance of ${K.usd(dep)} per dependent, for up to five, comes on top, which takes the possible maximum to ${K.usd(da[1])}; the allowance can never exceed the base benefit itself. Every eligible claimant receives up to ${S.weeks[1]} weeks, with no cap tied to wages. The only wage test is that base-period earnings reach 40 times the weekly amount, so someone at ${K.usd(b.weekly)} needs ${K.usd(b.weekly * 40)}. A full claim at ${K.usd(60000)} pays ${K.usd(b.total)}.`,
  body: (h) => `
<h2>The allowance that rides above the cap</h2>
<p>In Maryland and New Jersey, a dependents allowance stops at the state maximum. Connecticut's does not. The ${h.src('dol_sigpros', 'Department of Labor table of July 2026')} gives a base ceiling of ${K.usd(S.max)} and a ceiling with dependents of ${K.usd(da[1])}, which is ${K.usd(S.max)} plus five allowances of ${K.usd(dep)}. A claimant at the top of the scale with two children therefore receives ${K.usd(S.max + 2 * dep)}. The one restriction runs the other way: the allowance cannot be larger than the weekly benefit, which only matters for the smallest claims, and explains why the lowest amount with dependents is ${K.usd(da[0])}.</p>
<p>The calculator shows the base benefit. Add ${K.usd(dep)} for each dependent you will declare, and keep in mind that the department may ask for proof of the relationship before it pays the allowance.</p>
${h.mini('ui', { t: 'Your Connecticut benefit', p: ['pay', 'hq', 'q2'], d: { st: 'CT', lock: 1, pay: 45000 } })}
<h2>Two quarters, averaged</h2>
<p>Connecticut uses the mean of your two strongest quarters, then divides by 26. Uneven pay helps less than in a single-quarter state but still counts: ${K.usd(40000)} with ${K.usd(15000)} and ${K.usd(12000)} in the two best quarters gives ${K.usd(uneven.weekly)}, against ${K.usd(K.ui('CT', 40000).weekly)} for the same pay spread evenly. For a single filer on ${K.usd(60000)}, who takes home about ${K.usd(th.net)} a week after federal tax, payroll taxes and the paid leave contribution, the ${K.usd(b.weekly)} benefit is ${K.pct(b.weekly / th.net)} of take-home pay before tax.</p>
<h2>A uniform ${S.weeks[1]} weeks</h2>
<p>Connecticut gives the same duration to everyone who qualifies: ${S.weeks[1]} weeks in the benefit year, without a share-of-wages limit. The wage test is equally plain, base-period earnings of at least 40 times the weekly benefit. The ${h.a('how-long-unemployment-lasts', 'duration guide')} lists the other states with a uniform duration.</p>
<h2>Weekly certification and part-time earnings</h2>
<p>Claimants certify each week online with the Department of Labor and keep a record of their work search. A third of gross earnings is disregarded and the remaining two thirds reduce the check. With a benefit of ${K.usd(b.weekly)} and ${K.usd(earn)} of earnings, the payment is ${K.usd(afterWork)}. The ${h.a('partial-unemployment', 'partial unemployment guide')} has the rules of every state.</p>
<p>Benefits are subject to federal income tax (${h.src('irs_tc418', 'IRS Topic 418')}), and 10% withholding is available if you ask for it when you file or later in the claim. A leave for your own health or a family member's goes through ${h.a('connecticut-paid-leave', 'CT Paid Leave')}, a separate program.</p>
`,
  faqs: [
    { q: 'What is the maximum Connecticut unemployment benefit with dependents?', a: `${K.usd(da[1])} a week in 2026: the base maximum of ${K.usd(S.max)} plus ${K.usd(dep)} for each of up to five dependents. Unlike Maryland or New Jersey, Connecticut lets the allowance go past the ordinary ceiling. The allowance can never be larger than your base weekly benefit, which limits it only for very small claims.` },
    { q: 'How long does Connecticut unemployment last?', a: `${S.weeks[1]} weeks for every eligible claimant. Connecticut does not shorten claims for lower or uneven earnings and does not cap the total as a share of base-period wages. Additional weeks are possible only through federal extended benefits during periods of high unemployment in the state.` },
    { q: 'How is the Connecticut weekly benefit rate calculated?', a: 'The Department of Labor takes the two highest-paid quarters of your base period, averages them and divides by 26. That is about half of your average weekly wage in those quarters. The result is held between the state minimum and maximum, and the dependents allowance is added afterward.' },
  ],
  tool: 'ui', toolArg: { st: 'CT', lock: 1, pay: 45000 },
  related: ['unemployment-calculator', 'connecticut-paid-leave', 'massachusetts-unemployment', 'new-york-unemployment', 'partial-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
