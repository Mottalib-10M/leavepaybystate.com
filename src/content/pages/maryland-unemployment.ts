import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.S('MD');
const m = S.alts![0].mult;
const capQ = Math.ceil(S.max / m);
const da = S.da!;
const a = K.ui('MD', 30000);
const b = K.ui('MD', 50000);
const dep = 8;
const th = K.th('MD', 50000);

export default definePage({
  id: 'maryland-unemployment', group: 'unemployment', order: 130, slug: 'maryland-unemployment', st: 'MD',
  nav: 'Maryland unemployment', card: `1/24 of your best quarter plus $8 per dependent, ${K.usd(S.min)} to ${K.usd(S.max)} a week, 26 weeks for all.`,
  title: `Maryland Unemployment 2026: 1/24 Formula, ${K.usd(S.max)} Max, ${S.weeks[1]} Weeks`,
  description: `Maryland unemployment in 2026: 1/24 of your best quarter plus $8 per dependent, ${K.usd(S.min)} to ${K.usd(S.max)} a week, for 26 weeks whatever you earned. See your amount.`,
  h1: `Maryland unemployment benefits in 2026: one twenty-fourth of your best quarter, up to ${K.usd(S.max)}`,
  intro: `Maryland divides your best quarter by 24 and adds ${K.usd(dep)} per dependent, within ${K.usd(S.min)} and ${K.usd(S.max)} a week. Every eligible claimant gets ${S.weeks[1]} weeks.`,
  resume: `Maryland's Division of Unemployment Insurance divides the wages of the highest quarter in your base period by 24, a slightly more generous divisor than the 25 or 26 used in many states, and adds ${K.usd(dep)} for each dependent up to five. The 2026 range is ${K.usd(S.min)} to ${K.usd(S.max)} a week, and the ceiling is reached with about ${K.usd(capQ)} in the best quarter, roughly ${K.usd(capQ * 4)} a year of steady pay. So ${K.usd(30000)} gives ${K.usd(a.weekly)} a week and ${K.usd(50000)} already gets ${K.usd(b.weekly)}. Dependents raise the floor to ${K.usd(da[0])} but cannot lift anyone past ${K.usd(da[1])}. The duration is uniform: every eligible claimant has ${S.weeks[1]} weeks, with no cap tied to wages, so a full claim at the ceiling is worth ${K.usd(S.max * S.weeks[1])}. Qualifying needs at least ${K.cents(1176.01)} in the best quarter, ${K.usd(1800)} spread over two quarters, and base-period wages of one and a half times the best quarter.`,
  body: (h) => `
<h2>Dividing by 24</h2>
<p>The divisor is what sets Maryland apart. A best quarter of ${K.usd(7500)} gives ${K.usd(7500 * m)} a week in Maryland, where a twenty-sixth would give ${K.usd(7500 / 26)}. The edge disappears quickly, though, because the ceiling of ${K.usd(S.max)} applies from about ${K.usd(capQ)} in the quarter. Anyone with full-time pay above roughly ${K.usd(capQ * 4)} a year receives the same amount. At ${K.usd(50000)}, a single filer who took home about ${K.usd(th.net)} a week after federal tax and payroll deductions receives ${K.usd(b.weekly)}, about ${K.pct(b.weekly / th.net)} of that.</p>
<p>The figures come from the ${h.src('dol_sigpros', 'Department of Labor table of July 2026')}.</p>
${h.mini('ui', { t: 'Your Maryland weekly benefit', p: ['pay', 'hq'], d: { st: 'MD', lock: 1, pay: 30000 } })}
<h2>The dependents allowance stops at the ceiling</h2>
<p>Maryland adds ${K.usd(dep)} a week for each dependent child or other dependent, up to five, so up to ${K.usd(dep * 5)}. Unlike Illinois or Ohio, the allowance does not create a higher maximum: the total stays within ${K.usd(da[1])}. It therefore helps lower earners only. A claimant with ${K.usd(30000)} of steady pay and two children would receive about ${K.usd(Math.min(da[1], a.weekly + dep * 2))}, while one already at ${K.usd(S.max)} gains nothing. The calculator shows the amount before any allowance.</p>
<h2>${S.weeks[1]} weeks for everyone who qualifies</h2>
<p>Maryland belongs to the small group of states with a uniform duration. The DOL table lists no cap on the total as a share of base-period wages, so whether you earned the minimum to qualify or far more, the claim can last ${S.weeks[1]} weeks. That helps part-year workers in particular. The ${h.a('how-long-unemployment-lasts', 'duration guide')} lists the other uniform states.</p>
<h2>Qualifying on wages</h2>
<p>The monetary test has three parts, and the third is the one that trips people up. You need at least ${K.cents(1176.01)} in the best quarter, at least ${K.usd(1800)} across two quarters, and base-period wages of at least one and a half times the best quarter. A worker whose year was one strong quarter and little else can fail that last condition even with good total pay. The ${h.a('base-period-high-quarter', 'base period guide')} explains the alternate base period that may help.</p>
<h2>Weekly certifications and small earnings</h2>
<p>Claimants file a weekly certification through the BEACON system and complete work search contacts. Small earnings are ignored: up to ${K.usd(50)} in a week does not reduce the check, and pay above that is deducted. The ${h.a('partial-unemployment', 'partial unemployment guide')} compares the states' rules.</p>
<p>Benefits are federal income (${h.src('irs_tc418', 'IRS Topic 418')}), and 10% can be withheld on request. Time off for your own illness or to care for a relative is a different matter, handled by ${h.a('maryland-paid-family-leave', 'Maryland\'s paid family and medical leave program')}, whose page gives its timeline.</p>
`,
  faqs: [
    { q: 'What is the maximum Maryland unemployment benefit in 2026?', a: `${K.usd(S.max)} a week, reached with about ${K.usd(capQ)} in your best quarter. The ${K.usd(dep)} per dependent allowance cannot raise the total past ${K.usd(da[1])}. The minimum is ${K.usd(S.min)}, or ${K.usd(da[0])} with five dependents. Over ${S.weeks[1]} weeks the largest regular claim adds up to ${K.usd(S.max * S.weeks[1])}.` },
    { q: 'How many weeks does Maryland unemployment last?', a: `${S.weeks[1]} weeks for every eligible claimant. Maryland does not reduce the duration for people with lower or uneven earnings, and the July 2026 Department of Labor table shows no total cap based on base-period wages. Additional weeks come only from federal extended benefit programs when they are triggered.` },
    { q: 'Does Maryland pay extra unemployment for children?', a: `Yes, ${K.usd(dep)} a week per dependent, for up to five. The allowance is added to the weekly amount but cannot take it above the state maximum of ${K.usd(S.max)}, so it mainly helps claimants whose formula amount is below the ceiling. You declare dependents when you file the claim.` },
  ],
  tool: 'ui', toolArg: { st: 'MD', lock: 1, pay: 30000 },
  related: ['unemployment-calculator', 'how-long-unemployment-lasts', 'maryland-paid-family-leave', 'pennsylvania-unemployment', 'partial-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
