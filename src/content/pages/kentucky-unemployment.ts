import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('KY');
const [lo, hi] = S.weeks;
const m = S.alts![0].mult;
const capYear = Math.ceil(S.max / m);
const a = K.ui('KY', 30000);
const b = K.ui('KY', 45000);
const earn = 300;
const afterWork = b.weekly - earn * (1 - 1 / 5);

export default definePage({
  id: 'kentucky-unemployment', group: 'unemployment', order: 132, slug: 'kentucky-unemployment', st: 'KY',
  nav: 'Kentucky unemployment', card: `1.1923% of your base-period wages a week, ${K.usd(S.min)} to ${K.usd(S.max)}, ${lo} to ${hi} weeks.`,
  title: `Kentucky Unemployment 2026: Weekly Amount and ${lo} to ${hi} Weeks`,
  description: `Kentucky unemployment in 2026: 1.1923% of your base-period wages a week, ${K.usd(S.min)} to ${K.usd(S.max)}, for ${lo} to ${hi} weeks tied to the state jobless rate. Your own figure.`,
  h1: `Kentucky unemployment in 2026: up to ${K.usd(S.max)} a week, ${lo} to ${hi} weeks`,
  intro: `Kentucky pays 1.1923% of your total base-period wages each week, between ${K.usd(S.min)} and ${K.usd(S.max)}, for a number of weeks that follows the unemployment rate.`,
  resume: `Kentucky computes unemployment from your whole base period: the Office of Unemployment Insurance pays 1.1923% of your total wages in those four quarters each week, equal to ${K.pct(m * 52)} of your average weekly pay. The 2026 range is ${K.usd(S.min)} to ${K.usd(S.max)} a week, a high ceiling for the region, reached with about ${K.usd(capYear)} of base-period wages. ${K.usd(30000)} gives ${K.usd(a.weekly)} a week and ${K.usd(45000)} gives ${K.usd(b.weekly)}. The weeks depend on the state unemployment rate: in the federal summary of July 2026, a Kentucky claim runs ${lo} to ${hi} weeks, never paying out more than a third of base-period wages. The estimate here assumes ${hi} weeks, the longest case, giving ${K.usd(b.total)} at ${K.usd(45000)}; at ${lo} weeks the same claim would be ${K.usd(b.weekly * lo)}. Qualifying requires base-period wages of one and a half times the best quarter, ${K.usd(1500)} outside it, and eight times the weekly amount in the last two quarters.`,
  body: (h) => `
<h2>Generous per week, variable in length</h2>
<p>Kentucky stands out among its neighbors for the size of the weekly check. The percentage, applied to a full year of wages, replaces about ${K.pct(m * 52)} of average weekly pay, and the ceiling of ${K.usd(S.max)} is well above those of Tennessee (${K.usd(K.S('TN').max)}), Indiana (${K.usd(K.S('IN').max)}) and Missouri (${K.usd(K.S('MO').max)}). What it gives in amount, it can take back in duration. The ${h.src('dol_sigpros', 'federal comparison of state laws for July 2026')} marks Kentucky as one of the states that index weeks to the unemployment rate, with a range of ${lo} to ${hi}.</p>
<p>The calculator uses ${hi} weeks, which is the best case. When joblessness is low, a claim is shorter. Use the weekly figure with confidence and treat the total as an upper bound until the monetary determination tells you the weeks that apply.</p>
${h.mini('ui', { t: 'Your Kentucky weekly benefit', p: ['pay'], d: { st: 'KY', lock: 1, pay: 45000 } })}
<h2>A whole-year formula</h2>
<p>Because Kentucky works from total base-period wages, a big quarter adds no more than its dollars do to the year. ${K.usd(45000)} earned evenly and ${K.usd(45000)} earned mostly in two quarters give the same ${K.usd(b.weekly)}. On the other hand, a gap in work during the base period lowers the benefit in direct proportion.</p>
<p>The one-third cap on the total does not bite for anyone below the ceiling: ${hi} weeks at 1.1923% of wages is ${K.pct(m * hi, 1)} of them.</p>
<h2>Three tests to qualify</h2>
<p>Base-period wages must be at least one and a half times the best quarter, at least ${K.usd(1500)} must have been earned outside that quarter, and the last two quarters of the base period must hold at least eight times the weekly benefit amount. The last condition is particular to Kentucky: someone at ${K.usd(b.weekly)} a week needs ${K.usd(b.weekly * 8)} in those two quarters. The ${h.a('base-period-high-quarter', 'base period guide')} shows which quarters these are.</p>
<h2>Every two weeks: the benefit request</h2>
<p>Kentucky claimants ask for payment every other week, listing the employers they contacted. One fifth of your gross earnings is disregarded, and the other four fifths reduce the check. With a benefit of ${K.usd(b.weekly)} and ${K.usd(earn)} of earnings, the payment is ${K.usd(afterWork)}. The ${h.a('partial-unemployment', 'partial unemployment guide')} compares states. Federal tax applies to all payments (${h.src('irs_tc418', 'IRS Topic 418')}).</p>
`,
  faqs: [
    { q: 'How many weeks of unemployment does Kentucky pay?', a: `Kentucky claims run from ${lo} weeks in a strong job market to ${hi} in a weak one, and the payout can never exceed a third of what you earned in the base period. This site assumes the longest case; your monetary determination letter fixes the real count when the claim is opened.` },
    { q: 'What is the maximum weekly unemployment benefit in Kentucky for 2026?', a: `${K.usd(S.max)}, reached with roughly ${K.usd(capYear)} of base-period wages. The minimum is ${K.usd(S.min)}. Kentucky pays no dependents allowance, so the figure is the same for every household, and the maximum is well above those of most neighboring states, while its number of weeks varies with the job market.` },
    { q: 'How does part-time work affect Kentucky unemployment?', a: `Kentucky ignores one fifth of your gross earnings in a week and deducts the rest from the benefit. With ${K.usd(b.weekly)} a week and ${K.usd(earn)} earned, you receive ${K.usd(afterWork)} in benefits on top of the ${K.usd(earn)}. Report earnings for the week you worked.` },
  ],
  tool: 'ui', toolArg: { st: 'KY', lock: 1, pay: 45000 },
  related: ['unemployment-calculator', 'how-long-unemployment-lasts', 'tennessee-unemployment', 'indiana-unemployment', 'ohio-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
