import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('de-pl'), F = P.facts!;
const rate = P.tiers![0][1];
const capAww = P.max! / rate;
const a = K.pw('de-pl', 36000), b = K.pw('de-pl', 50000);
const par = K.leave('de-pl', 50000, 'bonding', P.weeks.bonding!);
const med = K.leave('de-pl', 50000, 'medical', P.weeks.medical!);
const yearly = (pay: number) => pay * P.contrib.rate;

export default definePage({
  id: 'delaware-paid-leave', group: 'leave', order: 224, slug: 'delaware-paid-leave', prog: 'de-pl',
  nav: 'Delaware Paid Leave', card: `New in 2026: ${K.pct(rate)} of your wage up to ${K.usd(P.max!)} a week; ${P.weeks.bonding} weeks for a new child, ${P.weeks.medical} for your health every ${F.limitedLeavePeriodMonths} months.`,
  title: `Delaware Paid Leave 2026: ${K.pct(rate)} of Pay, ${K.usd(P.max!)} Weekly Cap`,
  description: `Delaware Paid Leave began in 2026: ${K.pct(rate)} of your wage up to ${K.usd(P.max!)} a week, ${P.weeks.bonding} weeks for a new child, ${P.weeks.medical} weeks every ${F.limitedLeavePeriodMonths} months for illness or care. See yours.`,
  h1: 'Delaware Paid Leave in 2026: generous for parents, short for illness',
  intro: `Delaware opened claims on ${K.day(P.start!)}. It pays a flat share of wages, but treats a new child very differently from an illness or a relative's care.`,
  resume: `Delaware Paid Leave, which accepted its first claims on ${K.day(P.start!)}, pays ${K.pct(rate)} of your average weekly wage, up to ${K.usd(P.max!)} a week; the law fixes that maximum for 2026 and ${F.maxFixedUntilYear}. You reach it at a weekly wage of ${K.usd(capAww)}, about ${K.usd(capAww * 52)} a year. At ${K.usd(36000)} a year the benefit is about ${K.usd(a.weekly)} a week, and at ${K.usd(50000)} the cap of ${K.usd(b.weekly)} already applies. The length depends on the reason: up to ${P.weeks.bonding} weeks a year to care for a new child, but only ${P.weeks.medical} weeks every ${F.limitedLeavePeriodMonths} months for your own serious health condition, for caring for a family member, or for a military family need. All leave together cannot exceed ${P.weeks.combined} weeks a year. To qualify you must have worked at least ${F.eligMonths} months and ${K.num(F.eligHours as number)} hours for a single employer. The contribution is ${K.pct(F.premiumTotal as number, 1)} of wages, of which an employer may deduct no more than half from you.`,
  body: (h) => `
<h2>Two clocks: one year and two years</h2>
<p>Delaware is the only program on this site that counts some leave over ${F.limitedLeavePeriodMonths} months. Parental leave, to bond with a newborn or a child placed for adoption or foster care, allows up to ${P.weeks.bonding} weeks per year. Medical leave for your own serious health condition, family caregiving leave and military family leave allow up to ${P.weeks.medical} weeks every ${F.limitedLeavePeriodMonths} months (${h.src('de_labor', 'Delaware Department of Labor')}). Above both sits an annual limit of ${P.weeks.combined} weeks of combined leave.</p>
<p>In practice, a parent can receive ${P.weeks.bonding} weeks of parental benefits, ${K.usd(par.total)} at ${K.usd(50000)} a year, while a worker recovering from surgery is limited to ${P.weeks.medical} weeks, ${K.usd(med.total)}, and must wait for the ${F.limitedLeavePeriodMonths}-month period to roll over before claiming again for illness or care.</p>
${h.mini('leave', { t: 'Parental, medical or caregiving leave', p: ['pay', 'why', 'wk'], d: { prog: 'de-pl', lock: 1, pay: 50000, why: 'medical', wk: 6 } })}
<h2>A flat rate and a fixed cap</h2>
<p>The Delaware Code sets the weekly benefit at ${K.pct(rate)} of the average weekly wage, with a maximum of ${K.usd(P.max!)} in 2026 and ${F.maxFixedUntilYear} (${h.src('de_code', 'Delaware Code, Title 19, Chapter 37')}). There is no second tier, so replacement stays at ${K.pct(rate)} until the cap. Because the cap is low compared with neighboring programs, it binds early: anyone earning more than ${K.usd(capAww)} a week receives ${K.usd(P.max!)}.</p>
<h2>Eligibility tied to one employer</h2>
<p>Most programs look at wages earned with any employer during a base period. Delaware asks instead that you have been employed for at least ${F.eligMonths} months and worked at least ${K.num(F.eligHours as number)} hours with a single employer, a test borrowed from the federal FMLA. A worker who changed jobs recently may need to wait before qualifying. The first day to apply was ${K.day(P.start!)} (${h.src('de_faq', 'Paid Leave overview FAQ')}), so leave that began earlier is not covered. The ${h.a('fmla-vs-paid-leave', 'FMLA and paid leave page')} explains that federal test.</p>
<h2>Three contribution rates</h2>
<p>The ${K.pct(F.premiumTotal as number, 1)} total for 2026 is the sum of three parts written in the statute: ${K.pct(F.medicalRate as number, 2)} for medical leave, ${K.pct(F.parentalRate as number, 2)} for parental leave and ${K.pct(F.caregivingRate as number, 2)} for family caregiving. An employer may deduct no more than ${K.pct(F.employeeMaxShare as number)} of the contribution from the employee, so a worker pays at most ${K.pct(P.contrib.rate, 1)} of wages, about ${K.usd(yearly(50000))} a year at ${K.usd(50000)}.</p>
<h2>Tax</h2>
<p>Parental and caregiving benefits are federal taxable income under ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}. Medical leave is taxable for the part funded by your employer; see the ${h.a('is-paid-family-leave-taxable', 'tax page')}.</p>
`,
  faqs: [
    { q: 'How much does Delaware Paid Leave pay a week?', a: `${K.pct(rate)} of your average weekly wage, up to ${K.usd(P.max!)} a week in 2026 and ${F.maxFixedUntilYear}. The cap applies once your weekly wage passes ${K.usd(capAww)}. At ${K.usd(36000)} a year, the estimate is about ${K.usd(a.weekly)} a week, and the rate stays the same up to the cap.` },
    { q: `Why does Delaware Paid Leave give only ${P.weeks.medical} weeks for illness?`, a: `The law treats parental leave and the other reasons differently. A new child allows up to ${P.weeks.bonding} weeks a year, while your own serious health condition, caring for a relative and military family needs allow up to ${P.weeks.medical} weeks every ${F.limitedLeavePeriodMonths} months. All leave together is limited to ${P.weeks.combined} weeks a year.` },
    { q: 'Who is eligible for Delaware Paid Leave?', a: `Workers who have been employed for at least ${F.eligMonths} months and have worked at least ${K.num(F.eligHours as number)} hours for a single employer. Time with a previous employer does not count toward the test, so a recent job change can delay eligibility even for someone who has worked continuously.` },
  ],
  tool: 'leave', toolArg: { prog: 'de-pl', lock: 1, pay: 50000, why: 'bonding', wk: 12 },
  related: ['paid-family-leave', 'maternity-leave-pay', 'fmla-vs-paid-leave', 'is-paid-family-leave-taxable', 'maryland-paid-family-leave'],
  sources: ['de_code', 'de_labor', 'de_faq', 'irs_rr_2025_4'],
});
