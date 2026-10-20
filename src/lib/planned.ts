/** Every page id the site is meant to have. Content tests accept links to these ids while pages are being
 *  written; the "all planned pages exist" test fails until each has its file. */
export const UI_STATE_PAGES: Record<string, string> = {
  CA: 'california-unemployment', TX: 'texas-unemployment', NY: 'new-york-unemployment', FL: 'florida-unemployment',
  PA: 'pennsylvania-unemployment', NJ: 'new-jersey-unemployment', OH: 'ohio-unemployment', IL: 'illinois-unemployment',
  MI: 'michigan-unemployment', GA: 'georgia-unemployment', NC: 'north-carolina-unemployment', WA: 'washington-unemployment',
  MA: 'massachusetts-unemployment', AZ: 'arizona-unemployment', IN: 'indiana-unemployment', TN: 'tennessee-unemployment',
  MO: 'missouri-unemployment', WI: 'wisconsin-unemployment', CO: 'colorado-unemployment', MN: 'minnesota-unemployment',
  MD: 'maryland-unemployment', OR: 'oregon-unemployment', KY: 'kentucky-unemployment', SC: 'south-carolina-unemployment',
  NV: 'nevada-unemployment', CT: 'connecticut-unemployment',
};
export const PROGRAM_PAGES: Record<string, string> = {
  'ca-pfl': 'california-paid-family-leave', 'ca-sdi': 'california-sdi', 'ny-pfl': 'ny-paid-family-leave', 'ny-dbl': 'ny-disability-benefits',
  'nj-fli': 'nj-family-leave', 'nj-tdi': 'nj-temporary-disability', 'ri-tdi': 'rhode-island-tdi', 'hi-tdi': 'hawaii-tdi',
  'wa-pfml': 'washington-paid-family-leave', 'ma-pfml': 'massachusetts-pfml', 'ct-pl': 'connecticut-paid-leave', 'or-pl': 'oregon-paid-leave',
  'co-famli': 'colorado-famli', 'mn-pl': 'minnesota-paid-leave', 'de-pl': 'delaware-paid-leave', 'me-pfml': 'maine-paid-family-leave',
  'dc-pfl': 'dc-paid-family-leave', 'md-famli': 'maryland-paid-family-leave',
};
export const PLANNED_GUIDES = [
  'unemployment-calculator', 'unemployment-benefits-by-state', 'how-long-unemployment-lasts',
  'paid-family-leave', 'state-disability-insurance',
  'are-unemployment-benefits-taxable', 'is-paid-family-leave-taxable', 'maternity-leave-pay', 'base-period-high-quarter',
  'partial-unemployment', 'fmla-vs-paid-leave',
];
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, ...Object.values(UI_STATE_PAGES), ...Object.values(PROGRAM_PAGES)]);
