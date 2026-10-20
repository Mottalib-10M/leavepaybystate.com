import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { UI_STATE_PAGES } from '../../lib/planned';

const ALL = K.STATES;
const top = (s: (typeof ALL)[number]) => s.weeksCap ?? s.weeks[1];
const list = (xs: Array<{ name: string }>) => xs.length < 2 ? xs.map((s) => s.name).join('') : `${xs.slice(0, -1).map((s) => s.name).join(', ')} and ${xs[xs.length - 1].name}`;
const range = (s: (typeof ALL)[number]) => (s.weeks[0] === s.weeks[1] ? `${s.weeks[1]}` : `${s.weeks[0]} to ${s.weeks[1]}`);
const uniform = ALL.filter((s) => s.weeks[0] === s.weeks[1] && s.weeks[1] === 26);
const longest = [...ALL].sort((x, y) => top(y) - top(x))[0];
const under = ALL.filter((s) => top(s) < 26).sort((x, y) => top(x) - top(y));
const idx = ALL.filter((s) => s.idx);
const capped = ALL.filter((s) => s.bpwFrac !== null);
const groups = [...new Set(capped.map((s) => s.bpwFrac!))].sort((x, y) => x - y).map((f) => ({ f, states: capped.filter((s) => s.bpwFrac === f) }));
const fracLabel = (f: number) => (f >= 1 ? 'all of base-period wages' : Math.abs(f - 1 / 3) < 0.001 ? 'a third' : f === 0.5 ? 'half' : f === 0.25 ? 'a quarter' : K.pct(f));
const tx = K.ui('TX', 20000, 8000, 5000);
const ny = K.ui('NY', 20000, 8000, 5000);
const wi = K.ui('WI', 20000, 8000, 5000);
const shortest = top(under[0]);

