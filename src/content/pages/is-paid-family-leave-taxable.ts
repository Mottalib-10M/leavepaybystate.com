import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { PROGRAM_PAGES } from '../../lib/planned';

const RR = (K.P as unknown as { rr2025_4: { effectiveFrom: string; transitionYear: number } }).rr2025_4;
const wh = K.FEDERAL.voluntaryWithholding;
const ca = K.leave('ca-pfl', 70000, 'bonding', 8, 18000);
const wa = K.leave('wa-pfml', 90000, 'bonding', 12);
const tCa = K.taxOn(ca.total, 70000 * (52 - 8) / 52), tWa = K.taxOn(wa.total, 90000 * 40 / 52);
const Pg = K.Pg;
const pct = (x: number, d = 0) => K.pct(x, d);
const rows: Array<[string, string, string]> = [
  ['ca-sdi', 'Workers only, through the SDI deduction', 'Excluded'],
  ['ri-tdi', 'Workers only', 'Excluded'],
  ['ct-pl', 'Workers only', 'Excluded'],
  ['wa-pfml', `Workers pay ${pct(Pg('wa-pfml').facts!.employeeSharePremium as number, 2)} of the premium`, 'Mostly excluded'],
  ['or-pl', `Workers pay ${pct(Pg('or-pl').facts!.employeeShare as number)} of the contribution`, 'Mostly excluded'],
  ['co-famli', 'Shared evenly with employers', 'Half taxable'],
  ['mn-pl', 'Employers pay at least half', 'At least half taxable'],
  ['de-pl', 'Employers pay at least half', 'At least half taxable'],
  ['me-pfml', 'Workers pay at most half', 'At least half taxable'],
  ['ma-pfml', `Workers pay up to ${pct(Pg('ma-pfml').facts!.employeeMedicalShare as number)} of the medical part`, 'Mostly taxable'],
  ['dc-pfl', 'Employers only', 'Taxable'],
];

