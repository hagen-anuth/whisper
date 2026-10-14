import {takeSecret} from '@/lib/secret-store';

import {SecretIdSchema, type RevealSecretResponse} from '@/schemas/secret';

// POST rather than GET: reading destroys the secret, and link-preview bots
// and prefetchers issue GETs.
export async function POST(
    _request: Request,
    ctx: RouteContext<'/api/secrets/[id]/reveal'>,
): Promise<Response> {
    const {id} = await ctx.params;
    const payload = SecretIdSchema.safeParse(id).success
        ? await takeSecret(id)
        : null;

    if (payload === null) {
        return Response.json({error: 'Not found'}, {status: 404});
    }
    const response: RevealSecretResponse = {payload};
    return Response.json(response, {headers: {'Cache-Control': 'no-store'}});
}
