import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('IL');
const m = S.alts![0].mult;
const da = S.da!;
const cap2 = Math.ceil(S.max / m);
const even = K.ui('IL', 48000);
const bunched = K.ui('IL', 48000, 18000, 10000);
const small = K.ui('IL', 26000);

export default definePage({
  id: 'illinois-unemployment', group: 'unemployment', order: 117, slug: 'illinois-unemployment', st: 'IL',
  nav: 'Illinois unemployment', card: `47% of your weekly pay in the two best quarters, ${K.usd(S.min)} to ${K.usd(S.max)}, or ${K.usd(da[1])} with dependents.`,
  title: 'Illinois Unemployment 2026: 47% Rule, Dependents, 26 Weeks',
  description: `Illinois unemployment in 2026: 47% of your average weekly wage in the two best quarters, ${K.usd(S.min)} to ${K.usd(S.max)}, up to ${K.usd(da[1])} a week with dependents. Estimate yours.`,
  h1: 'Illinois unemployment benefits in 2026: the 47% rule and the dependents allowance',
  intro: `IDES pays 47% of your average weekly pay in your two best quarters, from ${K.usd(S.min)} to ${K.usd(S.max)} a week, and more for a dependent spouse or child.`,
  resume: `The Illinois Department of Employment Security adds the wages of the two highest quarters of your base period, divides by 26 to get an average weekly wage and pays 47% of it. For 2026 that gives a range of ${K.usd(S.min)} to ${K.usd(S.max)} a week for a claimant without dependents, and up to ${K.usd(da[1])} with a dependent spouse or child. The ceiling needs about ${K.usd(cap2)} in the two quarters together. With ${K.usd(48000)} earned evenly, those quarters hold ${K.usd(24000)} and the check is ${K.usd(even.weekly)}; with ${K.usd(18000)} and ${K.usd(10000)} in the best two, the same yearly pay gives ${K.usd(bunched.weekly)}. A part-time worker on ${K.usd(26000)} gets ${K.usd(small.weekly)}. Benefits last up to ${S.weeks[1]} weeks, and the total cannot exceed your base-period wages, a limit almost nobody reaches. Qualifying is easy: ${K.usd(1600)} in the base period, with at least ${K.usd(440)} outside the best quarter.`,
  body: (h) => `
<h2>Two quarters smooth out a spike</h2>
<p>Illinois sits between the states that use a single quarter and those that use the whole year. Taking the two strongest quarters means one unusually good quarter helps, but only half as much as it would in Texas or California. A sales representative with ${K.usd(18000)} in the fourth quarter and ${K.usd(10000)} in the third has ${K.usd(28000)} to work with: divided by 26, that is ${K.usd(28000 / 26)} a week, and 47% of it gives ${K.usd(bunched.weekly)}. The same yearly total spread evenly gives ${K.usd(even.weekly)}.</p>
<p>The rate itself, 47%, is set in the Illinois statute and reported in the ${h.src('dol_sigpros', 'Department of Labor table of July 2026')}. The ceiling of ${K.usd(S.max)} applies once the two quarters reach about ${K.usd(cap2)}, which is roughly ${K.usd(cap2 * 2)} a year of even pay.</p>
${h.mini('ui', { t: 'Your Illinois weekly benefit', p: ['pay', 'hq', 'q2'], d: { st: 'IL', lock: 1, pay: 48000, hq: 18000, q2: 10000 } })}
<h2>What a dependent adds</h2>
<p>Illinois pays a dependents allowance for a non-working spouse or a dependent child, and it does not stop at the ordinary ceiling. The DOL table gives the range with the allowance as ${K.usd(da[0])} to ${K.usd(da[1])}, so a claimant at the top of the scale with a dependent child can draw ${K.usd(da[1] - S.max)} more a week than the same claimant alone. The allowance is a percentage of your prior average weekly wage, so lower earners gain less in dollars. You claim it when you file, and IDES may ask for documents. The calculator leaves it out.</p>
<h2>The full 26 weeks, with rare exceptions</h2>
<p>The law limits a claim to the lesser of ${S.weeks[1]} weekly payments and your total base-period wages. Since the weekly amount is less than half of your weekly pay, a year of wages is always more than ${S.weeks[1]} payments, and in practice every eligible claimant has ${S.weeks[1]} weeks. At ${K.usd(even.weekly)} a week that is ${K.usd(even.total)}; at the maximum, ${K.usd(S.max * S.weeks[1])} before any allowance. The ${h.a('how-long-unemployment-lasts', 'duration guide')} shows how unusual a uniform duration is.</p>
<h2>Certifying and earning on the side</h2>
<p>Illinois claimants certify every two weeks through IDES and keep a record of their work search. Part-time earnings are reduced by a disregard of half the weekly benefit: on a ${K.usd(even.weekly)} benefit, earnings up to ${K.usd(even.weekly / 2)} in a week leave the check whole, and anything above comes off dollar for dollar. Report gross pay in the week you did the work.</p>
<p>The IRS taxes unemployment as ordinary income (${h.src('irs_tc418', 'Topic 418')}), and you can ask IDES for 10% federal withholding with ${h.src('irs_w4v', 'Form W-4V')}. For a benefit that small, the ${h.a('are-unemployment-benefits-taxable', 'tax guide')} estimates the federal bill.</p>
`,
  faqs: [
    { q: 'How much is unemployment in Illinois a week in 2026?', a: `Between ${K.usd(S.min)} and ${K.usd(S.max)} for a claimant without dependents: 47% of the average weekly wage in your two best quarters. ${K.usd(48000)} of steady pay gives ${K.usd(even.weekly)}. A dependent spouse or child adds an allowance that can take the top amount to ${K.usd(da[1])} a week.` },
    { q: 'Does Illinois pay more unemployment if I have children?', a: `Yes. Illinois adds a dependents allowance for a dependent child or a non-working spouse, and it can go past the ordinary ceiling of ${K.usd(S.max)}, up to ${K.usd(da[1])} a week. It depends on your earlier wages, so you claim it at filing and IDES checks the relationship.` },
    { q: 'What wages do I need to qualify for Illinois unemployment?', a: `At least ${K.usd(1600)} in the base period, of which at least ${K.usd(440)} must fall outside your highest quarter. That bar is low, so most people who lost a job after several months of work qualify on wages. The separation itself must be through no fault of your own.` },
  ],
  tool: 'ui', toolArg: { st: 'IL', lock: 1, pay: 48000, hq: 18000, q2: 10000 },
  related: ['unemployment-calculator', 'how-long-unemployment-lasts', 'are-unemployment-benefits-taxable', 'indiana-unemployment', 'wisconsin-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
