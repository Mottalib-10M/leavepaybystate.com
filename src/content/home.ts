/** Text of the home page (the pillar). Every figure comes from the kit. */
import { KIT as K } from '../lib/kit';
import type { FAQ, Helpers } from '../lib/page-types';

const PAY = 52000;
const ca = K.ui('CA', PAY), tx = K.ui('TX', PAY), wa = K.ui('WA', PAY), fl = K.ui('FL', PAY), ma = K.ui('MA', PAY);
const caPfl = K.pw('ca-pfl', PAY), nyPfl = K.pw('ny-pfl', PAY), waPf = K.pw('wa-pfml', PAY), njFli = K.pw('nj-fli', PAY);
const thCa = K.th('CA', PAY);
const computed = K.STATES.filter((s) => !s.table);
const maxes = [...K.STATES].sort((a, b) => b.max - a.max);
const paying = K.PROGRAMS.filter((p) => p.status === 'paying');
const newIn2026 = paying.filter((p) => p.start && p.start.startsWith('2026'));
const md = K.Pg('md-famli');

/** The value sentence (RECETTE §2.4), shown on the home page, the About page and the method page. */
export const VALUE = `Each state agency publishes a calculator for its own program and nothing else: the unemployment office estimates unemployment, the disability office estimates disability, and none of them says what the check is worth after federal tax or next to the pay it replaces. This site puts the 51 unemployment formulas of the Department of Labor table and the ${paying.length} paid leave and disability programs paying in 2026 behind one form, so one pay gives every benefit your state would pay, a week and in total, with the rule that produced it.`;

