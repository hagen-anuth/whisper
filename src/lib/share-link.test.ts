import {describe, expect, it} from 'vitest';

import {buildShareUrl, parseShareFragment} from './share-link';

describe('share link', () => {
    it('round-trips key and expiry through the fragment', () => {
        const fragment = {key: 'abc_-123', expiresAt: 1_760_000_000_000};
        const url = new URL(
            buildShareUrl('https://whisper.test', 'someId', fragment),
        );
        expect(url.pathname).toBe('/s/someId');
        expect(parseShareFragment(url.hash)).toEqual(fragment);
    });

    it.each([
        ['empty', ''],
        ['missing key', '#e=1760000000000'],
        ['missing expiry', '#k=abc'],
        ['non-numeric expiry', '#k=abc&e=soon'],
    ])('rejects a fragment that is %s', (_label, hash) => {
        expect(parseShareFragment(hash)).toBeNull();
    });
});
