import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const P = K.Pg('md-famli'), F = P.facts!;
const DE = K.Pg('de-pl'), DC = K.Pg('dc-pfl');
const contrib = K.day(P.contribStart!), start = K.day(P.start!);
const de = K.pw('de-pl', 60000), dc = K.pw('dc-pfl', 60000);

export default definePage({
  id: 'maryland-paid-family-leave', group: 'leave', order: 227, slug: 'maryland-paid-family-leave', prog: 'md-famli',
  nav: 'Maryland FAMLI (to come)', card: `To come: contributions from ${contrib}, benefits from ${start}. No weekly amount published yet.`,
  title: 'Maryland Paid Family Leave 2026: FAMLI Dates, No Pay Yet',
  description: `Maryland paid family leave in 2026: FAMLI contributions start ${contrib} and benefits ${start}; no amount is set yet. What pays until then.`,
  h1: 'Maryland FAMLI: paid family leave to come',
  intro: `Maryland has passed a family and medical leave insurance program, but it pays nothing in 2026 and will not until ${start}. This page sets out the dates and what a Maryland worker can use meanwhile.`,
  resume: `Maryland's Family and Medical Leave Insurance program, FAMLI, is law but not yet running. According to the state's program page, contributions begin on ${contrib}, employers start filing quarterly wage and hour reports in ${F.firstReportsMonth}, and benefits become available on ${start}. A worker will qualify after at least ${K.num(F.eligHours as number)} hours in a position located in Maryland over four quarters. The weekly benefit amount, the replacement rate and the premium split have not been published on the pages read for this site, so no calculator can estimate a FAMLI check yet, and this site does not guess one. Until ${start}, a Maryland worker who stops working to bond with a child, care for a relative or recover from an illness has no state benefit: pay comes only from an employer policy, accrued leave or a private disability plan. Job protection may come from the federal FMLA for eligible workers. Across the border, Delaware and the District of Columbia already pay.`,
  body: (h) => `
<h2>The timeline</h2>
<p>The Maryland Department of Labor's FAMLI Division gives three dates (${h.src('md_about', 'Maryland FAMLI, about the program')}):</p>
${h.table(['Step', 'Date'], [
    ['Contributions begin', contrib],
    ['First quarterly wage and hour reports', String(F.firstReportsMonth)],
    ['Benefits become available', start],
  ], 'Maryland FAMLI timeline as published by the state.', ['l', 'l'])}
<p>Between the first two dates, nothing changes for workers except a new deduction on the pay stub once contributions begin. A child born before ${start} gives no right to a FAMLI benefit: the program pays for leave from ${start}, not for events before it.</p>
<h2>Who will qualify</h2>
<p>The program will cover workers who have worked at least ${K.num(F.eligHours as number)} hours in a position localized in Maryland over four quarters. That is a lower bar than the federal FMLA, which asks for more hours with a single employer, so many part-time workers who have no FMLA protection will qualify. The state has not yet published how the weeks will be divided between reasons, which is why this page gives no week counts.</p>
<h2>What pays in Maryland until then</h2>
<p>For now, a Maryland worker on leave relies on what the employer offers: paid sick leave, vacation, short-term disability insurance bought through work, or a paid parental policy. The federal FMLA can protect the job of an eligible worker for up to twelve weeks, but it pays nothing. The ${h.a('fmla-vs-paid-leave', 'FMLA and paid leave page')} lists who is eligible. Unemployment does not pay during a leave from a job you still hold; it is for people who lost work and can take a new job, as the ${h.a('maryland-unemployment', 'Maryland unemployment page')} explains.</p>
<p>The calculator above shows the Maryland situation for any reason. Once the state publishes the benefit formula, it will be added to this site's data and the calculator will give an amount.</p>
${h.mini('leave', { t: 'What neighbors pay today', p: ['prog', 'pay', 'why'], d: { prog: 'de-pl', pay: 60000, why: 'bonding', wk: 12 } })}
<h2>Neighbors already paying</h2>
<p>A person who lives in Maryland but works in Delaware or the District of Columbia should check with the program where the work is done, since coverage follows the job there. ${h.a('delaware-paid-leave', 'Delaware Paid Leave')} pays ${K.pct(DE.tiers![0][1])} of wages up to ${K.usd(DE.max!)} a week, about ${K.usd(de.weekly)} on ${K.usd(60000)} a year. ${h.a('dc-paid-family-leave', 'DC Paid Family Leave')} pays up to ${K.usd(DC.max!)}, about ${K.usd(dc.weekly)} at the same pay, and is funded by employers alone. The ${h.a('paid-family-leave', 'paid family leave comparison')} lists every state.</p>
`,
  faqs: [
    { q: 'When does Maryland FAMLI start paying benefits?', a: `On ${start}. Contributions begin earlier, on ${contrib}, and employers file their first quarterly wage and hour reports in ${F.firstReportsMonth}. Leave taken before the benefit start date is not paid by the program, whatever the reason.` },
    { q: 'How much will Maryland FAMLI pay a week?', a: 'Not yet known. The weekly benefit formula, the maximum and the contribution split had not been published on the program pages read for this site. Any figure quoted elsewhere for Maryland is a projection. This site will add the amount once the state publishes it, and the calculator will then give an estimate.' },
    { q: 'Who will be eligible for Maryland paid family leave?', a: `Workers with at least ${K.num(F.eligHours as number)} hours in a position localized in Maryland over four quarters. The count is in hours, not dollars, so steady part-time work can meet it. The rest of the rules, including the weekly amount, will be set out by the FAMLI Division before benefits start.` },
  ],
  tool: 'all', toolArg: { st: 'MD', why: 'bonding' },
  related: ['paid-family-leave', 'fmla-vs-paid-leave', 'delaware-paid-leave', 'dc-paid-family-leave', 'maryland-unemployment'],
  sources: ['md_about', 'de_code', 'dc_updates'],
});
