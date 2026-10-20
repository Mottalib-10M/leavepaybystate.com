import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { UI_STATE_PAGES } from '../../lib/planned';

const PAY = 50000;
const ALL = K.STATES;
const byMax = [...ALL].sort((x, y) => y.max - x.max);
const top5 = byMax.slice(0, 5);
const low5 = byMax.slice(-5).reverse();
const maxes = ALL.map((s) => s.max).sort((x, y) => x - y);
const medMax = maxes[Math.floor(maxes.length / 2)];
const comp = ALL.filter((s) => !s.table);
const run = comp.map((s) => ({ s, r: K.ui(s.code, PAY) })).sort((x, y) => y.r.weekly - x.r.weekly);
const hiRun = run[0], loRun = run[run.length - 1];
const totals = [...run].sort((x, y) => y.r.total - x.r.total);
const weeksTop = (s: (typeof ALL)[number]) => s.weeksCap ?? s.weeks[1];
const full26 = ALL.filter((s) => weeksTop(s) >= 26).length;
const short = ALL.filter((s) => weeksTop(s) < 26);
const withDa = ALL.filter((s) => s.da !== null);
const atCap = run.filter((x) => x.r.capped === 'max').length;
const names = (list: Array<{ name: string; max: number }>) => list.map((s) => `${s.name} (${K.usd(s.max)})`).join(', ');

