import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { PROGRAM_PAGES } from '../../lib/planned';

const PAY = 56000;
type Pr = (typeof K.PROGRAMS)[number];
const med = K.PROGRAMS.filter((p) => p.status === 'paying' && (p.weeks.medical ?? 0) > 0);
const tdi = med.filter((p) => p.kind === 'medical');
const pfml = med.filter((p) => p.kind === 'both');
const GEN = ['PFL', 'SDI', 'TDI', 'DBL', 'FLI', 'TCI', 'PFML', 'FAMLI'];
const nm = (p: Pr) => (GEN.includes(p.short) ? `${K.S(p.state).name} ${p.short}` : p.short);
const at = med.map((p) => ({ p, w: K.pw(p.id, PAY).weekly })).sort((a, b) => b.w - a.w);
const longest = med.reduce((a, p) => (p.weeks.medical! > a.weeks.medical! ? p : a));
const waiting = med.filter((p) => (p.waiting.medical ?? 0) > 0);
const CA = K.Pg('ca-sdi'), NY = K.Pg('ny-dbl'), NJ = K.Pg('nj-tdi'), DE = K.Pg('de-pl');
const caLv = K.leave('ca-sdi', PAY, 'medical', 6), njLv = K.leave('nj-tdi', PAY, 'medical', 6);

