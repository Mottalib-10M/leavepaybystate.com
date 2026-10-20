import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('dc-pfl'), F = P.facts!;
const [[t1, r1], [, r2]] = P.tiers! as Array<[number, number]>;
const capAww = t1 + (P.max! - t1 * r1) / r2;
const before = (pay: number) => { const w = pay / 52; return Math.min(F.maxBefore as number, w <= t1 ? w * r1 : t1 * r1 + (w - t1) * r2); };
const a = K.pw('dc-pfl', 45000), b = K.pw('dc-pfl', 80000);
const fam = K.leave('dc-pfl', 80000, 'care', P.weeks.care!);
const famOld = before(80000) * (F.familyWeeksBefore as number);
const chg = K.day(F.changeDate as string), chgMonth = chg.replace(/ \d+,/, '');

export default definePage({
  id: 'dc-paid-family-leave', group: 'leave', order: 226, slug: 'dc-paid-family-leave', prog: 'dc-pfl',
  nav: 'DC Paid Family Leave', card: `Cut on ${chg}: cap ${K.usd(P.max!)} a week, ${P.weeks.medical} weeks medical, ${P.weeks.care} family, ${P.weeks.bonding} parental. Funded by employers only.`,
  title: `DC Paid Family Leave 2026: New ${K.usd(P.max!)} Cap, Fewer Weeks`,
  description: `DC Paid Family Leave changed on ${chg}: the cap fell to ${K.usd(P.max!)} a week, medical leave to ${P.weeks.medical} weeks, family care to ${P.weeks.care}. Parental leave stays at ${P.weeks.bonding} weeks.`,
  h1: `DC Paid Family Leave after the ${chgMonth} changes`,
  intro: `The District of Columbia cut its paid leave program on ${chg}: a lower weekly cap and fewer weeks for two of the four leave types. Here is what a claim pays now.`,
  resume: `Since ${chg}, DC Paid Family Leave pays at most ${K.usd(P.max!)} a week for every type of claim, down from ${K.usd(F.maxBefore as number)}. The formula did not change: ${K.pct(r1)} of your average weekly wage up to ${K.pct(F.tierShareOfMinWage40h as number)} of ${F.minWageHours} hours at the District minimum wage of ${K.cents(F.minWage as number)}, which is ${K.usd(t1)}, plus ${K.pct(r2)} of the part above. Because the new cap is lower than that threshold would allow, it now binds at an average weekly wage of about ${K.usd(capAww)}, roughly ${K.usd(capAww * 52)} a year. At ${K.usd(45000)} a year the benefit is about ${K.usd(a.weekly)} a week; at ${K.usd(80000)}, the cap. The weeks changed too. Medical leave went from ${F.medicalWeeksBefore} to ${P.weeks.medical} weeks and family leave from ${F.familyWeeksBefore} to ${P.weeks.care}, while parental leave stays at ${P.weeks.bonding} weeks and prenatal leave at ${P.weeks.prenatal}. Workers pay nothing: employers fund the program with ${K.pct(F.employerRate as number, 2)} of wages.`,
  body: (h) => `
<h2>What changed on ${chg}</h2>
<p>The Department of Employment Services lists the changes side by side (${h.src('dc_updates', 'DC Paid Family Leave program updates')}):</p>
${h.table(['Item', 'Before', `From ${chg}`], [
    ['Weekly benefit maximum', K.usd(F.maxBefore as number), K.usd(P.max!)],
    ['Medical leave', `${F.medicalWeeksBefore} weeks`, `${P.weeks.medical} weeks`],
    ['Family leave (caring for a relative)', `${F.familyWeeksBefore} weeks`, `${P.weeks.care} weeks`],
    ['Parental leave', `${P.weeks.bonding} weeks`, `${P.weeks.bonding} weeks`],
    ['Prenatal leave', `${P.weeks.prenatal} weeks`, `${P.weeks.prenatal} weeks`],
  ], `DC Paid Family Leave before and after the ${chgMonth} changes.`, ['l', 'r', 'r'])}
<p>Family leave took the largest cut. A worker earning ${K.usd(80000)} who cares for a seriously ill parent could previously receive about ${K.usd(famOld)} over ${F.familyWeeksBefore} weeks; the same leave now pays ${K.usd(fam.total)} over ${P.weeks.care} weeks. Parents of a new child keep the full ${P.weeks.bonding} weeks, though at the lower cap.</p>
${h.mini('leave', { t: 'DC leave under the new rules', p: ['pay', 'why', 'wk'], d: { prog: 'dc-pfl', lock: 1, pay: 80000, why: 'care', wk: 6 } })}
<h2>A cap below the formula's own line</h2>
<p>The formula in the D.C. Code pays ${K.pct(r1)} of the average weekly wage up to ${K.pct(F.tierShareOfMinWage40h as number)} of the minimum wage times ${F.minWageHours}, and ${K.pct(r2)} above it (${h.src('dc_code', 'D.C. Code § 32-541.04')}). With a minimum wage of ${K.cents(F.minWage as number)} that line is ${K.usd(t1)}, and ${K.pct(r1)} of it is ${K.usd(t1 * r1)}. The new cap of ${K.usd(P.max!)} sits only a little above, so the ${K.pct(r2)} tier now adds at most ${K.usd(P.max! - t1 * r1)} before the cap stops it. In practice the program has become a ${K.pct(r1)} benefit with a ceiling, reached at about ${K.usd(capAww)} a week. The District's own calculator uses the same minimum wage (${h.src('dc_calc', 'DC benefits calculator')}).</p>
<h2>Around a birth</h2>
<p>A pregnancy can involve three of the four leave types. Prenatal leave, ${P.weeks.prenatal} weeks, covers prenatal care before the birth. Medical leave, now ${P.weeks.medical} weeks, covers recovery when a provider certifies it. Parental leave, still ${P.weeks.bonding} weeks, pays for bonding with the child, and is the one type the changes left untouched apart from the cap. The ${h.a('maternity-leave-pay', 'maternity leave pay page')} adds the amounts for a given salary; the calculator above lets you switch between reasons to see each one.</p>
<h2>Employers pay, workers do not</h2>
<p>DC is the only program on this site funded by employers alone, with no employee contribution at all. Covered employers pay ${K.pct(F.employerRate as number, 2)} of each covered employee's wages (${h.src('dc_fund', 'D.C. Code § 32-541.03')}). Nothing should appear on your pay stub for paid family leave.</p>
<h2>Tax follows the funding</h2>
<p>Under ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}, family and parental benefits are federal taxable income. Medical leave benefits are excluded only for the part attributable to employee contributions; since DC workers contribute nothing, a DC medical leave benefit is attributable to employer contributions. The ${h.a('is-paid-family-leave-taxable', 'paid leave tax page')} explains the rule, and the ${h.a('maryland-paid-family-leave', 'Maryland page')} covers the program coming next door.</p>
`,
  faqs: [
    { q: `What is the DC Paid Family Leave maximum after ${chgMonth}?`, a: `${K.usd(P.max!)} a week for every claim type, from ${chg}. It was ${K.usd(F.maxBefore as number)} before. With the formula of ${K.pct(r1)} of wages up to ${K.usd(t1)} and ${K.pct(r2)} above, the new cap is reached at an average weekly wage of about ${K.usd(capAww)}.` },
    { q: 'How many weeks does DC Paid Family Leave give now?', a: `From ${chg}: ${P.weeks.bonding} weeks of parental leave, ${P.weeks.medical} weeks of medical leave, ${P.weeks.care} weeks of family leave to care for a relative, and ${P.weeks.prenatal} weeks of prenatal leave. Medical leave was ${F.medicalWeeksBefore} weeks and family leave ${F.familyWeeksBefore} weeks before the change.` },
    { q: 'Do DC workers pay for Paid Family Leave?', a: `No. The D.C. Code requires covered employers to contribute ${K.pct(F.employerRate as number, 2)} of each covered employee's wages, and the program has no employee contribution. Any deduction labeled paid family leave on a DC pay stub is worth questioning with your payroll office.` },
  ],
  tool: 'leave', toolArg: { prog: 'dc-pfl', lock: 1, pay: 80000, why: 'bonding', wk: 12 },
  related: ['paid-family-leave', 'maternity-leave-pay', 'is-paid-family-leave-taxable', 'maryland-paid-family-leave', 'fmla-vs-paid-leave'],
  sources: ['dc_updates', 'dc_code', 'dc_calc', 'dc_fund', 'irs_rr_2025_4'],
});
