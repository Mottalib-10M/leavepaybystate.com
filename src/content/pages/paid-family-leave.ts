import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { PROGRAM_PAGES } from '../../lib/planned';

const PAY = 60000;
const paying = K.PROGRAMS.filter((p) => p.status === 'paying');
const family = paying.filter((p) => (p.weeks.bonding ?? 0) > 0);
const famStates = [...new Set(family.map((p) => p.state))];
const coming = K.PROGRAMS.filter((p) => p.status === 'coming');
const at = family.map((p) => ({ p, w: K.pw(p.id, PAY).weekly })).sort((a, b) => b.w - a.w);
const hiP = at[0], loP = at[at.length - 1];
const maxes = family.map((p) => p.max!);
const topCap = family.find((p) => p.max === Math.max(...maxes))!, lowCap = family.find((p) => p.max === Math.min(...maxes))!;
const longest = family.reduce((a, p) => ((p.weeks.bonding ?? 0) > (a.weeks.bonding ?? 0) ? p : a));
const flat = family.filter((p) => p.tiers!.length === 1 && p.mode !== 'band' && p.aww!.div !== 1);
const GEN = ['PFL', 'SDI', 'TDI', 'DBL', 'FLI', 'TCI', 'PFML', 'FAMLI'];
const name = (p: (typeof K.PROGRAMS)[number]) => (GEN.includes(p.short) ? `${K.S(p.state).name} ${p.short}` : p.short);
const pageOf = (p: (typeof K.PROGRAMS)[number]) => PROGRAM_PAGES[p.id] ?? (p.id === 'ri-tci' ? PROGRAM_PAGES['ri-tdi'] : undefined);
const nStates = famStates.filter((c) => c !== 'DC').length;
const DC = K.Pg('dc-pfl'), NY = K.Pg('ny-pfl');

