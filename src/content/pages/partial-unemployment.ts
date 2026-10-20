import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { UI_STATE_PAGES } from '../../lib/planned';

const ALL = K.STATES;
const fixed = ALL.filter((s) => /^\$[\d.,]+$/.test(s.disregard.trim()) || /^Less than or equal to \$|hourly minimum wage/.test(s.disregard));
const ofWages = ALL.filter((s) => /wages/i.test(s.disregard) && !/WBA/.test(s.disregard));
const ofBenefit = ALL.filter((s) => /WBA/.test(s.disregard) && !/wages|earned|hrs/i.test(s.disregard));
const names = (xs: Array<{ name: string }>) => `${xs.slice(0, -1).map((s) => s.name).join(', ')} and ${xs[xs.length - 1].name}`;
const WBA = 400, E = 200;
/** Benefit left after earnings E on a weekly amount WBA, rule by rule, from the `disregard` field of each state. */
const left = (kept: number) => Math.max(0, WBA - Math.max(0, E - kept));
const ex = [
  { st: 'GA', v: left(50) },
  { st: 'IN', v: left(100) },
  { st: 'IL', v: left(WBA / 2) },
  { st: 'OH', v: left(WBA / 5) },
  { st: 'TX', v: left(Math.max(5, WBA / 4)) },
  { st: 'CA', v: left(Math.max(25, E / 4)) },
  { st: 'KY', v: left(E / 5) },
  { st: 'WA', v: left(5 + (E - 5) / 4) },
  { st: 'MN', v: WBA - E * 0.5 },
  { st: 'MI', v: Math.max(0, Math.min(WBA - E * 0.5, 1.5 * WBA - E)) },
].map((x) => ({ ...x, name: K.S(x.st).name }));
const best = [...ex].sort((a, b) => b.v - a.v)[0], worst = [...ex].sort((a, b) => a.v - b.v)[0];