export default definePage({
  id: 'unemployment-benefits-by-state', group: 'unemployment', order: 101, slug: 'unemployment-benefits-by-state',
  nav: 'Benefits by state', card: `Weekly maximum and weeks of unemployment in all 50 states and DC, from ${K.usd(byMax[byMax.length - 1].max)} to ${K.usd(byMax[0].max)} a week.`,
  title: 'Unemployment Benefits by State 2026: Maximums and Weeks',
  description: `Unemployment benefits by state in 2026: weekly maximums from ${K.usd(byMax[byMax.length - 1].max)} to ${K.usd(byMax[0].max)}, weeks payable, formulas and an estimate at your pay for all 50 states and DC.`,
  h1: 'Unemployment benefits by state in 2026: maximums, weeks and what you would get',
  intro: `Every state sets its own unemployment formula, ceiling and duration. Here are all 51 jurisdictions side by side, and a calculator that runs your pay through each of them.`,
  resume: `Unemployment benefits differ more from one state to another than almost any other public program. In 2026 the weekly maximum ranges from ${K.usd(byMax[byMax.length - 1].max)} in ${byMax[byMax.length - 1].name} to ${K.usd(byMax[0].max)} in ${byMax[0].name}, and the middle state caps benefits at ${K.usd(medMax)}. The five highest ceilings are in ${names(top5)}; the five lowest in ${names(low5)}. Duration differs as well: ${full26} jurisdictions allow 26 weeks or more, while ${short.length} pay fewer, as few as ${Math.min(...short.map(weeksTop))} weeks. Run the same ${K.usd(PAY)} of steady pay through every computed formula and the weekly check goes from ${K.usd(loRun.r.weekly)} in ${loRun.s.name} to ${K.usd(hiRun.r.weekly)} in ${hiRun.s.name}, and the total claim from ${K.usd(totals[totals.length - 1].r.total)} to ${K.usd(totals[0].r.total)}. At that pay, ${atCap} states already hold you to their maximum, which is why, for a large share of full-time workers, the ceiling matters more than the formula.`,
  body: (h) => `
<h2>Why the gap is so wide</h2>
<p>Unemployment insurance is a federal-state system: Congress sets the framework and the payroll tax that funds administration, and each state decides who qualifies, how much is paid and for how long. The result, summarized each year in the ${h.src('dol_sigpros', 'Department of Labor\'s Significant Provisions of State UI Laws')}, is fifty-one different programs. Most aim to replace about half of your former weekly wage, but the caps decide what you actually get. A state whose ceiling sits at ${K.usd(byMax[byMax.length - 1].max)} pays a software engineer and a cashier the same thing; one whose ceiling is ${K.usd(byMax[0].max)} keeps paying more as wages rise.</p>
<p>Many maximums are indexed to the state average weekly wage and reset every year; Massachusetts, for one, resets in October. Other states write a dollar figure into the statute, and it changes only when the legislature acts.</p>
${h.mini('states', { t: 'Your pay in every state', p: ['pay'], d: { pay: PAY } })}
<h2>Three ways to compute the weekly amount</h2>
<p>Behind the caps, the formulas fall into three families. Most states take the best quarter of your base period and divide it by a number between 21 and 26, which produces about half of your weekly pay in that quarter; Texas, California and New York work this way. A second group averages or adds the two best quarters, which dampens the effect of a single strong quarter; Illinois, Georgia and Connecticut are examples. A third group uses the whole base period, a percentage of total wages, as in Oregon, Kentucky and Indiana. Colorado and Minnesota compute two ways and pay the higher. Alaska and Virginia read the amount from a statutory wage table, which this site does not reproduce, and their rows below show the range only.</p>
<p>The family matters when your earnings were uneven. A seasonal worker with one big quarter does best in a best-quarter state, and gains nothing in a whole-year state. The ${h.a('base-period-high-quarter', 'base period guide')} explains how to find your own quarters.</p>
<h2>Weeks and totals</h2>
<p>The second dimension is time. ${full26} jurisdictions pay up to 26 weeks or more, and Massachusetts goes to ${weeksTop(K.S('MA'))}. The others pay less, either because the law sets a lower ceiling, as in South Carolina, or because the number of weeks falls when the state unemployment rate is low, as in Florida, Georgia and North Carolina. Many states also cap the total at a share of base-period wages, which shortens claims for people whose pay was concentrated. The ${h.a('how-long-unemployment-lasts', 'duration guide')} goes through each rule.</p>
<h2>Dependents and other extras</h2>
<p>${withDa.length} jurisdictions add a dependents allowance in the DOL table: ${withDa.map((s) => s.name).join(', ')}. In some, such as Illinois, Ohio and Connecticut, it can lift the check above the ordinary ceiling; in others, like Maryland and New Jersey, the total still stops at the maximum. The calculators on this site show the amount before any allowance.</p>
<h2>The table, state by state</h2>
<p>The figures below come straight from the July 2026 DOL table, with the Massachusetts ceiling updated from the state's own announcement for benefit years starting in October 2026. "Weeks" shows the range the law allows; where duration depends on the unemployment rate, the higher figure is the most a claim can last. Click a state for its own page, with the formula worked through and a calculator locked to that state.</p>
${h.table(['State', 'Weekly minimum', 'Weekly maximum', 'Weeks', 'Weekly amount at ' + K.usd(PAY)], ALL.map((s) => {
    const r = s.table ? null : K.ui(s.code, PAY);
    const nm = UI_STATE_PAGES[s.code] ? h.a(UI_STATE_PAGES[s.code], s.name) : s.name;
    const wk = s.weeks[0] === weeksTop(s) ? String(weeksTop(s)) : `${s.weeks[0]} to ${weeksTop(s)}`;
    return [nm, K.usd(s.min), K.usd(s.max), wk, r ? K.usd(r.weekly) : 'statutory table'];
  }), `Unemployment benefits by state, 2026. Weekly amount at ${K.usd(PAY)} of steady yearly pay, before any dependents allowance.`, ['l', 'r', 'r', 'r', 'r'])}
<p>Tax is the last piece. Unemployment is federal taxable income everywhere (${h.src('irs_tc418', 'IRS Topic 418')}), while state treatment varies; the ${h.a('are-unemployment-benefits-taxable', 'tax guide')} covers the states this site has checked. For the exact figure for your own claim, the ${h.a('unemployment-calculator', 'unemployment calculator')} takes your state, pay and best quarters.</p>
`,
  faqs: [
    { q: 'Which state pays the highest unemployment benefits in 2026?', a: `${byMax[0].name}, with a weekly maximum of ${K.usd(byMax[0].max)}, followed by ${top5.slice(1, 3).map((s) => `${s.name} at ${K.usd(s.max)}`).join(' and ')}. High ceilings matter most to higher earners; at modest pay, several states with lower caps pay similar amounts. Massachusetts also pays the longest regular duration, up to ${weeksTop(K.S('MA'))} weeks.` },
    { q: 'Which state has the lowest unemployment benefits?', a: `${byMax[byMax.length - 1].name}, where the weekly maximum is ${K.usd(byMax[byMax.length - 1].max)}, followed by ${low5.slice(1, 3).map((s) => `${s.name} at ${K.usd(s.max)}`).join(' and ')}. Several low-ceiling states also pay fewer than 26 weeks, which makes the gap in total benefits even larger than the gap in weekly checks.` },
    { q: 'Do I get unemployment from the state where I live or where I worked?', a: 'From the state where you worked, since that is where your employer paid unemployment tax on your wages. If you live in one state and worked in another, you normally file with the state of employment. Workers with wages in more than one state can ask to combine them on a single claim.' },
    { q: 'Why is the unemployment maximum so different between states?', a: 'Each state writes its own law. Some index the maximum to a share of the state average weekly wage and reset it every year, which keeps it rising with pay. Others set a dollar figure in the statute that stays fixed until lawmakers change it. The formula behind the cap also differs, using one quarter, two quarters or the whole year.' },
  ],
  tool: 'states', toolArg: { pay: PAY },
  related: ['unemployment-calculator', 'how-long-unemployment-lasts', 'base-period-high-quarter', 'are-unemployment-benefits-taxable', 'washington-unemployment', 'florida-unemployment'],
  sources: ['dol_sigpros', 'dol_statelaws', 'ma_ui', 'irs_tc418'],
});
