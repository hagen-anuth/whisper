import {describe, expect, it} from 'vitest';

import {encryptSecret} from '@/lib/crypto';

import {CreateSecretSchema, MAX_SECRET_LENGTH, TTL_OPTIONS} from './secret';

describe('CreateSecretSchema', () => {
    it('accepts the largest plaintext the form allows', async () => {
        // '€' is one UTF-16 unit but three UTF-8 bytes: the worst case.
        const {payload} = await encryptSecret('€'.repeat(MAX_SECRET_LENGTH));
        const result = CreateSecretSchema.safeParse({
            payload,
            ttlSeconds: TTL_OPTIONS[0].seconds,
        });
        expect(result.success).toBe(true);
    });

    it('rejects a TTL outside the offered options', () => {
        const result = CreateSecretSchema.safeParse({
            payload: 'abc',
            ttlSeconds: 365 * 24 * 60 * 60,
        });
        expect(result.success).toBe(false);
    });
});
