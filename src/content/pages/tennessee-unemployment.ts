import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('TN');
const [lo, hi] = S.weeks;
const m = S.alts![0].mult;
const capAvg = Math.ceil(S.max / m);
const a = K.ui('TN', 30000);
const b = K.ui('TN', 50000);
const keepA = Math.max(50, a.weekly * 0.25);

export default definePage({
  id: 'tennessee-unemployment', group: 'unemployment', order: 125, slug: 'tennessee-unemployment', st: 'TN',
  nav: 'Tennessee unemployment', card: `1/26 of the average of your two best quarters, ${K.usd(S.min)} to ${K.usd(S.max)} a week, ${lo} to ${hi} weeks.`,
  title: `Tennessee Unemployment 2026: Weekly Cap and ${lo} to ${hi} Weeks`,
  description: `Tennessee unemployment in 2026: 1/26 of the average of your two best quarters, ${K.usd(S.min)} to ${K.usd(S.max)} a week, for ${lo} to ${hi} weeks set by the state jobless rate. See yours.`,
  h1: `Tennessee unemployment benefits in 2026: ${K.usd(S.max)} at most, ${lo} to ${hi} weeks`,
  intro: `Tennessee takes your two strongest quarters, averages them and pays a twenty-sixth: never under ${K.usd(S.min)}, never over ${K.usd(S.max)}, for ${lo} weeks or more, ${hi} at most.`,
  resume: `The Tennessee Department of Labor and Workforce Development averages the wages of the two highest quarters of your base period and pays one twenty-sixth of that average, which is about half of the weekly pay in those quarters. The 2026 range is ${K.usd(S.min)} to ${K.usd(S.max)} a week, and the ceiling arrives early, at an average of about ${K.usd(capAvg)} a quarter, or roughly ${K.usd(capAvg * 4)} a year of steady pay. ${K.usd(30000)} gives ${K.usd(a.weekly)} a week; ${K.usd(50000)} or more gives ${K.usd(b.weekly)}. Tennessee indexes the length of a claim to the state unemployment rate, on a scale from ${lo} to ${hi} weeks. The calculator uses the top of that scale, ${hi} weeks, so a claim at the ceiling shows ${K.usd(b.total)}; when unemployment is low, the real duration can be as short as ${lo} weeks, or ${K.usd(S.max * lo)} at the ceiling. There is no separate cap based on base-period wages and no dependents allowance.`,
  body: (h) => `
<h2>The weeks are the uncertain part</h2>
<p>For most Tennessee claimants the weekly amount is easy to predict: anyone with steady full-time pay above about ${K.usd(capAvg * 4)} a year gets ${K.usd(S.max)}. The number of weeks is what varies. The statute links it to joblessness across Tennessee, and the ${h.src('dol_sigpros', 'federal summary of state laws')} describes the maximum benefit as between ${lo} and ${hi} times the weekly amount depending on that rate. Nobody can tell in advance which point of the scale your filing date will fall on, so the tool assumes ${hi} weeks. Its total is a ceiling, not a forecast. At ${lo} weeks, a claimant on ${K.usd(30000)} would receive ${K.usd(a.weekly * lo)} rather than ${K.usd(a.total)}.</p>
<p>The department's monetary determination states the weeks that apply to your claim; use that figure for any budget.</p>
${h.mini('ui', { t: 'Your Tennessee weekly benefit', p: ['pay', 'hq', 'q2'], d: { st: 'TN', lock: 1, pay: 30000 } })}
<h2>Averaging the two best quarters</h2>
<p>Tennessee's formula sits between the one-quarter and whole-year families. If your two best quarters held ${K.usd(9000)} and ${K.usd(6000)}, the average is ${K.usd(7500)}, and one twenty-sixth of it is ${K.usd(7500 / 26)}. A single exceptional quarter helps, but only half as much as it would in Arizona or Nevada, where the best quarter alone counts.</p>
<p>Eligibility has three parts. Base-period wages must reach 40 times the weekly amount; the two best quarters must average at least ${K.cents(780.01)}; and wages outside the best quarter must exceed the lesser of six times the weekly amount or ${K.usd(900)}. The last test blocks claims built on one quarter of work. The ${h.a('base-period-high-quarter', 'base period guide')} explains how quarters are counted.</p>
<h2>Certifying, and part-time earnings</h2>
<p>Claimants certify weekly through the state's online jobs system and complete work search contacts each week. Earnings are partly protected: the greater of ${K.usd(50)} or a quarter of the weekly benefit is ignored, and everything above it is deducted. With a benefit of ${K.usd(a.weekly)}, the first ${K.usd(keepA)} of weekly earnings costs nothing. The ${h.a('partial-unemployment', 'partial unemployment guide')} has the rules of other states.</p>
<h2>Federal tax only, in practice</h2>
<p>Benefits are taxable federal income (${h.src('irs_tc418', 'IRS Topic 418')}), reported on Form 1099-G; you may ask for 10% to be withheld. The ${h.a('how-long-unemployment-lasts', 'duration guide')} lists every state that moves its weeks with the jobless rate, Tennessee among them.</p>
`,
  faqs: [
    { q: 'How many weeks of unemployment does Tennessee pay in 2026?', a: `Between ${lo} and ${hi} weeks, set by Tennessee's jobless rate at the start of your claim. A healthy labor market means a shorter claim. The calculator shows ${hi} weeks, the most possible, and your monetary determination from the department gives the number that applies to your claim.` },
    { q: 'What is the Tennessee unemployment maximum per week?', a: `${K.usd(S.max)}. You get there once the mean of your top two quarters is near ${K.usd(capAvg)}. The minimum is ${K.usd(S.min)}. Tennessee pays no dependents allowance, so the amount does not rise with family size, and it stays the same through the claim even if your circumstances change.` },
    { q: 'How much can I earn while on Tennessee unemployment?', a: `The greater of ${K.usd(50)} or 25% of your weekly benefit is disregarded; each dollar above it is deducted. On a ${K.usd(a.weekly)} benefit, that leaves ${K.usd(keepA)} of protected earnings a week. Report gross pay for the week you worked it, including tips and commissions.` },
  ],
  tool: 'ui', toolArg: { st: 'TN', lock: 1, pay: 30000 },
  related: ['unemployment-calculator', 'how-long-unemployment-lasts', 'kentucky-unemployment', 'georgia-unemployment', 'missouri-unemployment', 'base-period-high-quarter'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
