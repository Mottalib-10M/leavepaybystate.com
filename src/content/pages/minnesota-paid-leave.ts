import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('mn-pl'), F = P.facts!;
const [[t1, r1], [t2, r2], [, r3]] = P.tiers! as Array<[number, number]>;
const at = (aww: number) => K.pw('mn-pl', aww * 52, aww * 13).weekly;
const a = K.pw('mn-pl', 42000), b = K.pw('mn-pl', 88000);
const bond = K.leave('mn-pl', 88000, 'bonding', P.weeks.bonding!);
const yearly = (pay: number) => Math.min(pay, P.contrib.cap!) * P.contrib.rate;

export default definePage({
  id: 'minnesota-paid-leave', group: 'leave', order: 223, slug: 'minnesota-paid-leave', prog: 'mn-pl',
  nav: 'Minnesota Paid Leave', card: `New in 2026: three tiers (${K.pct(r1)}, ${K.pct(r2)}, ${K.pct(r3)}), up to ${K.usd(P.max!)} a week; ${P.weeks.medical} weeks per reason, ${P.weeks.combined} in all.`,
  title: `Minnesota Paid Leave 2026: Three Tiers, ${K.usd(P.max!)} a Week`,
  description: `Minnesota Paid Leave started in 2026: ${K.pct(r1)}, ${K.pct(r2)} and ${K.pct(r3)} tiers, up to ${K.usd(P.max!)} a week, ${P.weeks.medical} weeks per reason and ${P.weeks.combined} combined. Estimate your weekly benefit here.`,
  h1: 'Minnesota Paid Leave in its first year, 2026',
  intro: `Minnesota began paying family and medical leave on ${K.day(P.start!)}. It is the only program with three replacement tiers, which keeps a high share of pay for lower and middle earners.`,
  resume: `Minnesota Paid Leave has paid benefits since ${K.day(P.start!)}. The weekly amount is built from three slices of your average weekly wage: ${K.pct(r1)} of the first ${K.cents(t1)}, ${K.pct(r2)} of the next ${K.cents(t2 - t1)}, and ${K.pct(r3)} of anything above ${K.usd(t2)}. The maximum equals the state average weekly wage, ${K.usd(P.max!)} for 2026. A weekly wage of ${K.usd(600)} brings ${K.usd(at(600))}, ${K.usd(1200)} brings ${K.usd(at(1200))}, and ${K.usd(2000)} brings ${K.usd(at(2000))}. Over a year, ${K.usd(42000)} of pay gives about ${K.usd(a.weekly)} a week and ${K.usd(88000)} about ${K.usd(b.weekly)}. Medical leave and family leave are each limited to ${P.weeks.medical} weeks a benefit year, and to ${P.weeks.combined} when added together. Employers owe a premium of ${K.pct(F.premiumTotal as number, 2)} on wages up to ${K.usd(P.contrib.cap!)}; they bear at least half and may deduct up to ${K.pct(F.employeeMaxDeduction as number, 2)} from employees.`,
  body: (h) => `
<h2>Three slices instead of two</h2>
<p>Most paid leave programs use two tiers. Minnesota's statute uses three: ${K.pct(r1)} of the wage that does not exceed half of the state average weekly wage, ${K.pct(r2)} of the wage between half and the full average, and ${K.pct(r3)} of the wage above it (${h.src('mn_statute', 'Minn. Stat. § 268B.04')}). Minnesota Management and Budget translated this into dollars for 2026: the first ${K.cents(t1)}, the next ${K.cents(t2 - t1)}, then the rest, with payments capped at ${K.usd(P.max!)} (${h.src('mn_mmb', 'MMB benefit tiers for 2026')}).</p>
${h.table(['Average weekly wage', 'Weekly benefit', 'Share of wage'], [600, 1000, 1400, 2000, 2600].map((w) => [K.usd(w), K.usd(at(w)), K.pct(at(w) / w)]), 'Minnesota Paid Leave benefit at a few weekly wages, 2026.', ['l', 'r', 'r'])}
<p>The middle tier is the distinctive part. Workers with weekly wages between ${K.usd(t1)} and ${K.usd(t2)} keep ${K.pct(r2)} of each additional dollar, more than the ${K.pct(K.Pg('wa-pfml').tiers![1][1])} that Washington or Colorado would give at that level.</p>
${h.mini('leave', { t: 'Minnesota Paid Leave at your pay', p: ['pay', 'hq', 'why', 'wk'], d: { prog: 'mn-pl', lock: 1, pay: 88000, why: 'bonding', wk: 12 } })}
<h2>${P.weeks.medical} plus ${P.weeks.combined - P.weeks.medical!}: the combined limit</h2>
<p>A worker can take up to ${P.weeks.medical} weeks for a serious health condition and up to ${P.weeks.bonding} weeks for family reasons in a benefit year, but the statute reduces one by the other so the two together stop at ${P.weeks.combined} weeks. The employer poster puts it simply: you may qualify for up to ${P.weeks.combined} weeks in total (${h.src('mn_poster', 'DEED Paid Leave poster')}). For a birth parent, that leaves room for medical leave around the delivery and a full ${P.weeks.bonding} weeks of bonding. Bonding alone at ${K.usd(88000)} a year pays about ${K.usd(bond.total)}.</p>
<h2>The premium</h2>
<p>The statute set the premium at ${K.pct(F.statuteRate as number, 1)} for 2026, and the commissioner raised it to ${K.pct(F.premiumTotal as number, 2)} of wages up to the Social Security limit (${h.src('mn_rate', 'DEED 2026 premium rate')}). Employers pay at least half and can deduct up to ${K.pct(F.employeeMaxDeduction as number, 2)} from workers; small employers that qualify pay a lower rate of ${K.pct(F.smallEmployerRate as number, 2)}. At ${K.usd(42000)} the most a worker would pay is about ${K.usd(yearly(42000))} a year.</p>
<h2>Weekly amount and the calculator</h2>
<p>The calculator divides your best quarter by thirteen to estimate the average weekly wage. Enter that quarter under More options if your pay was uneven, for example after a raise, a seasonal peak or a period of overtime. A program this new has few published examples, so compare the result with the decision letter the state sends once you apply. Family benefits are federal taxable income under ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}; see the ${h.a('is-paid-family-leave-taxable', 'paid leave tax page')}.</p>
`,
  faqs: [
    { q: 'When did Minnesota Paid Leave start paying benefits?', a: `On ${K.day(P.start!)}. Since then, eligible workers can claim paid leave for their own serious health condition, bonding with a new child or caring for a family member. The weekly maximum for the start of the program is ${K.usd(P.max!)}, equal to the state average weekly wage.` },
    { q: 'How is the Minnesota Paid Leave benefit calculated?', a: `In three tiers: ${K.pct(r1)} of the first ${K.cents(t1)} of your average weekly wage, ${K.pct(r2)} of the next ${K.cents(t2 - t1)}, and ${K.pct(r3)} of the rest, up to ${K.usd(P.max!)}. A weekly wage of ${K.usd(1000)} gives about ${K.usd(at(1000))}, which is ${K.pct(at(1000) / 1000)} of it.` },
    { q: 'How many weeks of Minnesota Paid Leave can I take in a year?', a: `The statute gives ${P.weeks.medical} weeks per benefit year for a serious health condition and as many for family leave, then trims one by the other so the sum never passes ${P.weeks.combined}. Someone who needs medical leave for a pregnancy can still take bonding weeks afterwards, within the ${P.weeks.combined}.` },
    { q: 'How much do Minnesota workers pay for Paid Leave?', a: `Employers can deduct up to ${K.pct(F.employeeMaxDeduction as number, 2)} of wages in 2026, half of the ${K.pct(F.premiumTotal as number, 2)} premium, on wages up to the Social Security limit. Employers pay at least the other half. At ${K.usd(42000)} a year, the worker share is at most about ${K.usd(yearly(42000))}.` },
  ],
  tool: 'leave', toolArg: { prog: 'mn-pl', lock: 1, pay: 88000, why: 'bonding', wk: 12 },
  related: ['paid-family-leave', 'maternity-leave-pay', 'is-paid-family-leave-taxable', 'fmla-vs-paid-leave', 'minnesota-unemployment'],
  sources: ['mn_statute', 'mn_poster', 'mn_mmb', 'mn_rate', 'irs_rr_2025_4'],
});
