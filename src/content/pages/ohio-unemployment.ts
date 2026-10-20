import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('OH');
const rate = S.alts![0].mult * 52;
const da = S.da!;
const capYear = Math.ceil(S.max / rate * 52);
const a = K.ui('OH', 40000);
const b = K.ui('OH', 75000);
const shortWk = 24;
const shortAww = 30000 / shortWk;
const shortWba = Math.min(S.max, Math.floor(shortAww * rate));

export default definePage({
  id: 'ohio-unemployment', group: 'unemployment', order: 116, slug: 'ohio-unemployment', st: 'OH',
  nav: 'Ohio unemployment', card: `Half your average weekly wage, ${K.usd(S.min)} to ${K.usd(S.max)}, or up to ${K.usd(da[1])} with dependents.`,
  title: 'Ohio Unemployment 2026: Half Your Wage and Dependents Table',
  description: `Ohio unemployment in 2026: half of your average weekly wage, ${K.usd(S.min)} to ${K.usd(S.max)} a week, up to ${K.usd(da[1])} with dependents, for 20 to 26 weeks. Your own amount here.`,
  h1: 'Ohio unemployment benefits in 2026: half of your weekly wage, more with dependents',
  intro: `Ohio pays half of your average weekly wage, between ${K.usd(S.min)} and ${K.usd(S.max)} a week, and raises the ceiling for claimants who support dependents. Enter your pay to see your figure.`,
  resume: `Ohio computes unemployment from your average weekly wage, the total you earned in the base period divided by the weeks in which you worked, and pays half of it. In 2026 the amount for a claimant without dependents runs from ${K.usd(S.min)} to ${K.usd(S.max)} a week. Ohio is one of the states where family size changes the ceiling: with dependents, an allowance based on your wage and the number of dependents can lift the check as high as ${K.usd(da[1])}. A worker who earned ${K.usd(40000)} over 52 weeks averages ${K.usd(40000 / 52)} and gets ${K.usd(a.weekly)}; the ${K.usd(S.max)} ceiling applies from about ${K.usd(capYear)} a year, so ${K.usd(75000)} brings ${K.usd(b.weekly)}. Duration depends on the weeks you worked: ${S.weeks[0]} weeks of benefits for the minimum of ${S.weeks[0]} qualifying weeks, one more week for each extra qualifying week, up to ${S.weeks[1]}. At the single maximum, a full claim pays ${K.usd(b.total)}.`,
  body: (h) => `
<h2>Your average weekly wage, halved</h2>
<p>The Ohio Department of Job and Family Services does not look for your best quarter. It adds up the base period's wages and divides by the number of weeks you worked, then pays 50%. Because the divisor is the weeks worked, the calculator's assumption of a full 52-week year is a simplification: someone who earned ${K.usd(30000)} in only ${shortWk} weeks has an average of ${K.usd(shortAww)} and a benefit of ${K.usd(shortWba)}, much more than the same ${K.usd(30000)} spread over a whole year would give. Enter your figures with that in mind.</p>
<p>Qualifying also runs on weeks. You need at least ${S.weeks[0]} weeks of employment in the base period, with wages averaging at least 27.5% of the statewide average weekly wage, and earnings in two quarters. The ${h.a('base-period-high-quarter', 'base period guide')} explains which quarters count.</p>
${h.mini('ui', { t: 'Your Ohio weekly benefit', p: ['pay'], d: { st: 'OH', lock: 1, pay: 40000 } })}
<h2>The dependency table</h2>
<p>Ohio publishes its maximum benefit in classes. A claimant with no dependents is held to ${K.usd(S.max)}. Someone who supports a spouse or children can receive an allowance on top, from one dollar up to ${K.usd(da[1] - S.max)} depending on the claimant's average weekly wage and how many dependents there are, so the highest possible check in 2026 is ${K.usd(da[1])}, according to the ${h.src('dol_sigpros', 'Department of Labor table of July 2026')}. Dependents have to be declared when you file and the agency may ask for proof. The calculator shows the amount without the allowance; a claimant with dependents will usually see a larger figure on the determination.</p>
<h2>Twenty weeks, then one more for each extra week worked</h2>
<p>The Ohio claim length is a direct count. ${S.weeks[0]} qualifying weeks in the base period earn ${S.weeks[0]} weeks of benefits, and every additional qualifying week adds one, until the cap of ${S.weeks[1]}. A worker with a full year is at ${S.weeks[1]} weeks; one who worked ${shortWk} weeks has ${Math.min(S.weeks[1], shortWk)} weeks of benefits, worth ${K.usd(shortWba * Math.min(S.weeks[1], shortWk))} at the amount above.</p>
<h2>Weekly claims and side earnings</h2>
<p>Ohio claimants file a weekly or biweekly claim and record work search activity. Earnings during a claim week reduce the check after a disregard of one fifth of the weekly benefit: on ${K.usd(a.weekly)}, the first ${K.usd(a.weekly / 5)} you earn costs nothing. The ${h.a('partial-unemployment', 'partial unemployment guide')} compares states.</p>
<p>Unemployment compensation is taxable on the federal return (${h.src('irs_tc418', 'IRS Topic 418')}). ODJFS can withhold 10% for federal tax if you request it. Ohio's own treatment of the income is not covered on this site; check the state return instructions.</p>
`,
  faqs: [
    { q: 'What is the maximum Ohio unemployment benefit with dependents in 2026?', a: `${K.usd(da[1])} a week for a claimant in the highest dependency class, against ${K.usd(S.max)} for a claimant with no dependents. The allowance is set from a table that combines the claimant's average weekly wage with the number of dependents, so not every parent reaches the top figure.` },
    { q: 'How many weeks of unemployment can I get in Ohio?', a: `Between ${S.weeks[0]} and ${S.weeks[1]}. Ohio gives ${S.weeks[0]} weeks for the minimum ${S.weeks[0]} qualifying weeks of work in the base period, then one week of benefits for each additional qualifying week, up to ${S.weeks[1]}. Someone who worked the full year usually reaches the maximum duration.` },
    { q: 'How is the Ohio average weekly wage calculated for unemployment?', a: 'The total wages of your base period divided by the number of weeks in which you worked. Weeks without any work are left out of the divisor, which is why a seasonal or part-year worker can have a fairly high average. Ohio pays half of that average, within its minimum and maximum.' },
  ],
  tool: 'ui', toolArg: { st: 'OH', lock: 1, pay: 40000 },
  related: ['unemployment-calculator', 'how-long-unemployment-lasts', 'base-period-high-quarter', 'partial-unemployment', 'pennsylvania-unemployment', 'michigan-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
