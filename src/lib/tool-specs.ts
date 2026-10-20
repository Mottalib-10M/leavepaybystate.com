/**
 * The calculators of the site, rendered by components/calc/SpecTool.tsx (full tool) and MiniSim.tsx (mini-simulator).
 * Every amount comes from the engine (lib/engine/benefits.ts) and its data files; the reader gives only facts:
 * state, pay, best quarters, the reason for the leave, the weeks wanted, the filing status. This file ships to the browser.
 */
import type { ToolSpec, V, Input, ToolOut } from './tool-types';
import { formatMoney, formatPercent, formatNumber } from './format';
import {
  STATES, PROGRAMS, stateOf, programOf, programsIn, programFor, quarters, ui, leave, programWeekly,
  taxOnBenefit, takeHomeWeekly, stateTaxOnUI, FEDERAL, type Reason, type Status, type Program, type Wages,
} from './engine/benefits';

export const usd = (x: number) => `${x < -0.5 ? '-' : ''}${formatMoney(Math.abs(Math.round(x)), 0)}`;
export const pct = (x: number, d = 0) => formatPercent(x, d);
const n = (v: V, k: string) => Number(v[k]) || 0;
const s = (v: V, k: string) => String(v[k]);
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const longDate = (iso: string) => `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${Number(iso.slice(8, 10))}, ${iso.slice(0, 4)}`;
const wk = (x: number) => `${formatNumber(x, Number.isInteger(x) ? 0 : 1)} week${x === 1 ? '' : 's'}`;

const stateOpts = STATES.map((x) => ({ value: x.code, label: x.name }));
const PAYING = PROGRAMS.filter((p) => p.status === 'paying');
const progOpts = PAYING.map((p) => ({ value: p.id, label: `${stateOf(p.state).name}: ${p.short}` }));
const leaveStates = [...new Set(PAYING.map((p) => p.state))];
const leaveStateOpts = stateOpts.filter((o) => leaveStates.includes(o.value));
const REASONS: Array<{ value: Reason | 'ui'; label: string }> = [
  { value: 'ui', label: 'Lost my job' }, { value: 'medical', label: 'Own illness or pregnancy' },
  { value: 'bonding', label: 'New child' }, { value: 'care', label: 'Caring for a relative' },
];
const REASON_LABEL: Record<Reason, string> = { medical: 'your own illness, injury or pregnancy', bonding: 'bonding with a new child', care: 'caring for a seriously ill relative' };

const ST = (def = 'CA', opts = stateOpts): Input => ({ kind: 'select', id: 'st', label: 'State', def, options: opts });
const PAY = (def = 52000): Input => ({ id: 'pay', label: 'Pay over the last 12 months', def, unit: '$', max: 5000000, help: 'Gross wages, before tax' });
const HQ: Input = { id: 'hq', label: 'Pay in your best quarter', def: 0, unit: '$', max: 5000000, adv: true, help: 'Leave empty if your pay was steady' };
const Q2: Input = { id: 'q2', label: 'Pay in your second-best quarter', def: 0, unit: '$', max: 5000000, adv: true, help: 'Leave empty if your pay was steady' };
const FS: Input = { kind: 'select', id: 'fs', label: 'Tax filing status', def: 'single', adv: true, options: [{ value: 'single', label: 'Single' }, { value: 'mfj', label: 'Married filing jointly' }, { value: 'hoh', label: 'Head of household' }] };
const WEEKS = (def = 12): Input => ({ id: 'wk', label: 'Weeks of leave you need', def, unit: 'wk', max: 104, help: 'For a leave; ignored for unemployment' });

const wagesOf = (v: V): Wages => {
  const pay = n(v, 'pay'), hq = n(v, 'hq'), q2 = n(v, 'q2');
  return quarters(pay, hq > 0 ? hq : undefined, q2 > 0 ? q2 : hq > 0 ? undefined : pay / 4);
};
const fsOf = (v: V) => (s(v, 'fs') || 'single') as Status;

