import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('wa-pfml'), F = P.facts!;
const [[half, r1], [, r2]] = P.tiers! as Array<[number, number]>;
const capAww = half + (P.max! - half * r1) / r2;
const a = K.pw('wa-pfml', 48000), b = K.pw('wa-pfml', 90000);
const bond = K.leave('wa-pfml', 90000, 'bonding', P.weeks.bonding!);
const care = K.leave('wa-pfml', 90000, 'care', 4);
const th = K.th('WA', 90000);
const yearly = (pay: number) => Math.min(pay, P.contrib.cap!) * P.contrib.rate;

export default definePage({
  id: 'washington-paid-family-leave', group: 'leave', order: 218, slug: 'washington-paid-family-leave', prog: 'wa-pfml',
  nav: 'Washington Paid Family and Medical Leave', card: `${K.pct(r1)} of wages up to ${K.usd(half)} a week plus ${K.pct(r2)} above, up to ${K.usd(P.max!)}; ${P.weeks.combined} weeks combined, ${P.weeks.pregnancy} with a pregnancy complication.`,
  title: `Washington Paid Family Leave 2026: Up to ${K.usd(P.max!)}, ${P.weeks.combined} Weeks`,
  description: `Washington Paid Family Leave (PFML) in 2026: ${K.pct(r1)} then ${K.pct(r2)} of your weekly wage, up to ${K.usd(P.max!)} a week, ${P.weeks.combined} weeks combined, ${P.weeks.pregnancy} with complications. Estimate yours.`,
  h1: 'Washington paid family and medical leave in 2026',
  intro: `Washington's PFML pays for your own serious health condition, for bonding with a new child and for caring for a relative, from one program with a shared yearly limit. Enter your pay and reason.`,
  resume: `Washington Paid Family and Medical Leave replaces ${K.pct(r1)} of your weekly wage up to half of the state average weekly wage, ${K.usd(half)}, and ${K.pct(r2)} of the part above, with a maximum of ${K.usd(P.max!)} a week in 2026 and a minimum of ${K.usd(P.min!)}. Only wages above about ${K.usd(capAww)} a week hit the ceiling. Someone paid ${K.usd(48000)} a year would see roughly ${K.usd(a.weekly)} weekly, and a ${K.usd(90000)} salary roughly ${K.usd(b.weekly)}. Medical and family leave are capped at ${P.weeks.bonding} weeks apiece, with a claim-year total of ${P.weeks.combined} weeks, or ${P.weeks.pregnancy} when a pregnancy complication causes incapacity. A waiting week of ${P.waiting.medical} days applies to medical and caregiving leave, not to bonding after a birth or placement, so ${P.weeks.bonding} weeks of bonding at ${K.usd(90000)} pay ${K.usd(bond.total)}. Premiums total ${K.pct(F.premiumTotal as number, 2)} of wages up to ${K.usd(P.contrib.cap!)}, and employees cover ${K.pct(F.employeeSharePremium as number, 2)} of it. The maximum is set to reach ${K.usd(F.max2027 as number)} for claims filed from ${K.day(F.max2027From as string)}, a figure still to come.`,
  body: (h) => `
<h2>Two slices of your wage</h2>
<p>The benefit is the sum of two parts (${h.src('wa_rcw', 'RCW 50A.15.020')}). The first part is ${K.pct(r1)} of your average weekly wage up to half of the state average weekly wage. If you earn more than that, the second part adds ${K.pct(r2)} of the difference. A worker with a weekly wage of ${K.usd(half)} or less receives ${K.pct(r1)} of it; a worker at ${K.usd(90000 / 52)} a week receives ${K.usd(b.weekly)}, about ${K.pct(b.weekly / (90000 / 52))} of gross pay and ${K.pct(b.weekly / th.net)} of take-home pay. The agency averages the two highest quarters of your base period for most workers; the calculator does the same.</p>
${h.mini('leave', { t: 'Medical, bonding or caregiving', p: ['pay', 'why', 'wk'], d: { prog: 'wa-pfml', lock: 1, pay: 90000, why: 'care', wk: 4 } })}
<h2>${P.weeks.medical} weeks each, ${P.weeks.combined} in all</h2>
<p>Medical leave and family leave each allow up to ${P.weeks.medical} weeks in a claim year, and together they stop at ${P.weeks.combined} (${h.src('wa_how', 'Washington Paid Leave')}). The combined limit matters most around a birth. A mother who needs weeks of medical leave before and after delivery uses part of the ${P.weeks.combined}, and the bonding weeks that follow fill what remains. When a pregnancy complication makes her unable to work, the combined total goes up to ${P.weeks.pregnancy} weeks.</p>
<h2>Which leaves have a waiting week</h2>
<p>The statute imposes a waiting period of the first ${P.waiting.medical} consecutive calendar days, then exempts leave for the birth or placement of a child and leave for a qualifying military exigency. So bonding is paid from the first day, while medical leave and caring for a relative start after the waiting week: ${K.num(care.weeks)} weeks of caregiving at ${K.usd(90000)} pay ${K.usd(care.total)}, for ${K.dec(care.paidWeeks)} paid weeks.</p>
<h2>The premium and who pays it</h2>
<p>For 2026 the total premium is ${K.pct(F.premiumTotal as number, 2)} of gross wages, excluding tips, up to the Social Security cap of ${K.usd(P.contrib.cap!)} (${h.src('wa_premium', 'Paid Leave premium page')}). Employees pay ${K.pct(F.employeeSharePremium as number, 2)} of that premium, and employers with ${F.employerSizeShare} or more employees pay up to ${K.pct(F.employerSharePremium as number, 2)}. A worker earning ${K.usd(90000)} contributes about ${K.usd(yearly(90000))} in the year.</p>
<h2>2027: a higher cap to come</h2>
<p>The Employment Security Department has announced that the maximum will be ${K.usd(F.max2027 as number)} for new claims filed on or after ${K.day(F.max2027From as string)} (${h.src('esd_2026', 'ESD news release')}). Until then, claims are paid under the 2026 cap of ${K.usd(P.max!)}. Washington has no state income tax, but family leave benefits are federal income under ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}; see the ${h.a('is-paid-family-leave-taxable', 'paid leave tax page')}.</p>
`,
  faqs: [
    { q: 'What is the Washington PFML maximum in 2026?', a: `${K.usd(P.max!)} a week, reached at an average weekly wage of about ${K.usd(capAww)}. The minimum is ${K.usd(P.min!)}, or your full wage if it is lower. For new claims filed from ${K.day(F.max2027From as string)}, the agency has announced a higher maximum of ${K.usd(F.max2027 as number)}, which is not yet in force.` },
    { q: 'How many weeks of Washington paid leave can I take in a year?', a: `Each type of leave, medical or family, stops at ${P.weeks.medical} weeks, and the two added together stop at ${P.weeks.combined} in a claim year, whatever the mix of reasons. If a pregnancy complication leaves you unable to work, the combined limit rises to ${P.weeks.pregnancy} weeks.` },
    { q: 'Is there a waiting week for Washington paid family leave?', a: `For most leaves, yes: the first ${P.waiting.medical} consecutive days are unpaid. The law exempts leave for the birth or placement of a child, which is paid from the first day, and leave for a qualifying military exigency. Medical leave and care for a relative start after the waiting week.` },
    { q: 'How much does the Washington paid leave premium cost a worker?', a: `In 2026 the premium is ${K.pct(F.premiumTotal as number, 2)} of gross wages up to ${K.usd(P.contrib.cap!)}, and the employee share is ${K.pct(F.employeeSharePremium as number, 2)} of it, about ${K.pct(P.contrib.rate, 2)} of wages. At ${K.usd(60000)} a year, that is about ${K.usd(yearly(60000))}, withheld from each paycheck. Larger employers pay the rest of the premium.` },
  ],
  tool: 'leave', toolArg: { prog: 'wa-pfml', lock: 1, pay: 90000, why: 'bonding', wk: 12 },
  related: ['paid-family-leave', 'maternity-leave-pay', 'is-paid-family-leave-taxable', 'fmla-vs-paid-leave', 'washington-unemployment'],
  sources: ['wa_rcw', 'wa_how', 'wa_premium', 'esd_2026', 'irs_rr_2025_4'],
});
