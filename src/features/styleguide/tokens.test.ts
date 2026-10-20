import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

import {describe, expect, it} from 'vitest';

import {COLOR_GROUPS, NON_COLOR_TOKENS} from './tokens';

const css = readFileSync(
    fileURLToPath(new URL('../../app/globals.css', import.meta.url)),
    'utf8',
);

function declaredIn(selector: string): string[] {
    const block = css.match(new RegExp(`${selector}\\s*\\{([^}]*)\\}`))?.[1];
    if (!block) throw new Error(`${selector} block not found in globals.css`);
    return [...block.matchAll(/--([\w-]+)\s*:/g)]
        .map(([, name]) => name!)
        .sort();
}

const documented = [
    ...COLOR_GROUPS.flatMap(g =>
        g.tokens.flatMap(t => (t.foreground ? [t.name, t.foreground] : t.name)),
    ),
    ...NON_COLOR_TOKENS,
].sort();

describe('styleguide tokens', () => {
    it('documents exactly the custom properties declared in :root', () => {
        expect(documented).toEqual(declaredIn(':root'));
    });

    it('has a dark value for every colour token', () => {
        const dark = declaredIn('\\.dark');
        expect(documented.filter(t => !NON_COLOR_TOKENS.includes(t))).toEqual(
            dark,
        );
    });
});
