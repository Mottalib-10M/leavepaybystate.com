import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('ca-sdi'), F = P.facts!;
const low = K.pw('ca-sdi', 36000, 9000), flat = K.pw('ca-sdi', 66000, 18500), top = K.pw('ca-sdi', 120000, 30000);
const lv = K.leave('ca-sdi', 66000, 'medical', 10, 18500);
const T1 = P.tiers![0][0]!, R1 = K.pct(P.tiers![0][1]), R2 = K.pct(P.tiers![1][1]);

export default definePage({
  id: 'california-sdi', group: 'leave', order: 211, slug: 'california-sdi', prog: 'ca-sdi',
  nav: 'California SDI (disability)', card: `Disability pay in California: ${R1} or ${R2} of your best quarter ÷ 13, up to ${K.usd(P.max!)} a week after ${P.waiting.medical} unpaid days.`,
  title: 'EDD Disability 2026: California SDI Weekly Pay and Limits',
  description: `California SDI in 2026: ${K.usd(P.min!)} to ${K.usd(P.max!)} a week for an illness, injury or pregnancy, after a ${P.waiting.medical}-day wait, up to ${P.weeks.medical} weeks. Estimate your EDD disability check.`,
  h1: 'California State Disability Insurance in 2026: what EDD disability pays',
  intro: `State Disability Insurance pays California workers who cannot do their usual job because of an illness, an injury or a pregnancy. Enter your pay to see the weekly amount and the total for the weeks you expect to be off.`,
  resume: `California State Disability Insurance, the program people search for as EDD disability, pays between ${K.usd(P.min!)} and ${K.usd(P.max!)} a week in 2026. The amount depends on the quarter of your base period in which you earned the most. A best quarter between ${K.cents(F.rate90QuarterFrom as number)} and ${K.cents(T1 * 13)} is replaced at ${R1} of its weekly average, the quarter divided by thirteen. Between ${K.cents(F.flatBandQuarterFrom as number)} and ${K.cents(F.flatBandQuarterTo as number)} the check is a flat ${K.usd(P.floor!)}, and from ${K.cents(F.rate70QuarterFrom as number)} it is ${R2} of the weekly average up to the cap. A best quarter of ${K.usd(9000)} gives ${K.usd(low.weekly)} a week, ${K.usd(18500)} gives ${K.usd(flat.weekly)} and ${K.usd(30000)} gives ${K.usd(top.weekly)}. The first ${P.waiting.medical} days of a claim are unpaid, and the program pays for up to ${P.weeks.medical} weeks. Workers fund it entirely through a payroll deduction of ${K.pct(P.contrib.rate, 1)} on all wages, with no ceiling.`,
  body: (h) => `
<h2>Who SDI covers</h2>
<p>Disability Insurance replaces part of your wages when a condition keeps you from doing your regular or customary work: a surgery and its recovery, a serious illness, an injury that did not happen on the job, and pregnancy and childbirth. A work injury goes to workers' compensation instead. To qualify you need at least ${K.usd(F.minBasePeriodWages as number)} in wages in your base period, the four quarters the Employment Development Department reads, from which SDI was withheld (${h.src('edd_di', 'EDD')}). A licensed health provider has to certify the disability; the program does not ask you to show that you lost the job.</p>
<p>The name on your pay stub is usually CASDI or SDI. Since ${K.day(F.allWagesSubjectSince as string)} every dollar of wages is subject to it, so high earners pay the deduction on their whole salary, at ${K.pct(P.contrib.rate, 1)} in 2026 (${h.src('edd_rates', 'EDD payroll rates')}). The same deduction funds Paid Family Leave.</p>
${h.mini('leave', { t: 'Your SDI check for a given quarter', p: ['pay', 'hq', 'wk'], d: { prog: 'ca-sdi', lock: 1, pay: 66000, hq: 18500, wk: 10 } })}
<h2>Four bands, one rate for the whole wage</h2>
<p>Unlike the tiered formulas of Washington or Massachusetts, California does not split your wage into slices. It looks up which band your best quarter falls in and applies that band's rule to the whole weekly average.</p>
${h.table(['Best quarter of the base period', 'Weekly benefit'], [
    [`${K.usd(F.minBasePeriodWages as number)} to ${K.cents(F.lowBandQuarterTop as number)}`, K.usd(P.min!)],
    [`${K.cents(F.rate90QuarterFrom as number)} to ${K.cents(T1 * 13)}`, `${R1} of the quarter ÷ 13`],
    [`${K.cents(F.flatBandQuarterFrom as number)} to ${K.cents(F.flatBandQuarterTo as number)}`, K.usd(P.floor!)],
    [`${K.cents(F.rate70QuarterFrom as number)} or more`, `${R2} of the quarter ÷ 13, up to ${K.usd(P.max!)}`],
  ], 'EDD benefit table for claims in 2026.', ['l', 'l'])}
<p>The flat band exists because the law pays the greater of ${R2} of the weekly average or ${K.pct(F.sawwShareFloor as number)} of the state average weekly wage above the ${R1} band (${h.src('edd_forecast', 'EDD fund forecast')}). It keeps someone just over the line from earning less than someone just under it. The cap has climbed each year: ${K.usd(F.max2024 as number)}, then ${K.usd(F.max2025 as number)}, and ${K.usd(P.max!)} for 2026.</p>
<h2>The waiting week and how long SDI lasts</h2>
<p>The first ${P.waiting.medical} days of every new claim are a non-payable waiting period (${h.src('edd_wait', 'EDD payment FAQs')}). A recovery of ${K.num(lv.weeks)} weeks is therefore paid for ${K.dec(lv.paidWeeks)} weeks: at a best quarter of ${K.usd(18500)}, that is ${K.usd(lv.total)}. Benefits stop when your provider says you can return to work, and in any case after ${P.weeks.medical} weeks on one claim.</p>
<h2>Pregnancy, then bonding</h2>
<p>For a birth, SDI pays the weeks your provider certifies before the delivery and the recovery after it. Once that ends, the bonding weeks are paid by ${h.a('california-paid-family-leave', 'California Paid Family Leave')}, from the same wage table and without a second waiting period. The ${h.a('maternity-leave-pay', 'maternity leave pay page')} adds both for a given salary.</p>
<h2>Federal tax on SDI</h2>
<p>Because California funds SDI only from employee deductions, the medical benefits it pays fall under the part of ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')} that excludes benefits attributable to employee contributions from gross income.  Family leave from the same fund is a different matter: PFL is federal taxable income.</p>
`,
  faqs: [
    { q: 'How much does EDD disability pay a week in 2026?', a: `Between ${K.usd(P.min!)} and ${K.usd(P.max!)}. EDD takes your best quarter of the base period, divides it by thirteen and pays ${R1} of that for lower quarters, a flat ${K.usd(P.floor!)} in the middle band, and ${R2} above. A best quarter of ${K.usd(30000)} brings ${K.usd(top.weekly)} a week.` },
    { q: 'Why is the first week of my California SDI claim unpaid?', a: `The law makes the first ${P.waiting.medical} days of each new disability claim a waiting period with no benefit. EDD starts paying on the eighth day. Paid Family Leave, which follows SDI after a birth, has no waiting period, so a mother moving from recovery to bonding does not lose a second week.` },
    { q: 'Do I need to quit my job to get California SDI?', a: 'No. SDI is for workers who are unable to do their regular or customary work for medical reasons; your employment usually continues while you are on leave. Job protection itself comes from other laws, such as the federal FMLA or the California Family Rights Act, depending on your employer size and tenure.' },
    { q: 'Is California SDI taxable by the IRS?', a: 'Generally not, as long as it replaces wages for your own illness or pregnancy. California workers pay the whole SDI contribution themselves, and Revenue Ruling 2025-4 excludes medical leave benefits attributable to employee contributions from gross income. Paid Family Leave, by contrast, is taxable, and EDD reports it on Form 1099-G.' },
  ],
  tool: 'leave', toolArg: { prog: 'ca-sdi', lock: 1, pay: 66000, hq: 18500, wk: 10 },
  related: ['california-paid-family-leave', 'state-disability-insurance', 'maternity-leave-pay', 'is-paid-family-leave-taxable', 'california-unemployment'],
  sources: ['edd_di', 'edd_forecast', 'edd_rates', 'edd_wait', 'edd_integration', 'irs_rr_2025_4'],
});
