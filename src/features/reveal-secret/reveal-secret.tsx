'use client';

import {
    Check,
    Clock,
    Copy,
    Eye,
    Flame,
    Link2Off,
    Loader2,
    TriangleAlert,
} from 'lucide-react';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {useState, useSyncExternalStore, type ReactNode} from 'react';

import {decryptSecret} from '@/lib/crypto';
import {parseShareFragment} from '@/lib/share-link';

import {useCopy} from '@/hooks/use-copy';

import {Button} from '@/components/ui/button';
import {type RevealSecretResponse} from '@/schemas/secret';

type RevealState =
    | {status: 'idle'}
    | {status: 'revealing'}
    | {status: 'revealed'; secret: string}
    | {status: 'gone'; isExpired: boolean}
    | {status: 'error'};

const subscribeToHash = (onChange: () => void): (() => void) => {
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
};

export function RevealSecretLoading(): React.JSX.Element {
    return (
        <Notice icon={<Loader2 className="animate-spin" />} title="Loading…" />
    );
}

export function RevealSecret(): React.JSX.Element {
    const {id} = useParams<{id: string}>();
    // null during SSR, where the fragment is never available
    const hash = useSyncExternalStore(
        subscribeToHash,
        () => location.hash,
        () => null,
    );
    const [openedAt] = useState(() => Date.now());
    const [state, setState] = useState<RevealState>({status: 'idle'});

    if (hash === null) return <RevealSecretLoading />;

    const fragment = parseShareFragment(hash);

    async function handleReveal(): Promise<void> {
        if (!fragment) return;
        setState({status: 'revealing'});
        try {
            const res = await fetch(`/api/secrets/${id}/reveal`, {
                method: 'POST',
            });
            if (res.status === 404) {
                // The page may have sat open past the TTL.
                setState({
                    status: 'gone',
                    isExpired: Date.now() >= fragment.expiresAt,
                });
                return;
            }
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const {payload} = (await res.json()) as RevealSecretResponse;
            const secret = await decryptSecret(payload, fragment.key);
            // The key is useless now; keep it out of history. The 'revealed'
            // branch below is checked before the missing-fragment one for
            // this reason.
            history.replaceState(null, '', location.pathname);
            setState({status: 'revealed', secret});
        } catch {
            setState({status: 'error'});
        }
    }

    if (state.status === 'revealed') {
        return <RevealedSecret secret={state.secret} />;
    }
    if (!fragment) {
        return (
            <Notice
                icon={<Link2Off />}
                title="This link is incomplete"
                body="The decryption key is missing. Make sure you copied the entire URL, including everything after the #."
            />
        );
    }
    if (state.status === 'gone') {
        return state.isExpired ? (
            <ExpiredNotice expiresAt={fragment.expiresAt} />
        ) : (
            <Notice
                icon={<Flame />}
                title="This secret is gone"
                body="It has already been viewed. Secrets can only be opened once."
            />
        );
    }
    if (openedAt >= fragment.expiresAt) {
        return <ExpiredNotice expiresAt={fragment.expiresAt} />;
    }

    return (
        <div className="flex flex-col items-center gap-6 text-center">
            <IconBadge>
                <Eye />
            </IconBadge>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">
                    Someone shared a secret with you
                </h2>
                <p className="text-muted-foreground text-sm">
                    You can view it only once. After that, the link stops
                    working.
                </p>
            </div>
            {state.status === 'error' && (
                <p role="alert" className="text-destructive text-sm">
                    Something went wrong. The secret may be unreadable.
                </p>
            )}
            <Button
                size="lg"
                className="w-full"
                onClick={handleReveal}
                disabled={state.status !== 'idle'}
            >
                {state.status === 'revealing' ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <Eye />
                )}
                Reveal secret
            </Button>
        </div>
    );
}

function RevealedSecret({secret}: {secret: string}): React.JSX.Element {
    const {isCopied, copy} = useCopy();

    return (
        <div className="flex flex-col gap-4">
            <pre className="bg-muted/50 max-h-96 overflow-auto rounded-lg border p-4 font-mono text-sm break-all whitespace-pre-wrap">
                {secret}
            </pre>
            <div className="flex items-center justify-between gap-4">
                <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <TriangleAlert className="size-3.5 shrink-0" />
                    Deleted from the server. Copy it now.
                </p>
                <Button variant="outline" onClick={() => copy(secret)}>
                    {isCopied ? <Check /> : <Copy />}
                    {isCopied ? 'Copied' : 'Copy'}
                </Button>
            </div>
        </div>
    );
}

function ExpiredNotice({expiresAt}: {expiresAt: number}): React.JSX.Element {
    return (
        <Notice
            icon={<Clock />}
            title="This secret has expired"
            body={`It expired on ${new Date(expiresAt).toLocaleString()} and was deleted without being read.`}
        />
    );
}

interface NoticeProps {
    icon: ReactNode;
    title: string;
    body?: string;
}

function Notice({icon, title, body}: NoticeProps): React.JSX.Element {
    return (
        <div className="flex flex-col items-center gap-6 text-center">
            <IconBadge>{icon}</IconBadge>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{title}</h2>
                {body && (
                    <p className="text-muted-foreground text-sm">{body}</p>
                )}
            </div>
            {body && (
                <Button variant="outline" asChild>
                    <Link href="/">Create your own secret</Link>
                </Button>
            )}
        </div>
    );
}

function IconBadge({children}: {children: ReactNode}): React.JSX.Element {
    return (
        <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full [&_svg]:size-5">
            {children}
        </div>
    );
}
