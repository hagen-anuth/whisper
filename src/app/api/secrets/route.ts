import {storeSecret} from '@/lib/secret-store';

import {CreateSecretSchema, type CreateSecretResponse} from '@/schemas/secret';

export async function POST(request: Request): Promise<Response> {
    const body: unknown = await request.json().catch(() => null);
    const parsed = CreateSecretSchema.safeParse(body);
    if (!parsed.success) {
        return Response.json({error: 'Invalid request'}, {status: 400});
    }

    const {payload, ttlSeconds} = parsed.data;
    const id = await storeSecret(payload, ttlSeconds);
    const response: CreateSecretResponse = {
        id,
        expiresAt: Date.now() + ttlSeconds * 1000,
    };
    return Response.json(response, {status: 201});
}