/** Rows comparing a weekly benefit with the take-home pay it replaces. */
function payRows(code: string, v: V, weekly: number, kind: 'ui' | 'family' | 'medical'): ToolOut['rows'] {
  const th = takeHomeWeekly(code, n(v, 'pay'), fsOf(v));
  const rows: ToolOut['rows'] = [['Your take-home pay now, a week', usd(th.net), th.net]];
  if (th.net > 0 && weekly > 0) rows.push(['Share of take-home pay replaced', kind === 'medical' ? pct(weekly / th.net) : `${pct(weekly / th.net)} before tax`]);
  return rows;
}
function taxRow(total: number, v: V, kind: 'ui' | 'family' | 'medical', weeks: number): [string, string] {
  if (kind === 'medical') return ['Federal income tax', 'depends on who paid the premiums'];
  const other = Math.max(0, n(v, 'pay') * (52 - weeks) / 52);
  return ['Federal income tax on it, about', usd(taxOnBenefit(total, other, fsOf(v)))];
}
const kindOf = (p: Program, r: Reason): 'family' | 'medical' => (r === 'medical' ? 'medical' : 'family');

function uiOut(code: string, v: V): ToolOut {
  const w = wagesOf(v), r = ui(code, w), st = r.state;
  if (!r.computed) {
    return {
      label: `Unemployment in ${st.name}`, value: `up to ${usd(st.max)}`, sub: 'a week, set by a statutory wage table',
      rows: [['State minimum', usd(st.min)], ['State maximum', usd(st.max)], ['Weeks payable', `${st.weeks[0]} to ${st.weeks[1]}`]],
      note: `${st.name} reads your weekly amount in a table written into its law (${st.comp}); this site does not reproduce it. Source: U.S. Department of Labor, July 2026.`,
    };
  }
  if (r.weekly === 0) {
    return {
      label: `Unemployment in ${st.name}`, value: '$0', sub: `the formula gives ${usd(r.raw)}, under the state minimum of ${usd(st.min)}`,
      rows: [['Rule', st.comp], ['Earnings needed to qualify', st.qual]],
      note: 'Below the minimum weekly amount, a claim is usually refused for lack of wages; the agency decides on your own wage record.',
    };
  }
  const tax = stateTaxOnUI(code);
  const rows: ToolOut['rows'] = [
    [r.capped === 'max' ? 'Weekly benefit: state maximum' : 'Weekly benefit', usd(r.weekly), r.weekly],
    [r.weeks < r.weeksHi ? 'Weeks: limited by your wages' : st.idx && r.weeksLo !== st.weeks[1] ? `Weeks (${r.weeksLo} to ${st.weeks[1]} by state jobless rate)` : 'Weeks payable', wk(r.weeks)],
    ['Total if you stay unemployed', usd(r.total)],
    taxRow(r.total, v, 'ui', r.weeks),
    ['10% federal withholding, if you ask (W-4V)', `${usd(r.weekly * FEDERAL.voluntaryWithholding)} a week`],
    ['State income tax on it', tax.status === 'exempt' ? 'none: this state exempts it' : tax.status === 'none' ? 'none: no state income tax' : tax.status === 'taxed' ? 'taxed by the state' : 'check your state'],
    ...payRows(code, v, r.weekly, 'ui'),
  ];
  return {
    label: `Unemployment in ${st.name}`, value: usd(r.weekly), sub: `a week, for up to ${wk(r.weeks)} · ${usd(r.total)} in all`,
    rows, note: `${st.name}: ${st.comp}; $${formatNumber(st.min)} to $${formatNumber(st.max)} a week${st.da ? ', more with dependents' : ''}.${st.approx ? ` ${st.approx}` : ''}${st.maxNote ? ` ${st.maxNote}` : ''}`,
  };
}

