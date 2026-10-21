import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('CA');
const a = K.ui('CA', 30000);
const b = K.ui('CA', 45000);
const c = K.ui('CA', 90000);
const capQ = S.max * 26;
const th = K.th('CA', 90000);
const tx = K.uiTax('CA');

export default definePage({
  id: 'california-unemployment', group: 'unemployment', order: 111, slug: 'california-unemployment', st: 'CA',
  nav: 'California unemployment', card: `About 1/26 of your best quarter, ${K.usd(S.min)} to ${K.usd(S.max)} a week, for up to 26 weeks.`,
  title: 'California Unemployment 2026: Weekly Amount, Cap, Weeks',
  description: `California unemployment in 2026: about 1/26 of your best quarter, ${K.usd(S.min)} to ${K.usd(S.max)} a week for up to 26 weeks, and not taxed by the state. Your amount here.`,
  h1: `How much California unemployment pays in 2026: the ${K.usd(S.max)} ceiling and what you get below it`,
  intro: `The EDD pays between one twenty-third and one twenty-sixth of your best quarter, from ${K.usd(S.min)} to ${K.usd(S.max)} a week. Enter your pay to see where you land.`,
  resume: `California's Employment Development Department sets your weekly unemployment benefit from the single quarter of your base period in which you earned the most, using a table that pays between 1/23 and 1/26 of that quarter. The floor is ${K.usd(S.min)} and the ceiling is ${K.usd(S.max)} a week. The ceiling arrives fast: at 1/26, a best quarter of about ${K.usd(capQ)} already reaches it, which is roughly ${K.usd(capQ * 4)} a year of steady pay. Below that line, ${K.usd(30000)} earned evenly gives about ${K.usd(a.weekly)} a week and ${K.usd(45000)} gives ${K.usd(b.weekly)}. Anyone earning ${K.usd(90000)} gets the same ${K.usd(c.weekly)} as someone on half that pay. A claim lasts up to ${S.weeks[1]} weeks, and the total can never exceed half of your base-period wages, so most claimants can draw ${S.weeks[1]} full payments, up to ${K.usd(c.total)}. Benefits are federal taxable income, but California does not tax them.`,
  body: (h) => `
<h2>A ceiling that most full-time workers hit</h2>
<p>California has one of the larger labor markets in the country and one of the more modest maximums. The weekly amount stops at ${K.usd(S.max)}, and the Department of Labor's ${h.src('dol_sigpros', 'July 2026 table')} lists it as such. Because the EDD works from the best quarter alone, the arithmetic is short: ${K.usd(capQ)} in that quarter, divided by 26, already lands on the ceiling. A software tester on ${K.usd(60000)}, a nurse on ${K.usd(120000)} and a manager on ${K.usd(250000)} all receive the same check. For them, the question is not the formula but how far ${K.usd(S.max)} falls short of their pay.</p>
<p>At ${K.usd(90000)} a year, a single filer keeps about ${K.usd(th.net)} a week after federal income tax, Social Security, Medicare and the State Disability Insurance deduction, before California income tax. The maximum benefit covers ${K.pct(S.max / th.net)} of that. Lower earners do better in relative terms: on ${K.usd(30000)}, the ${K.usd(a.weekly)} estimate is close to half of gross weekly pay.</p>
${h.mini('ui', { t: 'Your California weekly benefit', p: ['pay', 'hq'], d: { st: 'CA', lock: 1, pay: 45000 } })}
<h2>Where this estimate is simpler than the EDD table</h2>
<p>The EDD does not divide by a single number. Its benefit table pays a higher fraction to low earners, close to 1/23 of the best quarter, and moves toward 1/26 as wages rise. The calculator uses 1/26 throughout. At the bottom of the scale the real amount can therefore be up to 13% higher than shown; near the ceiling the difference disappears, since everybody above about ${K.usd(capQ)} a quarter gets ${K.usd(S.max)} anyway. Your award letter, the Notice of Unemployment Insurance Award, gives the figure that counts.</p>
<h2>Qualifying with a short work history</h2>
<p>The earnings test is low. You qualify with ${K.usd(1300)} in the best quarter, or with ${K.usd(900)} in that quarter if your whole base period reaches one and a quarter times it. A claim filed this autumn normally looks at the first four of the last five completed quarters; when those wages fall short, the EDD can look at the four most recent completed quarters instead. The ${h.a('base-period-high-quarter', 'base period guide')} shows how to find yours.</p>
<p>The duration rule rarely bites. The total is capped at ${K.pct(S.bpwFrac!)} of base-period wages, so only someone with a strong single quarter and little else would run out before week ${S.weeks[1]}. With wages spread over the year, the full ${S.weeks[1]} weeks are paid.</p>
<h2>Earning a little while you certify</h2>
<p>Claimants certify every two weeks and report gross earnings for each week. California disregards the greater of ${K.usd(25)} or a quarter of what you earned, and subtracts the rest. Earning ${K.usd(200)} in a week with a ${K.usd(b.weekly)} benefit leaves ${K.usd(b.weekly - (200 - Math.max(25, 200 / 4)))}. The ${h.a('partial-unemployment', 'partial unemployment guide')} compares this with other states.</p>
<h2>Tax: federal yes, state no</h2>
<p>Unemployment compensation is income for the IRS (${h.src('irs_tc418', 'Topic 418')}), and the EDD withholds 10% only if you ask. The ${h.src(tx.source!, 'Franchise Tax Board')} confirms that California does not tax it, so nothing goes on the state return. If you cannot work because of an illness or to care for a relative, the right claim is disability or ${h.a('california-paid-family-leave', 'Paid Family Leave')}, not unemployment.</p>
`,
  faqs: [
    { q: 'What is the highest unemployment check in California in 2026?', a: `${K.usd(S.max)} a week. You reach it with about ${K.usd(capQ)} or more in your best quarter of the base period. The lowest amount is ${K.usd(S.min)}. Over a full claim of ${S.weeks[1]} weeks, the most anyone can draw from regular state benefits is ${K.usd(S.max * S.weeks[1])}, and the dependents of a claimant do not raise it.` },
    { q: 'Does California tax unemployment benefits?', a: 'No. The Franchise Tax Board excludes unemployment compensation from California taxable income. It remains taxable on the federal return, reported from Form 1099-G. You can ask the EDD to withhold 10% for federal tax, which spreads the cost over the claim instead of leaving it all for April.' },
    { q: 'Why is my California award higher than the calculator shows?', a: 'The EDD table pays a larger share of the best quarter to low earners, close to one twenty-third, while the calculator uses one twenty-sixth for everyone. At low wages the award can be up to 13% higher. Near the ceiling both give the same amount, because the maximum applies.' },
    { q: 'How long can I collect unemployment in California?', a: `Up to ${S.weeks[1]} weeks in a benefit year, as long as the total stays under half of your base-period wages. For most claimants that second limit never applies, since half of a year of wages is far more than ${S.weeks[1]} weekly payments. Federal extended benefits are paid only in periods of high unemployment.` },
  ],
  tool: 'ui', toolArg: { st: 'CA', lock: 1, pay: 45000 },
  related: ['unemployment-calculator', 'unemployment-benefits-by-state', 'california-sdi', 'california-paid-family-leave', 'partial-unemployment', 'are-unemployment-benefits-taxable'],
  sources: ['dol_sigpros', 'dol_statelaws', 'ftb_ui', 'irs_tc418', 'irs_w4v'],
});
