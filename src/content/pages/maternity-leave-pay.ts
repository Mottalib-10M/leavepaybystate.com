import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { PROGRAM_PAGES } from '../../lib/planned';

const PAY = 60000, PRE = 4, POST = 6, MW = PRE + POST;
type Pr = (typeof K.PROGRAMS)[number];
const paying = K.PROGRAMS.filter((p) => p.status === 'paying');
const states = [...new Set(paying.map((p) => p.state))];
/** Weeks limit for pregnancy, recovery and bonding together, where one program pays both and states a limit. */
const limitOf = (p: Pr) => (p.id === 'or-pl' ? p.weeks.pregnancy : p.weeks.combined ?? (p.id === 'dc-pfl' ? undefined : Math.max(p.weeks.medical ?? 0, p.weeks.bonding ?? 0)));
const plan = states.map((code) => {
  const ps = K.inState(code).filter((p) => p.status === 'paying');
  const med = ps.find((p) => (p.weeks.medical ?? 0) > 0), bond = ps.find((p) => (p.weeks.bonding ?? 0) > 0);
  const same = !!med && !!bond && med.id === bond.id;
  const limit = same ? limitOf(bond!) : undefined;
  const m = med ? K.leave(med.id, PAY, 'medical', MW) : null;
  let bw = bond ? bond.weeks.bonding! : 0;
  if (limit !== undefined && m) bw = Math.max(0, Math.min(bw, limit - m.weeks));
  const b = bond && bw > 0 ? K.leave(bond.id, PAY, 'bonding', bw) : null;
  return { code, med, bond, same, limit, m, b, bw, total: (m?.total ?? 0) + (b?.total ?? 0), open: same && limit === undefined };
});
const ok = plan.filter((x) => !x.open && x.bond);
const best = ok.reduce((a, x) => (x.total > a.total ? x : a));
const lowest = ok.reduce((a, x) => (x.total < a.total ? x : a));
const ca = plan.find((x) => x.code === 'CA')!, wa = plan.find((x) => x.code === 'WA')!;
const extra = paying.filter((p) => p.weeks.pregnancy);

