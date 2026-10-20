import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('me-pfml'), F = P.facts!;
const [[t1, r1], [, r2]] = P.tiers! as Array<[number, number]>;
const capAww = t1 + (P.max! - t1 * r1) / r2;
const a = K.pw('me-pfml', 38000), b = K.pw('me-pfml', 68000);
const lv = K.leave('me-pfml', 68000, 'bonding', P.weeks.bonding!);
const yearly = (pay: number) => pay * P.contrib.rate;

export default definePage({
  id: 'maine-paid-family-leave', group: 'leave', order: 225, slug: 'maine-paid-family-leave', prog: 'me-pfml',
  nav: 'Maine Paid Family and Medical Leave', card: `Paying since ${K.day(P.start!)}: ${K.pct(r1)} then ${K.pct(r2)} of your wage, capped near ${K.usd(P.max!)} a week, ${P.weeks.bonding} weeks a year in all.`,
  title: `Maine Paid Family Leave 2026: First Year, ${P.weeks.bonding} Weeks of Pay`,
  description: `Maine Paid Family and Medical Leave in 2026: paid since ${K.day(P.start!)}, ${K.pct(r1)} and ${K.pct(r2)} tiers, an uncertain cap near ${K.usd(P.max!)} a week, ${P.weeks.bonding} weeks a year in all.`,
  h1: 'Maine Paid Family and Medical Leave in 2026: the first benefits',
  intro: `Maine collected premiums for more than a year before paying anything; benefits cover time off from ${K.day(P.start!)}. The weekly cap is the one figure still unclear.`,
  resume: `Maine Paid Family and Medical Leave pays for time out of work on or after ${K.day(P.start!)}, after premiums started on ${K.day(F.contribStart as string)}. The law replaces ${K.pct(r1)} of the part of your average weekly wage up to half of the state average weekly wage, ${K.cents(t1)}, and ${K.pct(r2)} of the part above. The maximum is the state average weekly wage itself, which the Workers' Compensation Board gives as ${K.cents(F.saww as number)} from ${K.day(F.sawwFrom as string)}; the program's own chart rounds it to ${K.cents(F.chartMax as number)}, and the cap at launch was ${K.usd(F.launchMax as number)}. Treat the exact cap as uncertain until Maine states it plainly. A ${K.usd(38000)} salary translates into a check near ${K.usd(a.weekly)}; a ${K.usd(68000)} salary, near ${K.usd(b.weekly)}. Family and medical leave together are limited to ${P.weeks.bonding} weeks in a benefit year. The premium is ${K.pct(F.premiumTotal as number)} of wages at employers with ${F.smallEmployerSize} or more employees, and no more than ${K.pct(F.employeeMaxPremium as number, 1)} can come from the worker.`,
  body: (h) => `
<h2>A launch year with a moving cap</h2>
<p>Benefits are paid only for time out of work occurring on or after ${K.day(P.start!)} (${h.src('me_home', 'Maine Paid Leave')}). The statute ties the maximum weekly benefit to the state average weekly wage (${h.src('me_850c', '26 M.R.S. § 850-C')}). That wage was the basis of a ${K.usd(F.launchMax as number)} cap in the spring; the Workers' Compensation Board then published ${K.cents(F.saww as number)} as of ${K.day(F.sawwFrom as string)} (${h.src('me_saww', 'state average weekly wage')}), and the program's benefit chart uses ${K.cents(F.chartMax as number)}, rounded. No official page says clearly which figure applies to a claim filed today, or from which date. This site uses ${K.cents(P.max!)} and flags it as uncertain.</p>
<p>The difference matters only near the top. A worker below about ${K.usd(capAww)} a week of wages is not affected, because the formula gives less than any of the three caps.</p>
${h.mini('leave', { t: 'Maine leave at your pay', p: ['pay', 'why', 'wk'], d: { prog: 'me-pfml', lock: 1, pay: 68000, why: 'bonding', wk: 12 } })}
<h2>${K.pct(r2)} above the first tier</h2>
<p>The second tier is ${K.pct(r2)}, as written in section 850-C; check that figure if you read an older summary. Below ${K.cents(t1)} a week, a worker keeps ${K.pct(r1)} of wages; above it, each extra dollar adds ${K.cents(r2)}. Take ${K.usd(68000)} a year, or ${K.usd(68000 / 52)} weekly: the formula yields ${K.usd(b.weekly)}, about ${K.pct(b.weekly / (68000 / 52))} of gross pay, and a full ${P.weeks.bonding} weeks of bonding is worth about ${K.usd(lv.total)}.</p>
<h2>One pool of ${P.weeks.bonding} weeks</h2>
<p>A covered worker may not take more than ${P.weeks.bonding} weeks, in the aggregate, of family leave and medical leave in the same benefit year (${h.src('me_850b', '26 M.R.S. § 850-B')}). There is no larger allowance for your own health and no extra weeks for pregnancy complications, as Washington or Colorado provide. A birth mother who uses medical leave around the delivery has that much less for bonding.</p>
<h2>Premiums by employer size</h2>
<p>Employers with ${F.smallEmployerSize} or more employees remit ${K.pct(F.premiumTotal as number)} of wages, and smaller employers ${K.pct(F.smallEmployerPremium as number, 1)}. In both cases, no more than ${K.pct(F.employeeMaxPremium as number, 1)} can come from the employee (${h.src('me_faq', 'employer FAQ')}). A worker earning ${K.usd(38000)} pays at most about ${K.usd(yearly(38000))} a year.</p>
<h2>Tax</h2>
<p>Family leave benefits are federal income under ${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}; medical leave is taxable for the part funded by the employer. The ${h.a('is-paid-family-leave-taxable', 'paid leave tax page')} covers the details, and the ${h.a('paid-family-leave', 'state comparison')} places Maine among the other programs.</p>
`,
  faqs: [
    { q: 'What is the Maine paid leave maximum weekly benefit?', a: `It is uncertain. The law sets it at the state average weekly wage, which is ${K.cents(F.saww as number)} from ${K.day(F.sawwFrom as string)}; Maine's benefit chart shows ${K.cents(F.chartMax as number)}, rounded, and the cap at the start of benefits was ${K.usd(F.launchMax as number)}. Most workers earn less than the level where the cap applies.` },
    { q: 'When did Maine Paid Family and Medical Leave benefits start?', a: `Benefits are paid for time out of work on or after ${K.day(P.start!)}. Premium contributions started earlier, on ${K.day(F.contribStart as string)}, to build the fund. Leave taken before the start date is not paid by the program, even if the worker contributed during that period.` },
    { q: 'How many weeks of Maine paid leave can I take?', a: `Up to ${P.weeks.bonding} weeks in a benefit year, counting family leave and medical leave together. You cannot take ${P.weeks.bonding} weeks for your own health and another ${P.weeks.bonding} for a new child in the same year; the total of both stays at ${P.weeks.bonding}.` },
  ],
  tool: 'leave', toolArg: { prog: 'me-pfml', lock: 1, pay: 68000, why: 'bonding', wk: 12 },
  related: ['paid-family-leave', 'maternity-leave-pay', 'is-paid-family-leave-taxable', 'fmla-vs-paid-leave', 'state-disability-insurance'],
  sources: ['me_home', 'me_850c', 'me_850b', 'me_saww', 'me_faq', 'irs_rr_2025_4'],
});
