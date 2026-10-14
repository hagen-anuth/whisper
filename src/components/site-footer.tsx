import {Button} from '@/components/ui/button';

const GITHUB_PROFILE_URL = 'https://github.com/hagen-anuth';

export function SiteFooter(): React.JSX.Element {
    return (
        <footer className="text-muted-foreground flex flex-col items-center gap-3 px-4 pb-6 text-center text-xs">
            <p>
                Encrypted in your browser. The server never sees the secret or
                the key.
            </p>
            <div className="flex items-center gap-3">
                <span>Built by Hagen Anuth, © 2026</span>
                <Button variant="outline" size="sm" asChild>
                    <a
                        href={GITHUB_PROFILE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GitHubMark />
                        GitHub
                    </a>
                </Button>
            </div>
        </footer>
    );
}

// lucide-react no longer ships brand icons.
function GitHubMark(): React.JSX.Element {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
        </svg>
    );
}
