export interface ShareFragment {
    key: string;
    /** epoch milliseconds */
    expiresAt: number;
}

/**
 * The expiry rides along in the fragment because Redis drops the record at
 * TTL, after which the server cannot tell "expired" from "already read".
 */
export function buildShareUrl(
    origin: string,
    id: string,
    {key, expiresAt}: ShareFragment,
): string {
    const fragment = new URLSearchParams({k: key, e: String(expiresAt)});
    return `${origin}/s/${id}#${fragment.toString()}`;
}

/** `hash` is `location.hash`, with or without the leading `#`. */
export function parseShareFragment(hash: string): ShareFragment | null {
    const params = new URLSearchParams(hash.replace(/^#/, ''));
    const key = params.get('k');
    const expiresAt = Number(params.get('e'));
    if (!key || !Number.isFinite(expiresAt) || expiresAt <= 0) return null;
    return {key, expiresAt};
}
