import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('IN');
const m = S.alts![0].mult;
const capYear = Math.ceil(S.max / m);
const a = K.ui('IN', 30000);
const b = K.ui('IN', 40000);
const spike = K.ui('IN', 30000, 15000, 6000);
const share = m * S.weeks[1];
const th = K.th('IN', 60000);

export default definePage({
  id: 'indiana-unemployment', group: 'unemployment', order: 124, slug: 'indiana-unemployment', st: 'IN',
  nav: 'Indiana unemployment', card: `47% of your average weekly wage over the whole base period, up to ${K.usd(S.max)} a week for 26 weeks.`,
  title: `Indiana Unemployment 2026: Whole-Year Formula and ${K.usd(S.max)} Cap`,
  description: `Indiana unemployment in 2026: 47% of your average weekly wage over the full base period, ${K.usd(S.min)} to ${K.usd(S.max)} a week, up to 26 weeks. Check your own amount here.`,
  h1: `Indiana unemployment in 2026: the whole year counts, up to ${K.usd(S.max)} a week`,
  intro: `Indiana averages all four quarters of your base period and pays 47% of that weekly average, between ${K.usd(S.min)} and ${K.usd(S.max)} a week in 2026.`,
  resume: `Indiana's Department of Workforce Development does not single out your best quarter. It takes everything you earned in the base period, divides it by 52 and pays 47% of that average weekly wage, with a minimum of ${K.usd(S.min)} and a maximum of ${K.usd(S.max)} a week. The ceiling applies from about ${K.usd(capYear)} of base-period wages, so many full-time workers reach it: ${K.usd(60000)} of pay gets ${K.usd(S.max)}, ${K.usd(40000)} gets ${K.usd(b.weekly)} and ${K.usd(30000)} gets ${K.usd(a.weekly)}. A strong single quarter makes no difference, only the yearly total does. Benefits last up to ${S.weeks[1]} weeks, and the total is also capped at ${K.pct(S.bpwFrac!)} of base-period wages, a limit the formula itself keeps you under. At the maximum, a full claim pays ${K.usd(S.max * S.weeks[1])}. Eligibility hinges on ${K.usd(4200)} of base-period earnings, ${K.usd(2500)} of them in the final two quarters, plus a year's total worth one and a half times the top quarter.`,
  body: (h) => `
<h2>Why your best quarter does not matter here</h2>
<p>In the states around Indiana, a big quarter raises the check: Michigan uses only the highest quarter, Illinois the two highest. Indiana divides the year's wages by 52. Two workers who each earned ${K.usd(30000)} receive the same ${K.usd(a.weekly)}, even if one of them earned ${K.usd(15000)} of it in a single busy quarter; the calculator gives ${K.usd(spike.weekly)} in that case too. What changes the amount is the total, and missing months of work lower it directly. Someone who started a job halfway through the base period and earned ${K.usd(20000)} has an average built on 52 weeks anyway, and gets ${K.usd(K.ui('IN', 20000).weekly)}.</p>
<p>The rate of 47% and the range of ${K.usd(S.min)} to ${K.usd(S.max)} are those of the ${h.src('dol_sigpros', 'federal Significant Provisions table')}.</p>
${h.mini('ui', { t: 'Your Indiana weekly benefit', p: ['pay'], d: { st: 'IN', lock: 1, pay: 40000 } })}
<h2>A ceiling that comes early</h2>
<p>At ${K.usd(S.max)}, the Indiana maximum is the lowest in its region: Michigan tops out at ${K.usd(K.S('MI').max)}, Ohio at ${K.usd(K.S('OH').max)}, Illinois at ${K.usd(K.S('IL').max)} and Kentucky at ${K.usd(K.S('KY').max)}. For anyone above about ${K.usd(capYear)} a year the benefit stops rising. A single filer on ${K.usd(60000)} takes home about ${K.usd(th.net)} a week after federal and payroll taxes; ${K.usd(S.max)} replaces ${K.pct(S.max / th.net)} of it. Higher earners should plan around that number rather than around half of their pay.</p>
<h2>The 28% cap you will not hit</h2>
<p>The law limits a claim to the lesser of ${S.weeks[1]} weekly payments and ${K.pct(S.bpwFrac!)} of base-period wages. Since the weekly amount is 47% of a fifty-second of those wages, ${S.weeks[1]} payments come to ${K.pct(share, 1)} of them, below the cap. Below the ceiling, everyone who qualifies therefore receives the full ${S.weeks[1]} weeks; above it, a fixed ${K.usd(S.max)} for ${S.weeks[1]} weeks is an even smaller share. See the ${h.a('how-long-unemployment-lasts', 'duration guide')} for states where such caps do bite.</p>
<h2>Vouchers, work search and side income</h2>
<p>Indiana claimants file a weekly voucher through the state's online system and record work search activities. Earnings during a week are deducted from the benefit after a disregard of ${K.usd(100)}. A claimant with a ${K.usd(b.weekly)} benefit who earns ${K.usd(250)} keeps ${K.usd(b.weekly - (250 - 100))} in benefits. The ${h.a('partial-unemployment', 'partial unemployment guide')} compares the states' rules.</p>
<p>Federal income tax applies to every payment (${h.src('irs_tc418', 'IRS Topic 418')}); the department withholds 10% only if you request it.</p>
`,
  faqs: [
    { q: 'What is the top weekly unemployment check in Indiana for 2026?', a: `Indiana stops at ${K.usd(S.max)}. A worker hits that figure once the four base-period quarters add up to roughly ${K.usd(capYear)}, which is an ordinary full-time salary. The bottom of the scale is ${K.usd(S.min)}. Parents get no extra allowance here, and ${S.weeks[1]} weeks at the top amount total ${K.usd(S.max * S.weeks[1])}.` },
    { q: 'How does Indiana calculate unemployment benefits?', a: 'It adds the wages of all four quarters of your base period, divides by 52 to find an average weekly wage, and pays 47% of that average within the state minimum and maximum. Because the whole year counts equally, a single high-earning quarter does not raise the amount the way it would in most states.' },
    { q: 'How much do I need to have earned to qualify in Indiana?', a: `At least ${K.usd(4200)} in the base period, at least ${K.usd(2500)} in its last two quarters, and total base-period wages of one and a half times your best quarter. The separation must also be through no fault of your own, which the department checks with your employer.` },
  ],
  tool: 'ui', toolArg: { st: 'IN', lock: 1, pay: 40000 },
  related: ['unemployment-calculator', 'illinois-unemployment', 'michigan-unemployment', 'ohio-unemployment', 'kentucky-unemployment', 'partial-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
