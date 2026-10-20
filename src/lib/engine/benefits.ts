/**
 * Benefit engine: pure functions, no I/O. Every figure comes from src/data (ui-states.json, programs.json,
 * params-2026.json). Tested in tests/engine.test.ts.
 *
 * Wages are described by three numbers the reader knows or can find on a pay stub:
 *   annual  pay over the last four completed quarters (the usual base period),
 *   hq      pay in the best of those quarters,
 *   q2      pay in the second-best quarter.
 * The two remaining quarters share the rest equally.
 */
import UI from '../../data/ui-states.json';
import PR from '../../data/programs.json';
import P from '../../data/params-2026.json';

export type Base = 'hq' | 'avg2' | 'sum2' | 'bpw' | 'nd';
export interface Alt { base: Base; mult: number; add?: number; cap?: number }
export interface UIState {
  code: string; name: string; qual: string; comp: string; alts?: Alt[]; table?: boolean; approx?: string;
  min: number; max: number; maxNote?: string; da: [number, number] | null; disregard: string; mbaText: string;
  bpwFrac: number | null; weeks: [number, number]; idx?: boolean; sched?: boolean; weeksCap?: number; src?: string;
}
export type Reason = 'medical' | 'bonding' | 'care';
export interface Program {
  id: string; state: string; name: string; short: string; kind: 'medical' | 'family' | 'both'; status: 'paying' | 'coming';
  aww?: { base: Base; div: number; exact: boolean }; awwNote?: string; mode?: 'band';
  tiers?: Array<[number | null, number]>; floor?: number; max?: number; min?: number; minNote?: string; maxNote?: string;
  weeks: Partial<Record<Reason | 'combined' | 'pregnancy' | 'prenatal', number>>; waiting: Partial<Record<Reason, number>>;
  contrib: { rate: number; cap: number | null; weeklyMax?: number; covers?: string; note?: string };
  rule: string; sources: string[]; calculator: string | null; start?: string; contribStart?: string;
  /** Other figures read on the program's official pages (eligibility thresholds, yearly caps...), each named in its key. */
  facts?: Record<string, number | string>;
}
export type Status = 'single' | 'mfj' | 'hoh';

export const STATES = (UI as unknown as { states: UIState[] }).states;
export const PROGRAMS = (PR as unknown as { programs: Program[] }).programs;
export const UI_RETRIEVED = (UI as unknown as { retrieved: string }).retrieved;
export const stateOf = (code: string) => { const s = STATES.find((x) => x.code === code); if (!s) throw new Error(`Unknown state ${code}`); return s; };
export const programOf = (id: string) => { const p = PROGRAMS.find((x) => x.id === id); if (!p) throw new Error(`Unknown program ${id}`); return p; };
export const programsIn = (code: string) => PROGRAMS.filter((p) => p.state === code);

/* ---------- wages ---------- */
export interface Wages { annual: number; hq: number; q2: number; q3: number; q4: number; sum2: number; avg2: number; bpw: number }
/** The quarters behind a yearly pay. hq and q2 are clamped so that the four quarters stay coherent. */
export function quarters(annual: number, hq?: number, q2?: number): Wages {
  const a = Math.max(0, annual || 0);
  const h = Math.min(a, Math.max(0, hq ?? a / 4));
  const s = Math.min(h, a - h, Math.max(0, q2 ?? Math.min(h, (a - h) / 3)));
  const rest = Math.max(0, a - h - s);
  const q3 = Math.min(s, rest / 2), q4 = rest - q3;
  return { annual: a, hq: h, q2: s, q3, q4, sum2: h + s, avg2: (h + s) / 2, bpw: a };
}
/** Wages with the best quarter at a quarter of the year: steady pay. */
export const steady = (annual: number) => quarters(annual, annual / 4, annual / 4);
const baseValue = (w: Wages, b: Base) => (b === 'nd' ? w.hq + w.q2 + w.q3 / 2 : w[b]);

