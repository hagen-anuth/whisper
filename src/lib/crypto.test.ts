import {describe, expect, it} from 'vitest';

import {decryptSecret, encryptSecret} from './crypto';

describe('encryptSecret / decryptSecret', () => {
    it('round-trips unicode and multi-line text', async () => {
        const plaintext = 'p@ss wörd 🔑\nline two';
        const {payload, key} = await encryptSecret(plaintext);
        expect(await decryptSecret(payload, key)).toBe(plaintext);
    });

    it('emits url-safe base64 without padding', async () => {
        const {payload, key} = await encryptSecret('x'.repeat(100));
        expect(payload).toMatch(/^[A-Za-z0-9_-]+$/);
        expect(key).toMatch(/^[A-Za-z0-9_-]{43}$/);
    });

    it('never reuses a key for the same plaintext', async () => {
        const a = await encryptSecret('same');
        const b = await encryptSecret('same');
        expect(a.key).not.toBe(b.key);
        expect(a.payload).not.toBe(b.payload);
    });

    it('rejects the wrong key', async () => {
        const {payload} = await encryptSecret('secret');
        const {key: otherKey} = await encryptSecret('other');
        await expect(decryptSecret(payload, otherKey)).rejects.toThrow();
    });

    it('rejects a tampered payload', async () => {
        const {payload, key} = await encryptSecret('secret');
        // Not the last character: it can hold padding bits that decode to
        // the same bytes.
        const i = 20;
        const swapped = payload[i] === 'A' ? 'B' : 'A';
        const tampered = payload.slice(0, i) + swapped + payload.slice(i + 1);
        await expect(decryptSecret(tampered, key)).rejects.toThrow();
    });
});
