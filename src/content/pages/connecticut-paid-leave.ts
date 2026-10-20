import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('ct-pl'), F = P.facts!;
const [[t1, r1], [, r2]] = P.tiers! as Array<[number, number]>;
const mw = F.minWage as number;
const capAww = t1 + (P.max! - t1 * r1) / r2;
const a = K.pw('ct-pl', 32000), b = K.pw('ct-pl', 52000);
const lv = K.leave('ct-pl', 52000, 'medical', P.weeks.pregnancy!);
const yearly = (pay: number) => Math.min(pay, P.contrib.cap!) * P.contrib.rate;

export default definePage({
  id: 'connecticut-paid-leave', group: 'leave', order: 220, slug: 'connecticut-paid-leave', prog: 'ct-pl',
  nav: 'CT Paid Leave', card: `${K.pct(r1)} of wages up to ${K.cents(t1)} a week and ${K.pct(r2)} above, capped at ${K.cents(P.max!)}; ${P.weeks.medical} weeks, ${P.weeks.pregnancy} with pregnancy incapacity.`,
  title: `CT Paid Leave 2026: ${K.pct(r1)} Tier, ${K.cents(P.max!)} Weekly Cap`,
  description: `Connecticut Paid Leave in 2026: ${K.pct(r1)} of pay up to ${F.tierMultiple} times the minimum wage, ${K.pct(r2)} above, capped at ${K.cents(P.max!)} a week, for ${P.weeks.medical} weeks a year. Estimate your benefit.`,
  h1: 'Connecticut Paid Leave in 2026: a benefit pegged to the minimum wage',
  intro: `CT Paid Leave pays workers for their own serious health condition, a new child or a seriously ill relative. Its thresholds move with the Connecticut minimum wage, not with an average wage.`,
  resume: `Connecticut Paid Leave replaces ${K.pct(r1)} of your average weekly wage up to ${F.tierMultiple} times the state minimum wage, which at ${K.cents(mw)} an hour is ${K.cents(t1)} a week as of ${K.day(F.thresholdsAsOf as string)}. Wages above that line are replaced at ${K.pct(r2)}, and the benefit stops at ${F.capMultiple} times the minimum wage, ${K.cents(P.max!)} a week, up from ${K.usd(F.max2025 as number)} for claims in 2025. You reach the cap at a weekly wage of about ${K.usd(capAww)}, so most full-time workers above roughly ${K.usd(capAww * 52)} a year receive the same amount. At ${K.usd(32000)} a year the estimate is ${K.usd(a.weekly)} a week; at ${K.usd(52000)}, ${K.usd(b.weekly)}. Leave lasts up to ${P.weeks.medical} weeks in a twelve-month period, with ${F.pregnancyExtraWeeks} more weeks for incapacity during pregnancy. Workers alone fund the program through a contribution of ${K.pct(P.contrib.rate, 1)} of wages, up to the Social Security limit of ${K.usd(P.contrib.cap!)}.`,
  body: (h) => `
<h2>Why the minimum wage sets your benefit</h2>
<p>Most programs anchor their tiers to the state average weekly wage. Connecticut uses its hourly minimum wage instead: the first tier ends at ${F.tierMultiple} hours of minimum wage, ${K.cents(t1)}, and the maximum is ${F.capMultiple} hours of it, ${K.cents(P.max!)} (${h.src('ct_apply', 'CT Paid Leave, before you apply')}). When the minimum wage rises, both figures rise with it, which is why the cap moved from ${K.usd(F.max2025 as number)} to ${K.cents(P.max!)}.</p>
<p>The first tier is generous. A worker whose weekly wage is ${K.cents(t1)} or less receives ${K.pct(r1)} of it, a first-tier rate topped only by Oregon's. A full-time minimum-wage worker therefore loses very little while on leave.</p>
${h.mini('leave', { t: 'Your CT Paid Leave check', p: ['pay', 'why', 'wk'], d: { prog: 'ct-pl', lock: 1, pay: 52000, why: 'bonding', wk: 12 } })}
<h2>A low cap for higher earners</h2>
<p>The other side of this design is a cap that binds early. From a weekly wage of about ${K.usd(capAww)}, the benefit is fixed at ${K.cents(P.max!)}; a worker earning ${K.usd(80000)} a year receives the same amount as one earning ${K.usd(Math.round(capAww * 52 / 1000) * 1000)}. Compared with Washington's cap of ${K.usd(K.Pg('wa-pfml').max!)} or Oregon's ${K.cents(K.Pg('or-pl').max!)}, Connecticut pays higher earners noticeably less. For a household that relies on one higher salary, the gap between pay and benefit during a long leave can be large, and some employers fill part of it with a policy of their own. Ask your employer whether it tops up the state benefit and whether accrued vacation can run alongside it.</p>
<h2>${P.weeks.medical} weeks, plus ${F.pregnancyExtraWeeks} for pregnancy</h2>
<p>Leave of all kinds is limited to ${P.weeks.medical} weeks in a twelve-month period, with the possibility of ${F.pregnancyExtraWeeks} additional weeks for incapacity during pregnancy (${h.src('ct_how', 'How CT Paid Leave works')}). The weeks are shared between your own health, bonding and caring for a relative. A pregnancy with incapacity and recovery, ${P.weeks.pregnancy} weeks at ${K.usd(52000)} a year, comes to about ${K.usd(lv.total)}.</p>
<h2>The ${K.pct(P.contrib.rate, 1)} contribution</h2>
<p>The CT Paid Leave Board kept the contribution at ${K.pct(P.contrib.rate, 1)} for 2026, paid by employees through payroll (${h.src('ct_contrib', 'CT Paid Leave contributions')}). Contributions stop once your wages for the year reach the Social Security contribution limit, ${K.usd(P.contrib.cap!)}. At ${K.usd(52000)} a year that is about ${K.usd(yearly(52000))}; the most anyone pays is ${K.usd(yearly(P.contrib.cap!))}.</p>
<h2>Taxes</h2>
<p>Family leave benefits are federal taxable income under ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}. Medical leave benefits funded by employee contributions are excluded, and Connecticut's program is funded by employees. The ${h.a('is-paid-family-leave-taxable', 'paid leave tax page')} sets out the rule.</p>
`,
  faqs: [
    { q: 'What is the CT Paid Leave maximum weekly benefit in 2026?', a: `${K.cents(P.max!)} a week, which is ${F.capMultiple} times the Connecticut minimum wage of ${K.cents(mw)} an hour. For claims that began in 2025, the maximum was ${K.usd(F.max2025 as number)}. You reach the 2026 cap at an average weekly wage of about ${K.usd(capAww)}, so the cap applies to most full-time salaries.` },
    { q: 'How is the Connecticut paid leave benefit calculated?', a: `${K.pct(r1)} of your average weekly wage up to ${F.tierMultiple} times the minimum wage, ${K.cents(t1)}, plus ${K.pct(r2)} of the amount above, with the total capped at ${K.cents(P.max!)}. At ${K.usd(32000)} a year, the estimate is about ${K.usd(a.weekly)} a week, close to the full gross weekly wage.` },
    { q: 'How many weeks does Connecticut Paid Leave cover?', a: `Up to ${P.weeks.medical} weeks in a twelve-month period for your own serious health condition, bonding with a new child or caring for a family member, all reasons together. A worker who becomes incapacitated during pregnancy can receive up to ${F.pregnancyExtraWeeks} additional weeks, for ${P.weeks.pregnancy} in all.` },
  ],
  tool: 'leave', toolArg: { prog: 'ct-pl', lock: 1, pay: 52000, why: 'bonding', wk: 12 },
  related: ['paid-family-leave', 'maternity-leave-pay', 'is-paid-family-leave-taxable', 'fmla-vs-paid-leave', 'connecticut-unemployment'],
  sources: ['ct_apply', 'ct_how', 'ct_contrib', 'irs_rr_2025_4'],
});