export default definePage({
  id: 'how-long-unemployment-lasts', group: 'unemployment', order: 102, slug: 'how-long-unemployment-lasts',
  nav: 'How long it lasts', card: `From ${shortest} to ${top(longest)} weeks: the duration of unemployment benefits in every state, and the caps that shorten a claim.`,
  title: 'Unemployment Duration 2026: How Many Weeks in Each State',
  description: `How long unemployment lasts in 2026: ${shortest} to ${top(longest)} weeks by state, the ${idx.length} states that tie weeks to the jobless rate, and the wage caps that end claims early.`,
  h1: 'How long does unemployment last? Weeks by state in 2026',
  intro: `Most states pay up to 26 weeks, but ${under.length} pay fewer and many cut a claim short when your earnings were uneven. Check your own weeks with the calculator.`,
  resume: `Regular state unemployment lasts up to 26 weeks in most of the country, but the real answer depends on two limits. The first is a number of weeks written into the law: ${uniform.length} jurisdictions give a flat 26 weeks to everyone who qualifies, ${longest.name} goes to ${top(longest)}, and ${under.length} pay fewer, down to ${shortest} weeks in ${list(under.filter((s) => top(s) === shortest))}. In ${idx.length} states that number moves with the state unemployment rate, so claims are shortest when jobs are plentiful. The second limit is a cap on the total, set as a share of the wages in your base period, which ${capped.length} jurisdictions apply, from a quarter of base-period wages to all of them. That cap is what cuts claims for seasonal and part-year workers. Someone who earned ${K.usd(20000)} with ${K.usd(8000)} in one quarter gets ${K.dec(tx.weeks)} weeks in Texas, ${K.dec(wi.weeks)} in Wisconsin and the full ${K.dec(ny.weeks)} in New York, which has no such cap. Federal extended benefits can add weeks in a recession; they are not counted here.`,
  body: (h) => `
<h2>Two limits, whichever comes first</h2>
<p>A claim ends when you have drawn either the maximum number of weeks or the maximum benefit amount, the total the agency computes at the start. In states without a wage-based cap, the two are the same thing: weekly amount times weeks. In the others, the maximum benefit is the lesser of that product and a fraction of your base-period wages, and your monetary determination letter states it in dollars. Divide it by your weekly amount to see how many weeks you really have. The calculator does the same, using the top of each state's range.</p>
<p>The figures on this page come from the ${h.src('dol_sigpros', 'July 2026 DOL table of significant provisions')}, which gives each state's range of weeks and the formula of its maximum benefit amount.</p>
${h.mini('ui', { t: 'How many weeks you would get', p: ['st', 'pay', 'hq'], d: { st: 'FL', pay: 20000, hq: 8000 } })}
<h2>States that pay fewer than 26 weeks</h2>
<p>${under.map((s) => `${s.name} (${top(s)})`).join(', ')}. Some of these set the lower number outright, as South Carolina does. Others, listed in the next section, scale the weeks to the unemployment rate, so the figure shown is either the maximum now in force or the top of their scale. The shortest durations, ${shortest} weeks, combine with low weekly maximums, so total benefits there are a fraction of what a 26-week state pays: a full claim at the ceiling is ${K.usd(K.S('FL').max * top(K.S('FL')))} in Florida, against ${K.usd(K.S('NY').max * top(K.S('NY')))} in New York.</p>
<h2>States that tie weeks to the jobless rate</h2>
<p>${idx.length} states index duration to the state unemployment rate: ${idx.map((s) => `${s.name} (${range(s)})`).join(', ')}. The DOL table gives the range. For Georgia and North Carolina it also reports the maximum in force now, at the short end of the scale, and the calculator uses that figure; for the others it shows the top of the range, so read the total as a best case and wait for the state's determination. Arizona's rule is the simplest of the group: 26 weeks normally, ${top(K.S('AZ'))} when its rate was below 5% in the prior calendar quarter.</p>
<h2>Caps tied to your base-period wages</h2>
<p>${groups.map((g) => `${fracLabel(g.f)[0].toUpperCase()}${fracLabel(g.f).slice(1)}: ${list(g.states)}`).join('. ')}. The lower the fraction, the more often it binds. With steady pay the weeks usually run out first; with pay packed into one or two quarters, the fraction does. In a best-quarter state the weekly amount is high relative to the year, which makes the cap bite harder: the ${K.usd(20000)} example above loses weeks in Texas but not in New York. Where a state averages the whole year, as Oregon or Indiana do, the formula itself keeps you under the cap.</p>
<h2>Uniform duration</h2>
<p>${list(uniform)} give every eligible claimant the same number of weeks regardless of earnings. That favors part-year workers, who would get fewer weeks elsewhere. New Jersey, Ohio and Pennsylvania instead scale duration to the weeks you actually worked, which is a separate way of tying length to your record.</p>
<h2>Every state at a glance</h2>
${h.table(['State', 'Weeks', 'Maximum benefit amount (DOL wording)'], ALL.map((s) => [UI_STATE_PAGES[s.code] ? h.a(UI_STATE_PAGES[s.code], s.name) : s.name, s.weeks[0] === top(s) ? String(top(s)) : `${s.weeks[0]} to ${top(s)}`, s.mbaText]), 'Weeks payable and maximum benefit by state, July 2026. WBA: weekly benefit amount. BPW: base-period wages.', ['l', 'r', 'l'])}
<p>After the regular weeks, nothing more is paid unless the federal-state extended benefits program is triggered in your state by high unemployment, or Congress passes an emergency program. Neither is in effect by default. The ${h.a('unemployment-benefits-by-state', 'state comparison')} adds weekly amounts to these durations, and the ${h.a('unemployment-calculator', 'calculator')} gives your own figures.</p>
`,
  faqs: [
    { q: 'How many weeks of unemployment can you get in 2026?', a: `Up to 26 weeks in most states, ${top(longest)} in ${longest.name}, and fewer in ${under.length} states, as few as ${shortest}. Many states also cap the total at a share of your base-period wages, so uneven earners can get fewer weeks than the maximum. Your monetary determination states the amount available.` },
    { q: 'Which states pay unemployment for less than 26 weeks?', a: `${under.map((s) => `${s.name} (${top(s)})`).join(', ')}. Most of them tie the number of weeks to the state unemployment rate, so the figure can rise if joblessness increases. The weeks shown are the current maximum or the top of the range.` },
    { q: 'Can unemployment benefits run out before 26 weeks?', a: 'Yes, if your state caps the total at a share of your base-period wages and most of your earnings fell in one or two quarters. The weekly amount is then high relative to the year, and the capped total is exhausted early. States without such a cap, like New York, pay all their weeks.' },
    { q: 'What happens when unemployment benefits run out?', a: 'Regular benefits stop once you have drawn the maximum amount or weeks of your benefit year. Extra weeks come only from federal extended benefits, which start when a state\'s unemployment rate crosses set triggers, or from emergency programs passed by Congress. A new claim requires a new benefit year and enough new wages.' },
  ],
  tool: 'ui', toolArg: { st: 'FL', pay: 20000, hq: 8000 },
  related: ['unemployment-benefits-by-state', 'unemployment-calculator', 'florida-unemployment', 'massachusetts-unemployment', 'georgia-unemployment', 'base-period-high-quarter'],
  sources: ['dol_sigpros', 'dol_statelaws'],
});
