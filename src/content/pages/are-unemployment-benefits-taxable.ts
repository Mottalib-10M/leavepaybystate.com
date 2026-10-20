import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const F = K.FEDERAL;
const wh = F.voluntaryWithholding;
const sd = F.standardDeduction;
const [[b1, r1], [b2, r2], [, r3]] = F.brackets.single as Array<[number, number]>;
const ex1 = { amt: 9000, oth: 30000 }, ex2 = { amt: 14000, oth: 48000 }, ex3 = { amt: 6000, oth: 8000 };
const t1 = K.taxOn(ex1.amt, ex1.oth), t2 = K.taxOn(ex2.amt, ex2.oth), t3 = K.taxOn(ex3.amt, ex3.oth);
const tm = K.taxOn(ex2.amt, ex2.oth, 'mfj');
const ST = K.P.stateTaxOnUI as unknown as Record<string, { status: string; source: string }>;
const codes = (s: string) => Object.entries(ST).filter(([k, v]) => k !== '_doc' && v.status === s).map(([k]) => K.S(k).name);
const exempt = codes('exempt'), none = codes('none'), taxed = codes('taxed');
const tx = K.ui('TX', 48000);

export default definePage({
  id: 'are-unemployment-benefits-taxable', group: 'guides', order: 300, slug: 'are-unemployment-benefits-taxable',
  nav: 'Is unemployment taxable?', card: `Yes for the IRS, sometimes for your state: how much federal tax your 2026 unemployment benefits add, and the ${K.pct(wh)} withholding option.`,
  title: 'Unemployment Tax 2026: Federal Tax on Benefits and W-4V',
  description: `Unemployment benefits are taxable income in 2026. See the federal tax your benefits add, the ${K.pct(wh)} withholding on Form W-4V and which states do not tax them.`,
  h1: 'Are unemployment benefits taxable? The 2026 federal and state answer',
  intro: `The IRS taxes unemployment benefits as ordinary income, and nothing is withheld unless you ask. Enter what you received and your other income to see the federal tax they add.`,
  resume: `Unemployment benefits are taxable income for federal purposes: the IRS says you must generally include in income all unemployment compensation you receive, and the agency reports it on Form 1099-G. No tax is withheld unless you file Form W-4V, which sets a flat ${K.pct(wh)} on each payment. The tax actually due depends on your other income. For a single filer with ${K.usd(ex1.oth)} of wages, ${K.usd(ex1.amt)} of benefits adds about ${K.usd(t1)} of federal tax, ${K.pct(t1 / ex1.amt, 1)} of the benefits. With ${K.usd(ex2.oth)} of wages, ${K.usd(ex2.amt)} of benefits adds about ${K.usd(t2)}. A worker with only ${K.usd(ex3.oth)} of other income may owe nothing, because the 2026 standard deduction of ${K.usd(sd.single)} absorbs most of it: the tax on ${K.usd(ex3.amt)} of benefits is ${K.usd(t3)}. States differ. ${exempt.join(', ')} do not tax unemployment; ${none.join(' and ')} have no individual income tax; ${taxed.join(', ')} taxes it in full. Benefits are not a reason to skip a return.`,
  body: (h) => `
<h2>What the IRS counts</h2>
<p>Unemployment compensation is income: the IRS says you must generally include in income all of it you receive (${h.src('irs_tc418', 'IRS Topic 418')}). The state sends you a Form 1099-G after the year ends, with the total in box 1, and the amount goes on Schedule 1 of your Form 1040 (${h.src('irs_p525', 'IRS Publication 525')}). It is taxed at your ordinary rates, the same as wages. Partial benefits, paid while you work reduced hours, count the same way as full weekly checks; the ${h.a('partial-unemployment', 'partial unemployment page')} explains how those are computed. The 2026 brackets and standard deduction come from ${h.src('irs_rp_2025_32', 'Revenue Procedure 2025-32')}: for a single filer, ${K.pct(r1)} on taxable income up to ${K.usd(b1)}, ${K.pct(r2)} up to ${K.usd(b2)}, ${K.pct(r3)} above that, and so on.</p>
<p>Because benefits are paid while you earn less, the year often falls into a lower bracket than usual. That is why the tax on benefits can be smaller than the ${K.pct(wh)} you could have withheld, or larger when a good salary in the first months of the year pushes the total up.</p>
${h.mini('tax', { t: 'Tax on your benefits', p: ['amt', 'oth'], d: { kind: 'ui', amt: 9000, oth: 30000 } })}
<h2>Three cases for 2026</h2>
${h.table(['Situation', 'Benefits', 'Other income', 'Federal tax added'], [
    ['Single, laid off mid-year', K.usd(ex1.amt), K.usd(ex1.oth), K.usd(t1)],
    ['Single, longer claim', K.usd(ex2.amt), K.usd(ex2.oth), K.usd(t2)],
    ['Married filing jointly, same income', K.usd(ex2.amt), K.usd(ex2.oth), K.usd(tm)],
    ['Single, little other income', K.usd(ex3.amt), K.usd(ex3.oth), K.usd(t3)],
  ], 'Federal income tax added by unemployment benefits, 2026 brackets, standard deduction, no credits.', ['l', 'r', 'r', 'r'])}
<p>The married couple pays less on the same benefits because the joint standard deduction is ${K.usd(sd.mfj)} and the brackets are wider. Credits, such as the child tax credit, can lower the bill further; this estimate leaves them out.</p>
<h2>Withholding: the ${K.pct(wh)} choice</h2>
<p>When you file a claim, the agency usually asks whether to withhold federal tax. If you said no, you can still send Form W-4V, which allows only one rate for unemployment, ${K.pct(wh)} of each payment (${h.src('irs_w4v', 'Form W-4V')}). On a Texas claim of ${K.usd(tx.weekly)} a week, that is ${K.usd(tx.weekly * wh)} a week. If you expect your year to be in a higher bracket, ${K.pct(wh)} will not cover all of it, and estimated tax payments are the way to avoid a surprise.</p>
<h2>State income tax</h2>
<p>States decide for themselves. Among those this site has checked on official pages, ${exempt.join(', ')} exclude unemployment from state income; ${none.join(' and ')} levy no individual income tax; ${taxed.join(', ')} includes it on the state return. The other states have not all been read for this site, so check your state's own instructions before filing. A state that exempts unemployment does not necessarily exempt paid family leave; New Jersey, for instance, lists both among income residents do not report.</p>
<h2>Setting money aside</h2>
<p>A practical rule is to put aside, from each payment, the rate of the top bracket your year will reach. A single filer who earned ${K.usd(48000)} before the layoff reaches the ${K.pct(K.marginal(48000))} bracket, so on a weekly check of ${K.usd(tx.weekly)} that means about ${K.usd(tx.weekly * K.marginal(48000))}. Someone whose only income for the year is the benefit itself may owe much less, or nothing, once the standard deduction is applied. The calculator above gives the figure for your own numbers.</p>
<h2>Related pages</h2>
<p>The ${h.a('unemployment-calculator', 'unemployment calculator')} estimates the benefit itself, and the ${h.a('unemployment-benefits-by-state', 'state by state table')} compares weekly amounts. For leave benefits, the rules differ: see the ${h.a('is-paid-family-leave-taxable', 'paid family leave tax page')}.</p>
`,
  faqs: [
    { q: 'Do I have to pay federal tax on unemployment benefits in 2026?', a: `Yes. Unemployment compensation is taxable income and is reported to you on Form 1099-G. Whether you actually owe depends on your total income: with ${K.usd(ex1.oth)} of wages, ${K.usd(ex1.amt)} of benefits adds about ${K.usd(t1)} for a single filer. With little other income, the standard deduction may cover it.` },
    { q: 'How much federal tax is withheld from unemployment?', a: `None, unless you ask. You can choose withholding when you file or later with Form W-4V, and the only rate allowed is ${K.pct(wh)} of each payment. If your other income puts you in a higher bracket, that ${K.pct(wh)} may not cover the full tax, and the rest is due when you file.` },
    { q: 'Which states do not tax unemployment benefits?', a: `Among the states whose official instructions this site has read, ${exempt.join(', ')} exclude unemployment compensation from state income tax, and ${none.join(' and ')} have no individual income tax. Other states have not all been checked here; your state's income tax instructions give the answer.` },
    { q: 'Is unemployment taxed like wages?', a: `For income tax, yes: it is added to your other income and taxed at the same 2026 brackets after the standard deduction of ${K.usd(sd.single)} for a single filer. The difference is that nothing is withheld automatically, so the tax arrives at filing time unless you used Form W-4V or paid estimated tax.` },
  ],
  tool: 'tax', toolArg: { kind: 'ui', amt: 9000, oth: 30000 },
  related: ['unemployment-calculator', 'is-paid-family-leave-taxable', 'unemployment-benefits-by-state', 'how-long-unemployment-lasts', 'partial-unemployment'],
  sources: ['irs_tc418', 'irs_p525', 'irs_w4v', 'irs_rp_2025_32', 'ftb_ui', 'nj_1040i', 'pa_comp', 'va_760', 'al_40', 'mt_form2', 'wa_dor', 'sd_dor'],
});