function leaveOut(p: Program, v: V, reason: Reason): ToolOut {
  const st = stateOf(p.state);
  if (p.status !== 'paying') return { label: p.name, value: 'to come', sub: p.rule, rows: [['Benefits start', p.start ? longDate(p.start) : 'not set']] };
  const w = wagesOf(v), r = leave(p, w, reason, n(v, 'wk'));
  if (r.maxWeeks === 0) return { label: p.name, value: '$0', sub: `this program does not pay for ${REASON_LABEL[reason]}`, rows: [['Program covers', p.kind === 'medical' ? 'your own health only' : 'family reasons only']] };
  const k = kindOf(p, reason);
  const rows: ToolOut['rows'] = [
    [r.capped === 'max' ? 'Weekly benefit: program maximum' : 'Weekly benefit', usd(r.weekly), r.weekly],
    ['Average weekly wage used', usd(r.aww)],
    [`Weeks paid (up to ${wk(r.maxWeeks)} for this reason)`, r.waitingDays ? `${wk(r.paidWeeks)} after a ${r.waitingDays}-day wait` : wk(r.paidWeeks)],
    ['Total for this leave', usd(r.total)],
    taxRow(r.total, v, k, r.weeks),
    ...payRows(p.state, v, r.weekly, k),
  ];
  return {
    label: `${p.name}, ${REASON_LABEL[reason]}`, value: usd(r.weekly), sub: `a week · ${usd(r.total)} for ${wk(r.weeks)}`,
    rows, note: `${st.name}: ${p.rule}.${p.awwNote ? ` ${p.awwNote}` : ''}${p.maxNote ? ` ${p.maxNote}` : ''}`,
  };
}

/** Everything a state pays for one pay: the comparison table of the home calculator. */
function stateTable(code: string, v: V): NonNullable<ToolOut['table']> {
  const w = wagesOf(v), u = ui(code, w);
  const rows: string[][] = [['Unemployment', u.computed ? usd(u.weekly) : `table, up to ${usd(u.state.max)}`, u.computed ? wk(u.weeks) : `${u.state.weeks[1]} weeks`, u.computed ? usd(u.total) : 'n/a']];
  for (const p of programsIn(code)) {
    if (p.status !== 'paying') { rows.push([p.short, `to come, ${p.start ? longDate(p.start) : ''}`, '', '']); continue; }
    const x = programWeekly(p, w);
    const reasons = (['medical', 'bonding', 'care'] as Reason[]).filter((r) => (p.weeks[r] ?? 0) > 0);
    const most = Math.max(...reasons.map((r) => p.weeks[r] ?? 0));
    rows.push([p.short, usd(x.weekly), reasons.length > 1 && p.weeks.combined ? `${most} (${p.weeks.combined} combined)` : wk(most).replace(' weeks', '').replace(' week', ''), usd(x.weekly * most)]);
  }
  return { caption: `What ${stateOf(code).name} pays at this pay, by program, before tax. Totals assume the longest leave each program allows.`, headers: ['Program', 'A week', 'Weeks', 'Most in total'], rows, align: ['l', 'r', 'r', 'r'] };
}