export default definePage({
  id: 'state-disability-insurance', group: 'leave', order: 201, slug: 'state-disability-insurance',
  nav: 'State disability insurance', card: `The states that pay when you cannot work because of illness, injury or pregnancy: SDI and TDI, and the medical side of paid leave.`,
  title: 'State Disability Insurance 2026: SDI and TDI by State',
  description: `State disability insurance in 2026: weekly caps, weeks and waiting periods in the ${tdi.length} TDI programs and the ${pfml.length} paid leave programs that pay for your own illness.`,
  h1: 'State disability insurance in 2026: short-term disability pay by state',
  intro: `A handful of states pay part of your wages when an illness, an injury off the job or a pregnancy keeps you from working. Choose a program in the calculator and enter your pay.`,
  resume: `State disability insurance pays a weekly benefit when a non-work illness, injury or pregnancy keeps you off the job. The older programs, known as SDI or TDI, exist in ${tdi.length} states: ${tdi.map((p) => K.S(p.state).name).join(', ')}. Beside them, the paid family and medical leave programs of ${pfml.map((p) => K.S(p.state).name).join(', ')} have added medical leave for your own serious health condition. The benefits differ sharply. At ${K.usd(PAY)} a year of steady pay, the weekly amount runs from ${K.usd(at[at.length - 1].w)} under ${nm(at[at.length - 1].p)} to ${K.usd(at[0].w)} under ${nm(at[0].p)}. ${nm(longest)} pays for the longest, up to ${longest.weeks.medical} weeks, while ${nm(DE)} stops at ${DE.weeks.medical} weeks every ${DE.facts!.limitedLeavePeriodMonths} months. Each of the older programs starts with ${CA.waiting.medical} unpaid days. Outside these states, disability pay comes only from an employer's short-term disability plan. Benefits funded by your own contributions are generally excluded from federal income.`,
  body: (h) => `
<h2>Two generations of programs</h2>
<p>The older programs, ${tdi.map((p) => h.a(PROGRAM_PAGES[p.id], nm(p))).join(', ')}, insure only your own health. Family leave exists there as a separate benefit in California, New York, New Jersey and Rhode Island, while Hawaii has none. The newer programs, starting with ${h.a('washington-paid-family-leave', 'Washington')}, cover medical and family leave in one law, with one formula and often one combined limit on weeks.</p>
<p>For a worker the difference shows up in the details. A TDI program can pay many more weeks for an illness; a newer program pays fewer weeks but often a higher share of wages, and its medical weeks may reduce the family weeks left for the year.</p>
${h.table(['Program', 'Weekly maximum', 'Weeks for your own health', 'Unpaid days first', `At ${K.usd(PAY)} a year`], med.map((p) => [
    PROGRAM_PAGES[p.id] ? h.a(PROGRAM_PAGES[p.id], nm(p)) : nm(p),
    K.cents(p.max!),
    String(p.weeks.medical),
    p.waiting.medical ? String(p.waiting.medical) : (p.waiting.medical === 0 ? '0' : 'not stated'),
    K.usd(K.pw(p.id, PAY).weekly),
  ]), 'Disability and medical leave benefits, 2026. "Not stated" means no waiting period was read on the agency pages.', ['l', 'r', 'r', 'r', 'r'])}
${h.mini('leave', { t: 'Disability pay in another state', p: ['prog', 'pay', 'wk'], d: { prog: 'nj-tdi', pay: PAY, why: 'medical', wk: 6 } })}
<h2>The waiting week</h2>
<p>${waiting.map((p) => nm(p)).join(', ')} withhold the first ${CA.waiting.medical} days of a medical claim. For a short illness that is a large share of the benefit. New Jersey softens the rule by paying the waiting week once the disability passes ${NJ.facts!.waitingPaidIfLeaveDays} days. Over ${K.num(caLv.weeks)} weeks at ${K.usd(PAY)}, California's SDI pays ${K.usd(caLv.total)} and New Jersey's TDI about ${K.usd(njLv.weekly * njLv.weeks)} once its waiting week is paid back.</p>
<h2>New York, the outlier</h2>
<p>New York's Disability Benefits Law pays half of wages up to ${K.usd(NY.max!)} a week, a cap so low that it applies to almost every full-time worker. The state's family leave pays far more than its disability benefit, the reverse of most states. Some New York employers buy richer plans; the ${h.a('ny-disability-benefits', 'New York DBL page')} explains how to check.</p>
<h2>Pregnancy is a disability</h2>
<p>Every program on this page treats pregnancy and recovery from childbirth as a disability or a serious health condition when a provider certifies it. That makes the disability program the first source of pay around a birth, followed by family leave for bonding. The ${h.a('maternity-leave-pay', 'maternity leave pay page')} adds the two state by state, including the extra weeks some programs grant for pregnancy complications.</p>
<h2>Not workers' compensation, not SSDI</h2>
<p>State disability insurance covers conditions that are not caused by your job; a work injury is a workers' compensation claim. It is also short term, measured in weeks, unlike federal Social Security disability, which pays for long-term disability under its own strict rules. Unemployment is a third, separate program, for people able to work: you cannot claim it for the same weeks as disability. See the ${h.a('unemployment-calculator', 'unemployment calculator')} for that side.</p>
<h2>If your state has no program</h2>
<p>In most states there is no public disability benefit at all. Pay during an illness then depends on paid sick days, accrued vacation and any short-term disability insurance offered at work, which is a private contract with its own waiting period, share of salary and length. Read the plan summary before you need it, and note who pays the premium: that decides how the benefit is taxed. The federal FMLA may still protect the job of an eligible worker, without pay.</p>
<h2>Federal tax on disability benefits</h2>
<p>Under ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}, state medical leave benefits are excluded from gross income to the extent they are attributable to employee contributions, and taxable to the extent they come from employer contributions that were not taxed to you. California's SDI, funded only by workers, falls on the excluded side. The ${h.a('is-paid-family-leave-taxable', 'paid leave tax page')} goes through the split.</p>
`,
  faqs: [
    { q: 'Which states have state disability insurance in 2026?', a: `${tdi.map((p) => K.S(p.state).name).join(', ')} run temporary disability programs. In addition, the paid leave programs of ${pfml.map((p) => K.S(p.state).name).join(', ')} pay medical leave for your own serious health condition. Elsewhere, only an employer plan pays.` },
    { q: 'How long does state disability insurance last?', a: `It depends on the program: up to ${CA.weeks.medical} weeks in California, ${NY.weeks.medical} in New York, ${NJ.weeks.medical} in New Jersey, ${K.Pg('ri-tdi').weeks.medical} in Rhode Island, ${K.Pg('ma-pfml').weeks.medical} for medical leave in Massachusetts, and ${DE.weeks.medical} weeks every ${DE.facts!.limitedLeavePeriodMonths} months in Delaware. Benefits stop sooner once a provider certifies you able to work.` },
    { q: 'Can I get state disability and unemployment at the same time?', a: 'No. Disability insurance pays people who cannot work, and unemployment pays people who are able and available to work. A worker can move from one to the other, for example from disability after an illness to unemployment if the job has ended and the worker is ready to take a new one.' },
  ],
  tool: 'leave', toolArg: { prog: 'ca-sdi', pay: PAY, why: 'medical', wk: 6 },
  related: ['california-sdi', 'nj-temporary-disability', 'ny-disability-benefits', 'rhode-island-tdi', 'hawaii-tdi', 'maternity-leave-pay'],
  sources: ['edd_di', 'edd_wait', 'wcb_dbl', 'nj_tdi', 'nj_wait', 'ri_faq', 'hi_tdi', 'ma_pfml', 'de_labor', 'irs_rr_2025_4'],
});
