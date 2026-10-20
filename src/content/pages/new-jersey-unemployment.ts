import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('NJ');
const rate = S.alts![0].mult * 52;
const capYear = Math.ceil(S.max / rate * 52);
const a = K.ui('NJ', 45000);
const b = K.ui('NJ', 90000);
const part = Math.min(S.max, Math.floor((45000 / 40) * rate));
const th = K.th('NJ', 90000);
const tx = K.uiTax('NJ');

export default definePage({
  id: 'new-jersey-unemployment', group: 'unemployment', order: 115, slug: 'new-jersey-unemployment', st: 'NJ',
  nav: 'New Jersey unemployment', card: `60% of your average weekly wage, ${K.usd(S.min)} to ${K.usd(S.max)} a week, untaxed by the state.`,
  title: 'New Jersey Unemployment 2026: 60% of Wages, Max and Weeks',
  description: `New Jersey unemployment in 2026: 60% of your average weekly wage in the base year, ${K.usd(S.min)} to ${K.usd(S.max)} a week, up to 26 weeks, and no NJ income tax on any of it.`,
  h1: `New Jersey unemployment in 2026: 60% of your weekly wage, up to ${K.usd(S.max)}`,
  intro: `New Jersey replaces 60% of the average weekly wage you earned in the base year, between ${K.usd(S.min)} and ${K.usd(S.max)} a week in 2026. Enter your pay to see the figure.`,
  resume: `New Jersey is one of the few states that pays a straight percentage of your weekly wage rather than a fraction of a quarter. The Department of Labor and Workforce Development averages your earnings over the weeks you worked in the base year and pays 60% of that average, plus a dependents allowance, with a 2026 minimum of ${K.usd(S.min)} and a maximum of ${K.usd(S.max)} a week. Someone who earned ${K.usd(45000)} over a full year averages ${K.usd(45000 / 52)} a week and gets about ${K.usd(a.weekly)}. The maximum applies from roughly ${K.usd(capYear)} a year, so a worker on ${K.usd(90000)} receives ${K.usd(b.weekly)}. Benefits run for up to ${S.weeks[1]} weeks, depending on how many weeks you worked in the base year, for a full-claim total of ${K.usd(b.total)} at the maximum. Unemployment is federal taxable income, but New Jersey does not tax it.`,
  body: (h) => `
<h2>A high ceiling built on your weekly wage</h2>
<p>New Jersey's maximum of ${K.usd(S.max)}, confirmed in the ${h.src('nj_ui_2026', 'state Department of Labor announcement of 2026 rates')}, is among the highest in the country, and the formula lets a wide band of earners reach it. Sixty percent is applied to the average weekly wage, not to a quarter divided by 26, so a claimant earning ${K.usd(90000)} gets ${K.usd(b.weekly)}, which replaces ${K.pct(b.weekly / th.net)} of the ${K.usd(th.net)} a week a single filer keeps after federal tax, Social Security, Medicare and the state disability and family leave deductions.</p>
<p>The dependents allowance raises the floor to ${K.usd(S.da![0])} but not the ceiling, which stays at ${K.usd(S.da![1])} with or without dependents. It matters for lower earners and has no effect for anyone already at the maximum.</p>
${h.mini('ui', { t: 'Your New Jersey weekly benefit', p: ['pay'], d: { st: 'NJ', lock: 1, pay: 45000 } })}
<h2>Weeks worked, not weeks in the year</h2>
<p>The average is taken over the base weeks you actually worked. The calculator does something simpler: it assumes you worked all 52 weeks of the base year. If you were employed for part of it, your real average is higher than the estimate. With ${K.usd(45000)} earned in 40 weeks, the average weekly wage is ${K.usd(45000 / 40)}, and 60% of it is ${K.usd(part)}, against the ${K.usd(a.weekly)} shown for a full year.</p>
<p>Eligibility is also counted in weeks. You need 20 base weeks, each with earnings of at least 20 times the state hourly minimum wage, or total base-year earnings of 1,000 times that hourly wage. The ${h.a('base-period-high-quarter', 'base period guide')} explains which months the base year covers.</p>
<h2>How long the claim lasts</h2>
<p>The ${h.src('dol_sigpros', 'Department of Labor table of July 2026')} gives New Jersey's maximum benefit as the number of weeks worked in the base year, up to ${S.weeks[1]} times the weekly amount, with durations from ${S.weeks[0]} to ${S.weeks[1]} weeks. A full-year worker reaches the ${S.weeks[1]}-week limit. A claimant with a short work history gets fewer weeks, which the calculator does not model.</p>
<h2>Certifying, and working a little</h2>
<p>New Jersey claimants certify every two weeks. Earnings up to the greater of ${K.usd(5)} or 20% of the weekly benefit are ignored; the rest is subtracted. On a ${K.usd(a.weekly)} benefit, the first ${K.usd(a.weekly * 0.2)} of earnings costs nothing. The ${h.a('partial-unemployment', 'partial unemployment guide')} has every state's rule.</p>
<h2>Out of New Jersey income tax</h2>
<p>The ${h.src(tx.source!, 'NJ-1040 instructions')} exclude unemployment compensation from New Jersey gross income. On the federal return it is fully taxable, and 10% withholding is available on request. If you are out of work because of your own illness or to care for a family member, the state's ${h.a('nj-temporary-disability', 'temporary disability')} and ${h.a('nj-family-leave', 'family leave insurance')} programs apply instead.</p>
`,
  faqs: [
    { q: 'What is the New Jersey unemployment maximum for 2026?', a: `${K.usd(S.max)} a week for claims filed in 2026, as published by the New Jersey Department of Labor. It equals 60% of an average weekly wage of about ${K.usd(S.max / rate)}. The dependents allowance does not raise it. The minimum is ${K.usd(S.min)}, or ${K.usd(S.da![0])} with dependents.` },
    { q: 'Is unemployment taxed in New Jersey?', a: 'Not by the state. The NJ-1040 instructions list unemployment compensation among income that New Jersey does not tax, so it stays off the state return. The IRS does tax it, from Form 1099-G, and you can ask for a flat 10% federal withholding while you collect.' },
    { q: 'Why is my New Jersey benefit higher than the estimate?', a: 'Probably because you worked fewer than 52 weeks in the base year. New Jersey averages wages over the weeks you actually worked, while the calculator divides by 52. Fewer weeks for the same pay means a higher weekly average and a higher check, up to the maximum.' },
    { q: 'How many weeks can I collect unemployment in New Jersey?', a: `Up to ${S.weeks[1]} weeks. The number depends on the weeks you worked in the base year, so a year-round employee normally receives the full duration while someone with a shorter record gets fewer weeks. Extended benefits beyond ${S.weeks[1]} weeks depend on federal triggers.` },
  ],
  tool: 'ui', toolArg: { st: 'NJ', lock: 1, pay: 45000 },
  related: ['unemployment-calculator', 'nj-temporary-disability', 'nj-family-leave', 'new-york-unemployment', 'are-unemployment-benefits-taxable', 'partial-unemployment'],
  sources: ['nj_ui_2026', 'dol_sigpros', 'dol_statelaws', 'nj_1040i', 'irs_tc418'],
});
