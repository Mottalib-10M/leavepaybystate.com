import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const PAY = 48000;
const rows = ['CA', 'TX', 'NY', 'FL', 'PA', 'IL'].map((c) => ({ s: K.S(c), r: K.ui(c, PAY) }));
const comp = K.STATES.filter((s) => !s.table);
const hqStates = comp.filter((s) => s.alts!.length === 1 && s.alts![0].base === 'hq').length;
const two = comp.filter((s) => s.alts!.some((a) => a.base === 'avg2' || a.base === 'sum2')).length;
const year = comp.filter((s) => s.alts!.every((a) => a.base === 'bpw')).length;
const uneven = K.ui('NY', PAY, 18000, 12000), even = K.ui('NY', PAY);

export default definePage({
  id: 'unemployment-calculator', group: 'unemployment', order: 100, slug: 'unemployment-calculator',
  nav: 'Unemployment calculator', card: 'How much unemployment you will get a week, for how many weeks and in total, in any state.',
  title: 'Unemployment Calculator 2026: How Much Will I Get a Week?',
  description: 'Unemployment calculator for 2026: weekly benefit, weeks and total in all 50 states and DC, from each state formula and cap, with federal tax and take-home pay.',
  h1: 'How much unemployment will I get per week? The 2026 calculator for every state',
  intro: 'Pick your state and enter what you earned over the last twelve months. If one quarter was much better than the others, add it under More options: most states pay from the best quarter.',
  resume: `Unemployment pays roughly half of your former weekly wage, up to a cap your state sets each year. With ${K.usd(PAY)} of steady pay over the base period, the estimate is ${rows.map((x) => `${K.usd(x.r.weekly)} a week in ${x.s.name}`).join(', ')}. ${hqStates} jurisdictions compute the amount from the single quarter in which you earned the most, usually dividing it by 23 to 26; ${two} use the two best quarters, and ${year} use the pay of the whole base period. All of them then hold the result between a minimum and a maximum: in 2026 the maximums run from ${K.usd(Math.min(...K.STATES.map((s) => s.max)))} to ${K.usd(Math.max(...K.STATES.map((s) => s.max)))}. The number of weeks is a second limit: up to 26 in most states, fewer where the law ties the duration to the unemployment rate or caps the total at a share of your wages.`,
  body: (h) => `
<h2>What the calculator needs from you</h2>
<p>The agency will use the wages your employers reported for your base period, which in nearly every state is the first four of the last five calendar quarters completed before you file. A claim filed in November 2026 usually looks at July 2025 through June 2026. The calculator asks for the pay of the last twelve months as a stand-in, and, if your pay was uneven, for the two best quarters. These two numbers matter: in New York, ${K.usd(PAY)} earned evenly gives ${K.usd(even.weekly)} a week, while the same ${K.usd(PAY)} with ${K.usd(18000)} in one quarter gives ${K.usd(uneven.weekly)}.</p>
<p>Gross wages are what count, before tax and deductions, including overtime, tips reported to the employer, commissions and bonuses in the quarter they were paid. Severance and vacation pay are treated differently from state to state; the agency's letter will tell you how it counted them.</p>
${h.mini('ui', { t: 'Try another state', p: ['st', 'pay'], d: { st: 'PA', pay: PAY } })}
<h2>The three families of formulas</h2>
<p>A best-quarter state, such as Texas or California, divides that quarter by a fixed number: 25 in Texas, 26 in California. A two-quarter state, such as Illinois or Georgia, averages or adds the two best quarters before applying its rate, which smooths out one exceptional quarter. A whole-year state, such as Oregon or Kentucky, takes a percentage of the base-period total, 1.25% in Oregon. Colorado and Minnesota compute two ways and pay the higher, each with its own cap. The ${h.a('base-period-high-quarter', 'base period page')} explains how to find your own quarters.</p>
<p>The ${h.a('unemployment-benefits-by-state', 'state by state table')} runs one pay through all 49 computed jurisdictions at once. Alaska and Virginia set the amount in a wage table written into their statutes, which this site does not reproduce; their pages show the range.</p>
<h2>From weekly amount to total</h2>
<p>The total of a claim is the weekly amount times the weeks, unless the state also caps the total at a share of base-period wages: a quarter in Florida and Georgia, 27% in Texas, a third in many states, half in California. With uneven pay, this second cap often bites before the weeks run out. The ${h.a('how-long-unemployment-lasts', 'duration page')} lists the weeks of every state.</p>
<h2>Before the number: do you qualify?</h2>
<p>An amount means nothing if the claim is refused, and refusals come from two different tests. The first is monetary: each state asks for a minimum of wages in the base period, often a multiple of the weekly amount or of the high quarter, and usually wages in at least two quarters. The calculator applies that test where the state writes it as a formula, and returns zero when your pay falls short. The second test is about why you are out of work. A layoff, a closed plant or hours cut by the employer usually pass; quitting without a reason the state accepts, or being fired for misconduct, usually do not, whatever your wages were. Each week of the claim you must also be able to work, available for it and looking for it, and report any earnings. None of these conditions shows up in the formula, which is why the state page for your claim lists them next to the amount.</p>
<h2>After the number</h2>
<p>Benefits are federal taxable income, and nothing is withheld unless you ask for the flat 10% (${h.src('irs_w4v', 'Form W-4V')}); the ${h.a('are-unemployment-benefits-taxable', 'tax page')} estimates what remains due. Part-time work during a claim reduces the check by a rule of its own, covered on the ${h.a('partial-unemployment', 'partial unemployment page')}. And if you cannot work because of illness, pregnancy or a family member's illness, unemployment is the wrong claim: the ${h.a('paid-family-leave', 'paid leave page')} lists the states that pay instead.</p>
`,
  faqs: [
    { q: 'How is my weekly unemployment benefit calculated?', a: 'Most states take the wages of the best quarter of your base period and divide them by a number between 21 and 26, which is about half of your weekly pay in that quarter. Others use the two best quarters or the whole year. The result is then held between the state minimum and maximum for the year your claim starts.' },
    { q: 'What counts as the base period for unemployment?', a: 'In most states, the first four of the last five completed calendar quarters before your claim. If you do not qualify with it, many states offer an alternate base period of the last four completed quarters. The agency uses the wages your employers reported for those quarters, which you can check on the monetary determination letter.' },
    { q: 'Why does my best quarter matter so much?', a: `Because most states compute the weekly amount from it alone. Two people with the same yearly pay can get different checks if one earned more in a single quarter. In New York, ${K.usd(PAY)} spread evenly gives ${K.usd(even.weekly)} a week, and the same year with ${K.usd(18000)} in one quarter gives ${K.usd(uneven.weekly)}.` },
    { q: 'Is the estimate the amount I will receive?', a: 'It is the state formula applied to the pay you entered. The agency uses reported wages, may add a dependents allowance in about a dozen states, and checks why you left your job. Its monetary determination letter gives the amount that counts; if it seems wrong, you can ask the agency to correct the wages.' },
  ],
  tool: 'ui', toolArg: { st: 'CA', pay: PAY },
  related: ['unemployment-benefits-by-state', 'how-long-unemployment-lasts', 'base-period-high-quarter', 'are-unemployment-benefits-taxable', 'texas-unemployment', 'california-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'irs_tc418', 'irs_w4v'],
});
