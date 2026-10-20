import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('co-famli'), F = P.facts!;
const [[t1, r1], [, r2]] = P.tiers! as Array<[number, number]>;
const capAww = t1 + (P.max! - t1 * r1) / r2;
const a = K.pw('co-famli', 46000), b = K.pw('co-famli', 78000);
const lv = K.leave('co-famli', 78000, 'medical', P.weeks.pregnancy!);
const yearly = (pay: number) => Math.min(pay, P.contrib.cap!) * P.contrib.rate;

export default definePage({
  id: 'colorado-famli', group: 'leave', order: 222, slug: 'colorado-famli', prog: 'co-famli',
  nav: 'Colorado FAMLI', card: `${K.pct(r1)} of the first ${K.cents(t1)} of weekly wage, ${K.pct(r2)} of the rest, up to ${K.cents(P.max!)}; ${P.weeks.medical} weeks, ${P.weeks.pregnancy} with complications.`,
  title: `Colorado FAMLI 2026: Benefit Up to ${K.cents(P.max!)} a Week`,
  description: `Colorado FAMLI in 2026: ${K.pct(r1)} of the first ${K.cents(t1)} of your weekly wage and ${K.pct(r2)} above, up to ${K.cents(P.max!)} since July, ${P.weeks.medical} weeks or ${P.weeks.pregnancy} with complications. See it.`,
  h1: 'Colorado FAMLI in 2026: weekly benefit, weeks and premium',
  intro: `Colorado's Family and Medical Leave Insurance pays for your own serious health condition, a new child, or a seriously ill family member. Its limits change every July, not every January.`,
  resume: `Colorado FAMLI replaces ${K.pct(r1)} of the first ${K.cents(t1)} of your average weekly wage and ${K.pct(r2)} of everything above, up to a maximum of ${K.cents(P.max!)} a week from ${K.day(F.maxFrom as string)}. Both figures come from the state average weekly wage, set at ${K.cents(F.saww as number)} on that date: the first tier is half of it, the cap ${K.pct(F.maxShareOfSaww as number)} of it. Before July the cap was ${K.cents(F.maxPrev as number)}. Anyone whose weekly wage tops ${K.usd(capAww)} gets the maximum. For pay of ${K.usd(46000)} a year, FAMLI works out to around ${K.usd(a.weekly)} weekly, and ${K.usd(78000)} yields around ${K.usd(b.weekly)}. Most workers can take up to ${P.weeks.medical} weeks a year, and those with pregnancy or childbirth complications up to ${F.complicationWeeks} more. The 2026 premium is ${K.pct(F.premiumTotal as number, 2)} of wages up to ${K.usd(P.contrib.cap!)}, split evenly between worker and employer at firms with ${F.employerSizeHalf} or more employees, and it falls to ${K.pct(F.premium2027 as number, 2)} on ${K.day(F.premium2027From as string)}.`,
  body: (h) => `
<h2>A July year</h2>
<p>The FAMLI Division resets the state average weekly wage each July 1, so the benefit limits change in the middle of the calendar year. From ${K.day(F.maxFrom as string)}, that wage is ${K.cents(F.saww as number)}, which moves the end of the ${K.pct(r1)} tier to ${K.cents(t1)} and the maximum to ${K.cents(P.max!)} (${h.src('co_rules', 'FAMLI rules and guidance')}). A leave that started in the spring was paid under the earlier cap of ${K.cents(F.maxPrev as number)}.</p>
<p>In plain terms, the Division describes the formula this way: the first ${K.cents(t1)} of your average weekly wage is replaced at ${K.pct(r1)}, the rest at ${K.pct(r2)}, up to the maximum (${h.src('co_calc', 'FAMLI premium and benefits calculator')}). For ${K.usd(78000)} a year, ${K.usd(78000 / 52)} a week, that gives ${K.usd(b.weekly)}, about ${K.pct(b.weekly / (78000 / 52))} of gross pay.</p>
${h.mini('leave', { t: 'FAMLI for your situation', p: ['pay', 'why', 'wk'], d: { prog: 'co-famli', lock: 1, pay: 78000, why: 'medical', wk: 12 } })}
<h2>${P.weeks.medical} weeks, more after a difficult birth</h2>
<p>Most employees are eligible for up to ${P.weeks.medical} weeks of paid leave in a year, shared among the covered reasons. Someone who has pregnancy or childbirth complications may receive up to ${F.complicationWeeks} additional weeks (${h.src('co_faq', 'FAMLI FAQs')}). Medical leave for a complicated pregnancy, ${P.weeks.pregnancy} weeks at ${K.usd(78000)}, is estimated at ${K.usd(lv.total)}. The calculator treats the extra weeks as available only for your own health. Bonding weeks taken by the same parent after the birth come out of the regular allowance, so a parent who used part of it for prenatal complications has fewer weeks left for the baby.</p>
<h2>A shared premium that goes down in 2027</h2>
<p>The premium in 2026 is ${K.pct(F.premiumTotal as number, 2)} of wages: ${K.pct(P.contrib.rate, 2)} paid by the employee and ${K.pct(P.contrib.rate, 2)} by the employer, for employers with ${F.employerSizeHalf} or more employees. It applies up to the federal Social Security wage cap of ${K.usd(P.contrib.cap!)}. A worker on ${K.usd(46000)} pays about ${K.usd(yearly(46000))} for the year. From ${K.day(F.premium2027From as string)} the total rate drops to ${K.pct(F.premium2027 as number, 2)}, so the deduction shrinks slightly.</p>
<h2>Using it with other leave</h2>
<p>FAMLI pays a benefit; whether your job is held depends on your tenure and on other laws. The ${h.a('fmla-vs-paid-leave', 'FMLA and paid leave page')} compares the two. FAMLI benefits for family reasons are federal taxable income under ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}, and the medical side is taxable for the half funded by your employer. The ${h.a('paid-family-leave', 'state by state comparison')} sets Colorado next to the other programs.</p>
`,
  faqs: [
    { q: 'What is the Colorado FAMLI maximum weekly benefit now?', a: `${K.cents(P.max!)} a week since ${K.day(F.maxFrom as string)}, which is ${K.pct(F.maxShareOfSaww as number)} of the state average weekly wage of ${K.cents(F.saww as number)}. From July of the previous year until then it was ${K.cents(F.maxPrev as number)}. The cap is reached at an average weekly wage of about ${K.usd(capAww)}.` },
    { q: 'How many weeks of Colorado FAMLI can I get?', a: `Up to ${P.weeks.medical} weeks in a year for most employees, for your own health, a new child or caring for a family member. A worker with pregnancy or childbirth complications may qualify for up to ${F.complicationWeeks} additional weeks, for ${P.weeks.pregnancy} in total.` },
    { q: 'How much is the Colorado FAMLI premium for workers?', a: `${K.pct(P.contrib.rate, 2)} of wages in 2026, half of the total premium of ${K.pct(F.premiumTotal as number, 2)}, on wages up to ${K.usd(P.contrib.cap!)}. At ${K.usd(46000)} a year that is about ${K.usd(yearly(46000))}. The total premium falls to ${K.pct(F.premium2027 as number, 2)} from ${K.day(F.premium2027From as string)}, which lowers both shares.` },
  ],
  tool: 'leave', toolArg: { prog: 'co-famli', lock: 1, pay: 78000, why: 'medical', wk: 12 },
  related: ['paid-family-leave', 'maternity-leave-pay', 'is-paid-family-leave-taxable', 'fmla-vs-paid-leave', 'colorado-unemployment'],
  sources: ['co_rules', 'co_calc', 'co_faq', 'irs_rr_2025_4'],
});
