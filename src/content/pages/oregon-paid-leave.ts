import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('or-pl'), F = P.facts!;
const [[t1, r1], [, r2]] = P.tiers! as Array<[number, number]>;
const capAww = t1 + (P.max! - t1 * r1) / r2;
const a = K.pw('or-pl', 40000), b = K.pw('or-pl', 95000);
const lv = K.leave('or-pl', 40000, 'bonding', P.weeks.bonding!);
const yearly = (pay: number) => Math.min(pay, P.contrib.cap!) * P.contrib.rate;

export default definePage({
  id: 'oregon-paid-leave', group: 'leave', order: 221, slug: 'oregon-paid-leave', prog: 'or-pl',
  nav: 'Paid Leave Oregon', card: `${K.pct(r1)} of wages up to ${K.cents(t1)} a week, ${K.pct(r2)} above, from ${K.cents(P.min!)} to ${K.cents(P.max!)}; ${P.weeks.medical} weeks, ${P.weeks.pregnancy} with pregnancy.`,
  title: `Paid Leave Oregon 2026: Full Pay Tier, ${K.cents(P.max!)} Cap`,
  description: `Paid Leave Oregon in 2026: ${K.pct(r1)} of wages up to ${K.cents(t1)} a week, ${K.pct(r2)} above, ${K.cents(P.min!)} to ${K.cents(P.max!)} a week, ${P.weeks.medical} weeks or ${P.weeks.pregnancy} with pregnancy. Estimate your pay here.`,
  h1: 'Paid Leave Oregon in 2026: full wage replacement for lower earners',
  intro: `Paid Leave Oregon covers time off when you are seriously ill, when a child arrives or when a relative needs your care, and for lower earners it replaces the whole weekly wage. Enter your pay to see your amount.`,
  resume: `Paid Leave Oregon is the only program on this site that replaces ${K.pct(r1)} of the weekly wage for lower earners. Up to ${K.pct(F.tierShareOfSaww as number)} of the state average weekly wage, ${K.cents(t1)}, your full average weekly wage is paid; above that line, ${K.pct(r2)} of the extra is added. The maximum is ${K.pct(F.maxShareOfSaww as number)} of the state average, ${K.cents(P.max!)} a week, and the minimum ${K.pct(F.minShareOfSaww as number)} of it, ${K.cents(P.min!)}, for benefit years that begin on or after ${K.day(F.benefitYearsFrom as string)}. Those figures follow the state average weekly wage, which rose from ${K.cents(F.sawwPrev as number)} to ${K.cents(F.saww as number)}. A ${K.usd(40000)} earner collects about ${K.usd(a.weekly)}, close to the entire gross week, while a ${K.usd(95000)} earner collects ${K.usd(b.weekly)}. Leave lasts up to ${P.weeks.medical} weeks in a ${F.periodWeeks}-week period, with ${F.extraPregnancyWeeks} more for pregnancy and childbirth. The contribution is ${K.pct(F.premiumTotal as number)} of wages up to ${K.usd(P.contrib.cap!)}, of which employees pay ${K.pct(F.employeeShare as number)}.`,
  body: (h) => `
<h2>Your whole wage, up to a line</h2>
<p>Oregon's model has two parts. If your average weekly wage is ${K.cents(t1)} or less, ${K.pct(F.tierShareOfSaww as number)} of the state average, the benefit equals that wage. If it is higher, you receive ${K.cents(t1)} plus ${K.pct(r2)} of the amount above it, until the cap of ${K.cents(P.max!)}, reached at a weekly wage of about ${K.usd(capAww)}. The structure comes from the program's tiered benefit model (${h.src('or_memo', 'Oregon DCBS memo')}); the statute itself could not be read online, so the official calculator remains the reference for an exact amount.</p>
<p>For a worker earning ${K.usd(40000)} a year, about ${K.usd(40000 / 52)} a week, the result is ${K.usd(a.weekly)}, and ${P.weeks.bonding} weeks of bonding come to ${K.usd(lv.total)}. No other state pays a full wage at this level; California's best rate is ${K.pct(K.Pg('ca-pfl').tiers![0][1])} and Connecticut's ${K.pct(K.Pg('ct-pl').tiers![0][1])}.</p>
${h.mini('leave', { t: 'Paid Leave Oregon at your pay', p: ['pay', 'why', 'wk'], d: { prog: 'or-pl', lock: 1, pay: 40000, why: 'bonding', wk: 12 } })}
<h2>Benefit years, not calendar dates</h2>
<p>The new minimum and maximum apply to claims whose benefit year begins on or after ${K.day(F.benefitYearsFrom as string)} (${h.src('or_news', 'Oregon Employment Department, Employer News')}). A claim whose benefit year started before keeps the earlier limits: ${K.cents(F.minPrev as number)} and ${K.cents(F.maxPrev as number)}. Check the start of your benefit year on the decision letter before comparing.</p>
<h2>Weeks of leave</h2>
<p>A worker can receive ${P.weeks.medical} weeks of paid leave in a ${F.periodWeeks}-week period, for any mix of covered reasons. An extra ${F.extraPregnancyWeeks} weeks are available to someone who is pregnant, has given birth in the past year or has health needs related to childbirth, for ${P.weeks.pregnancy} in all (${h.src('or_faq', 'Paid Leave Oregon, common questions')}). There is no separate, larger medical allowance as in Massachusetts.</p>
<h2>How the contribution is split</h2>
<p>The total contribution for 2026 is ${K.pct(F.premiumTotal as number)} of wages, up to the Social Security wage index of ${K.usd(P.contrib.cap!)}. Employees pay ${K.pct(F.employeeShare as number)} of it, ${K.pct(P.contrib.rate, 1)} of wages, and employers with ${F.employerSize} or more employees pay the other ${K.pct(F.employerShare as number)} (${h.src('or_employers', 'Paid Leave Oregon, employers')}). The deduction for a ${K.usd(40000)} earner is about ${K.usd(yearly(40000))} a year.</p>
<h2>Federal tax</h2>
<p>The IRS counts family leave benefits as income, per ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}. For medical leave, the share tied to employer contributions is taxable and the share tied to employee contributions is not; the ${h.a('is-paid-family-leave-taxable', 'tax page')} explains how that split works.</p>
`,
  faqs: [
    { q: 'How much does Paid Leave Oregon pay in 2026?', a: `Between ${K.cents(P.min!)} and ${K.cents(P.max!)} a week for benefit years starting on or after ${K.day(F.benefitYearsFrom as string)}. Workers with an average weekly wage of ${K.cents(t1)} or less receive their full wage. Above that, the benefit is ${K.cents(t1)} plus ${K.pct(r2)} of the extra. At ${K.usd(95000)} a year, it is about ${K.usd(b.weekly)}.` },
    { q: `Does Paid Leave Oregon really pay ${K.pct(r1)} of wages?`, a: `For lower earners, yes. Up to ${K.cents(t1)} a week, which is ${K.pct(F.tierShareOfSaww as number)} of the state average weekly wage, the benefit equals the average weekly wage. Higher earners receive that amount plus half of the rest, so their replacement rate falls as pay rises, down to the cap of ${K.cents(P.max!)}.` },
    { q: 'How many weeks can I take under Paid Leave Oregon?', a: `${P.weeks.medical} weeks in a ${F.periodWeeks}-week period, for your own serious health condition, bonding or caring for a relative, in any combination. If you are pregnant, gave birth in the past year or have health needs linked to childbirth, you may take ${F.extraPregnancyWeeks} more weeks, ${P.weeks.pregnancy} in all.` },
  ],
  tool: 'leave', toolArg: { prog: 'or-pl', lock: 1, pay: 40000, why: 'bonding', wk: 12 },
  related: ['paid-family-leave', 'maternity-leave-pay', 'is-paid-family-leave-taxable', 'fmla-vs-paid-leave', 'oregon-unemployment'],
  sources: ['or_news', 'or_employers', 'or_memo', 'or_faq', 'irs_rr_2025_4'],
});
