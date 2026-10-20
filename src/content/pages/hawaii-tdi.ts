import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('hi-tdi'), F = P.facts!;
const rate = P.tiers![0][1];
const a = K.pw('hi-tdi', 38000), b = K.pw('hi-tdi', 62000);
const lv = K.leave('hi-tdi', 62000, 'medical', 6);
const th = K.th('HI', 62000);
const capPay = (F.maxWeeklyWageBase2026 as number) * 52;

export default definePage({
  id: 'hawaii-tdi', group: 'leave', order: 217, slug: 'hawaii-tdi', prog: 'hi-tdi',
  nav: 'Hawaii TDI', card: `${K.pct(rate)} of your average weekly wage, up to ${K.usd(P.max!)} a week, from the eighth day, for up to ${P.weeks.medical} weeks.`,
  title: `Hawaii TDI 2026: ${K.pct(rate)} of Wages, Up to ${K.usd(P.max!)} Each Week`,
  description: `Hawaii temporary disability insurance in 2026: ${K.pct(rate)} of your average weekly wage up to ${K.usd(P.max!)}, paid from the eighth day for up to ${P.weeks.medical} weeks. No family leave pay.`,
  h1: 'Hawaii temporary disability insurance in 2026',
  intro: `Hawaii requires employers to provide temporary disability coverage for illness, injury off the job and pregnancy. It has no state program that pays for bonding or caregiving.`,
  resume: `Hawaii temporary disability insurance pays ${K.pct(rate)} of your average weekly wage, up to a maximum of ${K.usd(P.max!)} a week in 2026. The cap matches the maximum weekly wage base of ${K.cents(F.maxWeeklyWageBase2026 as number)} set by the Disability Compensation Division, so wages above about ${K.usd(capPay)} a year do not raise the benefit. At ${K.usd(38000)} a year the benefit is about ${K.usd(a.weekly)} a week, and at ${K.usd(62000)} about ${K.usd(b.weekly)}, which is ${K.pct(b.weekly / th.net)} of the take-home pay it replaces. Payments start on the eighth day of disability, after ${P.waiting.medical} unpaid days, and last up to ${P.weeks.medical} weeks. Workers with very small wages are treated apart: under ${K.usd(F.smallWageLimit as number)} a week, the benefit equals the wage but no more than ${K.usd(F.smallWageBenefitMax as number)}. The employee share of the cost is at most ${K.pct(P.contrib.rate, 1)} of weekly wages and never more than ${K.cents(P.contrib.weeklyMax!)} a week. Hawaii pays nothing for bonding with a child or caring for a relative.`,
  body: (h) => `
<h2>An employer plan, not a state fund</h2>
<p>In most of the states on this site, a worker's claim goes to a state agency. In Hawaii, temporary disability insurance is coverage provided through your employer, and the Disability Compensation Division of the Department of Labor and Industrial Relations sets the rules and the yearly maximum (${h.src('hi_tdi', 'DLIR, about TDI')}). The claim goes to your employer's plan. Some plans pay more than the statute requires; the figures here are the legal minimum.</p>
${h.mini('leave', { t: 'Your Hawaii TDI estimate', p: ['pay', 'wk'], d: { prog: 'hi-tdi', lock: 1, pay: 62000, wk: 6 } })}
<h2>${K.pct(rate)} of what wage?</h2>
<p>The plan averages your weekly wages over the weeks of employment before the disability. The calculator uses your regular weekly pay, a year of wages divided by 52, which matches a steady job. The rate of ${K.pct(rate)} applies up to the 2026 maximum weekly wage base of ${K.cents(F.maxWeeklyWageBase2026 as number)}, which gives the cap of ${K.usd(P.max!)} (${h.src('hi_2026', 'DLIR, 2026 maximum weekly wage base')}). Hawaii's rate is lower than New Jersey's or California's, and its cap lower than any program but New York's DBL.</p>
<h2>${P.waiting.medical} days, then up to ${P.weeks.medical} weeks</h2>
<p>Benefits are payable from the eighth day of disability, so the first ${P.waiting.medical} days are unpaid. An absence of ${K.num(lv.weeks)} weeks at ${K.usd(62000)} a year is estimated at ${K.usd(lv.total)}. The longest payment period is ${P.weeks.medical} weeks for one disability.</p>
<h2>Pregnancy in Hawaii</h2>
<p>Pregnancy and recovery from childbirth are disabilities under the plan, so TDI pays for the weeks a provider certifies. After that, Hawaii has no state program for bonding: time with a new child is unpaid unless your employer pays it or you use accrued leave. Job protection may come from the federal FMLA; the ${h.a('fmla-vs-paid-leave', 'FMLA and paid leave page')} explains who qualifies. The ${h.a('maternity-leave-pay', 'maternity leave pay page')} compares what each state pays around a birth.</p>
<h2>What workers pay</h2>
<p>Your employer may deduct up to ${K.pct(P.contrib.rate, 1)} of your weekly wage, never more than ${K.cents(P.contrib.weeklyMax!)} a week, about ${K.usd(P.contrib.weeklyMax! * 52)} a year at most. Where the employer pays the rest of the plan's cost, the part of a TDI check tied to that share can be federal taxable income under ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}.</p>
`,
  faqs: [
    { q: 'How much does Hawaii TDI pay in 2026?', a: `${K.pct(rate)} of your average weekly wage, up to ${K.usd(P.max!)} a week. The cap is reached at a weekly wage of ${K.cents(F.maxWeeklyWageBase2026 as number)}. At ${K.usd(62000)} a year, the benefit is about ${K.usd(b.weekly)} a week. Your employer's plan may pay more than this legal minimum.` },
    { q: 'When does Hawaii TDI start paying?', a: `From the eighth day of disability. The first ${P.waiting.medical} days are not paid, so a short illness of a week or less brings no TDI benefit. Payments continue while your provider certifies that you cannot work, up to ${P.weeks.medical} weeks for one disability.` },
    { q: 'Does Hawaii have paid family leave in 2026?', a: 'No. Hawaii pays temporary disability for your own illness, injury or pregnancy, but has no state program that pays for bonding with a new child or caring for a relative. Those weeks are paid only if your employer offers paid leave. The FMLA may protect the job of eligible workers, without pay.' },
  ],
  tool: 'leave', toolArg: { prog: 'hi-tdi', lock: 1, pay: 62000, wk: 6 },
  related: ['state-disability-insurance', 'maternity-leave-pay', 'fmla-vs-paid-leave', 'paid-family-leave', 'is-paid-family-leave-taxable'],
  sources: ['hi_tdi', 'hi_2026', 'irs_rr_2025_4'],
});
