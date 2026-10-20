import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('ca-pfl');
const lo = K.pw('ca-pfl', 40000, 10000), mid = K.pw('ca-pfl', 70000, 18000), hi = K.pw('ca-pfl', 100000, 26000);
const lv = K.leave('ca-pfl', 70000, 'bonding', 8, 18000);
const th = K.th('CA', 70000);
const T1 = P.tiers![0][0]!;

export default definePage({
  id: 'california-paid-family-leave', group: 'leave', order: 210, slug: 'california-paid-family-leave', prog: 'ca-pfl',
  nav: 'California Paid Family Leave', card: `90% or 70% of your best quarter ÷ 13, up to ${K.usd(P.max!)} a week for 8 weeks.`,
  title: 'California Paid Family Leave 2026: Weekly Pay, 8 Weeks',
  description: `California Paid Family Leave in 2026: 90% or 70% of your weekly wage from the best quarter, ${K.usd(P.min!)} to ${K.usd(P.max!)} a week for up to 8 weeks. See your amount here.`,
  h1: 'California Paid Family Leave in 2026: your weekly benefit',
  intro: `PFL pays up to eight weeks to bond with a new child or care for a seriously ill relative, between ${K.usd(P.min!)} and ${K.usd(P.max!)} a week in 2026. Enter your pay and the weeks you need.`,
  resume: `California Paid Family Leave replaces 90% of the weekly wage of lower earners and 70% for everyone else, using the quarter of your base period in which you earned the most, divided by thirteen. In 2026 the 90% rate applies when that quarter is ${K.cents(T1 * 13)} or less; between that and ${K.cents(20931.30)} the benefit is a flat ${K.usd(P.floor!)}; above, it is 70% up to the maximum of ${K.usd(P.max!)} a week, reached with a best quarter of about ${K.usd(P.max! / 0.7 * 13)}. Someone who earned ${K.usd(10000)} in the best quarter gets ${K.usd(lo.weekly)} a week, ${K.usd(18000)} brings ${K.usd(mid.weekly)}, and ${K.usd(26000)} brings ${K.usd(hi.weekly)}. Benefits run for up to eight weeks in a twelve-month period, with no waiting week, so eight weeks at ${K.usd(lv.weekly)} pay ${K.usd(lv.total)}. The program is funded by the State Disability Insurance deduction of ${K.pct(K.Pg('ca-sdi').contrib.rate, 1)} on all wages, and PFL is federal taxable income.`,
  body: (h) => `
<h2>Which rate you get</h2>
<p>The Employment Development Department publishes PFL as a table of bands rather than as tiers. Your whole weekly wage, the best quarter divided by thirteen, falls in one band and is replaced at that band's rate. Up to a best quarter of ${K.cents(T1 * 13)}, the rate is 90%. The next band pays a flat ${K.usd(P.floor!)}, which is what 70% of the band's upper end produces, so nobody loses money by crossing the line. Above ${K.cents(20931.30)} in the best quarter, the rate is 70% until the cap of ${K.usd(P.max!)}. The same table applies to State Disability Insurance (${h.src('edd_di', 'EDD benefit table')}).</p>
<p>These bands apply to claims since January 1, 2025, so guides written before then quote lower rates. The 2026 cap of ${K.usd(P.max!)} comes from the ${h.src('edd_forecast', 'EDD fund forecast of May 2026')}.</p>
${h.mini('leave', { t: 'Your California PFL check', p: ['pay', 'hq'], d: { prog: 'ca-pfl', lock: 1, pay: 70000, hq: 18000, wk: 8 } })}
<h2>Eight weeks, used how you need them</h2>
<p>PFL pays up to eight weeks in any twelve-month period, for bonding with a child in the first year after birth, adoption or foster placement, for caring for a seriously ill family member, or for a family member's military deployment. The weeks can be taken in one block or by days. There is no unpaid waiting week for PFL (${h.src('edd_integration', 'EDD')}), unlike disability, which starts after seven days.</p>
<p>For a birth, the usual sequence is disability first, typically up to four weeks before the due date and six or eight weeks after, then PFL for bonding. The ${h.a('maternity-leave-pay', 'maternity leave page')} adds the two for your pay, and the ${h.a('california-sdi', 'California SDI page')} gives the disability side.</p>
<h2>PFL does not protect your job</h2>
<p>PFL pays a benefit; it does not hold your position. Job protection comes from the California Family Rights Act or the federal FMLA, depending on your employer and your tenure. Ask your employer which law covers your leave before you file. The ${h.a('fmla-vs-paid-leave', 'FMLA and paid leave page')} explains the difference.</p>
<h2>Against your take-home pay</h2>
<p>At ${K.usd(70000)} a year, a single filer takes home about ${K.usd(th.net)} a week after federal income tax, Social Security, Medicare and the SDI deduction, before California income tax. A PFL check of ${K.usd(lv.weekly)} replaces ${K.pct(lv.weekly / th.net)} of it before federal tax. Under ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}, state family leave benefits are included in federal gross income.</p>
`,
  faqs: [
    { q: 'How much is California Paid Family Leave in 2026?', a: `Between ${K.usd(P.min!)} and ${K.usd(P.max!)} a week. Lower earners receive 90% of their weekly wage, measured as the best quarter of the base period divided by thirteen; others receive 70%, with a flat ${K.usd(P.floor!)} band in between. At ${K.usd(18000)} in the best quarter, the benefit is ${K.usd(mid.weekly)} a week.` },
    { q: 'How many weeks of PFL can I take in California?', a: 'Up to eight weeks in a twelve-month period, for bonding with a new child, caring for a seriously ill family member or a military family need. The weeks can be split into days. Two parents can each claim their own eight weeks for the same child, from their own wages.' },
    { q: 'Is there a waiting period for California PFL?', a: 'No. Paid Family Leave is payable from the first day of leave. The seven-day waiting period applies to State Disability Insurance, the program that pays during pregnancy and recovery from childbirth, not to the bonding weeks that follow, which are paid from the first day.' },
    { q: 'Do I pay federal tax on California PFL?', a: 'Yes. Since 2025 the IRS treats state family leave benefits as gross income, reported on Form 1099-G. California does not withhold federal tax unless you ask. Disability insurance is treated differently, because it is funded entirely by employee contributions in California.' },
  ],
  tool: 'leave', toolArg: { prog: 'ca-pfl', lock: 1, pay: 70000, hq: 18000, wk: 8 },
  related: ['california-sdi', 'maternity-leave-pay', 'paid-family-leave', 'is-paid-family-leave-taxable', 'california-unemployment'],
  sources: ['edd_pfl', 'edd_di', 'edd_forecast', 'edd_integration', 'edd_rates', 'irs_rr_2025_4'],
});
