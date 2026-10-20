# Writing a page

One page = one file: `src/content/pages/<id>.ts` with `definePage` (models: `texas-unemployment.ts` for a state's
unemployment, `california-paid-family-leave.ts` for a leave or disability program, `unemployment-calculator.ts` for
a guide). Routes, menus, footer, sitemap, schemas, llms.txt and internal links read these files alone. The list of
pages the site must have is `src/lib/planned.ts`; a link to a planned page is accepted before it exists.

- `st: 'TX'` on a state unemployment page adds the state's rule table under the text (from the DOL table).
- `prog: 'ca-pfl'` on a program page adds the program's 2026 table (rule, cap, weeks, waiting period, premium).
- `tool` is a calculator of `src/lib/tool-specs.ts`: `ui` (unemployment; `{ st, lock: 1 }` fixes the state),
  `leave` (`{ prog, lock: 1, why }`), `all` (home), `states` (one pay in every state), `tax`, `baby` (birth: disability then bonding).

## Figures

Every figure comes from the kit (`src/lib/kit.ts`, documented at its top), never typed by hand:
`K.S('TX')` (unemployment rule), `K.ui('TX', pay, hq?, q2?)`, `K.Pg('ca-pfl')`, `K.pw(id, pay, hq?)`,
`K.leave(id, pay, reason, weeks)`, `K.th(state, pay)` (take-home pay), `K.taxOn`, `K.usd`, `K.cents`, `K.pct`, `K.day`.
A rule or amount that is not in `src/data/` (ui-states.json, programs.json, params-2026.json) is not published:
add it to the data file first, with its official source in `params-2026.json > sources`, or leave it out.
The official quotes behind each figure are in `notes/releve-conges-*.md` (read 2026-10-20).

## Rules checked by `npx vitest run tests/pages.test.ts` (PAGE_FILES=id1,id2 to test only some)

- title 50 to 60 characters, key term first, 2026, unique; description 150 to 160, 2026, unique;
- `resume`: one paragraph of 120 words or more with the figures (the direct answer);
- body: 500 words of prose for a guide, 350 for a state or program page, tables apart; at least one `h.mini(...)`;
- 3 to 8 FAQ, answers of 40 to 90 words, questions unique across the site;
- no em or en dash, none of the banned phrases listed in the test; no lawyer, no claim-filing service, no form.

Then `npm run check` (build and every rule of the factory) must end at 0.

## Adding a figure

A program figure that the engine does not use (an eligibility threshold, a yearly contribution cap, a start date)
goes in `programs.json > programs[i].facts` under an explicit key (`"eligibilityBaseWages": 19200`), copied from the
quote in `notes/releve-conges-*.md` or from an official page you read yourself, whose URL is then added to
`params-2026.json > sources` and to the page's `sources`. Write it in the text with `K.Pg(id).facts!.key`.