export default definePage({
  id: 'maternity-leave-pay', group: 'guides', order: 302, slug: 'maternity-leave-pay',
  nav: 'Maternity leave pay by state', card: 'What a state pays around a birth: disability for pregnancy and recovery, then family leave for bonding, added up state by state.',
  title: 'Maternity Leave Pay 2026: Disability Plus Bonding by State',
  description: 'Maternity leave pay in 2026: disability benefits for pregnancy and recovery, then paid family leave for bonding, added up in every state that pays them.',
  h1: 'Maternity leave pay in 2026: what each state pays around a birth',
  intro: `A birth usually draws on two benefits: disability pay for the end of pregnancy and recovery, then family leave to bond with the baby. Choose your state and enter your pay and the weeks your provider certifies.`,
  resume: `In the United States, maternity leave pay comes from state programs, not from federal law, and only in the states that run them. A birth parent usually receives two benefits in a row: a disability or medical leave benefit for the weeks a provider certifies before and after the delivery, then family leave for bonding. With ${K.usd(PAY)} of steady pay and ${MW} weeks of certified disability, for example ${PRE} before and ${POST} after the birth, the total runs from about ${K.usd(lowest.total)} in ${K.S(lowest.code).name} to ${K.usd(best.total)} in ${K.S(best.code).name}. California pays ${K.usd(ca.total)}: ${K.usd(ca.m!.total)} of SDI after a ${K.Pg('ca-sdi').waiting.medical}-day wait, then ${ca.bw} weeks of family leave. Where one program pays both and caps weeks for all reasons, the bonding time shrinks: in Washington, the combined limit of ${K.Pg('wa-pfml').weeks.combined} weeks leaves ${wa.bw} weeks of bonding after ${MW} medical weeks. Hawaii pays the disability part only. Bonding benefits are federal taxable income; the disability part is excluded for the share you funded.`,
  body: (h) => `
<h2>Two benefits, one after the other</h2>
<p>Pregnancy and childbirth count as a disability, or a serious health condition, in every state program. The weeks your provider certifies, typically some time before the due date and a recovery period after it, are paid by the disability side: ${h.a('california-sdi', 'SDI in California')}, TDI in ${h.a('nj-temporary-disability', 'New Jersey')}, ${h.a('rhode-island-tdi', 'Rhode Island')} and ${h.a('hawaii-tdi', 'Hawaii')}, ${h.a('ny-disability-benefits', 'DBL in New York')}, or the medical leave of a combined program. Once recovery ends, bonding with the baby is family leave. The other parent has no disability period, but can usually claim bonding weeks on their own wages.</p>
${h.mini('baby', { t: 'Your birth, your state', p: ['st', 'pay', 'pre', 'post'], d: { st: 'NJ', pay: PAY, pre: PRE, post: POST } })}
<h2>State by state at ${K.usd(PAY)} a year</h2>
${h.table(['State', 'Pregnancy and recovery', 'Bonding', 'Limit for both', 'Total'], plan.map((x) => [
    K.S(x.code).name,
    x.m ? `${x.med!.short}: ${K.usd(x.m.total)} for ${K.num(x.m.weeks)} wk` : 'no state program',
    x.b ? `${x.bond!.short}: ${K.usd(x.b.total)} for ${K.num(x.bw)} wk` : x.bond ? 'none left' : 'no state program',
    x.limit !== undefined ? `${x.limit} weeks` : x.open ? 'see program page' : 'separate programs',
    x.open ? `${K.usd(x.total)}, if both apply` : K.usd(x.total),
  ]), `${MW} weeks of certified pregnancy disability, then the bonding weeks left, with ${K.usd(PAY)} of steady pay. Waiting periods are deducted.`, ['l', 'l', 'l', 'l', 'r'])}
<p>The states where one law pays both medical and family leave are the ones to read closely. ${K.S('MA').name}'s limit of ${K.Pg('ma-pfml').weeks.combined} weeks leaves room for a full recovery and full bonding; ${K.S('DE').name} pays only ${K.Pg('de-pl').weeks.medical} medical weeks and ${K.Pg('de-pl').weeks.combined} weeks in all. Where disability and family leave are separate programs, as in California, New York, New Jersey and Rhode Island, each has its own maximum; Rhode Island counts its caregiver weeks inside the ${K.Pg('ri-tdi').weeks.medical} weeks of its benefit year. For DC, the ${h.a('dc-paid-family-leave', 'DC page')} lists the leave types; how they combine around a birth was not read on the agency pages, so the total assumes both apply.</p>
<h2>Extra weeks for complications</h2>
<p>Several programs add weeks when pregnancy or childbirth causes complications or incapacity: ${extra.map((p) => `${h.a(PROGRAM_PAGES[p.id], K.S(p.state).name)} up to ${p.weeks.pregnancy}`).join(', ')}. Oregon extends its limit for anyone pregnant or who gave birth in the past year, which the table includes; elsewhere the extra weeks require a certified complication and are not counted above.</p>
<h2>Pay in the quarters before the birth</h2>
<p>Every amount above assumes steady pay. California, Rhode Island and Minnesota compute the benefit from your best quarter, Washington, Massachusetts and Colorado from your two best, and New York from your most recent weeks. A parent who cut hours late in the pregnancy, or who started a new job during the year, can receive less than these figures; one who had a strong quarter can receive more. Enter your best quarter under More options in the calculator to see the difference. Adoptive and foster parents, and the parent who did not give birth, have no disability period: their benefit is the bonding column alone, on their own wages.</p>
<h2>Job protection is a separate question</h2>
<p>None of these benefits hold your job by themselves. The federal FMLA protects up to twelve weeks for eligible employees, and some state laws add more; the ${h.a('fmla-vs-paid-leave', 'FMLA and paid leave page')} explains who is covered. Check with your employer before the birth which law applies and whether an employer policy pays on top of the state benefit.</p>
<h2>Tax on the two parts</h2>
<p>The bonding benefit is federal taxable income under ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}. The disability part is excluded to the extent it comes from your own contributions, which makes worker-funded programs such as California's SDI and Rhode Island's TDI largely tax free, and taxable for the share funded by an employer. The ${h.a('is-paid-family-leave-taxable', 'paid leave tax page')} goes through the split.</p>
`,
  faqs: [
    { q: 'Which states pay maternity leave in 2026?', a: `${states.filter((c) => plan.find((x) => x.code === c)!.bond).map((c) => K.S(c).name).join(', ')} pay both disability for the birth and bonding leave. Hawaii pays disability only. In other states, maternity leave is paid only through an employer policy or a private disability plan.` },
    { q: 'How much maternity leave pay will I get in California?', a: `At ${K.usd(PAY)} a year, about ${K.usd(ca.total)} for ${MW} weeks of disability and ${ca.bw} weeks of bonding. SDI pays ${K.usd(ca.m!.weekly)} a week after a ${K.Pg('ca-sdi').waiting.medical}-day wait, and Paid Family Leave pays the same weekly amount with no wait. A higher best quarter raises both.` },
    { q: 'Does maternity disability leave reduce my bonding weeks?', a: `Only in programs that cap all reasons together. In Washington, medical and family leave share a limit of ${K.Pg('wa-pfml').weeks.combined} weeks, so ${MW} weeks of recovery leave ${wa.bw} weeks of bonding. In California and New Jersey, disability and family leave are separate programs, each with its own maximum, so recovery weeks do not reduce bonding weeks.` },
  ],
  tool: 'baby', toolArg: { st: 'CA', pay: PAY, pre: PRE, post: POST },
  related: ['paid-family-leave', 'state-disability-insurance', 'california-sdi', 'washington-paid-family-leave', 'fmla-vs-paid-leave', 'is-paid-family-leave-taxable'],
  sources: ['edd_di', 'edd_pfl', 'wcb_dbl', 'nypfl_2026', 'nj_tdi', 'nj_fli', 'ri_faq', 'hi_tdi', 'wa_how', 'ma_pfml', 'ct_how', 'or_faq', 'co_faq', 'mn_poster', 'de_labor', 'me_850b', 'dc_updates', 'irs_rr_2025_4'],
});
