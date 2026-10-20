/** Registry: every file of src/content/pages is loaded here. */
import type { PageDef } from './page-types';

const base = (file: string) => file.split('/').pop()!.replace(/\.ts$/, '');
const g = import.meta.glob<{ default: PageDef }>(['../content/pages/*.ts', '!../content/pages/_*.ts'], { eager: true });
export const PAGES: PageDef[] = Object.entries(g).map(([f, m]) => {
  if (m.default.id !== base(f)) throw new Error(`${f}: id "${m.default.id}" differs from the file name`);
  return m.default;
}).sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
export const pageById = (id: string) => PAGES.find((p) => p.id === id);
/** The page of a state's unemployment, of a program. */
export const pageOfState = (code: string) => PAGES.find((p) => p.st === code);
export const pageOfProgram = (id: string) => PAGES.find((p) => p.prog === id);
/** First page that carries a calculator: the target of a mini-simulator's link. */
export const pageOfTool = (kind: string) => PAGES.find((p) => p.tool === kind)?.id;