export default definePage({
  id: 'partial-unemployment', group: 'guides', order: 104, slug: 'partial-unemployment',
  nav: 'Partial unemployment', card: 'Working part time on unemployment: how much you can earn each week before the check shrinks, state by state.',
  title: 'Partial Unemployment 2026: Earnings Allowed in Each State',
  description: 'Partial unemployment in 2026: what you can earn each week while on unemployment, the earnings disregard of every state, and worked examples of a reduced check.',
  h1: 'Partial unemployment: how much you can earn while collecting, state by state',
  intro: 'You can usually work some hours and still draw a reduced unemployment check. Each state ignores a slice of your earnings and deducts the rest; here is the slice in every state.',
  resume: `Every state lets you earn something during a week of unemployment and still receive a partial benefit. The rule has two parts: a disregard, the earnings the state ignores, and a reduction for everything above it, usually dollar for dollar. The disregards fall into three groups in the Department of Labor table of July 2026. ${fixed.length} jurisdictions ignore a fixed dollar amount, ${ofBenefit.length} ignore a share of your weekly benefit, and ${ofWages.length} ignore a share of what you earned; Michigan and Minnesota instead cut the benefit by 50 cents per dollar, and New York counts hours. The differences are large. On a ${K.usd(WBA)} weekly benefit with ${K.usd(E)} of earnings, the check is ${K.usd(best.v)} in ${best.name} but ${K.usd(worst.v)} in ${worst.name}. Earnings are reported gross, for the week in which you did the work, and once they pass a certain level no benefit is paid for that week, though the claim stays open. The full table of state rules is below.`,
  body: (h) => `
<h2>How a partial week is paid</h2>
<p>The state starts from your weekly benefit amount, the figure on your monetary determination. Each week you certify, you report your gross earnings, before taxes and deductions, for the week the work was done, even if the paycheck arrives later. The agency subtracts the disregard from those earnings and takes the remainder off the benefit. If the result is zero or below, that week pays nothing, but the claim remains open and the unpaid week stays available for later in the benefit year, up to the maximum amount.</p>
<p>Part-time work does not suspend the other conditions. You still have to be available for full-time work and keep up your work search, and turning down offered hours or suitable work can cost you benefits. Your employer's report of the hours and your own report should match.</p>
${h.mini('ui', { t: 'Your full weekly benefit first', p: ['st', 'pay'], d: { st: 'IL', pay: 45000 } })}
<h2>Three kinds of disregard</h2>
<p>A fixed amount is the simplest: earn up to it and nothing changes. ${names(fixed)} use this approach, according to the ${h.src('dol_sigpros', 'DOL table of July 2026')}. It favors people with small benefits, for whom the fixed amount is a larger share.</p>
<p>A share of the weekly benefit scales with the size of your claim: half of it in Illinois and Colorado, a fifth in Ohio, a third in Massachusetts and Alabama. A claimant with a high benefit can earn more before losing anything. ${ofBenefit.length} jurisdictions use a version of this, sometimes with a dollar floor, as in Texas and Pennsylvania.</p>
<p>A share of your earnings works differently: part of every dollar you earn is always kept. Kentucky ignores a fifth of earnings, Connecticut and Nevada a third, Vermont half, and California the greater of ${K.usd(25)} or a quarter. Washington ignores ${K.usd(5)} plus a quarter of the rest. Under these rules there is always some gain from working more.</p>
<h2>A ${K.usd(WBA)} benefit and ${K.usd(E)} of earnings, in ten states</h2>
${h.table(['State', 'Rule', 'Benefit paid', 'Benefit plus earnings'], ex.map((x) => [UI_STATE_PAGES[x.st] ? h.a(UI_STATE_PAGES[x.st], x.name) : x.name, K.S(x.st).disregard, K.cents(Math.round(x.v * 100) / 100), K.cents(Math.round((x.v + E) * 100) / 100)]), `Benefit for a week with ${K.usd(E)} of gross earnings on a ${K.usd(WBA)} weekly benefit amount.`, ['l', 'l', 'r', 'r'])}
<p>The spread is ${K.usd(best.v - worst.v)} for the same week of work. Michigan and Minnesota stand apart: rather than ignoring a slice, they take 50 cents off the benefit for each dollar earned, so half of your pay is effectively kept. Michigan adds a ceiling: benefit plus earnings may not exceed one and a half times the weekly amount, which here is ${K.usd(1.5 * WBA)}.</p>
<h2>New York counts hours</h2>
<p>New York is the outlier. The DOL table describes its rule in hours: up to 10 hours of work in a week, as long as earnings stay at or below the maximum weekly benefit. The ${h.a('new-york-unemployment', 'New York page')} covers it in more detail.</p>
<h2>Every state's rule</h2>
${h.table(['State', 'Earnings disregarded each week'], ALL.map((s) => [UI_STATE_PAGES[s.code] ? h.a(UI_STATE_PAGES[s.code], s.name) : s.name, s.disregard]), 'Earnings disregarded when computing a partial benefit, by state, July 2026. WBA: weekly benefit amount. Earnings above the disregard reduce the benefit dollar for dollar unless the rule says otherwise.', ['l', 'l'])}
<h2>Before you accept part-time work</h2>
<p>Three practical points. First, compute the week as a whole: in a dollar-for-dollar state, earnings above the disregard add nothing to your income until they are large enough to replace the benefit entirely, so a few extra hours may not pay. Second, report every week honestly; overpayments from unreported earnings are recovered and can carry penalties. Third, if your employer cut your hours rather than ending the job, ask whether your state runs a work-sharing program, which pays a share of the benefit for the hours lost. The ${h.a('unemployment-calculator', 'unemployment calculator')} gives the full weekly amount to start from, and the ${h.a('base-period-high-quarter', 'base period guide')} explains where it comes from.</p>
`,
  faqs: [
    { q: 'Can I work part time and collect unemployment benefits?', a: 'Yes, in every state, as long as you report your gross earnings each week and remain available for full-time work. The state ignores a portion of your earnings, the disregard, and deducts the rest from your weekly benefit. When earnings get high enough, that week pays nothing but the claim stays open.' },
    { q: 'How much can I earn on unemployment before my check is reduced?', a: `It depends on the state. Some ignore a fixed sum, such as ${K.usd(50)} in Georgia or ${K.usd(100)} in Indiana; others a share of your weekly benefit, such as half in Illinois; others a share of your earnings, such as a third in Connecticut. The table on this page lists the rule of each state from the July 2026 DOL table.` },
    { q: 'Do I report earnings when I work or when I get paid?', a: 'For the week in which you did the work, in nearly every state, even if the paycheck arrives the following week or later. Report gross earnings, before taxes and deductions, including tips and commissions. Reporting in the wrong week can create an overpayment that the state will ask you to repay.' },
    { q: 'Is it worth taking part-time work while on unemployment?', a: `Often, but not always. In states that ignore a share of your earnings, every hour adds to your income. In states with a small fixed disregard and dollar-for-dollar reduction, earnings above the disregard mostly replace the benefit. On a ${K.usd(WBA)} benefit with ${K.usd(E)} earned, you keep ${K.usd(best.v + E)} in ${best.name} but ${K.usd(worst.v + E)} in ${worst.name}.` },
  ],
  tool: 'ui', toolArg: { st: 'IL', pay: 45000 },
  related: ['unemployment-calculator', 'base-period-high-quarter', 'michigan-unemployment', 'new-york-unemployment', 'unemployment-benefits-by-state'],
  sources: ['dol_sigpros', 'dol_statelaws'],
});
