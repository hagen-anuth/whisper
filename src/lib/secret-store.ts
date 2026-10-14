import 'server-only';

import {randomBytes} from 'node:crypto';

import {Redis} from '@upstash/redis';

let client: Redis | undefined;

// Lazy so `next build` does not need the credentials.
// Reads UPSTASH_REDIS_REST_* or the KV_REST_API_* names the Vercel
// Marketplace integration sets. Deserialization is off because the client
// would otherwise JSON.parse payloads, turning an all-digit one into a number.
function redis(): Redis {
    client ??= Redis.fromEnv({automaticDeserialization: false});
    return client;
}

const keyFor = (id: string): string => `secret:${id}`;

export async function storeSecret(
    payload: string,
    ttlSeconds: number,
): Promise<string> {
    const id = randomBytes(16).toString('base64url');
    await redis().set(keyFor(id), payload, {ex: ttlSeconds});
    return id;
}

/**
 * GETDEL is atomic, so two concurrent reads cannot both get the payload.
 * Returns null when the secret expired, was already read, or never existed.
 */
export async function takeSecret(id: string): Promise<string | null> {
    return redis().getdel<string>(keyFor(id));
}