/* ---------- unemployment ---------- */
export interface UIResult {
  state: UIState; weekly: number; raw: number; capped: 'max' | 'min' | null; computed: boolean;
  weeks: number; weeksLo: number; weeksHi: number; total: number; rule: string;
}
const r2 = (x: number) => Math.round(x * 100) / 100;
/** Weekly benefit amount, before any dependents allowance. A state whose amount is set by a statutory table
 *  (Alaska, Virginia) has computed = false and the weekly figure is the state maximum shown for reference. */
export function uiWeekly(code: string, w: Wages): { weekly: number; raw: number; capped: 'max' | 'min' | null; computed: boolean } {
  const s = stateOf(code);
  if (s.table || !s.alts) return { weekly: 0, raw: 0, capped: null, computed: false };
  const raw = Math.max(...s.alts.map((a) => {
    const v = baseValue(w, a.base) * a.mult + (a.add ?? 0);
    return a.cap === undefined ? v : Math.min(v, a.cap);
  }));
  if (r2(raw) < s.min) return { weekly: 0, raw: r2(raw), capped: 'min', computed: true };
  if (r2(raw) >= s.max) return { weekly: s.max, raw: r2(raw), capped: 'max', computed: true };
  return { weekly: Math.floor(r2(raw)), raw: r2(raw), capped: null, computed: true };
}
/** Weeks payable and total: the lesser of the state's share of base-period wages and its maximum weeks.
 *  Where the state shortens benefits when unemployment is low (idx), the top of its range is used and the range is shown. */
export function ui(code: string, w: Wages): UIResult {
  const s = stateOf(code);
  const wk = uiWeekly(code, w);
  const hi = s.weeksCap ?? s.weeks[1];
  let weeks = 0, total = 0;
  if (wk.weekly > 0) {
    const byWeeks = wk.weekly * hi;
    const byWages = s.bpwFrac === null ? Infinity : s.bpwFrac * w.bpw;
    total = Math.min(byWeeks, byWages);
    weeks = Math.min(hi, total / wk.weekly);
  }
  const rule = s.table ? `${s.name} sets the amount in a statutory table (${s.comp})` : `${s.comp}; between $${s.min} and $${s.max} a week`;
  return { state: s, ...wk, weeks: Math.round(weeks * 10) / 10, weeksLo: s.weeks[0], weeksHi: hi, total: Math.round(total), rule };
}

/* ---------- paid leave and disability ---------- */
export interface LeaveResult { program: Program; aww: number; weekly: number; capped: 'max' | 'min' | null; maxWeeks: number; weeks: number; waitingDays: number; paidWeeks: number; total: number }
export function programWeekly(p: Program, w: Wages): { aww: number; weekly: number; capped: 'max' | 'min' | null } {
  if (p.status !== 'paying' || !p.aww || !p.tiers) return { aww: 0, weekly: 0, capped: null };
  const aww = baseValue(w, p.aww.base) / p.aww.div;
  let b = 0;
  if (p.mode === 'band') {
    const [t1, rate1] = p.tiers[0];
    b = t1 === null || aww <= t1 ? aww * rate1 : Math.max(aww * p.tiers[1][1], p.floor ?? 0);
  } else {
    let prev = 0;
    for (const [up, rate] of p.tiers) {
      const top = up === null ? Infinity : up;
      if (aww > prev) b += (Math.min(aww, top) - prev) * rate;
      prev = top;
    }
  }
  const max = p.max ?? Infinity, min = p.min ?? 0;
  if (b >= max) return { aww: r2(aww), weekly: max, capped: 'max' };
  if (b < min && aww > 0) return { aww: r2(aww), weekly: Math.min(min, aww), capped: 'min' };
  return { aww: r2(aww), weekly: r2(b), capped: null };
}
/** The program of a state that pays for a reason (own health, bonding with a new child, caring for a relative). */
export function programFor(code: string, reason: Reason): Program | undefined {
  return programsIn(code).find((p) => p.status === 'paying' && (p.weeks[reason] ?? 0) > 0);
}
export function leave(p: Program, w: Wages, reason: Reason, weeksWanted: number): LeaveResult {
  const wk = programWeekly(p, w);
  const maxWeeks = p.weeks[reason] ?? 0;
  const weeks = Math.max(0, Math.min(weeksWanted, maxWeeks));
  const waitingDays = weeks > 0 ? (p.waiting[reason] ?? 0) : 0;
  const paidWeeks = Math.max(0, weeks - waitingDays / 7);
  return { program: p, ...wk, maxWeeks, weeks, waitingDays, paidWeeks: Math.round(paidWeeks * 10) / 10, total: Math.round(wk.weekly * paidWeeks) };
}

