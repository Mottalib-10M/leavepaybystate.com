import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('ny-pfl'), F = P.facts!;
const a = K.pw('ny-pfl', 45000), b = K.pw('ny-pfl', 75000);
const capPay = (P.max! / P.tiers![0][1]) * 52;
const lv = K.leave('ny-pfl', 75000, 'bonding', P.weeks.bonding!);
const th = K.th('NY', 75000);
const yearly = (pay: number) => Math.min(pay * P.contrib.rate, F.maxAnnualContrib2026 as number);

export default definePage({
  id: 'ny-paid-family-leave', group: 'leave', order: 212, slug: 'ny-paid-family-leave', prog: 'ny-pfl',
  nav: 'New York Paid Family Leave', card: `${K.pct(P.tiers![0][1])} of your average weekly wage, up to ${K.cents(P.max!)} a week, for up to ${P.weeks.bonding} weeks.`,
  title: `NY Paid Family Leave 2026: ${K.pct(P.tiers![0][1])} of Pay, Up to ${K.cents(P.max!)}`,
  description: `New York Paid Family Leave in 2026: ${K.pct(P.tiers![0][1])} of your average weekly wage, ${K.usd(P.min!)} to ${K.cents(P.max!)} a week for ${P.weeks.bonding} weeks, funded by a ${K.pct(P.contrib.rate, 3)} deduction. Check yours.`,
  h1: 'New York Paid Family Leave in 2026: one rate, one cap',
  intro: `New York pays two thirds of your usual weekly wage while you bond with a new child or care for a seriously ill relative. Enter your pay to see the check and the total for ${P.weeks.bonding} weeks.`,
  resume: `New York Paid Family Leave pays a single rate, ${K.pct(P.tiers![0][1])} of your average weekly wage, with no tiers and no bands. The ceiling follows the state economy: it is ${K.pct(P.tiers![0][1])} of the New York State Average Weekly Wage, which is ${K.cents(F.nysaww as number)} for 2026, so the largest check is ${K.cents(P.max!)} a week. You reach it at about ${K.usd(capPay)} a year. Below that, ${K.usd(45000)} a year brings about ${K.usd(a.weekly)} a week and ${K.usd(75000)} about ${K.usd(b.weekly)}. If your average weekly wage is above ${K.usd(P.min!)}, the minimum is ${K.usd(P.min!)}; below it, you receive your full wage. The leave lasts up to ${P.weeks.bonding} weeks, which at ${K.usd(75000)} a year adds up to ${K.usd(lv.total)}. Employees pay for the program through a deduction of ${K.pct(P.contrib.rate, 3)} of gross wages, at most ${K.cents(F.maxAnnualContrib2026 as number)} in the year.`,
  body: (h) => `
<h2>Average weekly wage, the New York way</h2>
<p>The benefit starts from the average of your most recent weeks of pay before the leave, not from a quarter of a base period as in California or Rhode Island. For most salaried workers this equals the regular weekly paycheck before tax; for people paid by the hour with uneven schedules, those last weeks decide the amount. Recent raises count right away, which is an advantage over quarter-based programs.</p>
<p>The calculator above divides a year of pay by 52, which matches a steady paycheck. If your recent weeks were higher or lower, enter the yearly equivalent of those weeks instead.</p>
${h.mini('leave', { t: 'Two thirds of which paycheck?', p: ['pay', 'wk'], d: { prog: 'ny-pfl', lock: 1, pay: 60000, wk: 12 } })}
<h2>The cap moves with wages across the state</h2>
<p>Every year New York publishes a new statewide average weekly wage. For 2026 it is ${K.cents(F.nysaww as number)}, and two thirds of it set the maximum at ${K.cents(P.max!)} (${h.src('nypfl_2026', 'NY Paid Family Leave, 2026 updates')}). Anyone earning more than roughly ${K.usd(capPay)} a year receives the same amount, so the share of pay replaced falls as salaries rise. At ${K.usd(75000)}, the check of ${K.usd(lv.weekly)} replaces ${K.pct(lv.weekly / th.net)} of take-home pay before tax, a high figure because the benefit is not reduced by withholding unless you ask for it.</p>
<h2>Twelve weeks, for family reasons only</h2>
<p>The program pays for bonding during the first year after a birth, adoption or foster placement, for caring for a family member with a serious health condition. Your own illness is not covered here: that is the role of ${h.a('ny-disability-benefits', 'New York disability benefits')}, a separate and much smaller benefit. The state presents Paid Family Leave as job protected, paid time off (${h.src('nypfl_benefits', 'NY PFL benefits')}).</p>
<h2>What it costs on your paycheck</h2>
<p>The deduction is ${K.pct(P.contrib.rate, 3)} of each paycheck until the yearly ceiling of ${K.cents(F.maxAnnualContrib2026 as number)}. A worker earning ${K.usd(45000)} pays about ${K.usd(yearly(45000))} over the year, and one earning ${K.usd(75000)} about ${K.usd(yearly(75000))}. The employer withholds it and pays it to the carrier that insures its staff.</p>
<h2>Taxes</h2>
<p>Under ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}, state family leave benefits are included in federal gross income. Nothing is withheld unless you request it, so a full leave at the cap can leave a bill in April; the ${h.a('is-paid-family-leave-taxable', 'paid leave tax page')} estimates it.</p>
`,
  faqs: [
    { q: 'What is the most New York Paid Family Leave pays in 2026?', a: `${K.cents(P.max!)} a week, which is ${K.pct(P.tiers![0][1])} of the New York State Average Weekly Wage of ${K.cents(F.nysaww as number)}. A worker earning more than about ${K.usd(capPay)} a year receives this amount. Over the full ${P.weeks.bonding} weeks, the most anyone can receive is about ${K.usd(P.max! * P.weeks.bonding!)}.` },
    { q: 'How does New York PFL measure my average weekly wage?', a: `It averages your gross pay over the most recent weeks worked before the leave begins, rather than a quarter of a base period. Overtime and regular bonuses inside that window raise the figure. If those weeks were unusually short, for example because of reduced hours, the benefit will be lower than two thirds of your normal salary.` },
    { q: 'Does New York PFL pay if I am sick myself?', a: 'No. Paid Family Leave covers bonding with a child and caring for a seriously ill relative, not the health of the worker. A worker who is ill or recovering from childbirth claims disability benefits under the Disability Benefits Law, which pays half of wages up to a low weekly cap, and can switch to family leave for bonding afterwards.' },
    { q: 'How much is the New York PFL deduction from my paycheck?', a: `In 2026 it is ${K.pct(P.contrib.rate, 3)} of gross wages, stopping once you have paid ${K.cents(F.maxAnnualContrib2026 as number)} for the year. At ${K.usd(45000)} a year that is about ${K.usd(yearly(45000))}. The employer withholds it from each paycheck and pays the insurer or the state fund that covers its staff.` },
  ],
  tool: 'leave', toolArg: { prog: 'ny-pfl', lock: 1, pay: 75000, wk: 12 },
  related: ['ny-disability-benefits', 'paid-family-leave', 'is-paid-family-leave-taxable', 'maternity-leave-pay', 'new-york-unemployment'],
  sources: ['nypfl_2026', 'nypfl_benefits', 'irs_rr_2025_4'],
});
