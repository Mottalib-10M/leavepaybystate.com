import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('ma-pfml'), F = P.facts!;
const [[half, r1], [, r2]] = P.tiers! as Array<[number, number]>;
const capAww = half + (P.max! - half * r1) / r2;
const a = K.pw('ma-pfml', 44000), b = K.pw('ma-pfml', 85000);
const med = K.leave('ma-pfml', 85000, 'medical', P.weeks.medical!);
const bond = K.leave('ma-pfml', 85000, 'bonding', P.weeks.bonding!);
const yearly = (pay: number) => pay * P.contrib.rate;

export default definePage({
  id: 'massachusetts-pfml', group: 'leave', order: 219, slug: 'massachusetts-pfml', prog: 'ma-pfml',
  nav: 'Massachusetts PFML', card: `${K.pct(r1)} of wages up to half the state average, ${K.pct(r2)} above, up to ${K.cents(P.max!)} a week; ${P.weeks.medical} medical weeks, ${P.weeks.combined} combined.`,
  title: `Massachusetts PFML 2026: Up to ${K.cents(P.max!)} a Week, ${P.weeks.combined} Weeks`,
  description: `Massachusetts PFML in 2026: ${K.pct(r1)} and ${K.pct(r2)} tiers, up to ${K.cents(P.max!)} a week, ${P.weeks.medical} weeks medical, ${P.weeks.bonding} family, ${P.weeks.combined} in all, after a ${P.waiting.medical}-day wait. Estimate your weekly pay.`,
  h1: 'Massachusetts paid family and medical leave in 2026',
  intro: `The Department of Family and Medical Leave pays Massachusetts workers during their own serious health condition, while bonding with a child or while caring for a relative. Medical leave runs longer than family leave here.`,
  resume: `Massachusetts PFML replaces ${K.pct(r1)} of the part of your individual average weekly wage that is equal to or less than half of the state average weekly wage, and ${K.pct(r2)} of the part above. For 2026 the state average weekly wage is ${K.cents(F.saww as number)}, so the first tier ends at ${K.cents(half)} and the maximum benefit, ${K.pct(F.maxShareOfSaww as number)} of the state average, is ${K.cents(P.max!)} a week. You reach it at about ${K.usd(capAww)} a week of wages. A worker earning ${K.usd(44000)} a year receives about ${K.usd(a.weekly)} a week, and one earning ${K.usd(85000)} about ${K.usd(b.weekly)}. Leave lasts up to ${P.weeks.medical} weeks for your own health, ${P.weeks.bonding} for family reasons, and ${P.weeks.combined} weeks in total in a benefit year. Every leave starts with a ${P.waiting.medical}-day waiting period. The 2026 contribution is ${K.pct(F.contribTotal as number, 2)} of wages for employers with ${F.rateSheetEmployerSize} or more workers, of which employees may be charged up to ${K.pct(P.contrib.rate, 2)}.`,
  body: (h) => `
<h2>${P.weeks.medical} weeks for your health, ${P.weeks.bonding} for family</h2>
<p>Massachusetts is the program with the longest medical leave on this site among the combined family and medical programs: up to ${P.weeks.medical} weeks for a serious health condition of your own, including pregnancy and recovery from childbirth. Family leave, for bonding or caring for a relative, stops at ${P.weeks.bonding} weeks. Combined, a worker cannot take more than ${P.weeks.combined} weeks in a benefit year (${h.src('ma_pfml', 'DFML, how weekly benefits are calculated')}). At ${K.usd(85000)} a year, the full medical leave is worth about ${K.usd(med.total)} and the full family leave about ${K.usd(bond.total)}.</p>
${h.mini('leave', { t: 'Medical or family leave in Massachusetts', p: ['pay', 'why', 'wk'], d: { prog: 'ma-pfml', lock: 1, pay: 85000, why: 'medical', wk: 20 } })}
<h2>The IAWW and the two tiers</h2>
<p>The Department computes an individual average weekly wage, the IAWW, from your wages in the base period; the calculator approximates it from your two best quarters. The part of the IAWW up to ${K.cents(half)} is replaced at ${K.pct(r1)}, the rest at ${K.pct(r2)}. The result is then capped at ${K.cents(P.max!)}. A worker with an IAWW of ${K.usd(half)} or less receives ${K.pct(r1)} of wages; at ${K.usd(85000)} a year, the combined effect is about ${K.pct(b.weekly / (85000 / 52))} of gross weekly pay.</p>
<p>The Department publishes its own benefit calculator, linked in the table below. Its result is the reference if it differs from this estimate.</p>
<h2>A waiting week for every leave</h2>
<p>Unlike Washington or California, Massachusetts applies its ${P.waiting.medical}-day waiting period to every type of leave, bonding included. No benefit is paid for those days. The weeks you enter in the calculator include them, and the amount paid is for the weeks after.</p>
<h2>Contributions in 2026</h2>
<p>For employers with ${F.rateSheetEmployerSize} or more covered individuals, the total contribution is ${K.pct(F.contribTotal as number, 2)} of wages: ${K.pct(F.familyContrib as number, 2)} for family leave and ${K.pct(F.medicalContrib as number, 2)} for medical leave (${h.src('ma_rates', 'DFML 2026 rate sheet')}). The employer may deduct the whole family share and up to ${K.pct(F.employeeMedicalShare as number)} of the medical share, ${K.pct(F.employeeMedicalDeduction as number, 2)} of wages, for a worker share of up to ${K.pct(P.contrib.rate, 2)}. At ${K.usd(44000)} that is at most about ${K.usd(yearly(44000))} a year. The wage ceiling for contributions was not read on an official page and is not applied here.</p>
<h2>Tax and job protection</h2>
<p>Family leave benefits are federal income under ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}; medical leave benefits are excluded only for the part matching employee contributions, which is a minority share of the medical premium. The ${h.a('is-paid-family-leave-taxable', 'tax page')} explains the split, and the ${h.a('fmla-vs-paid-leave', 'FMLA page')} covers the job protection side.</p>
`,
  faqs: [
    { q: 'How much does Massachusetts PFML pay a week in 2026?', a: `Up to ${K.cents(P.max!)}. The program replaces ${K.pct(r1)} of your average weekly wage up to ${K.cents(half)} and ${K.pct(r2)} of the rest. At ${K.usd(44000)} a year, that is about ${K.usd(a.weekly)} a week. The cap equals ${K.pct(F.maxShareOfSaww as number)} of the state average weekly wage of ${K.cents(F.saww as number)}.` },
    { q: 'How many weeks of Massachusetts PFML can I take?', a: `Up to ${P.weeks.medical} weeks of medical leave, ${P.weeks.bonding} weeks of family leave, and no more than ${P.weeks.combined} weeks combined in a benefit year. A birth mother can therefore combine medical leave for pregnancy and recovery with family leave for bonding, within the ${P.weeks.combined}-week total.` },
    { q: 'Does Massachusetts PFML have a waiting period for bonding?', a: `Yes. The ${P.waiting.medical}-day waiting period applies to each leave, whether medical, bonding or caregiving, and those days are not paid. Washington and California exempt bonding from their waiting periods, so the same leave pays slightly less in total in Massachusetts.` },
    { q: 'How much can my employer deduct for Massachusetts PFML?', a: `Up to ${K.pct(P.contrib.rate, 2)} of your wages in 2026 at an employer with ${F.rateSheetEmployerSize} or more workers: the full family contribution of ${K.pct(F.familyContrib as number, 2)} and ${K.pct(F.employeeMedicalShare as number)} of the medical contribution, or ${K.pct(F.employeeMedicalDeduction as number, 2)}. The employer pays the remainder of the contribution.` },
  ],
  tool: 'leave', toolArg: { prog: 'ma-pfml', lock: 1, pay: 85000, why: 'medical', wk: 20 },
  related: ['paid-family-leave', 'maternity-leave-pay', 'state-disability-insurance', 'is-paid-family-leave-taxable', 'massachusetts-unemployment'],
  sources: ['ma_pfml', 'ma_rates', 'irs_rr_2025_4'],
});
