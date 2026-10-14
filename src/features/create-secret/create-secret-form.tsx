'use client';

import {Check, Copy, Link2, Loader2, Lock, Plus} from 'lucide-react';
import {useState, type FormEvent} from 'react';

import {encryptSecret} from '@/lib/crypto';
import {buildShareUrl} from '@/lib/share-link';

import {useCopy} from '@/hooks/use-copy';

import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {ToggleGroup, ToggleGroupItem} from '@/components/ui/toggle-group';
import {
    DEFAULT_TTL_SECONDS,
    MAX_SECRET_LENGTH,
    TTL_OPTIONS,
    type CreateSecretInput,
    type CreateSecretResponse,
} from '@/schemas/secret';

interface CreatedLink {
    url: string;
    expiresAt: number;
}

export function CreateSecretForm(): React.JSX.Element {
    const [secret, setSecret] = useState('');
    const [ttlSeconds, setTtlSeconds] = useState<number>(DEFAULT_TTL_SECONDS);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [created, setCreated] = useState<CreatedLink | null>(null);

    async function handleSubmit(event: FormEvent): Promise<void> {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            const {payload, key} = await encryptSecret(secret);
            const body: CreateSecretInput = {payload, ttlSeconds};
            const res = await fetch('/api/secrets', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const {id, expiresAt} = (await res.json()) as CreateSecretResponse;
            setCreated({
                url: buildShareUrl(location.origin, id, {key, expiresAt}),
                expiresAt,
            });
            setSecret('');
        } catch {
            setError('Could not create the link. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    if (created) {
        return <ShareLink {...created} onReset={() => setCreated(null)} />;
    }

    const isTooLong = secret.length > MAX_SECRET_LENGTH;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <Label htmlFor="secret">Secret</Label>
                <Textarea
                    id="secret"
                    value={secret}
                    onChange={e => setSecret(e.target.value)}
                    placeholder="Paste a password, API key, or private note…"
                    className="min-h-36 resize-y font-mono text-sm"
                    autoComplete="off"
                    spellCheck={false}
                    autoFocus
                    aria-invalid={isTooLong}
                />
                <p
                    className={
                        isTooLong
                            ? 'text-destructive text-right text-xs'
                            : 'text-muted-foreground text-right text-xs'
                    }
                >
                    {secret.length.toLocaleString()} /{' '}
                    {MAX_SECRET_LENGTH.toLocaleString()}
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <Label id="ttl-label">Expires after</Label>
                <ToggleGroup
                    type="single"
                    variant="outline"
                    value={String(ttlSeconds)}
                    // Radix emits '' when the active item is clicked again.
                    onValueChange={v => v && setTtlSeconds(Number(v))}
                    aria-labelledby="ttl-label"
                    className="w-full"
                >
                    {TTL_OPTIONS.map(option => (
                        <ToggleGroupItem
                            key={option.seconds}
                            value={String(option.seconds)}
                            className="flex-1"
                        >
                            {option.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>

            {error && (
                <p role="alert" className="text-destructive text-sm">
                    {error}
                </p>
            )}

            <Button
                type="submit"
                size="lg"
                disabled={!secret.trim() || isTooLong || isSubmitting}
            >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Lock />}
                Create secret link
            </Button>
        </form>
    );
}

interface ShareLinkProps extends CreatedLink {
    onReset: () => void;
}

function ShareLink({
    url,
    expiresAt,
    onReset,
}: ShareLinkProps): React.JSX.Element {
    const {isCopied, copy} = useCopy();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <Label htmlFor="share-url">
                    <Link2 className="size-4" />
                    Your one-time link
                </Label>
                <div className="flex gap-2">
                    <input
                        id="share-url"
                        readOnly
                        value={url}
                        onFocus={e => e.currentTarget.select()}
                        className="bg-muted/50 border-input min-w-0 flex-1 rounded-lg border px-3 font-mono text-xs"
                    />
                    <Button type="button" onClick={() => copy(url)}>
                        {isCopied ? <Check /> : <Copy />}
                        {isCopied ? 'Copied' : 'Copy'}
                    </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                    Can be opened once. Expires{' '}
                    {new Date(expiresAt).toLocaleString()}.
                </p>
            </div>
            <Button type="button" variant="outline" onClick={onReset}>
                <Plus />
                Create another
            </Button>
        </div>
    );
}