export default definePage({
  id: 'is-paid-family-leave-taxable', group: 'guides', order: 301, slug: 'is-paid-family-leave-taxable',
  nav: 'Is paid family leave taxable?', card: 'Family leave is federal income since Rev. Rul. 2025-4; medical leave is taxed only for the part your employer paid for.',
  title: 'Paid Family Leave Tax 2026: What Rev. Rul. 2025-4 Means',
  description: 'Paid family leave tax in 2026: state family leave benefits are federal income, medical leave is excluded for the share funded by employee premiums. Estimate it.',
  h1: 'Is paid family leave taxable? The federal rule since Rev. Rul. 2025-4',
  intro: `The IRS settled the question in Revenue Ruling 2025-4: family leave from a state program is taxable, while medical leave depends on who paid the premiums. Enter your benefits to estimate the tax.`,
  resume: `Under Revenue Ruling 2025-4, effective for payments made on or after ${K.day(RR.effectiveFrom)}, state paid family leave benefits are included in federal gross income in full. This covers bonding with a new child and caring for a seriously ill relative, in every state program. Medical leave for your own health is treated differently: it is excluded from income to the extent it is attributable to your own contributions, and taxable to the extent it comes from employer contributions that were not taxed to you. California's SDI, Rhode Island's TDI and Connecticut's program are funded by workers, so their medical benefits fall mostly or entirely on the excluded side; DC's program is funded by employers alone, so its medical benefits are taxable. ${RR.transitionYear} was a transition year, and 2026 is the first year of full application. As with unemployment, nothing is withheld unless you ask. ${K.num(ca.weeks)} weeks of California family leave at ${K.usd(ca.weekly)} a week add about ${K.usd(tCa)} of federal tax for a single filer earning ${K.usd(70000)}.`,
  body: (h) => `
<h2>What the ruling says</h2>
<p>Revenue Ruling 2025-4 works through the example of a state paid family and medical leave law (${h.src('irs_rr_2025_4', 'IRS, Rev. Rul. 2025-4')}). Family leave benefits paid by the state to an employee are included in the employee's federal gross income. Medical leave benefits are excluded under section 104(a)(3) of the tax code, except to the extent they are attributable to employer contributions that were not included in the employee's income. The ruling applies to payments made on or after ${K.day(RR.effectiveFrom)}, with ${RR.transitionYear} treated as a transition period for states and employers adjusting their reporting.</p>
<p>The logic is the one used for any disability insurance: a benefit bought with after-tax money of your own is not taxed again, a benefit bought by your employer with untaxed money is. Family leave does not qualify for that exclusion at all, because it does not compensate for your own injury or sickness.</p>
${h.mini('tax', { t: 'Tax on your family leave', p: ['amt', 'oth', 'fs'], d: { kind: 'family', amt: 9000, oth: 50000 } })}
<h2>Medical leave, program by program</h2>
<p>The share of a medical benefit that is taxable follows the share of the premium the employer paid. The table summarizes funding as read on the agency pages; the statement your state or plan sends at year end gives the figure to use.</p>
${h.table(['Program', 'Who funds the premium', 'Medical benefit, federal tax'], rows.map(([id, who, tax]) => [h.a(PROGRAM_PAGES[id], (['SDI', 'TDI', 'PFML', 'FAMLI', 'PFL'].includes(Pg(id).short) ? `${K.S(Pg(id).state).name} ${Pg(id).short}` : Pg(id).short)), who, tax]), 'Federal tax on state medical leave benefits under Rev. Rul. 2025-4, by funding. Family leave benefits are taxable in every program.', ['l', 'l', 'l'])}
<p>New York, New Jersey and Hawaii collect an employee deduction for disability coverage, but the employer's share of the cost was not read on the pages this site relies on, so they are left out of the table. Their benefits are excluded for the part matching the worker's deductions.</p>
<h2>Family leave: two examples</h2>
<p>A single parent earning ${K.usd(70000)} who takes ${K.num(ca.weeks)} weeks of ${h.a('california-paid-family-leave', 'California Paid Family Leave')} receives about ${K.usd(ca.total)}. Added to the wages of the rest of the year, that adds roughly ${K.usd(tCa)} of federal income tax. In ${h.a('washington-paid-family-leave', 'Washington')}, ${K.num(wa.weeks)} weeks of bonding for someone earning ${K.usd(90000)} pay about ${K.usd(wa.total)}, which adds about ${K.usd(tWa)}. In both cases, if nothing was withheld, the tax is due at filing time.</p>
<h2>Withholding and forms</h2>
<p>State programs report the benefits on Form 1099-G or a similar statement. Nothing is withheld unless you ask your program, and not every program offers it; for unemployment the voluntary rate is ${K.pct(wh)}, set by Form W-4V (${h.src('irs_w4v', 'Form W-4V')}). If your year includes a full salary as well as the leave, a flat rate may fall short of your bracket. Raising withholding at work for the rest of the year, or paying estimated tax, covers the gap.</p>
<h2>State income tax</h2>
<p>The ruling is federal only. State treatment varies: New Jersey lists Family Leave Insurance benefits among the income residents do not report on the state return (${h.src('nj_1040i', 'NJ-1040 instructions')}). Washington has no individual income tax at all (${h.src('wa_dor', 'Washington DOR')}). For other states, check the state's own instructions.</p>
<h2>What this means for planning</h2>
<p>Count the federal tax when you compare leave with pay. A family leave check of a given size is worth less after tax than an excluded medical benefit of the same size. For unemployment, the rule is simpler: all of it is taxable, as the ${h.a('are-unemployment-benefits-taxable', 'unemployment tax page')} explains. The ${h.a('paid-family-leave', 'paid family leave comparison')} lists the weekly amounts before tax.</p>
`,
  faqs: [
    { q: 'Is state paid family leave taxable income in 2026?', a: `Yes. Under Revenue Ruling 2025-4, family leave benefits from a state program, for bonding with a child or caring for a relative, are included in federal gross income. The rule applies to payments made on or after ${K.day(RR.effectiveFrom)}. Nothing is withheld unless you request it from your program, so set money aside.` },
    { q: 'Is state medical leave or disability pay taxable?', a: 'Only in part, depending on who paid the premiums. The share attributable to your own contributions is excluded from income; the share attributable to employer contributions that were not taxed to you is taxable. A program funded entirely by workers, such as California SDI, therefore produces benefits that are generally not taxable.' },
    { q: 'Why is paid family leave taxed but not medical leave?', a: 'Because the federal exclusion for health and accident benefits covers payments for your own injury or sickness. A medical leave benefit replaces wages lost to your own illness, so the part you paid for is excluded. Family leave compensates for time spent with a child or a relative, which is not your own sickness.' },
    { q: 'Does Rev. Rul. 2025-4 change how unemployment is taxed?', a: 'No. The ruling deals only with state paid family and medical leave. Unemployment compensation was already fully taxable and remains so: it is reported on Form 1099-G, added to your income and taxed at ordinary rates, with an optional flat withholding through Form W-4V.' },
  ],
  tool: 'tax', toolArg: { kind: 'family', amt: 9000, oth: 50000 },
  related: ['are-unemployment-benefits-taxable', 'paid-family-leave', 'state-disability-insurance', 'maternity-leave-pay', 'california-paid-family-leave'],
  sources: ['irs_rr_2025_4', 'irs_rp_2025_32', 'irs_w4v', 'nj_1040i', 'wa_dor', 'edd_rates', 'ri_tax', 'ct_contrib', 'wa_premium', 'or_employers', 'co_calc', 'mn_rate', 'de_code', 'me_faq', 'ma_rates', 'dc_fund'],
});
