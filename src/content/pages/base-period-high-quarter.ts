import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const comp = K.STATES.filter((s) => !s.table);
const hqOnly = comp.filter((s) => s.alts!.length === 1 && s.alts![0].base === 'hq');
const two = comp.filter((s) => s.alts!.some((a) => a.base === 'avg2' || a.base === 'sum2'));
const year = comp.filter((s) => s.alts!.every((a) => a.base === 'bpw'));
const oneHalf = K.STATES.filter((s) => /1½ x HQW/.test(s.qual));
const PAY = 48000;
const evenTx = K.ui('TX', PAY), peakTx = K.ui('TX', PAY, 18000, 12000);
const evenOr = K.ui('OR', PAY), peakOr = K.ui('OR', PAY, 18000, 12000);
const evenIl = K.ui('IL', PAY), peakIl = K.ui('IL', PAY, 18000, 12000);
const caQual = 1300;

export default definePage({
  id: 'base-period-high-quarter', group: 'guides', order: 103, slug: 'base-period-high-quarter',
  nav: 'Base period and high quarter', card: 'Which months of pay your unemployment claim uses, why the best quarter matters, and how to read the monetary determination.',
  title: 'Base Period and High Quarter 2026: Which Wages Count',
  description: 'Base period and high quarter for unemployment in 2026: which months of pay count, the alternate base period, and how to check your monetary determination.',
  h1: 'Base period and high quarter: the wages behind your unemployment check',
  intro: 'Every unemployment formula starts from a base period, usually a year of wages ending a few months before you file. Here is how to find yours and read the letter that lists it.',
  resume: `Your unemployment benefit is computed from a base period, which in nearly every state is the first four of the last five completed calendar quarters before you file. A claim filed in November 2026 therefore uses wages paid from July 2025 through June 2026, and ignores the most recent quarter. If those wages are too low to qualify, many states let you use an alternate base period, the last four completed quarters. Within the base period, the high quarter is the one in which you were paid the most, and it sets the benefit in ${hqOnly.length} jurisdictions. Another ${two.length} use the two best quarters and ${year.length} use the whole base period. The difference shows with uneven pay: ${K.usd(PAY)} with ${K.usd(18000)} in the best quarter gives ${K.usd(peakTx.weekly)} a week in Texas against ${K.usd(evenTx.weekly)} if the same pay was spread evenly, while Oregon pays ${K.usd(peakOr.weekly)} either way. The agency lists your quarters on the monetary determination; check every employer and figure on it.`,
  body: (h) => `
<h2>Finding your base period</h2>
<p>Calendar quarters run January to March, April to June, July to September and October to December. The standard base period skips the quarter you file in and the one before it, called the lag quarter, because employers report wages to the state with a delay, and takes the four quarters before that. Filed in November 2026, a claim uses the third and fourth quarters of 2025 and the first and second of 2026. Filed in February 2027, it moves forward one quarter: October 2025 through September 2026.</p>
<p>Two consequences follow. Pay from your last few months of work often does not count at all. And the timing of a bonus or a raise can decide whether it helps: a commission paid in the lag quarter is outside the base period, but filing one quarter later can bring it in, and push an older quarter out. Wages count in the quarter they were paid, not when the work was done.</p>
<h2>The alternate base period</h2>
<p>When the standard base period does not hold enough wages to qualify, most states look at an alternate base period: the four most recently completed quarters, which includes the lag quarter. It exists mainly for people who started a job recently. If the determination says you do not qualify on wages, ask whether the alternate base period was checked, and have pay stubs ready, since those recent wages may not be in the state's records yet.</p>
${h.mini('ui', { t: 'See what your best quarter changes', p: ['st', 'pay', 'hq', 'q2'], d: { st: 'TX', pay: PAY, hq: 18000, q2: 12000 } })}
<h2>The high quarter, and why it matters</h2>
<p>The ${h.src('dol_sigpros', 'Department of Labor table of state provisions')} sorts the formulas into recognizable groups. In a high-quarter state, the benefit is a fraction of the best quarter alone, so one strong quarter raises it: Texas pays ${K.usd(peakTx.weekly)} on the uneven ${K.usd(PAY)} above and ${K.usd(evenTx.weekly)} on the even version. In a two-quarter state such as Illinois, the effect is diluted, ${K.usd(peakIl.weekly)} against ${K.usd(evenIl.weekly)}. In a whole-year state such as Oregon it disappears: ${K.usd(peakOr.weekly)} and ${K.usd(evenOr.weekly)}. The calculator asks for the best and second-best quarters under More options for this reason.</p>
<p>The high quarter also appears in eligibility tests. ${oneHalf.length} states require base-period wages of at least one and a half times the high-quarter wages, which screens out claims resting on a single quarter of work. Others set a dollar floor for the high quarter itself; California, for example, asks for ${K.usd(caQual)} in it. A seasonal worker can have a strong high quarter and still fail the one-and-a-half test, which is where the alternate base period, or a later filing date, can help.</p>
<h2>Reading the monetary determination</h2>
<p>Shortly after you file, the state sends a monetary determination. It lists each employer and the wages each reported for every quarter of the base period, identifies the high quarter, and states your weekly benefit amount, the maximum benefit amount for the claim and the dates of your benefit year. It decides only the money side: whether you lost the job through no fault of your own is decided separately.</p>
<p>Check it line by line against your pay stubs or W-2s. Missing employers are common, especially for short jobs, work in another state, or wages paid by a staffing agency under a different name. If something is wrong, ask the agency for a reconsideration or redetermination within the deadline printed on the letter, with proof of the wages. A corrected quarter can change both the amount and the weeks. Keep filing your weekly or biweekly claims while the review is pending, or you can lose those weeks.</p>
<h2>Same pay, different quarters</h2>
<p>The base period is also why two coworkers laid off on the same day can get different checks. One may have had a large bonus inside the base period, the other in the lag quarter. One may have started mid-year, the other may have worked overtime in the summer. Once the quarters are on the letter, the state formula is mechanical, and the ${h.a('unemployment-calculator', 'unemployment calculator')} will reproduce it from those figures. The ${h.a('unemployment-benefits-by-state', 'state comparison')} shows which family each state belongs to, and the ${h.a('how-long-unemployment-lasts', 'duration guide')} explains how the same quarters set the length of the claim.</p>
`,
  faqs: [
    { q: 'What is the base period for an unemployment claim filed in late 2026?', a: 'For a claim filed between October and December 2026, the standard base period is July 2025 through June 2026: the first four of the last five completed calendar quarters. The quarter from July to September 2026 is the lag quarter and is not used, unless the state applies an alternate base period.' },
    { q: 'What is an alternate base period for unemployment?', a: 'The four most recently completed calendar quarters before your claim. Most states use it when you do not qualify on the standard base period, which helps people who began working recently. Because those wages may not have been reported yet, the agency may ask for pay stubs or other proof.' },
    { q: 'What does high quarter wages mean on a monetary determination?', a: 'The total wages paid to you in the single calendar quarter of your base period in which you earned the most. Many states compute the weekly benefit as a fraction of it, commonly between a twenty-first and a twenty-sixth, and many eligibility tests compare your base-period total with it.' },
    { q: 'What should I do if wages are missing from my monetary determination?', a: 'Ask the state agency for a reconsideration or redetermination before the deadline on the letter, and send proof such as pay stubs, a W-2 or a letter from the employer. Missing wages from one employer can lower the weekly amount or even make it look as if you do not qualify. Keep certifying while you wait.' },
  ],
  tool: 'ui', toolArg: { st: 'TX', pay: PAY, hq: 18000, q2: 12000 },
  related: ['unemployment-calculator', 'unemployment-benefits-by-state', 'how-long-unemployment-lasts', 'partial-unemployment', 'texas-unemployment', 'new-york-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws'],
});
