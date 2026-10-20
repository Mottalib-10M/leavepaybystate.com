import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('nj-tdi'), F = P.facts!;
const rate = P.tiers![0][1];
const capWeekly = P.max! / rate;
const short = K.leave('nj-tdi', 55000, 'medical', 2), long = K.leave('nj-tdi', 55000, 'medical', 6);
const wk = K.pw('nj-tdi', 55000);
const th = K.th('NJ', 55000);
const yearly = (pay: number) => Math.min(pay, P.contrib.cap!) * P.contrib.rate;

export default definePage({
  id: 'nj-temporary-disability', group: 'leave', order: 215, slug: 'nj-temporary-disability', prog: 'nj-tdi',
  nav: 'New Jersey Temporary Disability', card: `${K.pct(rate)} of your weekly wage, up to ${K.usd(P.max!)}, for up to ${P.weeks.medical} weeks; the waiting week is paid back after ${F.waitingPaidIfLeaveDays} days.`,
  title: `NJ Temporary Disability 2026: ${K.usd(P.max!)} a Week and Waiting Week`,
  description: `New Jersey Temporary Disability Insurance in 2026: ${K.pct(rate)} of your wage up to ${K.usd(P.max!)} a week for ${P.weeks.medical} weeks, and when the unpaid first week is paid back. Estimate it.`,
  h1: 'New Jersey Temporary Disability Insurance in 2026: amount, waiting week, length',
  intro: `TDI pays New Jersey workers who cannot work because of an illness, an injury off the job or a pregnancy. The first week is unpaid at first, then paid back if the disability lasts long enough.`,
  resume: `New Jersey Temporary Disability Insurance pays ${K.pct(rate)} of your average weekly wage, up to ${K.usd(P.max!)} a week in 2026, for a disability that keeps you from working. The cap applies from an average weekly wage of about ${K.usd(capWeekly)}, roughly ${K.usd(capWeekly * 52)} a year; at ${K.usd(55000)} a year the benefit is ${K.usd(wk.weekly)} a week, ${K.pct(wk.weekly / th.net)} of the take-home pay it replaces. Payments start on the eighth day of disability. The first ${P.waiting.medical} days are paid too, but only once the disability has lasted ${F.waitingPaidIfLeaveDays} days or more, so an absence of ${K.num(short.weeks)} weeks pays ${K.usd(short.total)} while one of ${K.num(long.weeks)} weeks pays ${K.usd(long.weekly * long.weeks)} once the waiting week is paid back. Benefits last up to ${P.weeks.medical} weeks, and no more than ${P.weeks.medical} times the weekly amount. Workers fund TDI with ${K.pct(P.contrib.rate, 2)} of wages up to ${K.usd(P.contrib.cap!)}, which caps the year at ${K.cents(F.maxAnnualContrib2026 as number)}.`,
  body: (h) => `
<h2>The waiting week that is paid later</h2>
<p>Every TDI claim begins with ${P.waiting.medical} unpaid days. New Jersey pays from the eighth day, and goes back to pay the first week once your leave reaches a total of ${F.waitingPaidIfLeaveDays} days or more (${h.src('nj_wait', 'NJ Department of Labor, the waiting week')}). In practice, a short absence loses a week of benefits, and a long one does not. The calculator shows the first case: it subtracts the waiting week from the weeks you enter.</p>
<p>For a worker earning ${K.usd(55000)}, the difference is ${K.usd(wk.weekly)}. A disability of ${K.num(short.weeks)} weeks pays ${K.usd(short.total)}; one of ${K.num(long.weeks)} weeks, past the ${F.waitingPaidIfLeaveDays}-day line, should pay every week, about ${K.usd(long.weekly * long.weeks)}.</p>
${h.mini('leave', { t: 'TDI for a given absence', p: ['pay', 'wk'], d: { prog: 'nj-tdi', lock: 1, pay: 55000, wk: 6 } })}
<h2>${K.pct(rate)} of the wage, then the cap</h2>
<p>The amount is ${K.pct(rate)} of the average of the weeks you worked in the base year, up to the maximum for the calendar year in which the disability begins (${h.src('nj_tdi', 'NJ Temporary Disability Insurance')}). The cap rose from ${K.usd(F.max2025 as number)} to ${K.usd(P.max!)} in 2026 (${h.src('nj_ui_2026', 'NJ 2026 benefit rates')}). New Jersey's rate is high and its cap moderate, so the cap binds for many full-time workers: anyone with a weekly wage above ${K.usd(capWeekly)} receives the same amount.</p>
<h2>How long benefits last</h2>
<p>A claim can run up to ${P.weeks.medical} weeks, or ${P.weeks.medical} times the weekly benefit if that is less. Benefits stop when your provider certifies that you can work. Pregnancy is a covered disability, and after it the bonding weeks are paid by ${h.a('nj-family-leave', 'New Jersey Family Leave Insurance')}.</p>
<h2>Eligibility and the payroll deduction</h2>
<p>For a claim in 2026, you need ${F.eligWeeks} base-year weeks with earnings of at least ${K.usd(F.eligWeeklyEarnings as number)} each, or ${K.usd(F.eligBaseYearTotal as number)} in total. The TDI deduction is ${K.pct(P.contrib.rate, 2)} on the first ${K.usd(P.contrib.cap!)} of wages; at ${K.usd(55000)} that is about ${K.usd(yearly(55000))} for the year, and the most anyone pays is ${K.cents(F.maxAnnualContrib2026 as number)}.</p>
<h2>Tax treatment</h2>
<p>Under ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}, a state medical leave benefit is excluded from federal income for the part attributable to employee contributions and taxable for the part attributable to employer contributions. The ${h.a('is-paid-family-leave-taxable', 'tax page')} explains how to read the statement the state sends, and the ${h.a('state-disability-insurance', 'disability insurance comparison')} sets New Jersey against the other states.</p>
`,
  faqs: [
    { q: 'How much does New Jersey temporary disability pay in 2026?', a: `${K.pct(rate)} of your average weekly wage, up to ${K.usd(P.max!)} a week. The cap applies once your weekly wage passes about ${K.usd(capWeekly)}. At ${K.usd(55000)} a year, the weekly benefit is about ${K.usd(wk.weekly)}. The amount is fixed by the calendar year in which the disability starts.` },
    { q: 'Is the first week of New Jersey TDI ever paid?', a: `Yes, if your disability lasts long enough. The first ${P.waiting.medical} days are unpaid at first, and benefits begin on the eighth day. When your leave reaches ${F.waitingPaidIfLeaveDays} days or more in total, New Jersey pays the waiting week as well. A disability shorter than that keeps the first week unpaid.` },
    { q: 'How many weeks can New Jersey TDI last?', a: `Up to ${P.weeks.medical} weeks for one disability, and never more than ${P.weeks.medical} times your weekly benefit. Payments end earlier if your provider certifies you able to work. Pregnancy and recovery from childbirth are covered, and Family Leave Insurance takes over for bonding with the baby afterwards.` },
  ],
  tool: 'leave', toolArg: { prog: 'nj-tdi', lock: 1, pay: 55000, wk: 6 },
  related: ['nj-family-leave', 'state-disability-insurance', 'maternity-leave-pay', 'is-paid-family-leave-taxable', 'new-jersey-unemployment'],
  sources: ['nj_tdi', 'nj_wait', 'nj_ui_2026', 'irs_rr_2025_4'],
});
