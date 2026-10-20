import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('WA');
const m = S.alts![0].mult;
const capAvg = Math.ceil(S.max / m);
const a = K.ui('WA', 50000);
const b = K.ui('WA', 90000);
const c = K.ui('WA', 140000);
const lumpy = K.ui('WA', 40000, 15000, 12000);
const th = K.th('WA', 90000);
const tx = K.uiTax('WA');
const earn = 405;
const afterWork = Math.max(0, a.weekly - 0.75 * (earn - 5));

export default definePage({
  id: 'washington-unemployment', group: 'unemployment', order: 121, slug: 'washington-unemployment', st: 'WA',
  nav: 'Washington unemployment', card: `3.85% of your two best quarters' average, ${K.usd(S.min)} to ${K.usd(S.max)} a week, no state income tax.`,
  title: `Washington Unemployment 2026: Up to ${K.usd(S.max)} a Week, ${S.weeks[1]} Weeks`,
  description: `Washington unemployment in 2026: 3.85% of the average of your two best quarters, ${K.usd(S.min)} to ${K.usd(S.max)} a week for up to 26 weeks, with 680 hours needed to qualify.`,
  h1: `Washington unemployment in 2026: the highest ceiling in the country, at ${K.usd(S.max)}`,
  intro: `Washington's ESD pays 3.85% of the average of your two best quarters, from ${K.usd(S.min)} to ${K.usd(S.max)} a week. Enter your pay to see the amount and the weeks.`,
  resume: `Washington pays the most generous unemployment ceiling of any state in 2026. The Employment Security Department averages the wages of the two highest quarters of your base period and pays 3.85% of that average, with a minimum of ${K.usd(S.min)} and a maximum of ${K.usd(S.max)} a week, both reset from the state average wage. The maximum needs an average of about ${K.usd(capAvg)} a quarter in your two best quarters, roughly ${K.usd(capAvg * 4)} a year of even pay, so middle incomes stay on the formula: ${K.usd(50000)} gives ${K.usd(a.weekly)} a week, ${K.usd(90000)} gives ${K.usd(b.weekly)}, and ${K.usd(140000)} reaches ${K.usd(c.weekly)}. Benefits last up to ${S.weeks[1]} weeks, and the total cannot exceed a third of base-period wages, which only bites when pay was concentrated. Eligibility is counted in hours: 680 in the base period. Washington has no state income tax, so the only tax on benefits is federal.`,
  body: (h) => `
<h2>Hours, not dollars, to qualify</h2>
<p>Washington is the state where eligibility is measured in time worked. You need 680 hours of paid work in the base period or, failing that, in the alternate base period of the four most recent completed quarters. That is about ${K.num(680 / 40)} weeks of 40-hour work, or a full year of part-time work at around ${K.num(680 / 52)} hours a week. Pay level does not enter the test, which makes it easier for low-wage workers with steady hours and harder for highly paid people who worked a short stint.</p>
<p>The ${h.src('esd_2026', 'ESD announcement of 2026 benefit levels')} set the ceiling at ${K.usd(S.max)} and the floor at ${K.usd(S.min)}, both tied to the state average annual wage. The ${h.src('dol_sigpros', 'Department of Labor table of July 2026')} carries the same figures.</p>
${h.mini('ui', { t: 'Your Washington benefit', p: ['pay', 'hq', 'q2'], d: { st: 'WA', lock: 1, pay: 50000 } })}
<h2>A formula that keeps paying more as pay rises</h2>
<p>Because the ceiling is high, most people never reach it, and every dollar of extra wages changes the benefit. With even pay, 3.85% of a quarter's average is about ${K.pct(m * 52 / 4)} of weekly wages. A single filer on ${K.usd(90000)} who takes home about ${K.usd(th.net)} a week after federal tax, payroll taxes and the paid leave premium receives ${K.usd(b.weekly)}, close to ${K.pct(b.weekly / th.net)} of take-home pay. There is also a second limit in the law: the weekly amount cannot be more than your individual weekly wage, which only matters for unusual wage patterns.</p>
<h2>The one-third cap and uneven years</h2>
<p>The total of a claim is the lesser of ${S.weeks[1]} weekly payments and one third of base-period wages. For steady pay the weeks run out first. When two quarters carry most of the year, the cap shortens the claim: ${K.usd(40000)} with ${K.usd(15000)} and ${K.usd(12000)} in the two best quarters gives ${K.usd(lumpy.weekly)} a week, but the total stops at ${K.usd(lumpy.total)}, about ${K.dec(lumpy.weeks)} weeks.</p>
<h2>Part-time work and the weekly claim</h2>
<p>Claimants file weekly through ESD and report hours and gross pay. Washington keeps a quarter of what you earn above ${K.usd(5)}: put the other way, three quarters of earnings above ${K.usd(5)} come off the check. With a benefit of ${K.usd(a.weekly)} and ${K.usd(earn)} of earnings, the payment drops to ${K.usd(afterWork)}. The ${h.a('partial-unemployment', 'partial unemployment guide')} explains how this compares.</p>
<h2>Only the IRS taxes it</h2>
<p>Washington has no individual income tax (${h.src(tx.source!, 'Department of Revenue')}). Benefits are still federal income (${h.src('irs_tc418', 'IRS Topic 418')}), and ESD withholds 10% if you ask. A leave for your own illness or a new child goes through ${h.a('washington-paid-family-leave', 'Paid Family and Medical Leave')} instead.</p>
`,
  faqs: [
    { q: 'What is the maximum unemployment in Washington state for 2026?', a: `${K.usd(S.max)} a week, the highest state ceiling in the country, set by the Employment Security Department from the state average wage. It takes an average of about ${K.usd(capAvg)} in your two best quarters. Over ${S.weeks[1]} weeks, a full claim at the ceiling pays ${K.usd(S.max * S.weeks[1])} before federal tax.` },
    { q: 'How many hours do I need to qualify for unemployment in Washington?', a: 'At least 680 hours of paid work in your base period, the first four of the last five completed calendar quarters. If you fall short, ESD checks the alternate base period, made of the last four completed quarters. The test counts hours only, not the amount you earned.' },
    { q: 'Do I pay state tax on Washington unemployment benefits?', a: 'No. Washington does not have an individual income tax, so unemployment benefits are only taxed federally. They are reported on Form 1099-G, and you can choose 10% federal withholding when you apply or later. Claimants who move to another state during the year should check that state\'s rules.' },
  ],
  tool: 'ui', toolArg: { st: 'WA', lock: 1, pay: 50000 },
  related: ['unemployment-calculator', 'unemployment-benefits-by-state', 'washington-paid-family-leave', 'oregon-unemployment', 'partial-unemployment'],
  sources: ['esd_2026', 'dol_sigpros', 'dol_statelaws', 'wa_dor', 'irs_tc418', 'irs_w4v'],
});
