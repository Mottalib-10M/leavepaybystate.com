/** Engine tests: official worked examples and the rules of each formula, checked by hand against the sources. */
import { describe, expect, it } from 'vitest';
import { quarters, ui, uiWeekly, programOf, programWeekly, leave, incomeTax, taxOnBenefit, takeHomeWeekly, STATES, PROGRAMS, stateTaxOnUI } from '../src/lib/engine/benefits';
import { getTool, TOOL_KINDS } from '../src/lib/tool-specs';

const W = (annual: number, hq?: number, q2?: number) => quarters(annual, hq, q2);

describe('wages', () => {
  it('steady pay splits in four equal quarters', () => { const w = W(52000, 13000, 13000); expect(w.hq).toBe(13000); expect(w.q3).toBe(13000); expect(w.q4).toBe(13000); });
  it('best quarter is clamped to the year', () => { const w = W(10000, 20000); expect(w.hq).toBe(10000); expect(w.sum2).toBe(10000); });
});

describe('unemployment (DOL table, July 2026)', () => {
  it('51 jurisdictions', () => expect(STATES).toHaveLength(51));
  it('Texas: 1/25 of the best quarter, cap $605, 27% of base wages', () => {
    const r = ui('TX', W(60000, 18000, 16000));
    expect(r.weekly).toBe(605);
    expect(r.total).toBe(15730);
    const low = ui('TX', W(20000, 6000, 5000));
    expect(low.weekly).toBe(240);
    expect(low.total).toBe(5400);
  });
  it('California: 1/26 of the best quarter, cap $450, half of base wages', () => {
    expect(ui('CA', W(30000, 9100, 7000)).weekly).toBe(350);
    expect(ui('CA', W(80000, 20000, 20000)).weekly).toBe(450);
  });
  it('Florida: 12 weeks at most, 25% of base wages', () => {
    const r = ui('FL', W(52000, 13000, 13000));
    expect(r.weekly).toBe(275); expect(r.total).toBe(3300); expect(r.weeks).toBe(12);
  });
  it('Colorado keeps the higher of its two methods, each with its cap', () => {
    const r = uiWeekly('CO', W(100000, 25000, 25000));
    expect(r.weekly).toBe(884);
    expect(uiWeekly('CO', W(40000, 10000, 10000)).weekly).toBe(461);
  });
  it('Utah: 1/26 of the best quarter minus $5', () => expect(uiWeekly('UT', W(40000, 10400, 10000)).weekly).toBe(395));
  it('below the state minimum: $0', () => { const r = uiWeekly('KS', W(8000, 2000, 2000)); expect(r.weekly).toBe(0); expect(r.capped).toBe('min'); });
  it('Alaska and Virginia are not computed', () => { expect(ui('AK', W(50000)).computed).toBe(false); expect(ui('VA', W(50000)).computed).toBe(false); });
  it('Massachusetts cap from October 4, 2026', () => expect(ui('MA', W(150000, 40000, 40000)).weekly).toBe(1154));
  it('every computable state gives a weekly amount between its minimum and maximum at $60,000', () => {
    for (const s of STATES.filter((x) => !x.table)) { const r = ui(s.code, W(60000)); expect(r.weekly, s.code).toBeGreaterThanOrEqual(s.min); expect(r.weekly, s.code).toBeLessThanOrEqual(s.max); }
  });
});

describe('paid leave and disability', () => {
  it('California: the EDD table bands (90%, $1,127 flat, 70%, cap $1,765)', () => {
    const p = programOf('ca-pfl');
    expect(programWeekly(p, W(40000, 13000)).weekly).toBe(900);
    expect(programWeekly(p, W(70000, 18000)).weekly).toBe(1127);
    expect(programWeekly(p, W(100000, 26000)).weekly).toBe(1400);
    expect(programWeekly(p, W(200000, 50000)).weekly).toBe(1765);
  });
  it('New York PFL: 67%, cap $1,228.53', () => {
    expect(programWeekly(programOf('ny-pfl'), W(52000)).weekly).toBe(670);
    expect(programWeekly(programOf('ny-pfl'), W(200000)).weekly).toBe(1228.53);
  });
  it('Washington: 90% up to $915, 50% above', () => {
    const r = programWeekly(programOf('wa-pfml'), W(78000, 19500, 19500));
    expect(r.aww).toBe(1500);
    expect(r.weekly).toBe(1116);
  });
  it('Minnesota: 90 / 66 / 55 tiers, cap $1,423', () => {
    expect(programWeekly(programOf('mn-pl'), W(52000, 13000)).weekly).toBeCloseTo(830.76, 2);
    expect(programWeekly(programOf('mn-pl'), W(300000, 75000)).weekly).toBe(1423);
  });
  it('Rhode Island: 4.62% of the best quarter', () => expect(programWeekly(programOf('ri-tdi'), W(60000, 15000)).weekly).toBe(693));
  it('Oregon: minimum $70.51', () => expect(programWeekly(programOf('or-pl'), W(2000)).weekly).toBeCloseTo(38.46, 1));
  it('waiting week removed where read (California DI), none for PFL', () => {
    expect(leave(programOf('ca-sdi'), W(52000), 'medical', 10).paidWeeks).toBe(9);
    expect(leave(programOf('ca-pfl'), W(52000), 'bonding', 8).paidWeeks).toBe(8);
  });
  it('weeks are capped by the program', () => expect(leave(programOf('ca-pfl'), W(52000), 'bonding', 20).weeks).toBe(8));
  it('Maryland pays nothing before 2028', () => expect(programWeekly(programOf('md-famli'), W(52000)).weekly).toBe(0));
  it('every paying program stays under its cap', () => { for (const p of PROGRAMS.filter((x) => x.status === 'paying')) expect(programWeekly(p, W(500000, 125000, 125000)).weekly, p.id).toBe(p.max); });
});

describe('federal tax 2026 (Rev. Proc. 2025-32)', () => {
  it('single bracket edges', () => { expect(incomeTax(12400, 'single')).toBeCloseTo(1240, 2); expect(incomeTax(50400, 'single')).toBeCloseTo(5800, 2); });
  it('married filing jointly', () => expect(incomeTax(100800, 'mfj')).toBeCloseTo(11600, 2));
  it('tax on a benefit added to other income', () => expect(taxOnBenefit(10000, 30000, 'single')).toBeCloseTo(1200, 2));
  it('take-home pay at $52,000 in Texas', () => { const t = takeHomeWeekly('TX', 52000, 'single'); expect(t.net).toBeGreaterThan(800); expect(t.net).toBeLessThan(900); });
  it('state tax table', () => { expect(stateTaxOnUI('CA').status).toBe('exempt'); expect(stateTaxOnUI('OH').status).toBe('unknown'); });
});

describe('calculators', () => {
  for (const k of TOOL_KINDS) it(`${k} runs with its defaults and never shows NaN`, () => {
    const spec = getTool(k);
    const v = Object.fromEntries(spec.inputs.map((i) => [i.id, i.def]));
    const out = spec.run(v);
    expect(JSON.stringify(out)).not.toMatch(/NaN|undefined|Infinity/);
  });
  it('home calculator in every state and situation', () => {
    for (const s of STATES) for (const why of ['ui', 'medical', 'bonding', 'care']) {
      const spec = getTool('all', { st: s.code, why });
      const out = spec.run(Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])));
      expect(JSON.stringify(out), `${s.code} ${why}`).not.toMatch(/NaN|undefined|Infinity/);
    }
  });
});
