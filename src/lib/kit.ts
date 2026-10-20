/**
 * Writing kit (CONTRIBUTING-PAGES.md): every figure written in a page comes from here, never typed by hand.
 *   K.P                         params-2026.json (federal tax, sources)
 *   K.S(code)                   a state's unemployment rule (ui-states.json): name, qual, comp, min, max, weeks, da, disregard, mbaText...
 *   K.STATES, K.PROGRAMS        all states (51), all leave and disability programs
 *   K.ui(code, pay, hq?, q2?)   unemployment result: weekly, weeks, total, capped, computed
 *   K.w(pay, hq?, q2?)          the quarters behind a pay (steady pay when hq is left out)
 *   K.Pg(id)                    a program (programs.json): name, short, rule, max, min, weeks, waiting, contrib...
 *   K.pw(id, pay, hq?, q2?)     a program's weekly benefit at a pay { aww, weekly, capped }
 *   K.leave(id, pay, reason, weeks)   { weekly, weeks, paidWeeks, waitingDays, total }
 *   K.inState(code)             programs of a state
 *   K.th(code, pay, status?)    weekly take-home pay { gross, fed, fica, leave, net }
 *   K.taxOn(benefit, otherIncome, status?)   federal tax added by a benefit
 *   K.contrib(code, pay)        employee leave premium of a state for a year
 *   K.uiTax(code)               state tax treatment of unemployment { status: exempt | none | taxed | unknown }
 *   formats                     K.usd(1234.5) "$1,235", K.cents(1228.53) "$1,228.53", K.num, K.dec, K.pct(0.67) "67 %", K.day("2026-07-01") "July 1, 2026"
 */
import P from '../data/params-2026.json';
import { usd, pct, longDate } from './tool-specs';
import { formatNumber, formatDecimal, formatMoney } from './format';
import {
  STATES, PROGRAMS, stateOf, programOf, programsIn, quarters, ui, programWeekly, leave, takeHomeWeekly, taxOnBenefit,
  leaveContrib, stateTaxOnUI, marginalRate, FEDERAL, UI_RETRIEVED, type Reason, type Status,
} from './engine/benefits';

const w = (pay: number, hq?: number, q2?: number) => quarters(pay, hq ?? pay / 4, q2 ?? (hq === undefined ? pay / 4 : undefined));
export const KIT = {
  P, FEDERAL, STATES, PROGRAMS, RETRIEVED: UI_RETRIEVED,
  S: stateOf, Pg: programOf, inState: programsIn, w,
  ui: (code: string, pay: number, hq?: number, q2?: number) => ui(code, w(pay, hq, q2)),
  pw: (id: string, pay: number, hq?: number, q2?: number) => programWeekly(programOf(id), w(pay, hq, q2)),
  leave: (id: string, pay: number, reason: Reason, weeks: number, hq?: number) => leave(programOf(id), w(pay, hq), reason, weeks),
  th: (code: string, pay: number, st: Status = 'single') => takeHomeWeekly(code, pay, st),
  taxOn: (benefit: number, other: number, st: Status = 'single') => taxOnBenefit(benefit, other, st),
  marginal: (pay: number, st: Status = 'single') => marginalRate(pay, st),
  contrib: leaveContrib, uiTax: stateTaxOnUI,
  usd, pct: (x: number, d = 0) => pct(x, d), cents: (x: number) => formatMoney(x, Number.isInteger(x) ? 0 : 2),
  num: (x: number) => formatNumber(x, 0), dec: (x: number, d = 1) => formatDecimal(x, d), day: longDate,
};
export type Kit = typeof KIT;
