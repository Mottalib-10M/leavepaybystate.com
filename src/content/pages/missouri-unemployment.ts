import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('MO');
const [lo, hi] = S.weeks;
const m = S.alts![0].mult;
const capAvg = Math.ceil(S.max / m);
const a = K.ui('MO', 24000);
const b = K.ui('MO', 45000);
const prot = Math.max(20, a.weekly * 0.2);

export default definePage({
  id: 'missouri-unemployment', group: 'unemployment', order: 126, slug: 'missouri-unemployment', st: 'MO',
  nav: 'Missouri unemployment', card: `4% of the average of your two best quarters, ${K.usd(S.min)} to ${K.usd(S.max)} a week, ${lo} to ${hi} weeks.`,
  title: 'Missouri Unemployment 2026: 4% Formula, Max and Duration',
  description: `Missouri unemployment in 2026: 4% of the average of your two best quarters, ${K.usd(S.min)} to ${K.usd(S.max)} a week, for ${lo} to ${hi} weeks depending on the state jobless rate.`,
  h1: `Missouri unemployment in 2026: ${K.usd(S.max)} a week, for as few as ${lo} or as many as ${hi} weeks`,
  intro: `Missouri pays 4% of the average of your two best quarters, from ${K.usd(S.min)} to ${K.usd(S.max)} a week, and lets the jobless rate decide how many weeks.`,
  resume: `Missouri's Division of Employment Security averages the wages of your two highest base-period quarters and pays 4% of that average each week, with a 2026 floor of ${K.usd(S.min)} and a ceiling of ${K.usd(S.max)}. The ceiling needs an average of only ${K.usd(capAvg)} a quarter, about ${K.usd(capAvg * 4)} a year of steady pay, so most full-time workers receive it: ${K.usd(45000)} gives ${K.usd(b.weekly)}, while ${K.usd(24000)} gives ${K.usd(a.weekly)}. Missouri's duration is one of the most variable in the country. The Department of Labor table of July 2026 gives a range of ${lo} to ${hi} weeks tied to the state unemployment rate, and a maximum benefit of the lesser of ${hi} weekly payments and a third of base-period wages. The calculator shows ${hi} weeks, the top of the range, so ${K.usd(b.total)} at the ceiling; at the bottom of the range the same claim would pay ${K.usd(S.max * lo)}. Qualifying needs at least ${K.usd(1500)} in one quarter and base-period wages of one and a half times the best quarter.`,
  body: (h) => `
<h2>Plan for the short end</h2>
<p>A Missouri claim can be worth more than twice as much in one year as in another, for the same worker. The law sets the number of weeks from the state's average unemployment rate, and the ${h.src('dol_sigpros', 'federal summary of July 2026')} lists the possible range as ${lo} to ${hi} weeks. Since the calculator cannot read the rate in force when you file, it shows the most a claim can pay. Treat that as the best case. At ${K.usd(a.weekly)} a week, ${hi} weeks is ${K.usd(a.total)} and ${lo} weeks is ${K.usd(a.weekly * lo)}; the Division's monetary determination will say which applies.</p>
<p>The practical consequence is that a Missouri claimant should start the job search on day one rather than count on months of support.</p>
${h.mini('ui', { t: 'Your Missouri benefit', p: ['pay', 'hq', 'q2'], d: { st: 'MO', lock: 1, pay: 24000 } })}
<h2>Four percent of a two-quarter average</h2>
<p>Missouri writes its rate as a percentage. Two best quarters of ${K.usd(7000)} and ${K.usd(5000)} average ${K.usd(6000)}, and 4% of that is ${K.usd(6000 * m)}. With the ceiling at ${K.usd(S.max)}, the formula matters mainly for part-time and lower-wage workers. Averaging two quarters smooths a seasonal peak: a single ${K.usd(12000)} quarter beside a ${K.usd(4000)} one gives the same ${K.usd(8000 * m)} as two ${K.usd(8000)} quarters.</p>
<p>The one-third cap rarely changes anything. With steady pay, ${hi} weekly payments add up to about ${K.pct(hi * m / 4)} of the base period's wages, well below a third. It can bite only when nearly all of the year's earnings fell in two quarters.</p>
<h2>Who qualifies</h2>
<p>Missouri looks for at least ${K.usd(1500)} in one quarter of the base period and total base-period wages of at least one and a half times the best quarter. A second route accepts wages in two quarters adding up to one and a half times the maximum taxable wage base. Beyond the money, the job must have ended through no fault of yours, and you must be able to work, available for it and looking each week. The ${h.a('base-period-high-quarter', 'base period guide')} shows which months count.</p>
<h2>Weekly requests and earnings</h2>
<p>Claimants request payment each week online and report work search contacts. Earnings up to the greater of ${K.usd(20)} or 20% of the weekly benefit are not counted; the rest comes off the check. With ${K.usd(a.weekly)} a week, the first ${K.usd(prot)} of earnings is protected. The ${h.a('partial-unemployment', 'partial unemployment guide')} compares states.</p>
<p>Unemployment is federal taxable income (${h.src('irs_tc418', 'IRS Topic 418')}), and 10% withholding is available on request through ${h.src('irs_w4v', 'Form W-4V')}. The ${h.a('how-long-unemployment-lasts', 'duration guide')} sets Missouri beside the other states that index their weeks.</p>
`,
  faqs: [
    { q: 'How many weeks of unemployment can I get in Missouri?', a: `Between ${lo} and ${hi} weeks, set by the state's average unemployment rate when your claim begins, and never more than a third of your base-period wages in total. The calculator shows ${hi} weeks as the upper bound; the Division of Employment Security's determination gives the weeks for your claim.` },
    { q: 'What is the most Missouri unemployment pays per week in 2026?', a: `${K.usd(S.max)} a week, reached when your two best quarters average about ${K.usd(capAvg)}. The floor is ${K.usd(S.min)}. Missouri has no dependents allowance. Because the ceiling is reached at modest wages, most full-time workers laid off in Missouri receive the maximum weekly amount.` },
    { q: 'How is the Missouri weekly benefit amount calculated?', a: 'The Division averages the wages of the two highest quarters in your base period and pays 4% of that average, which is about half of the average weekly pay in those quarters. The result is held between the state minimum and maximum for the year your claim starts.' },
  ],
  tool: 'ui', toolArg: { st: 'MO', lock: 1, pay: 24000 },
  related: ['unemployment-calculator', 'how-long-unemployment-lasts', 'tennessee-unemployment', 'illinois-unemployment', 'kentucky-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
