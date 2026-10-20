import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('nj-fli'), F = P.facts!, TD = K.Pg('nj-tdi').facts!;
const rate = P.tiers![0][1];
const capPay = (P.max! / rate) * 52;
const a = K.pw('nj-fli', 40000), b = K.pw('nj-fli', 60000);
const full = K.leave('nj-fli', 60000, 'bonding', P.weeks.bonding!);
const yearly = (pay: number) => Math.min(pay, P.contrib.cap!) * P.contrib.rate;

export default definePage({
  id: 'nj-family-leave', group: 'leave', order: 214, slug: 'nj-family-leave', prog: 'nj-fli',
  nav: 'New Jersey Family Leave Insurance', card: `${K.pct(rate)} of your average weekly wage, up to ${K.usd(P.max!)} a week, for ${P.weeks.bonding} weeks in a row or ${F.intermittentWeeks} weeks in days.`,
  title: `NJ Family Leave Insurance 2026: ${K.pct(rate)} of Pay, ${K.usd(P.max!)} Cap`,
  description: `New Jersey Family Leave Insurance in 2026: ${K.pct(rate)} of your average weekly wage, up to ${K.usd(P.max!)} a week, ${P.weeks.bonding} weeks straight or ${F.intermittentWeeks} weeks in days. See your FLI check.`,
  h1: `New Jersey Family Leave Insurance in 2026: ${K.pct(rate)} of your wage`,
  intro: `New Jersey applies one high rate to your whole weekly wage, with no lower second tier, and a weekly cap that limits what higher earners receive. Enter your pay to see your weekly FLI amount.`,
  resume: `New Jersey Family Leave Insurance pays ${K.pct(rate)} of your average weekly wage, up to a maximum of ${K.usd(P.max!)} a week in 2026, up from ${K.usd(F.max2025 as number)} the year before. The rate is the same for every earner, so the only limit is the cap, which you reach at about ${K.usd(capPay)} a year. At ${K.usd(40000)} a year the benefit is about ${K.usd(a.weekly)} a week, and at ${K.usd(60000)} about ${K.usd(b.weekly)}. You can take it as ${P.weeks.bonding} consecutive weeks, which is ${F.consecutiveDays} days, or as up to ${F.intermittentWeeks} weeks of separate days, ${F.intermittentDays} days in all, within a twelve-month period. A full block of ${P.weeks.bonding} weeks at ${K.usd(60000)} a year is worth ${K.usd(full.total)}. To qualify you need ${TD.eligWeeks} base-year weeks with at least ${K.usd(TD.eligWeeklyEarnings as number)} of earnings each, or ${K.usd(TD.eligBaseYearTotal as number)} in the base year. Workers fund FLI with ${K.pct(P.contrib.rate, 2)} of wages up to ${K.usd(P.contrib.cap!)}, at most ${K.cents(F.maxAnnualContrib2026 as number)} for the year.`,
  body: (h) => `
<h2>One rate, applied to the base year</h2>
<p>The New Jersey Department of Labor averages your wages over the weeks you worked in the base year and pays ${K.pct(rate)} of that average (${h.src('nj_fli', 'NJ Family Leave Insurance')}). There is no second, lower tier as in Washington or Colorado, so a worker earning ${K.usd(60000)} keeps the same replacement rate as one earning ${K.usd(30000)}. What changes with salary is only whether the cap binds: from a weekly wage of about ${K.usd(P.max! / rate)}, every claimant receives ${K.usd(P.max!)}.</p>
<p>The calculator assumes a full year of work. If you started your job during the base year, the agency averages only the weeks you actually worked, which may give a higher figure than your yearly pay divided by 52.</p>
${h.mini('leave', { t: 'Your FLI amount', p: ['pay', 'why', 'wk'], d: { prog: 'nj-fli', lock: 1, pay: 60000, why: 'care', wk: 6 } })}
<h2>Block or days: two ways to use it</h2>
<p>FLI can be claimed as one continuous leave of up to ${P.weeks.bonding} weeks, or in separate days that add up to ${F.intermittentDays} days, the equivalent of ${F.intermittentWeeks} weeks. The day option suits parents returning to work part time, and people taking a relative to treatments on fixed days.</p>
<p>The reasons covered are bonding with a newborn, adopted or foster child and caring for a family member with a serious health condition. A worker's own illness, injury or pregnancy is handled by ${h.a('nj-temporary-disability', 'New Jersey Temporary Disability Insurance')}, which uses the same rate and cap.</p>
<h2>Who qualifies in 2026</h2>
<p>Two tests, and passing either is enough: a count of base-year weeks paid at least ${K.usd(TD.eligWeeklyEarnings as number)}, of which you need ${TD.eligWeeks}, or a base-year total of ${K.usd(TD.eligBaseYearTotal as number)} (${h.src('nj_tdi', 'NJ Department of Labor')}). Someone who works a few long shifts a month can fail the weekly test and still pass on the total. A parent who changed employers during the year adds the wages of both.</p>
<h2>The payroll cost</h2>
<p>The FLI deduction is ${K.pct(P.contrib.rate, 2)} of wages on the first ${K.usd(P.contrib.cap!)}, which caps the yearly total at ${K.cents(F.maxAnnualContrib2026 as number)}. At ${K.usd(60000)} a year, a worker pays about ${K.usd(yearly(60000))}. It sits next to the TDI deduction on the pay stub.</p>
<h2>Tax on FLI</h2>
<p>Family leave benefits are federal taxable income under ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}. New Jersey itself lists Family Leave Insurance among the income residents do not report on the state return (${h.src('nj_1040i', 'NJ-1040 instructions')}). The ${h.a('is-paid-family-leave-taxable', 'paid leave tax page')} estimates the federal amount.</p>
`,
  faqs: [
    { q: 'How much does New Jersey Family Leave Insurance pay in 2026?', a: `${K.pct(rate)} of your average weekly wage, up to ${K.usd(P.max!)} a week. A worker earning ${K.usd(40000)} a year receives about ${K.usd(a.weekly)}; from about ${K.usd(capPay)} a year, the cap applies. The cap was ${K.usd(F.max2025 as number)} in the previous year, so claims that started then were paid less at the top.` },
    { q: 'Can I take New Jersey FLI one day at a time?', a: `Yes. Instead of a continuous leave of up to ${P.weeks.bonding} weeks, you can claim separate days, up to ${F.intermittentDays} days within a twelve-month period. This is the intermittent option, useful for a reduced schedule after a birth or for a relative's regular treatments.` },
    { q: 'Do I pay New Jersey income tax on Family Leave Insurance?', a: `No. The NJ-1040 instructions list Family Leave Insurance benefits among income that is not reported on the state return. The IRS treats the same benefits as taxable income since Revenue Ruling 2025-4, so they appear on your federal return from the Form 1099-G the state sends.` },
    { q: 'What do I need to qualify for NJ family leave benefits?', a: `In the base year, either ${TD.eligWeeks} weeks of work earning at least ${K.usd(TD.eligWeeklyEarnings as number)} a week, or ${K.usd(TD.eligBaseYearTotal as number)} in total wages. You also need a reason the program covers: bonding with a new child or caring for a family member with a serious health condition.` },
  ],
  tool: 'leave', toolArg: { prog: 'nj-fli', lock: 1, pay: 60000, why: 'bonding', wk: 12 },
  related: ['nj-temporary-disability', 'paid-family-leave', 'is-paid-family-leave-taxable', 'maternity-leave-pay', 'new-jersey-unemployment'],
  sources: ['nj_fli', 'nj_tdi', 'nj_ui_2026', 'nj_1040i', 'irs_rr_2025_4'],
});