export const HOME = {
  title: 'Unemployment and Paid Leave by State 2026: Weekly Benefit',
  description: `Unemployment, disability and paid family leave benefits by state for 2026: weekly amount, weeks, total, federal tax and the share of take-home pay it replaces.`,
  h1: 'Unemployment, disability and paid family leave: what your state pays a week',
  intro: 'Choose the state, enter the pay of the last twelve months and say what happened. The weekly benefit, the weeks and the total appear at once, with every other program of the state for the same pay.',
  resume: `A worker who earned ${K.usd(PAY)} last year with steady pay would draw about ${K.usd(ca.weekly)} a week of unemployment in California, ${K.usd(tx.weekly)} in Texas, ${K.usd(wa.weekly)} in Washington and ${K.usd(fl.weekly)} in Florida, where benefits stop after ${K.num(fl.weeks)} weeks instead of ${K.num(ca.weeks)}. The same pay brings ${K.usd(caPfl.weekly)} a week of California paid family leave, ${K.usd(nyPfl.weekly)} in New York, ${K.usd(waPf.weekly)} in Washington and ${K.usd(njFli.weekly)} in New Jersey. Each state sets its own formula: a share of the best quarter in most of them, a share of two quarters or of the whole year in others, always between a floor and a cap that moves every year. In 2026 the highest weekly unemployment cap is ${K.usd(maxes[0].max)} in ${maxes[0].name} and the lowest ${K.usd(maxes[maxes.length - 1].max)} in ${maxes[maxes.length - 1].name}. Unemployment and family leave pay are federal taxable income; disability pay depends on who funded it. The calculator applies the rule of your state to your pay and shows the take-home pay it replaces.`,
  why: (h: Helpers) => `
<h2>Three programs, three formulas, one pay</h2>
<p>Losing a job, falling ill and welcoming a child are three different claims, filed with three different offices in most states, and each one reads your wages its own way. Unemployment in Texas pays one twenty-fifth of your best quarter; Washington paid leave pays 90% of your weekly wage up to half the state average and half of the rest; California disability pays 90% or 70% of the best quarter divided by thirteen. A person who reads all three pages still has three numbers that do not compare.</p>
<p>This site stores each formula as the state wrote it: the share of the best quarter or of the two best quarters, the floor and the cap for 2026, the share of yearly pay that limits the total, the weeks. For unemployment, the source is the table the U.S. Department of Labor publishes twice a year for all states, in its edition effective July 2026 (${h.src('dol_sigpros', 'Significant Provisions of State UI Laws')}), updated where a state has raised its cap since. For paid leave and disability, it is the agency's own page or the statute, read on ${K.day(K.RETRIEVED)}. The ${h.a('method', 'method page')} lists what each figure rests on and where the engine simplifies.</p>
${h.mini('states', { t: 'Your pay in every state', p: ['pay'], d: { pay: PAY } })}
<h2>A week of benefit against a week of pay</h2>
<p>No benefit replaces a full paycheck, and the gap depends more on the cap than on the rate. At ${K.usd(PAY)} a year, a single filer in California takes home about ${K.usd(thCa.net)} a week after federal income tax, Social Security, Medicare and the state disability premium; unemployment at ${K.usd(ca.weekly)} replaces ${K.pct(ca.weekly / thCa.net)} of it before tax, family leave at ${K.usd(caPfl.weekly)} replaces ${K.pct(caPfl.weekly / thCa.net)}. Above the cap, every extra dollar of salary widens the gap: a Massachusetts claimant can draw up to ${K.usd(ma.state.max)} a week of unemployment, a Florida claimant ${K.usd(fl.state.max)}.</p>
<p>Federal income tax applies to unemployment (${h.src('irs_tc418', 'IRS Topic 418')}) and, since 2025, to state family leave benefits (${h.src('irs_rr_2025_4', 'Revenue Ruling 2025-4')}). Nothing is withheld unless you ask for the flat 10% with ${h.src('irs_w4v', 'Form W-4V')}; the ${h.a('are-unemployment-benefits-taxable', 'tax page')} estimates what is left to pay in April.</p>
<h2>What changed in 2026</h2>
<p>${newIn2026.map((p) => `${p.name} started paying on ${K.day(p.start!)}`).join('; ')}. ${md.name} is still to come: contributions start on ${K.day(md.contribStart!)} and benefits on ${K.day(md.start!)}, with weekly amounts not yet published. Massachusetts raised its unemployment cap to ${K.usd(ma.state.max)} for benefit years from October 4, 2026, and Washington's paid leave cap of ${K.usd(K.Pg('wa-pfml').max!)} is set to move again in January.</p>
<h2>What these estimates are not</h2>
<p>They are the state's formula applied to the pay you type, not the agency's decision. The agency reads the wages your employers reported for a base period that usually ends three to six months before the claim, checks why you left, and may pay a dependents' allowance or a different number of weeks when its unemployment rate moves. The ${computed.length} unemployment formulas computed here leave out Alaska and Virginia, which set the amount in a wage table written into their law.</p>
`,
  faqs: [
    { q: 'How much unemployment will I get a week?', a: `Usually about half of your former weekly pay, up to your state's cap. At ${K.usd(PAY)} a year with steady pay, the estimate is ${K.usd(ca.weekly)} in California, ${K.usd(tx.weekly)} in Texas and ${K.usd(wa.weekly)} in Washington. Most states divide your best quarter by 23 to 26; a few use two quarters or the whole year. Enter your state and pay above for your own figure.` },
    { q: 'Which states pay paid family leave in 2026?', a: `${[...new Set(paying.filter((p) => p.kind !== 'medical').map((p) => K.S(p.state).name))].join(', ')}. Hawaii pays temporary disability only. Maryland collects contributions from 2027 and pays from 2028. In every other state, paid family leave exists only if your employer offers it.` },
    { q: 'Can I collect unemployment and paid family leave at the same time?', a: 'No. Unemployment is paid to people able and available for work, while paid leave and disability pay people who cannot work for a covered reason. A state pays one or the other for a given week. You can move from one to the other, for example from disability after a birth to unemployment once you are able to work and looking.' },
    { q: 'Do I have to pay taxes on unemployment and paid leave?', a: 'Unemployment is fully taxable by the IRS, and so are state family leave benefits under Revenue Ruling 2025-4. Medical or disability leave benefits are taxable only for the part paid for by your employer. Several states, among them California, New Jersey and Pennsylvania, do not tax unemployment. Nothing is withheld unless you ask.' },
    { q: 'Why is my estimate different from the agency letter?', a: 'The agency uses the wages your employers reported for its base period, often the first four of the last five completed quarters, and may count a dependents allowance, a different quarter or fewer weeks. If your best quarter was higher or lower than an even share of the year, enter it in More options. The letter from the agency is the amount that counts.' },
    { q: 'Is this site run by a state agency?', a: 'No. It is published by Radif Partners, an independent company. It files no claim, asks for no name or e-mail and sends nothing anywhere: the calculator runs in your browser. To claim, use your state agency, which every state and program page of this site names with its official address.' },
  ] as FAQ[],
  sources: ['dol_sigpros', 'irs_tc418', 'irs_rr_2025_4', 'irs_rp_2025_32', 'edd_pfl', 'nypfl_2026', 'wa_how'],
};