const SPECS: Record<string, (arg?: Record<string, number | string>) => ToolSpec> = {
  /** Home: one state, one pay, the situation, then every program of the state side by side. */
  all: (arg = {}) => ({
    inputs: [ST(String(arg.st ?? 'CA')), PAY(Number(arg.pay ?? 52000)), { kind: 'select', id: 'why', label: 'What happened', def: String(arg.why ?? 'ui'), options: REASONS }, WEEKS(Number(arg.wk ?? 12)), HQ, Q2, FS],
    run: (v) => {
      const code = s(v, 'st'), why = s(v, 'why') as Reason | 'ui';
      let out: ToolOut;
      if (why === 'ui') out = uiOut(code, v);
      else {
        const p = programFor(code, why);
        out = p ? leaveOut(p, v, why) : {
          label: `${stateOf(code).name}, ${REASON_LABEL[why]}`, value: '$0', sub: 'no state program pays for this',
          rows: [['State programs', programsIn(code).length ? programsIn(code).map((x) => `${x.short}${x.status === 'coming' ? ' (to come)' : ''}`).join(', ') : 'none'], ['What may still pay', why === 'medical' ? 'employer short-term disability, if you have it' : 'employer leave policy, if any']],
          note: 'The federal FMLA protects the job of eligible workers for up to 12 weeks, unpaid.',
        };
      }
      return { ...out, table: stateTable(code, v) };
    },
  }),
  /** Unemployment in one state. */
  ui: (arg = {}) => {
    const lock = arg.lock ? String(arg.st) : undefined;
    return {
      inputs: [...(lock ? [] : [ST(String(arg.st ?? 'CA'))]), PAY(Number(arg.pay ?? 52000)), HQ, Q2, FS],
      run: (v) => uiOut(lock ?? s(v, 'st'), v),
    };
  },
  /** A paid leave or disability program. */
  leave: (arg = {}) => {
    const lock = arg.lock ? String(arg.prog) : undefined;
    const def = String(arg.prog ?? 'ca-pfl');
    const p0 = programOf(def);
    const reasons = REASONS.filter((r) => r.value !== 'ui' && (p0.weeks[r.value as Reason] ?? 0) > 0);
    const rdef = String(arg.why ?? reasons[0]?.value ?? 'medical');
    return {
      inputs: [
        ...(lock ? [] : [{ kind: 'select', id: 'prog', label: 'Program', def, options: progOpts } as Input]),
        PAY(Number(arg.pay ?? 52000)),
        ...(lock && reasons.length < 2 ? [] : [{ kind: 'select', id: 'why', label: 'Reason for the leave', def: rdef, options: lock ? reasons : REASONS.filter((r) => r.value !== 'ui') } as Input]),
        WEEKS(Number(arg.wk ?? Math.min(12, p0.weeks[rdef as Reason] ?? 12))), HQ, Q2, FS,
      ],
      run: (v) => leaveOut(programOf(lock ?? s(v, 'prog')), v, ((lock && reasons.length < 2) ? rdef : s(v, 'why')) as Reason),
    };
  },
  /** One pay, every state: the unemployment ranking. */
  states: (arg = {}) => ({
    inputs: [PAY(Number(arg.pay ?? 52000)), HQ, Q2],
    run: (v) => {
      const w = wagesOf(v);
      const all = STATES.map((st) => ({ st, r: ui(st.code, w) })).filter((x) => x.r.computed);
      const sorted = [...all].sort((a, b) => b.r.weekly - a.r.weekly || b.r.total - a.r.total);
      const weeklies = sorted.map((x) => x.r.weekly).sort((a, b) => a - b);
      const med = weeklies[Math.floor(weeklies.length / 2)];
      return {
        label: 'Weekly unemployment at this pay, middle state', value: usd(med), sub: `${sorted.length} jurisdictions computed`,
        rows: [['Highest', `${usd(sorted[0].r.weekly)} in ${sorted[0].st.name}`, sorted[0].r.weekly], ['Lowest', `${usd(sorted[sorted.length - 1].r.weekly)} in ${sorted[sorted.length - 1].st.name}`, sorted[sorted.length - 1].r.weekly], ['Largest total', (() => { const t = [...all].sort((a, b) => b.r.total - a.r.total)[0]; return `${usd(t.r.total)} in ${t.st.name}`; })()]],
        table: { caption: 'Every state at the pay entered, highest weekly amount first. Alaska and Virginia use statutory tables and are left out.', headers: ['State', 'A week', 'Weeks', 'Total'], rows: sorted.map(({ st, r }) => [st.name, usd(r.weekly), formatNumber(r.weeks, Number.isInteger(r.weeks) ? 0 : 1), usd(r.total)]), align: ['l', 'r', 'r', 'r'] },
        note: 'Weeks use the top of each state\'s range; several states pay fewer weeks when their unemployment rate is low.',
      };
    },
  }),
  /** Federal tax on a benefit. */
  tax: (arg = {}) => ({
    inputs: [
      { kind: 'select', id: 'kind', label: 'Benefit', def: String(arg.kind ?? 'ui'), options: [{ value: 'ui', label: 'Unemployment' }, { value: 'family', label: 'Paid family leave' }] },
      { id: 'amt', label: 'Benefits received this year', def: Number(arg.amt ?? 9000), unit: '$', max: 1000000 },
      { id: 'oth', label: 'Other income this year', def: Number(arg.oth ?? 30000), unit: '$', max: 10000000, help: 'Wages and other taxable income' },
      { ...FS, adv: false },
    ],
    run: (v) => {
      const amt = n(v, 'amt'), oth = n(v, 'oth'), fs = fsOf(v);
      const t = taxOnBenefit(amt, oth, fs), wh = amt * FEDERAL.voluntaryWithholding;
      return {
        label: 'Federal income tax due on these benefits', value: usd(t), sub: amt > 0 ? `${pct(t / amt, 1)} of the benefits` : '',
        rows: [['Withheld at 10% if you filed Form W-4V', usd(wh), wh], ['Left to pay at filing time, or refunded', t - wh >= 0 ? `${usd(t - wh)} to pay` : `${usd(wh - t)} refunded`], ['Standard deduction used', usd(FEDERAL.standardDeduction[fs])]],
        note: 'Tax added by the benefits to your other income, with the 2026 brackets and standard deduction (Rev. Proc. 2025-32), no credits. State income tax not included.',
      };
    },
  }),
  /** Pregnancy and a new child: disability for the birth, then bonding. */
  baby: (arg = {}) => ({
    inputs: [ST(String(arg.st ?? 'CA'), leaveStateOpts), PAY(Number(arg.pay ?? 52000)), { id: 'pre', label: 'Weeks off before the birth', def: Number(arg.pre ?? 4), unit: 'wk', max: 52 }, { id: 'post', label: 'Weeks of recovery after it', def: Number(arg.post ?? 6), unit: 'wk', max: 52, help: '6 for a vaginal birth, 8 for a C-section, as certified' }, HQ, Q2, FS],
    run: (v) => {
      const code = s(v, 'st'), w = wagesOf(v), name = stateOf(code).name;
      const med = programFor(code, 'medical'), bond = programFor(code, 'bonding');
      const mw = n(v, 'pre') + n(v, 'post');
      const m = med ? leave(med, w, 'medical', mw) : null;
      const b = bond ? leave(bond, w, 'bonding', bond.weeks.bonding ?? 0) : null;
      let bw = b ? b.weeks : 0, bt = b ? b.total : 0;
      // One program for both reasons: the weeks of all reasons share one limit (stated combined limit; Oregon's
      // pregnancy limit applies to any birth; otherwise the program's 12 weeks in all, except DC, whose rule was not read).
      const lim = b && med && bond && med.id === bond.id && bond.id !== 'dc-pfl'
        ? (bond.id === 'or-pl' ? bond.weeks.pregnancy : bond.weeks.combined ?? Math.max(bond.weeks.medical ?? 0, bond.weeks.bonding ?? 0)) : undefined;
      if (b && lim) { bw = Math.max(0, Math.min(bw, lim - (m?.weeks ?? 0))); bt = Math.round(b.weekly * bw); }
      const total = (m?.total ?? 0) + bt;
      return {
        label: `Paid time off for a birth in ${name}`, value: usd(total), sub: `${wk((m?.weeks ?? 0) + bw)} paid in all`,
        rows: [
          [m ? `${med!.short}: pregnancy and recovery, ${wk(m.weeks)}` : 'Pregnancy and recovery', m ? usd(m.total) : 'no state program', m?.total ?? 0],
          [b ? `${bond!.short}: bonding, ${wk(bw)}` : 'Bonding with the baby', b ? usd(bt) : 'no state program', bt],
          ['Weekly benefit', m ? usd(m.weekly) : b ? usd(b.weekly) : '$0'],
        ],
        note: lim ? `${bond!.short} caps medical and family leave together at ${lim} weeks a year${bond!.weeks.pregnancy && bond!.weeks.pregnancy > lim ? ` (${bond!.weeks.pregnancy} with a pregnancy complication)` : ''}.` : med && bond && med.id === bond.id ? `${bond.short} pays both; how its leave types combine around a birth is not computed, so the total assumes both apply.` : 'Disability pay for the birth and family leave for bonding come from two programs here, each with its own maximum.',
      };
    },
  }),
};

export function getTool(kind: string, arg?: Record<string, number | string>): ToolSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown tool ${kind}`);
  return f(arg);
}
export const TOOL_KINDS = Object.keys(SPECS);
