import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const PAY = 65000;
const paying = K.PROGRAMS.filter((p) => p.status === 'paying' && (p.weeks.bonding ?? 0) > 0);
const states = [...new Set(paying.map((p) => p.state))].map((c) => K.S(c).name);
const ny = K.leave('ny-pfl', PAY, 'bonding', 12), ma = K.leave('ma-pfml', PAY, 'bonding', 12), de = K.leave('de-pl', PAY, 'bonding', 12);
const th = K.th('NY', PAY);
const DE = K.Pg('de-pl'), MD = K.Pg('md-famli'), NJ = K.Pg('nj-tdi'), RI = K.Pg('ri-tdi');

export default definePage({
  id: 'fmla-vs-paid-leave', group: 'guides', order: 303, slug: 'fmla-vs-paid-leave',
  nav: 'FMLA vs paid leave', card: 'The FMLA holds your job without pay; state programs pay without always holding your job. How the two fit together in 2026.',
  title: 'FMLA vs Paid Leave 2026: Job Protection or a Weekly Check',
  description: 'FMLA vs paid leave in 2026: the federal FMLA gives 12 weeks of unpaid, job-protected leave; state programs pay a weekly check. Who gets which, how they combine.',
  h1: 'FMLA vs paid family leave: protection and pay are two different things',
  intro: `The Family and Medical Leave Act keeps your job open but pays nothing. State paid leave programs pay a weekly benefit but, in most states, do not by themselves hold your job. Pick a program to see what it pays.`,
  resume: `The FMLA and state paid leave answer two different questions. The federal Family and Medical Leave Act gives eligible employees up to 12 weeks of unpaid, job-protected leave in a 12-month period for a birth or adoption, a serious health condition of their own or of a close family member. To be eligible, you must work for an employer with at least 50 employees, have worked there for 12 months and have at least 1,250 hours in the past year. The FMLA pays nothing. State programs do the reverse: they pay a weekly benefit, funded by payroll premiums, in ${states.join(', ')}, and most do not hold your job by themselves. With ${K.usd(PAY)} of steady pay, twelve weeks of bonding pay about ${K.usd(ny.total)} in New York, ${K.usd(ma.total)} in Massachusetts and ${K.usd(de.total)} in Delaware. A worker who qualifies for both usually takes them at the same time, so the leave is protected and paid. A worker who qualifies for neither is left with the employer's own policy.`,
  body: (h) => `
<h2>What the FMLA does</h2>
<p>The FMLA is a federal labor law. It lets an eligible employee take up to 12 workweeks of leave in a 12-month period and return to the same or an equivalent job, with group health coverage maintained during the leave. The reasons are the birth of a child and bonding with the newborn, adoption or foster placement, the employee's own serious health condition, and care for a spouse, child or parent with a serious health condition. Military family situations have their own rules. The leave can be taken in one block or, for medical reasons, intermittently.</p>
<p>The FMLA does not pay wages. An employer may require or allow you to use accrued paid leave at the same time, but the law itself guarantees only that the job is there when you come back.</p>
<h2>Who the FMLA covers, and who it leaves out</h2>
<p>Eligibility has three conditions: an employer with 50 or more employees, at least 12 months with that employer, and at least 1,250 hours worked in the 12 months before the leave. Many workers miss one of them: employees of small businesses, people in their first year on a job, and part-time workers below the hours threshold. Those workers have no federal job protection even if a state program pays them.</p>
${h.mini('leave', { t: 'What a state program pays for the same weeks', p: ['prog', 'pay', 'why', 'wk'], d: { prog: 'ma-pfml', pay: PAY, why: 'bonding', wk: 12 } })}
<h2>What state programs do differently</h2>
<p>State programs pay; they do not depend on employer size; and most measure eligibility with wages rather than hours with one employer. New Jersey looks for ${NJ.facts!.eligWeeks} base-year weeks paid at least ${K.usd(NJ.facts!.eligWeeklyEarnings as number)} or ${K.usd(NJ.facts!.eligBaseYearTotal as number)} in total, and Rhode Island for ${K.usd(RI.facts!.eligBasePeriodWages as number)} of base-period wages. ${h.a('delaware-paid-leave', 'Delaware')} is the exception: its test of ${DE.facts!.eligMonths} months and ${K.num(DE.facts!.eligHours as number)} hours with a single employer mirrors the FMLA. ${h.a('maryland-paid-family-leave', 'Maryland')}, which pays from ${K.day(MD.start!)}, will ask for ${K.num(MD.facts!.eligHours as number)} hours in the state.</p>
<p>The weekly amount is a share of wages up to a cap: ${K.usd(ny.weekly)} a week at ${K.usd(PAY)} in New York, ${K.pct(ny.weekly / th.net)} of take-home pay before tax. New York describes its paid family leave as job-protected, paid time off (${h.src('nypfl_2026', 'NY Paid Family Leave')}), which makes it one of the few programs that combines pay and protection in one law. Elsewhere, check the program page or your employer before relying on the job being held.</p>
<h2>Using both at once</h2>
<p>For a worker eligible for both, the usual arrangement is to run them together: the FMLA protects the job during the same weeks the state program pays. Ask your employer in writing whether your leave is designated as FMLA leave and how the state claim fits in. Two common surprises are worth knowing. First, the state may pay more weeks than the FMLA protects, as with ${h.a('massachusetts-pfml', 'Massachusetts')} medical leave, or fewer, as with ${h.a('california-paid-family-leave', 'California')} family leave. Second, some programs have an unpaid waiting week, so the first week of a protected leave can still be unpaid.</p>
<h2>If your state has no program</h2>
<p>In states without a program, the FMLA is the main protection, and pay depends on the employer: paid parental leave, short-term disability insurance, or sick and vacation days. Unemployment is not an option during a leave from a job you still hold; it is for people who have lost work and are available for a new job, as the ${h.a('unemployment-calculator', 'unemployment calculator')} explains. The ${h.a('paid-family-leave', 'paid family leave comparison')} shows every state that pays, and the ${h.a('maternity-leave-pay', 'maternity leave pay page')} adds the weeks around a birth.</p>
`,
  faqs: [
    { q: 'Is FMLA leave paid?', a: 'No. The FMLA guarantees up to 12 weeks of job-protected leave in a 12-month period for eligible employees, with health coverage kept, but no pay. Pay during the leave comes from a state paid leave program where one exists, from accrued paid time off, or from an employer policy such as paid parental leave.' },
    { q: 'Can I take FMLA and state paid family leave at the same time?', a: 'Yes, and that is the usual arrangement when you are eligible for both. The FMLA protects the job while the state program pays a weekly benefit for the same weeks. Ask your employer how it designates the leave, because the two may have different lengths and different rules on intermittent days.' },
    { q: 'Who is not covered by the FMLA?', a: 'Employees of employers with fewer than 50 workers, people who have worked for their employer for less than 12 months, and those with fewer than 1,250 hours in the past year. These workers may still qualify for a state paid leave benefit, which usually looks at wages rather than employer size.' },
    { q: 'Does state paid leave protect my job like the FMLA?', a: 'It depends on the state. New York presents its paid family leave as job protected. In other states, the benefit law pays wages while job protection comes from the FMLA or a separate state leave law, which may have its own eligibility rules. Check the program page before your leave starts.' },
  ],
  tool: 'leave', toolArg: { prog: 'ny-pfl', pay: PAY, why: 'bonding', wk: 12 },
  related: ['paid-family-leave', 'maternity-leave-pay', 'state-disability-insurance', 'ny-paid-family-leave', 'delaware-paid-leave', 'maryland-paid-family-leave'],
  sources: ['nypfl_2026', 'nj_tdi', 'ri_faq', 'de_labor', 'md_about', 'ma_pfml', 'edd_pfl'],
});
