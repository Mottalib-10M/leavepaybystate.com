import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('ri-tdi'), F = P.facts!, C = K.Pg('ri-tci');
const rate = P.tiers![0][1];
const hqCap = P.max! / rate;
const q1 = K.pw('ri-tdi', 40000, 10000), q2 = K.pw('ri-tdi', 64000, 17000);
const care = K.leave('ri-tci', 64000, 'care', C.weeks.care!, 17000);
const sick = K.leave('ri-tdi', 64000, 'medical', 5, 17000);

export default definePage({
  id: 'rhode-island-tdi', group: 'leave', order: 216, slug: 'rhode-island-tdi', prog: 'ri-tdi',
  nav: 'Rhode Island TDI and TCI', card: `${K.pct(rate, 2)} of your best quarter, up to ${K.usd(P.max!)} a week: up to ${P.weeks.medical} weeks for illness, ${C.weeks.care} for caregiving.`,
  title: `Rhode Island TDI 2026: ${K.pct(rate, 2)} of Best Quarter, TCI Weeks`,
  description: `Rhode Island TDI and TCI in 2026: ${K.pct(rate, 2)} of your best quarter, up to ${K.usd(P.max!)} a week since July, ${P.weeks.medical} weeks for illness, ${C.weeks.care} for caregiving. Estimate your pay.`,
  h1: 'Rhode Island temporary disability and caregiver insurance in 2026',
  intro: `Rhode Island runs one fund for two benefits: TDI for your own illness, injury or pregnancy, and TCI for bonding with a new child or caring for a seriously ill relative. Both pay from the same formula.`,
  resume: `Rhode Island Temporary Disability Insurance pays ${K.pct(rate, 2)} of the wages of your highest quarter in the base period, a percentage of the quarter itself rather than of a weekly wage. A best quarter of ${K.usd(10000)} gives ${K.usd(q1.weekly)} a week and ${K.usd(17000)} gives ${K.usd(q2.weekly)}. The maximum rose to ${K.usd(P.max!)} for claims from ${K.day(F.maxFrom as string)}, up from ${K.usd(F.maxFirstHalf2026 as number)}, and is reached with a best quarter of about ${K.usd(hqCap)}. A dependents allowance can raise it to ${K.usd(F.maxDependents as number)}. The minimum was ${K.usd(P.min!)} for claims from ${K.day(F.minFrom as string)}; the minimum after July 2026 was not found on the agency pages, so treat that figure as uncertain. TDI lasts up to ${P.weeks.medical} weeks after at least ${P.waiting.medical} consecutive days out of work. Temporary Caregiver Insurance uses the same rate for up to ${C.weeks.care} weeks, counted inside the ${P.weeks.medical}. Workers alone pay for both through ${K.pct(P.contrib.rate, 1)} of wages up to ${K.usd(P.contrib.cap!)}.`,
  body: (h) => `
<h2>A percentage of the quarter, not of the week</h2>
<p>The statute sets the weekly rate at ${K.pct(rate, 2)} of the wages paid in the quarter of the base period in which you earned the most (${h.src('ri_statute', 'R.I. Gen. Laws § 28-41-5')}). Dividing a quarter by thirteen weeks and applying a percentage gives the same kind of result: ${K.pct(rate, 2)} of a quarter equals about ${K.pct(rate * 13)} of the weekly wage in that quarter. The law also limits the maximum to ${K.pct(F.maxShareOfSaww as number)} of the state average weekly wage, which is how the yearly cap is set.</p>
<p>Because the formula reads only the best quarter, a raise, a bonus quarter or a season of overtime counts in full. Two workers with the same yearly pay can receive different amounts if one had a stronger quarter.</p>
${h.mini('leave', { t: 'TCI for a relative or a new child', p: ['pay', 'hq', 'why'], d: { prog: 'ri-tci', lock: 1, pay: 64000, hq: 17000, wk: 6 } })}
<h2>Caregiver weeks come out of the same total</h2>
<p>TCI pays up to ${C.weeks.care} weeks in a benefit year for bonding with a child or caring for a seriously ill family member, and those weeks reduce the TDI weeks still available (${h.src('ri_faq', 'DLT frequently asked questions')}). Some older pages, including the 2026 tax release, still describe a shorter caregiver period; the frequently asked questions give the current figure. At a best quarter of ${K.usd(17000)}, a full caregiver leave pays ${K.usd(care.total)}.</p>
<h2>Waiting days and how long TDI lasts</h2>
<p>To claim TDI you must be out of work for at least ${P.waiting.medical} consecutive days. The most a claim can pay is the equivalent of ${P.weeks.medical} full weeks, and no more than ${K.pct(F.durationShareOfWages as number)} of base-period wages divided by the weekly rate. A recovery of ${K.num(sick.weeks)} weeks at the same quarter is estimated at ${K.usd(sick.total)}.</p>
<h2>Dependents and the cap</h2>
<p>Rhode Island adds an allowance for dependents to its disability and caregiver checks: the greater of ${K.usd(F.dependentAllowanceMin as number)} or ${K.pct(F.dependentAllowanceShare as number)} of the benefit rate for each, up to ${F.dependentsMax} dependents. With the maximum allowance, the cap of ${K.usd(P.max!)} becomes ${K.usd(F.maxDependents as number)} (${h.src('ri_press', 'DLT press release on the new maximums')}). The calculator leaves the allowance out.</p>
<h2>Eligibility and cost</h2>
<p>A 2026 claim requires at least ${K.usd(F.eligBasePeriodWages as number)} in base-period wages, with alternative tests for lower earners. The contribution fell from ${K.pct(F.contribRate2025 as number, 1)} to ${K.pct(P.contrib.rate, 1)} of wages for 2026, on the first ${K.usd(P.contrib.cap!)}, so the most a worker pays is ${K.usd(F.maxAnnualContrib2026 as number)} (${h.src('ri_tax', 'DLT 2026 rates')}). TCI benefits are federal taxable income under ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}; TDI, funded by workers, falls under the exclusion for employee-funded medical benefits.</p>
`,
  faqs: [
    { q: 'How is Rhode Island TDI calculated in 2026?', a: `The weekly rate is ${K.pct(rate, 2)} of the wages of your highest quarter in the base period, up to ${K.usd(P.max!)} for claims from ${K.day(F.maxFrom as string)}. A best quarter of ${K.usd(17000)} gives about ${K.usd(q2.weekly)} a week. An allowance for up to ${F.dependentsMax} dependents can be added on top.` },
    { q: 'How many weeks of Rhode Island TCI can I take?', a: `Up to ${C.weeks.care} weeks in a benefit year, to bond with a new child or care for a seriously ill family member. These weeks are not extra: they come out of the ${P.weeks.medical} weeks of the Temporary Disability Insurance benefit year, so a caregiver leave shortens a later disability claim in the same year.` },
    { q: 'What is the Rhode Island TDI minimum since the July increase?', a: `It was not found. The Department of Labor and Training gave ${K.usd(P.min!)} as the minimum for claims starting from ${K.day(F.minFrom as string)}, and its release on the summer increase announced only the new maximums. Until the agency publishes the July figure, treat the minimum as uncertain; it matters only for very low base-period wages.` },
    { q: 'Who pays for Rhode Island temporary disability insurance?', a: `Workers do. In 2026 the deduction is ${K.pct(P.contrib.rate, 1)} of wages up to ${K.usd(P.contrib.cap!)}, at most ${K.usd(F.maxAnnualContrib2026 as number)} for the year, and it funds both TDI and TCI. The rate was ${K.pct(F.contribRate2025 as number, 1)} the previous year. Employers do not add a share of their own to this fund.` },
  ],
  tool: 'leave', toolArg: { prog: 'ri-tdi', lock: 1, pay: 64000, hq: 17000, wk: 5 },
  related: ['state-disability-insurance', 'paid-family-leave', 'maternity-leave-pay', 'is-paid-family-leave-taxable', 'base-period-high-quarter'],
  sources: ['ri_statute', 'ri_faq', 'ri_press', 'ri_tax', 'irs_rr_2025_4'],
});