/* ---------- federal tax and take-home pay ---------- */
type Brk = Array<[number | null, number]>;
const FED = P.federal as unknown as { standardDeduction: Record<Status, number>; brackets: Record<Status, Brk>; voluntaryWithholding: number; socialSecurityRate: number; medicareRate: number; socialSecurityWageBase: number };
export const FEDERAL = FED;
export function incomeTax(taxable: number, st: Status): number {
  let t = 0, prev = 0;
  for (const [up, rate] of FED.brackets[st]) {
    const top = up === null ? Infinity : up;
    if (taxable > prev) t += (Math.min(taxable, top) - prev) * rate;
    prev = top;
  }
  return t;
}
/** Federal income tax on a year of wages, after the standard deduction (no credits, no other income). */
export const federalTaxOnWages = (annual: number, st: Status) => incomeTax(Math.max(0, annual - FED.standardDeduction[st]), st);
/** Rate of the top bracket a year of wages reaches. */
export function marginalRate(annual: number, st: Status): number {
  const taxable = Math.max(0, annual - FED.standardDeduction[st]);
  if (taxable <= 0) return 0;
  let prev = 0;
  for (const [up, rate] of FED.brackets[st]) { const top = up === null ? Infinity : up; if (taxable <= top) return rate; prev = top; }
  return prev ? 0.37 : 0;
}
/** Federal tax added by a benefit received in a year with other income: tax(other + benefit) minus tax(other). */
export const taxOnBenefit = (benefit: number, otherIncome: number, st: Status) => Math.max(0, federalTaxOnWages(otherIncome + benefit, st) - federalTaxOnWages(otherIncome, st));
export const fica = (annual: number) => Math.min(annual, FED.socialSecurityWageBase) * FED.socialSecurityRate + annual * FED.medicareRate;
/** Employee share of the state leave premiums of a state in 2026 (yearly). */
export function leaveContrib(code: string, annual: number): number {
  return programsIn(code).filter((p) => p.status === 'paying').reduce((a, p) => {
    const c = p.contrib;
    if (!c.rate) return a;
    let x = c.rate * (c.cap === null ? annual : Math.min(annual, c.cap));
    if (c.weeklyMax !== undefined) x = Math.min(x, c.weeklyMax * 52);
    return a + x;
  }, 0);
}
/** Weekly take-home pay before state income tax: wages minus federal income tax, Social Security, Medicare and the state leave premium. */
export function takeHomeWeekly(code: string, annual: number, st: Status) {
  const fed = federalTaxOnWages(annual, st), f = fica(annual), lc = leaveContrib(code, annual);
  return { gross: annual / 52, fed: fed / 52, fica: f / 52, leave: lc / 52, net: (annual - fed - f - lc) / 52 };
}
/** How each kind of benefit is treated by federal income tax (IRS Topic 418; Rev. Rul. 2025-4). */
export const FED_TAXABLE: Record<'ui' | 'family' | 'medical', 'taxable' | 'depends'> = { ui: 'taxable', family: 'taxable', medical: 'depends' };
export type StateTax = 'exempt' | 'none' | 'taxed' | 'unknown';
export function stateTaxOnUI(code: string): { status: StateTax; source?: string } {
  const t = (P as unknown as { stateTaxOnUI: Record<string, { status: StateTax; source: string }> }).stateTaxOnUI[code];
  return t ?? { status: 'unknown' };
}
