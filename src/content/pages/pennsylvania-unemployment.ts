import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('PA');
const A = S.alts![0];
const capQ = Math.ceil((S.max - (A.add ?? 0)) / A.mult);
const a = K.ui('PA', 45000);
const b = K.ui('PA', 32000, 9000);
const tx = K.uiTax('PA');
const da = S.da!;

export default definePage({
  id: 'pennsylvania-unemployment', group: 'unemployment', order: 114, slug: 'pennsylvania-unemployment', st: 'PA',
  nav: 'Pennsylvania unemployment', card: `About 4% of your best quarter, ${K.usd(S.min)} to ${K.usd(S.max)} a week, plus a small dependents allowance.`,
  title: 'Pennsylvania Unemployment 2026: Weekly Benefit and Weeks',
  description: `Pennsylvania unemployment in 2026: about 4% of your best quarter, ${K.usd(S.min)} to ${K.usd(S.max)} a week, up to 26 weeks by credit weeks, and no state income tax on it at all.`,
  h1: 'Pennsylvania unemployment compensation in 2026: the formula, the 37% test and the weeks',
  intro: `Pennsylvania pays 4% of your best quarter plus two dollars, trimmed by 2%, between ${K.usd(S.min)} and ${K.usd(S.max)} a week. Enter your pay to see your check.`,
  resume: `Pennsylvania's unemployment compensation starts from the quarter of your base period in which you earned the most. The Department of Labor and Industry takes 4% of it, adds two dollars and multiplies the result by 0.98, which in practice is 3.92% of the quarter plus ${K.cents(A.add ?? 0)}. The 2026 range is ${K.usd(S.min)} to ${K.usd(S.max)} a week, and the maximum needs about ${K.usd(capQ)} in the best quarter. With ${K.usd(45000)} of steady pay, the best quarter is ${K.usd(11250)} and the check is ${K.usd(a.weekly)}; over a full claim that is ${K.usd(a.total)}. A claimant with a dependent spouse or child receives a little more, with the dependents allowance taking the top amount to ${K.usd(da[1])}. The number of weeks equals the credit weeks you worked in the base period, up to ${S.weeks[1]}. To qualify, at least 37% of base-period wages must come from outside the best quarter. Pennsylvania does not tax unemployment compensation.`,
  body: (h) => `
<h2>The formula, with its odd 2% cut</h2>
<p>Most best-quarter states divide by a round number. Pennsylvania's law instead writes the rate as a percentage and then applies a factor of 0.98, a two percent trim written into the formula itself. The result is easy to reproduce: multiply your best quarter by 3.92% and add ${K.cents(A.add ?? 0)}. A best quarter of ${K.usd(11250)} gives ${K.usd(a.weekly)} a week; the ceiling of ${K.usd(S.max)} arrives at about ${K.usd(capQ)}, which means roughly ${K.usd(capQ * 4)} a year of even pay. The figures are those of the ${h.src('dol_sigpros', 'Department of Labor table of July 2026')}.</p>
<p>The dependents allowance is small and fixed: ${K.usd(5)} for the first dependent and ${K.usd(3)} for the second. It lifts the floor to ${K.usd(da[0])} and the ceiling to ${K.usd(da[1])}. The calculator shows the amount without it.</p>
${h.mini('ui', { t: 'Your Pennsylvania benefit', p: ['pay', 'hq'], d: { st: 'PA', lock: 1, pay: 45000 } })}
<h2>The 37% test catches seasonal workers</h2>
<p>Pennsylvania's eligibility rule has three parts. The best quarter must hold at least ${K.usd(1688)}, the base period at least ${K.usd(2718)}, and at least 37% of base-period wages must have been earned outside the best quarter. That last condition is the one that turns people down. A landscaper who earned ${K.usd(20000)} with ${K.usd(13000)} of it in one summer quarter has only ${K.pct(7000 / 20000)} outside it and fails, even with good total pay. Someone in that position may still qualify on the alternate base period, the four most recent completed quarters, described in the ${h.a('base-period-high-quarter', 'base period guide')}.</p>
<h2>Weeks follow your credit weeks</h2>
<p>Pennsylvania does not give everyone the same duration. The law counts credit weeks, the weeks of the base period in which you earned at least a set minimum, and you need ${S.weeks[0]} of them to qualify. The maximum benefit is the number of credit weeks times the weekly amount, up to ${S.weeks[1]} weeks. The calculator assumes a full year of work and therefore ${S.weeks[1]} weeks; if you worked only part of the base period, your claim will be shorter than shown.</p>
<p>A best quarter of ${K.usd(9000)} out of ${K.usd(32000)} gives ${K.usd(b.weekly)} a week. Over ${S.weeks[1]} weeks that is ${K.usd(b.total)}; over ${S.weeks[0]} weeks, ${K.usd(b.weekly * S.weeks[0])}.</p>
<h2>Filing every two weeks, and part-time pay</h2>
<p>Claims are filed online every two weeks, reporting each week separately with any gross earnings. Pennsylvania calls the earnings you may keep the partial benefit credit: the greater of ${K.usd(21)} or 30% of your weekly benefit. On a ${K.usd(a.weekly)} check that is ${K.usd(Math.max(21, a.weekly * 0.3))} of earnings with no reduction; each dollar above it comes off the payment. The ${h.a('partial-unemployment', 'partial unemployment guide')} compares the rule across states.</p>
<h2>State tax: none</h2>
<p>The ${h.src(tx.source!, 'Department of Revenue')} leaves unemployment compensation out of Pennsylvania taxable compensation. The federal return is different: the full amount is taxable (${h.src('irs_tc418', 'IRS Topic 418')}), and withholding of 10% is optional.</p>
`,
  faqs: [
    { q: 'What is the maximum unemployment benefit in Pennsylvania for 2026?', a: `${K.usd(S.max)} a week without dependents, reached with about ${K.usd(capQ)} in your best quarter. With a dependent spouse or child the allowance adds ${K.usd(5)} for the first and ${K.usd(3)} for the second, so the highest possible check is ${K.usd(da[1])}. The minimum weekly amount is ${K.usd(S.min)}.` },
    { q: 'What is the 37 percent rule for Pennsylvania unemployment?', a: 'At least 37% of the wages in your base period must have been earned outside your best quarter. It stops claims based on one strong quarter. If you fail it, ask the department to check the alternate base period, which uses the four most recently completed quarters and may spread your earnings more evenly.' },
    { q: 'How many weeks of benefits does Pennsylvania pay?', a: `As many weeks as the credit weeks you worked in the base period, up to ${S.weeks[1]}. A credit week is a week with earnings above a minimum set in the law. Someone who worked all year usually reaches ${S.weeks[1]} weeks; a newer employee may get fewer. The monetary determination shows the figure.` },
    { q: 'Is unemployment taxable in Pennsylvania?', a: 'Not on the Pennsylvania return: the Department of Revenue does not treat unemployment compensation as taxable compensation. It is taxable on the federal return, reported from Form 1099-G, where you may want to have 10% withheld during the claim to avoid a bill.' },
  ],
  tool: 'ui', toolArg: { st: 'PA', lock: 1, pay: 45000 },
  related: ['unemployment-calculator', 'base-period-high-quarter', 'partial-unemployment', 'are-unemployment-benefits-taxable', 'new-jersey-unemployment', 'ohio-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'pa_comp', 'irs_tc418', 'irs_w4v'],
});