export default definePage({
  id: 'paid-family-leave', group: 'leave', order: 200, slug: 'paid-family-leave',
  nav: 'Paid family leave by state', card: `Every state program that pays for a new child or a sick relative in 2026, with its weekly maximum, weeks and premium.`,
  title: 'Paid Family Leave 2026: Calculator and Every State Program',
  description: `Paid family leave in 2026: the ${nStates} state programs and DC's that pay for a new child or a sick relative, weekly caps, weeks and premiums, with a calculator.`,
  h1: 'Paid family leave in 2026: every state program and calculator',
  intro: `No federal law pays you while you bond with a new child or care for a sick relative. A group of states does, each with its own formula, cap and number of weeks. Pick a program above and enter your pay.`,
  resume: `In 2026, paid family leave is a state benefit, available only where a state program exists: ${famStates.map((c) => K.S(c).name).join(', ')}. Each program replaces part of your wages while you bond with a new child or care for a seriously ill relative, and most also pay for your own serious health condition. The formulas differ widely. At ${K.usd(PAY)} a year of steady pay, the weekly benefit runs from about ${K.usd(loP.w)} in ${name(loP.p)} to ${K.usd(hiP.w)} in ${name(hiP.p)}. Weekly maximums range from ${K.usd(lowCap.max!)} in ${K.S(lowCap.state).name} to ${K.usd(topCap.max!)} in ${K.S(topCap.state).name}, and family leave lasts from ${Math.min(...family.map((p) => p.weeks.bonding!))} to ${longest.weeks.bonding} weeks for a new child. Workers pay for most programs through a payroll deduction; the District of Columbia is funded by employers alone. ${coming.map((p) => `${K.S(p.state).name} starts paying on ${K.day(p.start!)}`).join('; ')}. Family leave benefits are federal taxable income under Revenue Ruling 2025-4.`,
  body: (h) => `
<h2>Where paid family leave exists</h2>
<p>Family leave insurance is written state by state. The table lists every program this site follows, with the figures in force when the agency pages were read, ${K.day(K.P.retrieved_at)}; programs that pay only for your own health, such as Hawaii's, are on the ${h.a('state-disability-insurance', 'state disability insurance page')}. A state not listed has no program: a worker there is paid during family leave only if the employer offers it.</p>
${h.table(['Program', 'Weekly maximum', 'Weeks for a new child', 'Weeks for a sick relative', 'Employee premium'], [...family, ...coming].map((p) => [
    pageOf(p) ? h.a(pageOf(p)!, name(p)) : name(p),
    p.status === 'paying' ? K.cents(p.max!) : `to come, ${K.day(p.start!)}`,
    p.status === 'paying' ? String(p.weeks.bonding ?? 0) : 'not set',
    p.status === 'paying' ? String(p.weeks.care ?? 0) : 'not set',
    p.status !== 'paying' ? 'not set' : p.contrib.rate ? `${K.dec(p.contrib.rate * 100, 3)}%` : (p.contrib.covers ?? p.contrib.note ?? 'none'),
  ]), 'State paid family leave programs, 2026 figures read on the agency pages. Weeks are the most for that reason alone; several programs also cap all reasons together.', ['l', 'r', 'r', 'r', 'l'])}
${h.mini('leave', { t: 'Compare two programs at your pay', p: ['prog', 'pay', 'why'], d: { prog: 'ny-pfl', pay: PAY, why: 'bonding', wk: 12 } })}
<h2>Three ways to compute the check</h2>
<p>The simplest programs pay one flat share of your weekly wage up to a cap: ${flat.map((p) => `${K.pct(p.tiers![0][1])} in ${K.S(p.state).name}`).join(', ')}. Nothing changes as pay rises except that the cap eventually binds, which happens early in Delaware and late in New York.</p>
<p>Most of the newer programs use tiers. A high rate applies to the first part of your weekly wage, usually up to half of the state average weekly wage, and a lower rate to the rest: ${h.a('washington-paid-family-leave', 'Washington')}, ${h.a('massachusetts-pfml', 'Massachusetts')}, ${h.a('colorado-famli', 'Colorado')}, ${h.a('maine-paid-family-leave', 'Maine')} and ${h.a('dc-paid-family-leave', 'DC')} work this way, ${h.a('connecticut-paid-leave', 'Connecticut')} with thresholds tied to the minimum wage, ${h.a('oregon-paid-leave', 'Oregon')} with a first tier at the full wage, and ${h.a('minnesota-paid-leave', 'Minnesota')} with three tiers. Lower earners keep most of their pay under these designs.</p>
<p>California reads a band table and applies one rate to the whole wage, and Rhode Island takes a percentage of your best quarter. In both, a strong quarter matters more than steady pay; the ${h.a('base-period-high-quarter', 'base period page')} explains how to find it.</p>
<h2>How many weeks</h2>
<p>Weeks for a new child range from ${Math.min(...family.map((p) => p.weeks.bonding!))} in California and Rhode Island to ${longest.weeks.bonding} in most other states. Several programs also limit all reasons together: Washington, Massachusetts, Minnesota and Delaware publish a combined cap, and Maine counts family and medical weeks in one pool. DC cut its family care leave to ${DC.weeks.care} weeks on ${K.day(DC.facts!.changeDate as string)}, while keeping ${DC.weeks.bonding} weeks for parents.</p>
<h2>Qualifying is measured differently</h2>
<p>Each program sets its own test. New Jersey counts base-year weeks paid at least ${K.usd(K.Pg('nj-tdi').facts!.eligWeeklyEarnings as number)} or a total of ${K.usd(K.Pg('nj-tdi').facts!.eligBaseYearTotal as number)}; Rhode Island asks for ${K.usd(K.Pg('ri-tdi').facts!.eligBasePeriodWages as number)} of base-period wages; Delaware asks for ${K.num(K.Pg('de-pl').facts!.eligHours as number)} hours with one employer; Maryland will ask for ${K.num(K.Pg('md-famli').facts!.eligHours as number)} hours in the state. A worker who just changed jobs or works part time should check the test on the program page before counting on the benefit.</p>
<h2>Who pays for it</h2>
<p>Most programs take a payroll deduction from workers, sometimes alongside an employer share. New York's is ${K.pct(NY.contrib.rate, 3)} of wages, capped for the year; California's family leave is paid out of the SDI deduction. The District of Columbia charges employers only. The premium column of the table shows the employee share; the program pages explain how the rest is split.</p>
<h2>Pay is not the same as job protection</h2>
<p>A state benefit replaces wages; it does not by itself hold your job. Job protection comes from the federal FMLA, from some state leave laws, and in New York from the paid leave law itself. The ${h.a('fmla-vs-paid-leave', 'FMLA and paid leave page')} sets out the difference. For a birth, the ${h.a('maternity-leave-pay', 'maternity leave pay page')} adds disability and bonding weeks in each state, and the ${h.a('is-paid-family-leave-taxable', 'tax page')} estimates the federal tax due on the benefits.</p>
`,
  faqs: [
    { q: 'Which states have paid family leave in 2026?', a: `${famStates.map((c) => K.S(c).name).join(', ')}. Hawaii pays disability benefits but not family leave. ${coming.map((p) => `${K.S(p.state).name} collects contributions from ${K.day(p.contribStart!)} and pays from ${K.day(p.start!)}`).join('. ')}. Elsewhere, pay depends on the employer.` },
    { q: 'Which state pays the most paid family leave a week?', a: `By cap, ${K.S(topCap.state).name}, at up to ${K.usd(topCap.max!)} a week. At a middle income the ranking changes: with ${K.usd(PAY)} of steady pay, ${name(hiP.p)} pays the most, about ${K.usd(hiP.w)} a week, because of how its formula treats that level of wages.` },
    { q: 'Is there a federal paid family leave program?', a: 'No. Federal law gives eligible employees up to twelve weeks of unpaid, job-protected leave under the FMLA, but no federal program pays wages during family leave for private-sector workers. Pay comes from a state program where one exists, or from an employer policy.' },
    { q: 'Can both parents claim state paid family leave for the same child?', a: 'In the state programs on this site, family leave is an individual benefit based on each worker\'s own wages and own claim. Two working parents who each qualify can usually each claim bonding weeks, within the limits of their own program. Check the program page for any rule on timing.' },
  ],
  tool: 'leave', toolArg: { prog: 'ca-pfl', pay: PAY, why: 'bonding', wk: 8 },
  related: ['california-paid-family-leave', 'ny-paid-family-leave', 'washington-paid-family-leave', 'maternity-leave-pay', 'is-paid-family-leave-taxable', 'fmla-vs-paid-leave'],
  sources: ['edd_pfl', 'nypfl_2026', 'nj_fli', 'wa_how', 'ma_pfml', 'ct_how', 'or_faq', 'co_faq', 'mn_poster', 'de_labor', 'me_850b', 'dc_updates', 'md_about', 'ri_faq', 'irs_rr_2025_4'],
});
