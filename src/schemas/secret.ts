import {z} from 'zod';

export const TTL_OPTIONS = [
    {label: '5 min', seconds: 5 * 60},
    {label: '1 hour', seconds: 60 * 60},
    {label: '1 day', seconds: 24 * 60 * 60},
    {label: '7 days', seconds: 7 * 24 * 60 * 60},
] as const;

export const DEFAULT_TTL_SECONDS = TTL_OPTIONS[1].seconds;

/** Plaintext characters, checked in the browser before encryption. */
export const MAX_SECRET_LENGTH = 10_000;

const ALLOWED_TTL_SECONDS: readonly number[] = TTL_OPTIONS.map(o => o.seconds);

/** 16 random bytes, base64url. */
export const SecretIdSchema = z.string().regex(/^[A-Za-z0-9_-]{22}$/);

export const CreateSecretSchema = z.object({
    // MAX_SECRET_LENGTH UTF-16 units at worst 3 UTF-8 bytes each, plus IV
    // and GCM tag, base64url-encoded: just under 40_100.
    payload: z
        .string()
        .min(1)
        .max(41_000)
        .regex(/^[A-Za-z0-9_-]+$/),
    ttlSeconds: z
        .number()
        .int()
        .refine(s => ALLOWED_TTL_SECONDS.includes(s), 'Unsupported TTL'),
});

export type CreateSecretInput = z.infer<typeof CreateSecretSchema>;

export interface CreateSecretResponse {
    id: string;
    /** epoch milliseconds */
    expiresAt: number;
}

export interface RevealSecretResponse {
    payload: string;
}
