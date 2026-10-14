/**
 * AES-256-GCM over Web Crypto, so it runs unchanged in the browser and in
 * Node 22. The key never leaves the client: it travels in the URL fragment,
 * which browsers do not send to the server.
 */

const ALGORITHM = 'AES-GCM';
const IV_BYTES = 12;

export interface EncryptedSecret {
    /** base64url of IV followed by ciphertext */
    payload: string;
    /** base64url of the raw 256-bit key */
    key: string;
}

export async function encryptSecret(
    plaintext: string,
): Promise<EncryptedSecret> {
    const key = await crypto.subtle.generateKey(
        {name: ALGORITHM, length: 256},
        true,
        ['encrypt'],
    );
    const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
    const ciphertext = await crypto.subtle.encrypt(
        {name: ALGORITHM, iv},
        key,
        new TextEncoder().encode(plaintext),
    );

    const packed = new Uint8Array(IV_BYTES + ciphertext.byteLength);
    packed.set(iv);
    packed.set(new Uint8Array(ciphertext), IV_BYTES);

    const rawKey = await crypto.subtle.exportKey('raw', key);
    return {
        payload: toBase64Url(packed),
        key: toBase64Url(new Uint8Array(rawKey)),
    };
}

/** Throws when the key is wrong or the payload was tampered with. */
export async function decryptSecret(
    payload: string,
    key: string,
): Promise<string> {
    const packed = fromBase64Url(payload);
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        fromBase64Url(key),
        ALGORITHM,
        false,
        ['decrypt'],
    );
    const plaintext = await crypto.subtle.decrypt(
        {name: ALGORITHM, iv: packed.subarray(0, IV_BYTES)},
        cryptoKey,
        packed.subarray(IV_BYTES),
    );
    return new TextDecoder().decode(plaintext);
}

function toBase64Url(bytes: Uint8Array): string {
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
    const binary = atob(value.replace(/-/g, '+').replace(/_/g, '/'));
    return Uint8Array.from(binary, char => char.charCodeAt(0));
}
